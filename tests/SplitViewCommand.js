// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("SplitViewCommand control directive tests", function () {
    
    sharedSetup();

    it("should initialize a SplitViewCommand", function () {
        var compiledControl = initControl("<div data-bind='winSplitViewCommand'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.SplitViewCommand);
        expect(compiledControl.className).toContain("win-splitviewcommand");
    });

    it("should use the label attribute", function () {
        var compiledControl = initControl("<div data-bind='winSplitViewCommand: { label: \"command1\" } '></div>");

        expect(compiledControl.querySelector(".win-splitviewcommand-label").innerHTML).toEqual("command1");
    });

    it("should use the onInvoked attribute", function (done) {
        var gotInvokedEvent = false;
        var ControlModel = function () {
            this.onInvoked = function () {
                gotInvokedEvent = true;
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winSplitViewCommand, event: { invoked: onInvoked }'></div>", model);
        var button = compiledControl.querySelector(".win-splitviewcommand-button");
        expect(gotInvokedEvent).toBeFalsy();
        button.click();
    });
    
});