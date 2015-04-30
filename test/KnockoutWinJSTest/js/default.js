// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
            }));
            var ControlModel = function () {
                this.toggleValue = ko.observable(false);
                this.toggleTitle = ko.observable("This is a toogle switch");
                this.toggleLabelOff = ko.observable("hello");


                this.userRating = ko.observable(3);

                this.date = ko.observable(new Date());

                this.ratings = ko.observableArray([
                    { text: "Josh", rating: ko.observable(4), selected: ko.observable(true) },
                    { text: "Paul", rating: ko.observable(5), selected: ko.observable(false) },
                    { text: "Chris", rating: ko.observable(3), selected: ko.observable(false) },
                    { text: "Edgar", rating: ko.observable(2), selected: ko.observable(true) }
                ]);

                this.time = ko.observable(new Date());

                // Push something on the back stack so that the back button shows up
                WinJS.Navigation.history.backStack.push(document.location);

                // Flyout
                this.flyoutAnchor = ko.observable("#a");

                // Menu
                this.menuAnchor = ko.observable("#c");

                // Menu with inline commands
                this.menuAnchorInline = ko.observable("#e");

                // Hub
                this.hubSections = ko.observableArray([{ text: 'Section1' }, { text: 'Section2' }, { text: 'Section3' }]);

                // ToolTip
                this.toolTipContent = ko.observable("This is a tool tip");

                // FlipView
                this.templateName = ko.observable('flipViewTemplate');
                this.flipViewArray = this.ratings;
                var count = 0;
                this.pushItem = function (e) {
                    this.flipViewArray.push({ text: "Pushed" + count++, rating: ko.observable(5), selected: ko.observable(false) });
                }
                this.popItem = function (e) {
                    this.flipViewArray.pop();
                };

                // ListView
                this.listViewArray = ko.observableArray([
                    { text: "Josh", rating: ko.observable(4) },
                    { text: "Paul", rating: ko.observable(5) },
                    { text: "Chris", rating: ko.observable(3) },
                    { text: "Edgar", rating: ko.observable(2) }
                ]);

                var listViewCount = 0;
                this.listViewUnshift = function (e) {
                    this.listViewArray.unshift({ text: 'Pushed ' + listViewCount++, rating: ko.observable(5) });
                };
                this.listViewShift = function (e) {
                    this.listViewArray.shift();
                }
                this.listViewReplace = function (e) {
                    this.listViewArray.replace(this.listViewArray()[1], { text: 'Replaced ' + listViewCount++, rating: ko.observable(4) });
                }
                this.listViewPush = function (e) {
                    this.listViewArray.push({ text: 'Pushed ' + listViewCount++, rating: ko.observable(4) });
                }
                this.listViewPop = function (e) {
                    this.listViewArray.pop();
                }

                this.onselected = function (e) {
                    var element = e.srcElement;
                    var listView = element.winControl;
                    if (listView) {

                    }
                }

            };

            ko.applyBindings(new ControlModel());

            
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
