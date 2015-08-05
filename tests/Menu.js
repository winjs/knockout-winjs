// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Menu control directive tests", function () {
    var topNode,
        testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple Menu", function () {
        var compiledControl = initControl("<div data-bind='winMenu'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Menu);
        expect(compiledControl.className).toContain("win-menu");      
    });

    it("should use child MenuCommands", function () {
        var compiledControl = initControl("<div data-bind='winMenu'>" +
                                              "<button data-bind='winMenuCommand'></button>" +
                                              "<button data-bind='winMenuCommand'></button>" +
                                          "</div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Menu);
        expect(compiledControl.className).toContain("win-menu");
        expect(compiledControl.querySelectorAll(".win-command").length).toEqual(2);
    });

    it("should use the alignment attribute", function () {
        var compiledControl = initControl("<div data-bind='winMenu: { alignment: \"right\" } '></div>");

        expect(compiledControl.winControl.alignment).toEqual("right");
    });

    it("should use the disabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winMenu: { disabled: true } '></div>");

        expect(compiledControl.winControl.disabled).toBeTruthy();
    });

    it("should use the placement attribute", function () {
        var compiledControl = initControl("<div data-bind='winMenu: { placement: \"top\" } '></div>");

        expect(compiledControl.winControl.placement).toEqual("top");
    });

    it("should use the onshow event handlers and hidden attribute", function (done) {
        testEventChangesProperty({
            control: "Menu",
            beforeChangeEvent: "beforeshow",
            afterChangeEvent: "aftershow",
            property: "hidden",
            initialValue: true,
            finalValue: false,
            additionalControlProperties: "anchor: document.body"
        }).then(function () {
            done();
        });
    });

    it("should use the onhide event handlers and hidden attribute", function (done) {
        testEventChangesProperty({
            control: "Menu",
            beforeChangeEvent: "beforehide",
            afterChangeEvent: "afterhide",
            property: "hidden",
            initialValue: true, // We need to initially have the Menu hidden due to WinJS issue #1333 and then 
                                // shown in controlLoadingComplete
            finalValue: true,
            controlLoadingComplete: function (control) {
                return new WinJS.Promise(function (complete) {
                    listenOnce(control, "aftershow", function () {
                        complete();
                    })
                    control.winControl.show();
                });
            },
            skipInitialValueVerification: true, 
            additionalControlProperties: "anchor: document.body"
        }).then(function () {
            done();
        });
    });

});