// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("MenuCommand control directive tests", function () {
    
    sharedSetup();

    it("should use initialize a Menu containing two child MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand'></button>" +
                                              "<button data-bind='winMenuCommand'></button>" +
                                          "</div>");
        var winControl = compiledControl.winControl;

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Menu);
        expect(compiledControl.className).toContain("win-menu");
        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });

    it("should use the id attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { id: \"command1\" } '></button>" +
                                              "<button data-bind='winMenuCommand: { id: \"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].id).toEqual("command1");
        expect(commands[1].id).toEqual("command2");
    });

    it("should use the label attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { label: \"command1\" } '></button>" +
                                              "<button data-bind='winMenuCommand: { label: \"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].querySelector(".win-label").innerHTML).toEqual("command1");
        expect(commands[1].querySelector(".win-label").innerHTML).toEqual("command2");
    });

    it("should use the disabled attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { disabled: true } '></button>" +
                                              "<button data-bind='winMenuCommand: { disabled: false } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.disabled).toBeTruthy();
        expect(commands[1].winControl.disabled).toBeFalsy();
    });

    it("should use the extraClass attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { extraClass: \"extraClass1\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].className).toContain("extraClass1");
    });

    it("should use the section attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { section: \"primary\" } '></button>" +
                                              "<button data-bind='winMenuCommand: { section: \"secondary\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.section).toEqual("primary");
        expect(commands[1].winControl.section).toEqual("secondary");
    });

    it("should use the type attribute on MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand: { type: \"button\" } '></button>" +
                                              "<button data-bind='winMenuCommand: { type: \"toggle\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.type).toEqual("button");
        expect(commands[1].winControl.type).toEqual("toggle");
    });

});