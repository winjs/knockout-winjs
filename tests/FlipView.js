// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("FlipView", function () {
    
    var testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple FlipView", function () {
        var compiledControl = initControl("<div data-bind='winFlipView'></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.FlipView);
        expect(compiledControl.className).toContain("win-flipview");
    });

    it("should use an itemDataSource and render content with a template", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.pageCompleted = function () {
                var currentPage = compiledControl.winControl._pageManager._currentPage.element;
                expect(currentPage.textContent).toContain("RenderedItem0");
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource, itemTemplate: \"template\" }, event: { pagecompleted: pageCompleted }'>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span>Rendered</span>" +
                                              "<span data-bind='text: title' > </span>" +
                                          "</script>", model);
    });

    it("should use an itemDataSource and render content with a WinJS template", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.pageCompleted = function () {
                var currentPage = compiledControl.winControl._pageManager._currentPage.element;
                expect(currentPage.textContent).toContain("RenderedItem0");
                done();
            };
            this.renderer = function (itemPromise) {
                return itemPromise.then(function (item) {
                    var div = document.createElement("div");
                    div.className = "template";
                    div.textContent = "Rendered" + item.data.title;
                    return div;
                });
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource, itemTemplate: renderer }, event: { pagecompleted: pageCompleted }'>" +
                                          "</div>", model);
    });

    it("should receive a page completed event", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.pageCompleted = function () {
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource }, event: { pagecompleted: pageCompleted }'>" +
                                          "</div>", model);
    });

    it("should receive an on page selected event", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.pageSelected = function () {
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource }, event: { pageselected: pageSelected }'>" +
                                          "</div>", model);
    });

    it("should receive an on page visibility changed event", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.pageVisibilityChanged = function () {
                done();
            }
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource }, event: { pagevisibilitychanged: pageVisibilityChanged }'>" +
                                          "</div>", model);
    });

    it("should receive a datasource count changed event", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.dataSourceCountChanged = function () {
                done();
            }
            this.pageCompletedEventHandler = function () {
                this.testDataSource.push({ title: "Item" + (testDataSourceLength + 1) });
            }
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winFlipView: { itemDataSource: testDataSource }, event: { datasourcecountchanged: dataSourceCountChanged, pagecompleted: pageCompletedEventHandler }'>" +
                                          "</div>", model);

    });

    it("should update currentPage on navigation", function (done) {
        var testDataSource = [];

        for (var i = 0; i < testDataSourceLength; i++) {
            testDataSource.push({ title: "Item" + i });
        }

        testEventChangesProperty({
            control: "FlipView",
            afterChangeEvent: "pageselected",
            property: "currentPage",
            initialValue: 1,
            finalValue: 2,
            controlLoadingComplete: function (control) {
                return new WinJS.Promise(function (complete) {
                    listenOnce(control, "pagecompleted", function () {
                        complete();
                    });
                    control.winControl.itemDataSource = (new WinJS.Binding.List(testDataSource)).dataSource;
                });
            }
        }).then(function () {
            done();
        });
    });

});