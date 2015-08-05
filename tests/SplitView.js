// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("SplitView control directive tests", function () {
    
    sharedSetup();
    enableFastAnimations();

    it("should initialize a simple SplitView", function () {
        var compiledControl = initControl("<div data-bind='winSplitView'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.SplitView);
        expect(compiledControl.className).toContain("win-splitview");
    });

    it("should use the closedDisplayMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winSplitView: { closedDisplayMode: \"inline\" } '></div>");

        expect(compiledControl.winControl.closedDisplayMode).toEqual("inline");
    });

    it("should use the openedDisplayMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winSplitView: { openedDisplayMode: \"inline\" } '></div>");

        expect(compiledControl.winControl.openedDisplayMode).toEqual("inline");
    });

    it("should use the panePlacement attribute", function () {
        var compiledControl = initControl("<div data-bind='winSplitView: { panePlacement: \"top\" } '></div>");

        expect(compiledControl.winControl.panePlacement).toEqual("top");
    });

    it("should use content and pane nodes", function () {
        var compiledControl = initControl("<div data-bind='winSplitView'>" +
                                              "<div class='paneShouldBeInDom'></div>" +
                                              "<div class='contentShouldBeInDom'></div>" +
                                              "<div class='contentShouldBeInDom'></div>" +
                                          "</div>");

        var splitview = compiledControl.winControl;
        expect(splitview.paneElement.parentNode.querySelectorAll(".paneShouldBeInDom").length).toEqual(1);
        expect(splitview.contentElement.parentNode.querySelectorAll(".contentShouldBeInDom").length).toEqual(2);
    });

    it("should use the open event handlers and paneOpened attribute", function (done) {
        testEventChangesProperty({
            control: "SplitView",
            beforeChangeEvent: "beforeopen",
            afterChangeEvent: "afteropen",
            property: "paneOpened",
            initialValue: false,
            finalValue: true
        }).then(function () {
            done();
        });
    });

    it("should use the close event handlers and paneOpened attribute", function (done) {
        testEventChangesProperty({
            control: "SplitView",
            beforeChangeEvent: "beforeclose",
            afterChangeEvent: "afterclose",
            property: "paneOpened",
            initialValue: true,
            finalValue: false
        }).then(function () {
            done();
        });
    });
});