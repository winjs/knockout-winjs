// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("AppBar control directive tests", function () {
    var testTimeout = 5000
    
    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple AppBar", function () {
        var simpleAppBar = initControl("<div data-bind='winAppBar'></div>");

        expect(simpleAppBar.winControl).toBeDefined();
        expect(simpleAppBar.winControl instanceof WinJS.UI.AppBar);
        expect(simpleAppBar.className).toContain("win-appbar");
    });

    it("should use child AppBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winAppBar'>" +
                                              "<button data-bind='winAppBarCommand'></button>" +
                                              "<button data-bind='winAppBarCommand'></button>" +
                                          "</div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.AppBar);
        expect(compiledControl.className).toContain("win-appbar");
        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });
    
    it("should use the data attribute", function () {
        var ControlModel = function () {
            this.testCommands = new WinJS.Binding.List([
                new WinJS.UI.AppBarCommand(null, { label: "TestCommand0" }),
                new WinJS.UI.AppBarCommand(null, { label: "TestCommand1" })
            ]);
        };
        var compiledControl = initControl("<div data-bind='winAppBar: { data: testCommands }'></div>", new ControlModel());
        var commands = compiledControl.querySelectorAll(".win-command");

        expect(commands.length).toEqual(2);
        expect(commands[0].querySelector(".win-label").innerHTML).toEqual("TestCommand0");
        expect(commands[1].querySelector(".win-label").innerHTML).toEqual("TestCommand1")
    });
    
    it("should use the closedDisplayMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winAppBar: { closedDisplayMode: \"minimal\" }' ></div>");

        expect(compiledControl.winControl.closedDisplayMode).toEqual("minimal");
    });
    
    it("should use the placement attribute", function () {
        var compiledControl = initControl("<div data-bind='winAppBar: { placement: \"top\" }' ></div>");

        expect(compiledControl.winControl.placement).toEqual("top");
    });
    
    it("should use the opened attribute", function () {
        var compiledControl = initControl("<div data-bind='winAppBar: { opened: true }' ></div>");

        expect(compiledControl.winControl.opened).toBeTruthy();
    });
    
    it("should use the onopen event handlers and opened attribute", function (done) {
        testEventChangesProperty({
            control: "AppBar",
            beforeChangeEvent: "beforeopen",
            afterChangeEvent: "afteropen",
            property: "opened",
            initialValue: false,
            finalValue: true
        }).then(function () {
            done();
        });
    });

    it("should use the onclose event handlers and opened attribute", function (done) {
        testEventChangesProperty({
            control: "AppBar",
            beforeChangeEvent: "beforeclose",
            afterChangeEvent: "afterclose",
            property: "opened",
            initialValue: true,
            finalValue: false
        }).then(function () {
            done();
        });
    });

});