// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Hub control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple Hub", function () {
        var compiledControl = initControl("<div data-bind='winHub'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Hub);
        expect(compiledControl.className).toContain("win-hub");
    });

    it("should use the orientation attribute", function () {
        var compiledControl = initControl("<div data-bind='winHub: { orientation: \"vertical\" } '></div>");

        expect(compiledControl.winControl.orientation).toEqual("vertical");
    });
});