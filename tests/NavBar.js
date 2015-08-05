// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("NavBar control directive tests", function () {
    
    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple NavBar", function () {
        var compiledControl = initControl("<div data-bind='winNavBar'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.NavBar);
        expect(compiledControl.className).toContain("win-navbar");
    });

    it("should use child NavBarCommands", function () {
        var compiledControl = initControl("<div data-bind='winNavBar'>" +
                                              "<div data-bind='winNavBarContainer'>" +
                                                  "<div data-bind='winNavBarCommand'></div>" +
                                                  "<div data-bind='winNavBarCommand'></div>" +
                                              "</div>" +
                                          "</div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.NavBar);
        expect(compiledControl.className).toContain("win-navbar");
        expect(compiledControl.querySelectorAll(".win-navbarcommand").length).toEqual(2);
    });

    it("should use the closedDisplayMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winNavBar: { closedDisplayMode: \"minimal\" } '></div>");

        expect(compiledControl.winControl.closedDisplayMode).toEqual("minimal");
    });

    it("should use the placement attribute", function () {
        var compiledControl = initControl("<div data-bind='winNavBar: { placement: \"top\" } '></div>");

        expect(compiledControl.winControl.placement).toEqual("top");
    });

    it("should use the onChildrenProcessed event handler", function (done) {
        var ControlModel = function () {
            this.processedEventHandler = function () {
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winNavBar, event: { childrenprocessed: processedEventHandler } '>" +
                                             "<div data-bind='winNavContainer'>" +
                                                  "<div data-bind='winNavBarCommand'></div>" +
                                              "</div>" +
                                          "</div>", model);
    });

    it("should use the onopen event handlers and opened attribute", function (done) {
        testEventChangesProperty({
            control: "NavBar",
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
            control: "NavBar",
            beforeChangeEvent: "beforeclose",
            afterChangeEvent: "afterclose",
            property: "opened",
            initialValue: false, // We need to initially have the NavBar hidden due to WinJS issue #1333 and then 
                                 // shown in controlLoadingComplete
            finalValue: false,
            controlLoadingComplete: function (control) {
                return new WinJS.Promise(function (complete) {
                    listenOnce(control, "afteropen", function () {
                        complete();
                    })
                    control.winControl.open();
                });
            },
            skipInitialValueVerification: true 
        }).then(function () {
            done();
        });
    });

});