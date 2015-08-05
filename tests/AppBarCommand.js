// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("AppBarCommand control directive tests", function () {

    sharedSetup();

    it("should use initialize an AppBar containing two child AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand'></button>" +
                                              "<button data-bind='winAppBarCommand'></button>" +
                                          "</div>");
        var appBarCommand = compiledControl.childNodes[0];

        expect(appBarCommand.winControl).toBeDefined();
        expect(appBarCommand.winControl instanceof WinJS.UI.AppBarCommand);
        expect(appBarCommand.className).toContain("win-command");
        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });

    it("should use the id attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { id:\"command1\" } '></button>" +
                                              "<button data-bind='winAppBarCommand: { id:\"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].id).toEqual("command1");
        expect(commands[1].id).toEqual("command2");
    });

    it("should use the label attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { label:\"command1\" } '></button>" +
                                              "<button data-bind='winAppBarCommand: { label:\"command2\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].querySelector(".win-label").innerHTML).toEqual("command1");
        expect(commands[1].querySelector(".win-label").innerHTML).toEqual("command2");
    });

    it("should use the disabled attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { disabled: true } '></button>" +
                                              "<button data-bind='winAppBarCommand: { disabled: false } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.disabled).toBeTruthy();
        expect(commands[1].winControl.disabled).toBeFalsy();
    });

    it("should use the extraClass attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { extraClass: \"extraClass1\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].className).toContain("extraClass1");
    });

    it("should use the section attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { section: \"primary\" } '></button>" +
                                              "<button data-bind='winAppBarCommand: { section: \"secondary\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.section).toEqual("primary");
        expect(commands[1].winControl.section).toEqual("secondary");
    });

    it("should use the hidden attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { hidden: true } '></button>" +
                                              "<button data-bind='winAppBarCommand: { hidden: false } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].style.display).toEqual("none");
        expect(commands[1].style.display).not.toEqual("none");
    });

    it("should use the icon attribute on AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { icon: \"add\" } '></button>" +
                                          "</div>");
        var commandImage = compiledControl.querySelector(".win-commandimage");

        expect(escape(commandImage.innerHTML)).toEqual("%uE109");
    });

    it("should use the win-app-bar command types", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<hr data-bind='winAppBarCommand: { type: \"separator\" } '></hr>" +
                                              "<div data-bind='winAppBarCommand: { type: \"content\" } '></div>" +
                                              "<button data-bind='winAppBarCommand: { type: \"toggle\" } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.type).toEqual("separator");
        expect(commands[1].winControl.type).toEqual("content");
        expect(commands[2].winControl.type).toEqual("toggle");
    });

    it("should use the priority attribute", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { priority: 1 } '></button>" +
                                              "<button data-bind='winAppBarCommand: { priority: 2 } '></button>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.priority).toEqual(1);
        expect(commands[1].winControl.priority).toEqual(2);
    });

    it("should use the flyout attribute", function () {
        var ControlModel = function () {
            this.flyout = new WinJS.UI.Flyout();
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand: { flyout: flyout } '></button>" +
                                          "</div>", model);
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands[0].winControl.flyout).toEqual(model.flyout);
    });
});