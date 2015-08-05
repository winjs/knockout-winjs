// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("SplitViewPaneToggle control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple SplitViewPaneToggle", function () {
        var compiledControl = initControl("<button data-bind='winSplitViewPaneToggle'></button>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.SplitViewPaneToggle);
        expect(compiledControl.className).toContain("win-splitviewpanetoggle");
    });

    it("should use the splitView attribute", function () {
        var ControlModel = function () {
            this.splitView = new WinJS.UI.SplitView().element;
        };
        var model = new ControlModel();
        var control = initControl("<button data-bind='winSplitViewPaneToggle: { splitView: splitView } '></button>", model);

        expect(control.winControl.splitView).toEqual(model.splitView);
    });

    it("should use the onInvoked attribute", function (done) {
        var ControlModel = function () {
            this.invokedHandler = function () {
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<button data-bind='winSplitViewPaneToggle, event: { invoked: invokedHandler } '></button>", model);

        compiledControl.click();
    });

});