// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ToggleSwitch control directive tests", function () {

    sharedSetup();

    it("should initialize a simple toggle switch", function () {
        var compiledControl = initControl("<div data-bind='winToggleSwitch'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ToggleSwitch);
        expect(compiledControl.className).toContain("win-toggleswitch");
    });

    it("should use the checked attribute", function () {
        var compiledControl = initControl("<div data-bind='winToggleSwitch: { checked: true } '></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.checked).toBeTruthy();
    });

    it("should use label attributes", function () {
        var compiledControl = initControl("<div data-bind='winToggleSwitch: { labelOn: \"onLabel\", labelOff: \"offLabel\" } '></div>");

        expect(compiledControl.querySelector(".win-toggleswitch-value-on").innerHTML).toBe("onLabel");
        expect(compiledControl.querySelector(".win-toggleswitch-value-off").innerHTML).toBe("offLabel");
    });

    it("should use the title attribute", function () {
        var compiledControl = initControl("<div data-bind='winToggleSwitch: { title: \"toggleTitle\" } '></div>");

        expect(compiledControl.querySelector(".win-toggleswitch-header").innerHTML).toBe("toggleTitle");
    });

    it("should use the disabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winToggleSwitch: { disabled: true } '></div>");

        expect(compiledControl.winControl.disabled).toBeTruthy();
    });

    it("should allow event handlers to be set up in markup", function (done) {
        var winControl;
        var ControlModel = function () {
            this.changedEventHandler = function (e) {
                expect(winControl.checked).toBeTruthy();
                done();
            };
            this.isChecked = ko.observable(false);
        };
        var model = new ControlModel()
        var compiledControl = initControl("<div data-bind='winToggleSwitch: { checked: isChecked }, event: { change: changedEventHandler } '></div>", model);

        winControl = compiledControl.winControl;
        expect(winControl.checked).toBeFalsy();
        model.isChecked(true);
    });

});
