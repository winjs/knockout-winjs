// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("BackButton control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple BackButton", function () {
        var compiledControl = initControl("<button data-bind='winBackButton'></button>");
        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.BackButton);
        expect(compiledControl.className).toContain("win-navigation-backbutton");
    });

});