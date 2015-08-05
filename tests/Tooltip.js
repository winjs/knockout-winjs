// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Tooltip control directive tests", function () {

    sharedSetup();

    it("should initialize a simple Tooltip", function () {
        var compiledControl = initControl("<div data-bind='winTooltip'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Tooltip);
    });

    it("should initialize the infotip attribute", function () {
        var compiledControl = initControl("<div data-bind='winTooltip: { infotip: true } '></div>");

        expect(compiledControl.winControl.infotip).toBeTruthy();
    });

    it("should initialize the placement attribute", function () {
        var compiledControl = initControl("<div data-bind='winTooltip: { placement: \"right\" } '></div>");

        expect(compiledControl.winControl.placement).toEqual("right");
    });

});
