// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ItemContainer control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple ItemContainer", function () {
        var compiledControl = initControl("<div data-bind='winItemContainer'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ItemContainer);
        expect(compiledControl.className).toContain("win-itemcontainer");
    });

    it("should use the draggable attribute", function () {
        var compiledControl = initControl("<div data-bind='winItemContainer: { draggable: true } '></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.draggable).toBeTruthy();
    });

    it("should use the selected attribute", function () {
        var compiledControl = initControl("<div data-bind='winItemContainer: { selected: true } '></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.selected).toBeTruthy();
    });

    it("should use the selectionDisabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winItemContainer: { selectionDisabled: true } '></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.selectionDisabled).toBeTruthy();
    });

    it("should use the tapBehavior attribute", function () {
        var compiledControl = initControl("<div data-bind='winItemContainer: { tapBehavior: \"toggleSelect\" } '></div>");
        var winControl = compiledControl.winControl;

        expect(winControl.tapBehavior).toBe(WinJS.UI.TapBehavior.toggleSelect);
    });

    it("should receive selection events", function (done) {
        testEventChangesProperty({
            control: "ItemContainer",
            beforeChangeEvent: "selectionchanging",
            afterChangeEvent: "selectionchanged",
            property: "selected",
            initialValue: false,
            finalValue: true
        }).then(function () {
            done();
        });
    });
});