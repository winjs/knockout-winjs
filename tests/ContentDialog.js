// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ContentDialog control directive tests", function () {

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple ContentDialog control", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog'></div>");
        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ContentDialog);
        expect(compiledControl.className).toContain("win-contentdialog");
    });

    it("should use the title attribute", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog: { title: \"ContentDialogTitle\" }'></div>");
        expect(compiledControl.winControl.title).toEqual("ContentDialogTitle");
    });

    it("should use the primaryCommandText attribute", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog: { primaryCommandText: \"PrimaryCommandText\" }'></div>");
        var primaryCommand = compiledControl.querySelector(".win-contentdialog-primarycommand");
        expect(primaryCommand.innerHTML).toEqual("PrimaryCommandText");
    });

    it("should use the primaryCommandDisabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog: { primaryCommandText: \"PrimaryCommandText\", primaryCommandDisabled: true }'></div>");
        var primaryCommand = compiledControl.querySelector(".win-contentdialog-primarycommand");
        expect(primaryCommand.disabled).toBeTruthy()
    });

    it("should use the secondaryCommandText attribute", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog: { secondaryCommandText: \"SecondaryCommandText\" }' ></div>");
        var secondaryCommand = compiledControl.querySelector(".win-contentdialog-secondarycommand");
        expect(secondaryCommand.innerHTML).toEqual("SecondaryCommandText");
    });

    it("should use the secondaryCommandDisabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winContentDialog: { secondaryCommandText: \"SecondaryCommandText\", secondaryCommandDisabled: true }'></div>");
        var secondaryCommand = compiledControl.querySelector(".win-contentdialog-secondarycommand");
        expect(secondaryCommand.disabled).toBeTruthy();
    });

    it("should use the onshow event handlers and hidden attribute", function (done) {
        testEventChangesProperty({
            control: "ContentDialog",
            beforeChangeEvent: "beforeshow",
            afterChangeEvent: "aftershow",
            property: "hidden",
            initialValue: true,
            finalValue: false
        }).then(function () {
            done();
        });
    });

    it("should use the onhide event handlers and hidden attribute", function (done) {
        testEventChangesProperty({
            control: "ContentDialog",
            beforeChangeEvent: "beforehide",
            afterChangeEvent: "afterhide",
            property: "hidden",
            initialValue: false,
            finalValue: true,
            skipInitialValueVerification: true // Need to skip initial value verification because ContentDialog has a queued aftershow event fire
                                               // after we set hidden on the control, but before the beforehide event fires, which causes a too early 
                                               // update on the observable as 'hidden'
        }).then(function () {
            done();
        });
    });

});