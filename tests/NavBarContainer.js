// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("NavBarContainer control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple NavBarContainer", function () {
        var compiledControl = initControl("<div data-bind='winNavBarContainer'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.NavBarContainer);
        expect(compiledControl.className).toContain("win-navbarcontainer");
    });

    it("should use the fixedSize attribute", function () {
        var compiledControl = initControl("<div data-bind='winNavBarContainer: { fixedSize: true } '></div>");

        expect(compiledControl.winControl.fixedSize).toBeTruthy();
    });

    it("should use the maxRows attribute", function () {
        var compiledControl = initControl("<div data-bind='winNavBarContainer: { maxRows: 3 } '></div>");

        expect(compiledControl.winControl.maxRows).toEqual(3);
    });

    it("should use the layout attribute", function () {
        var compiledControl = initControl("<div data-bind='winNavBarContainer: { layout: \"vertical\" } '></div>");

        expect(compiledControl.winControl.layout).toEqual("vertical");
    });

    it("should use the data and template attributes", function () {
        var ControlModel = function () {
            this.data = WinJS.Binding.List([1, 2, 3]);
            this.template = new WinJS.Binding.Template();
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winNavBarContainer: { data: data, template: template } '></div>", model);

        expect(compiledControl.winControl.data).toEqual(model.data);
        expect(compiledControl.winControl.template).toEqual(model.template);
    });

});