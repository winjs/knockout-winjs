// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ToolBarCommand control directive tests", function () {
    
    sharedSetup();

    it("should use initialize a ToolBar containing two child ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand'></button>" +
                                              "<button data-bind='winCommand'></button>" +
                                          "</div>");
        var winControl = compiledControl.winControl;

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ToolBar);
        expect(compiledControl.className).toContain("win-toolbar");
        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });

    it("should use the id attribute on ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand: { id: \"command1\" } '></button>" +
                                              "<button data-bind='winCommand: { id: \"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].id).toEqual("command1");
        expect(commands[1].id).toEqual("command2");
    });

    it("should use the label attribute on ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand: { label: \"command1\" } '></button>" +
                                              "<button data-bind='winCommand: { label: \"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].querySelector(".win-label").innerHTML).toEqual("command1");
        expect(commands[1].querySelector(".win-label").innerHTML).toEqual("command2");
    });

    it("should use the disabled attribute on ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand: { disabled: true } '></button>" +
                                              "<button data-bind='winCommand: { disabled: false } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.disabled).toBeTruthy();
        expect(commands[1].winControl.disabled).toBeFalsy();
    });

    it("should use the extraClass attribute on ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand : { extraClass: \"extraClass1\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].className).toContain("extraClass1");
    });

    it("should use the section attribute on ToolBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winToolBar'>" +
                                              "<button data-bind='winCommand: { section: \"primary\" } '></button>" +
                                              "<button data-bind='winCommand: { section: \"secondary\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.section).toEqual("primary");
        expect(commands[1].winControl.section).toEqual("secondary");
    });

});
