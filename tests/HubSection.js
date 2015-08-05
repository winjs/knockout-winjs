// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("HubSection control directive tests", function () {
    
    var testDataSourceLength = 5;

    sharedSetup();

    it("should initialize a simple Hub with a single HubSection", function () {
        var compiledControl = initControl("<div data-bind='winHub'>" +
                                          "<div data-bind='winHubSection'></div>" +
                                          "</div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Hub);
        expect(compiledControl.className).toContain("win-hub");
        expect(compiledControl.querySelectorAll(".win-hub-section").length).toEqual(1);
    });

    it("should use the header attribute", function (done) {
        var compiledControl = initControl("<div data-bind='winHub'>" +
                                              "<div data-bind='winHubSection: { header: \"SimpleHeader\" }'></div>" +
                                          "</div>");
        waitForComplete(compiledControl.winControl).then(function () {
            var headers = compiledControl.querySelectorAll(".win-hub-section-header");

            expect(headers.length).toEqual(1);
            var headerContent = headers[0].querySelectorAll(".win-hub-section-header-content");
            expect(headerContent.length).toEqual(1);
            expect(headerContent[0].innerHTML).toEqual("SimpleHeader");
            done();
        });

    });

    it("should use the isHeaderStatic attribute", function () {
        var compiledControl = initControl("<div data-bind='winHub'>" +
                                              "<div data-bind='winHubSection: { isHeaderStatic: true }'></div>" +
                                          "</div>");
        var headers = compiledControl.querySelectorAll(".win-hub-section");

        expect(headers.length).toEqual(1);
        expect(headers[0].winControl.isHeaderStatic).toBeTruthy();
    });

    // TODO: Add testing for updating the foreach binding after "#4 Foreach binding with hubs is not updated after the initial binding is fixed"
    it("should allow foreach to be used in conjunction with the Hub to create HubSections", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winHub'>" +
                                              "<!-- ko foreach: testDataSource -->" +
                                                  "<div data-bind='winHubSection: { header: title } '></div>" +
                                              "<!-- /ko -->" +
                                          "</div>", model);
        waitForComplete(compiledControl.winControl).then(function () {
            var headers = compiledControl.querySelectorAll(".win-hub-section-header");
            var headerContent = compiledControl.querySelectorAll(".win-hub-section-header-content");
            expect(headers.length).toEqual(testDataSourceLength);
            expect(headerContent.length).toEqual(testDataSourceLength);
            for (var i = 0; i < testDataSourceLength; i++) {
                expect(headerContent[i].innerHTML).toEqual("Item" + i);
            }
            done();
        });

    });

});