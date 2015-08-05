// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Flyout control directive tests", function () {

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple Flyout control", function () {
        var compiledControl = initControl("<div data-bind='winFlyout'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Flyout);
        expect(compiledControl.className).toContain("win-flyout");
    });

    it("should use the alignment attribute", function () {
        var compiledControl = initControl("<div data-bind='winFlyout: { alignment: \"left\" } '>'></div>");

        expect(compiledControl.winControl.alignment).toEqual("left");
    });

    it("should use the disabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winFlyout: { disabled: true } '>'></div>");

        expect(compiledControl.winControl.disabled).toBeTruthy();
    });

    it("should use the placement attribute", function () {
        var compiledControl = initControl("<div data-bind='winFlyout: { placement: \"right\" } '>'></div>");

        expect(compiledControl.winControl.placement).toEqual("right");
    });

    it("should use the anchor attribute", function () {
        var anchorEl = document.createElement("div");
        var topNode = document.getElementById("mainNode");

        topNode.appendChild(anchorEl);
        var ControlModel = function () {
            this.flyoutAnchor = anchorEl;
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlyout: { anchor: flyoutAnchor } '>'></div>", model);
        expect(compiledControl.winControl.anchor).toBe(anchorEl);
    });

    it("should use the onshow event handlers and hidden attribute", function (done) {
        testEventChangesProperty({
            control: "Flyout",
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
            control: "Flyout",
            beforeChangeEvent: "beforehide",
            afterChangeEvent: "afterhide",
            property: "hidden",
            initialValue: true, // We need to initially have the Flyout hidden due to WinJS issue #1333 and then 
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