// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
"use strict";

function initControl(markup, model) {
    var element = document.createElement("div");
    var topNode = document.getElementById("mainNode");

    element.innerHTML = markup;
    var controlElement = element.childNodes[0];
    controlElement.id = "testControl";
    topNode.appendChild(element);
    ko.applyBindings(model, topNode);

    return controlElement;
}

function sharedSetup() {
    var topNode;

    beforeEach(function () {
        topNode = document.createElement("div");
        topNode.id = "mainNode";
        document.body.appendChild(topNode);
    });

    afterEach(function () {
        ko.cleanNode(topNode);
        document.body.removeChild(topNode);
        topNode = null;
    });
}

function enableFastAnimations() {
    beforeEach(function () {
        WinJS.Utilities._fastAnimations = true;
    });

    afterEach(function () {
        WinJS.Utilities._fastAnimations = false;
    });
}

function extendTimeout() {
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
}

function generateTestKOArray(testDataSourceLength) {
    var arr = ko.observableArray();

    for (var i = 0; i < testDataSourceLength; i++) {
        arr.push({ title: "Item" + i });
    }

    return arr;
}

// This helper function is useful for WinJS controls such as ListView and Hub
// which use the loadingstatechanged event and loadingState property to report they completed loading
function waitForComplete(control) {
    return new WinJS.Promise(function (complete) {
        if (control.loadingState === "complete") {
            complete();
        } else {
            var loadingStateChanged = function () {
                if (control.loadingState === "complete") {
                    control.removeEventListener("loadingstatechanged", loadingStateChanged);
                    complete();
                }
            };
            control.addEventListener("loadingstatechanged", loadingStateChanged);
        }
    });
}

function listenOnce(target, type, listener) {
    var listenerFunc = function (e) {
        target.removeEventListener(type, listenerFunc);
        listener(e);
    };
    target.addEventListener(type, listenerFunc);
}

// A test helper to test events changing WinJS control properties that are bound to knockout observables
function testEventChangesProperty(testObject) {
        // The name of control to test
    var control = testObject.control,
        // The event that fires before change of the property (i.e. beforeopen) [optional]
        beforeChangeEvent = testObject.beforeChangeEvent,
        // The event that fires after change of the property (i.e. afteropen)
        afterChangeEvent = testObject.afterChangeEvent,
        // The property of control that is expected to change after afterchange event fires (i.e opened)
        property = testObject.property,
        // The initial value of the property that gets bound to a ko observable, can be a primitive or a function taking the control that returns the value
        initialValue = testObject.initialValue,
        // The final value of the property that is expected to be the same as the ko observable, can be a primitive or a function taking the control
        // that returns the value
        finalValue = testObject.finalValue,
        // The children markup of the control [optional]
        childrenMarkup = testObject.childrenMarkup,
        // Sibling markup of the control [optional]
        siblingMarkup = testObject.siblingMarkup, 
        // The tag of the control [optional, defaults to div]
        controlElementTag = testObject.controlElementTag ? testObject.controlElementTag : "div",
        // A function returning a promise that waits for the completion of control loading. The final value will not be set on the property 
        // before loading is complete [optional, defaults to empty promise]
        controlLoadingComplete = testObject.controlLoadingComplete ? testObject.controlLoadingComplete : function () {
            return WinJS.Promise.as()
        }, 
        // Additional control model properties can be defined here, they will be mixed in with the properties that represent the beforechange, afterchange event handlers and the changing property [optional, defaults to empty object]
        additionalControlModelProperties = testObject.additionalControlModelProperties ? testObject.additionalControlModelProperties : {}, 
        // Additional properties that will be added to markup of the tested control in its bind dataset [optional, defaults to empty string]
        additionalControlProperties = testObject.additionalControlProperties ? (testObject.additionalControlProperties + ", ") : "", 
        // Flag to pass in if the test should skip the initial value to be verified
        // to equal the property observable in before change event, useful for tests that modify the initial property value on their
        // controlLoadingComplete promise [optional, defaults to false]
        skipInitialValueVerification = (testObject.skipInitialValueVerification !== undefined) ? testObject.skipInitialValueVerification : false; 

    return new WinJS.Promise(function (complete) {
        var gotBeforeChangeEvent = false;
        var compiledControl;
        var setupComplete = false;
        var ControlModel = function () {
            if (beforeChangeEvent) {
                this.beforeChangeEventHandler = function (e) {
                    gotBeforeChangeEvent = true;
                    if (!skipInitialValueVerification) {
                        if (typeof initialValue === "function") {
                            expect(this.changingProperty()).toEqual(initialValue(compiledControl));
                        } else {
                            expect(this.changingProperty()).toEqual(initialValue);
                        }
                    }
                    return true;
                };
            }
            this.afterChangeEventHandler = function (e) {
                if (setupComplete) {
                    if (beforeChangeEvent) {
                        expect(gotBeforeChangeEvent).toBeTruthy();
                    }
                    if (typeof finalValue === "function") {
                        expect(this.changingProperty()).toEqual(finalValue(compiledControl));
                    } else {
                        expect(this.changingProperty()).toEqual(finalValue);
                    }
                    complete();
                }
            };
            if (typeof initialValue === "function") {
                this.changingProperty = ko.observable(initialValue(compiledControl));
            } else {
                this.changingProperty = ko.observable(initialValue);
            }
        };
        
        // Create the model object from the mix of test helper ControlModel and additional properties that can come from test
        WinJS.Class.mix(ControlModel, additionalControlModelProperties);
        var model = new ControlModel();
        var controlMarkup = "<" + controlElementTag + " data-bind='win" + control + ": { " + additionalControlProperties + property + ": changingProperty }, event: { ";
        if (beforeChangeEvent) {
            controlMarkup += beforeChangeEvent + ": beforeChangeEventHandler, ";
        }
        controlMarkup += afterChangeEvent + ": afterChangeEventHandler } '>";
        if (childrenMarkup) {
            controlMarkup += childrenMarkup;
        }
        controlMarkup += "</" + controlElementTag + ">";
        compiledControl = initControl(controlMarkup, model);
        controlLoadingComplete(compiledControl).then(function () {
            setupComplete = true;
            if (typeof finalValue === "function") {
                compiledControl.winControl[property] = finalValue(compiledControl);
            } else {
                compiledControl.winControl[property] = finalValue;
            }
        });
    });
}
