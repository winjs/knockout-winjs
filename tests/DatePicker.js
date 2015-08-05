// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("DatePicker control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple DatePicker", function () {
        var compiledControl = initControl("<div data-bind='winDatePicker'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.DatePicker);
        expect(compiledControl.className).toContain("win-datepicker");
    });

    it("should use the min and max year attributes", function () {
        var compiledControl = initControl("<div data-bind='winDatePicker: { minYear: 2013, maxYear: 2014 }'></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.minYear).toBe(2013);
        expect(winControl.maxYear).toBe(2014);
    });

    it("should use the disabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winDatePicker: { disabled: true }'></div>");

        expect(compiledControl.winControl.disabled).toBeTruthy();
    });

    it("should use the current attribute", function () {
        var ControlModel = function () {
            this.testDate = new Date(2013, 3, 7);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winDatePicker: { current: testDate }'></div>", model);
        var winControl = compiledControl.winControl;

        expect(winControl.current.getYear()).toBe(113);
        expect(winControl.current.getMonth()).toBe(3);
        expect(winControl.current.getDate()).toBe(7);
    });

});