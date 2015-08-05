// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("NavBarCommand control directive tests", function () {
    
    sharedSetup();

    it("should use initialize a NavBar containing two child NavBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winNavContainer'>" +
                                              "<div data-bind='winNavBarCommand'></div>" +
                                              "<div data-bind='winNavBarCommand'></div>" +
                                          "</div>");

        expect(compiledControl.querySelectorAll(".win-navbarcommand").length).toEqual(2);
    });

    it("should use the label attribute on NavBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winNavContainer'>" +
                                              "<div data-bind='winNavBarCommand: { label: \"command1\" } '></div>" +
                                              "<div data-bind='winNavBarCommand: { label: \"command2\" } '></div>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-navbarcommand");

        expect(commands[0].querySelector(".win-navbarcommand-label").innerHTML).toEqual("command1");
        expect(commands[1].querySelector(".win-navbarcommand-label").innerHTML).toEqual("command2");
    });

    it("should use the location attribute on NavBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winNavContainer'>" +
                                              "<div data-bind='winNavBarCommand: { location: \"someLocation\" } '></div>" +
                                          "</div>");
        var commands = compiledControl.querySelectorAll(".win-navbarcommand");

        expect(commands[0].winControl.location).toEqual("someLocation");
    });

});