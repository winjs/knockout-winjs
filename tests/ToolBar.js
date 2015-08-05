// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ToolBar control directive tests", function () {

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple ToolBar", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ToolBar);
        expect(compiledControl.className).toContain("win-toolbar");
    });

    it("should use child ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand'></button>" +
                                              "<button data-bind='winCommand'></button>" +
                                          "</div>");

        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });

    it("should use the closedDisplayMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winToolBar: { closedDisplayMode: \"full\" } '></div>");

        expect(compiledControl.winControl.closedDisplayMode).toEqual("full");
    });

    it("should use the onclose event handlers and opened attribute", function (done) {
        testEventChangesProperty({
            control: "ToolBar",
            beforeChangeEvent: "beforeclose",
            afterChangeEvent: "afterclose",
            property: "opened",
            initialValue: true,
            finalValue: false
        }).then(function () {
            done();
        });
    });

    it("should use the onopen event handlers and opened attribute", function (done) {
        testEventChangesProperty({
            control: "ToolBar",
            beforeChangeEvent: "beforeopen",
            afterChangeEvent: "afteropen",
            property: "opened",
            initialValue: false,
            finalValue: true
        }).then(function () {
            done();
        });
    });

});