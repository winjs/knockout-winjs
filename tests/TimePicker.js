// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("TimePicker control directive tests", function () {

    sharedSetup();

    it("should initialize a simple TimePicker", function () {
        var compiledControl = initControl("<div data-bind='winTimePicker'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.TimePicker);
        expect(compiledControl.className).toContain("win-timepicker");
    });

    it("should use the clock attribute", function () {
        var ControlModel = function () {
            this.testClock = "24HourClock";
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winTimePicker: { clock: testClock } '></div>", model);

        expect(compiledControl.winControl.clock).toBe("24HourClock");
    });

    it("should use the disabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winTimePicker: { disabled: true } '></div>");

        expect(compiledControl.winControl.disabled).toBeTruthy();
    });

    it("should use the current attribute", function () {
        var ControlModel = function () {
            this.testDate = new Date(2000, 1, 1, 11, 12);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winTimePicker: { current: testDate } '></div>", model);
        var winControl = compiledControl.winControl;

        expect(winControl.current.getHours()).toBe(11);
        expect(winControl.current.getMinutes()).toBe(12);
    });

    it("should use the minuteIncrement attribute", function () {
        var compiledControl = initControl("<div data-bind='winTimePicker: { minuteIncrement: 10 } '></div>");

        expect(compiledControl.winControl.minuteIncrement).toBe(10);
    });

});