/*!
 * knockout-winjs
 *
 * Copyright 2013 Josh Williams and other contributors
 * Released under the MIT license
 */
(function () {
    "use strict";

    function addBindings(controls) {
        Object.keys(controls).forEach(function (name) {
            var controlConfiguration = controls[name];
            var ctor = WinJS.Utilities.getMember(name);
            var eventName = controlConfiguration.event
            var propertyProcessor = controlConfiguration.propertyProcessor;
            var bindDescendants = controlConfiguration.bindDescendants || false;
            var bindingName = "win" + name.substr(name.lastIndexOf(".") + 1);

            ko.bindingHandlers[bindingName] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

                    // The options for the control
                    var value = valueAccessor();

                    // Options record for the WinJS Control
                    var options = {};

                    // Iterate over the observable properties to get their value
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            if (propertyProcessor && propertyProcessor[property] !== undefined) {
                                options[property] = propertyProcessor[property](value[property], function () { return element });
                            } else {
                                options[property] = ko.unwrap(value[property]);
                            }
                        }
                    }

                    // If the WinJS control depends on having child elements 
                    if (element.children.length > 0 && bindDescendants) {
                        // This is done synchornously
                        // @TODO: Determine if this could be done async
                        ko.applyBindingsToDescendants(bindingContext, element);
                    }
                     
                    // Create a new instanace of the control with the element and options
                    var control = new ctor(element, options);

                    // Add event handler that will kick off changes to the observable values
                    // For most controls this is the "change" event
                    if (eventName) {
                        ko.utils.registerEventHandler(element, eventName, function changed(e) {
                            // Iterate over the observable properties
                            for (var property in value) {
                                // Check to see if they exsist
                                if (value.hasOwnProperty(property)) {
                                    // Determine if that value is a writableObservable property
                                    if (ko.isWriteableObservable(value[property])) {
                                        // Kickoff updates 
                                        value[property](control[property]);
                                    }
                                }
                            }
                        });
                    }

                    // Add disposal callback to dispose the WinJS controle when it's not needed anymore
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function (e) {
                        if (element.winControl) {
                            element.winControl.dispose();
                        }
                    });

                    return { controlsDescendantBindings: bindDescendants };
                },

                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    // Get the WinJS control 
                    var control = element.winControl;
                    var value = valueAccessor();

                    // Only update the control properties that are different with the unpacked value
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            var unwrappedValue = ko.unwrap(value[property]);
                            if (control[property] !== unwrappedValue) {
                                if (propertyProcessor && propertyProcessor[property] !== undefined) {
                                    var returnValue = propertyProcessor[property](value[property], function () { return element }, control[property]);
                                    if (returnValue !== null) {
                                        control[property] = returnValue;
                                    }

                                } else {
                                    control[property] = unwrappedValue;
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    // Helper for adding and remove click hanlders between two elements
    function addRemoveClickHandlers(anchor, oldAnchor, sourceElement) {
        var retVal = null;
        var value = ko.unwrap(anchor);
        var element = document.querySelector(value);
       
        var sourceElement = sourceElement();

        if (!oldAnchor || value !== sourceElement.dataset['cachedAnchor']) {
            var showMenu = function (e) {
                sourceElement.winControl.show();
            };
            element._handler = showMenu;
            element.addEventListener("click", element._handler);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function (e) {
                element.removeEventListener("click", element._handler);
            });

            if (oldAnchor) {
                oldAnchor.removeEventListener("click", oldAnchor._handler);
            }

            sourceElement.dataset['cachedAnchor'] = value;
            retVal = element;
        }

        return retVal;
    }
   
    // Helper for diffing between an obserable array and binding list
    function bindingListWatch(value, oldValue, sourceElement) {
        var unpacked = ko.unwrap(value);
        // Will create a bindingList once
        // @TODO: Figure out how to detect if they are replacing the bindingList with a brand new one
        var retVal = null;
        if (!oldValue) {
            var bindingList = new WinJS.Binding.List(unpacked);
            value.subscribe(function (newValue) {
                for (var i = 0, len = newValue.length; i < len; i++) {
                    var item = newValue[i];
                    switch (item.status) {
                        case "deleted":
                            bindingList.splice(item.index, 1);
                            break;
                        case "added":
                            if (item.index === len) {
                                bindingList.push(item.value);
                            } else if (item.index === 0) {
                                bindingList.unshift(item.value);
                            } else {
                                bindingList.push(item.value)
                                bindingList.move(value().length - 1, item.index);
                            }
                            break;
                    }
                }
            }, this, "arrayChange");

            retVal = bindingList.dataSource;
        }

        return retVal;
    }

    // Helper for itemTemplate changes
    function itemTemplateWatch(value, oldValue, sourceElement) {
        var retVal = null;
        var value = ko.unwrap(value);
        var template = value;
        var sourceElement = sourceElement();
        // @TODO: add support for wiring up item disposal to binding cleanup
        var renderer = WinJS.UI.simpleItemRenderer(function (item) {
            var element = document.createElement("div");
            ko.renderTemplate(template, item.data, {}, element);
            return element;
        });

        if (!oldValue || template !== sourceElement.dataset['lastTemplate']) {
            sourceElement.dataset['lastTemplate'] = template;
            retVal = renderer;
        }

        return retVal;
    }

    var controls = {
        "WinJS.UI.AppBar": {
            bindDescendants: true
        },
        "WinJS.UI.AppBarCommand": {},
        "WinJS.UI.BackButton": {},
        "WinJS.UI.DatePicker": {
            event: "change"
        },
        "WinJS.UI.FlipView": {
            propertyProcessor: {
                'itemTemplate': function (value, flipViewElement, update) {
                    return itemTemplateWatch(value, update, flipViewElement);
                },
                'itemDataSource': function (value, flipViewElement, update) {
                    return bindingListWatch(value, update, flipViewElement);
                }
            },
            bindDescendants: true
        },
        "WinJS.UI.Flyout": {
            propertyProcessor: {
                'anchor': function (value, flyoutElement, oldAnchor) {
                    return addRemoveClickHandlers(value, oldAnchor, flyoutElement);
                }
            }
        },
        "WinJS.UI.Hub": {
            bindDescendants: true
        },
        "WinJS.UI.HubSection": {},
        "WinJS.UI.ItemContainer": {
            event: "selectionchanged"
        },
        "WinJS.UI.ListView": {
            event: "selectionchanged",
            propertyProcessor: {
                'itemTemplate': function (value, listViewElement, update) {
                    return itemTemplateWatch(value, update, listViewElement);
                },
                'itemDataSource': function (value, listViewElement, update) {
                    return bindingListWatch(value, update, listViewElement);
                },
                'layout': function (value, listViewElement, update) {
                    var retVal = null;
                    var unpacked = ko.unwrap(value);
                    var listViewElement = listViewElement();
                    var layout = (unpacked.type) ? new unpacked.type(unpacked) : unpacked;

                    if (!update || '' + layout !== listViewElement.dataset['cachedLayout']) {
                        retVal = layout;
                        listViewElement.dataset['cachedLayout'] = '' + layout;
                    }

                    return retVal;

                }
            },
            bindDescendants: true
        },
        "WinJS.UI.Menu": {
            propertyProcessor: {
                'anchor': function (value, menuElement, oldAnchor) {
                    return addRemoveClickHandlers(value, oldAnchor, menuElement);
                }
            },
            bindDescendants: true
        },
        "WinJS.UI.MenuCommand": {},
        "WinJS.UI.NavBar": {},
        "WinJS.UI.NavBarCommand": {},
        "WinJS.UI.NavBarContainer": {},
        "WinJS.UI.Rating": {
            event: "change"
        },
        "WinJS.UI.SearchBox": {
            event: "querychanged"
        },
        // @TODO: Semantic Zoom
        "WinJS.UI.TimePicker": {
            event: "change"
        },
        "WinJS.UI.ToggleSwitch": {
            event: "change"
        },
        // @TODO: Determine a better way to update Tooltip
        "WinJS.UI.Tooltip": {
            propertyProcessor: {
                'contentElement': function (value, toolTipElement, update) {
                    var value = ko.unwrap(value);
                    var element = document.querySelector(value);
                    return element;
                }
            }

        }
    };

    addBindings(controls);

})();