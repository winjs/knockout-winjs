// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ListView control directive tests", function () {
    var topNode,
        testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple ListView", function () {
        var compiledControl = initControl("<div data-bind='winListView'></div>");
        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.ListView);
        expect(compiledControl.className).toContain("win-listview");
    });

    it("should use the itemDataSource attribute", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource } '></div>", model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.querySelectorAll(".win-container").length).toEqual(testDataSourceLength);
            done();
        });
    });

    it("should use the item template", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\" } '>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
        waitForComplete(compiledControl.winControl).then(function () {
            var renderedItems = compiledControl.querySelectorAll(".win-item");
            expect(renderedItems.length).toEqual(testDataSourceLength);
            for (var i = 0; i < renderedItems.length; i++) {
                expect(renderedItems[i].firstElementChild.innerHTML).toEqual(model.testDataSource()[i].title);
            }
            done();
        });
    });

    it("should use the group header template", function (done) {
        var compiledControl;

        function simpleGroupingFunction(data) {
            return data.header;
        }
        var ControlModel = function () {
            this.testDataSource = ko.observableArray();
            for (var i = 0; i < testDataSourceLength; i++) {
                this.testDataSource.push({ title: "Item" + i, header: "Header" + i });
            }
            this.groupedDataSource = new WinJS.Binding.List(this.testDataSource()).createGrouped(simpleGroupingFunction, simpleGroupingFunction);
        };
        var model = new ControlModel();
        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: groupedDataSource.dataSource, " + 
                                        "groupDataSource: groupedDataSource.groups.dataSource, groupHeaderTemplate: \"groupHeaderTemplate\", " + 
                                        "itemTemplate: \"itemTemplate\" } '>" +
                                      "</div>" +
                                      "<script id=\"groupHeaderTemplate\" type=\"text/html\">" +
                                        "<span data-bind='text: $data' >" +
                                      "</script>" +
                                      "<script id=\"itemTemplate\" type=\"text/html\">" +
                                        "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            var renderedItems = compiledControl.querySelectorAll(".win-item");
            expect(renderedItems.length).toEqual(testDataSourceLength);
            for (var i = 0; i < renderedItems.length; i++) {
                expect(renderedItems[i].firstElementChild.innerHTML).toEqual(model.testDataSource()[i].title);
            }
            var renderedHeaders = compiledControl.querySelectorAll(".win-groupheader");
            expect(renderedHeaders.length).toEqual(testDataSourceLength);
            for (var i = 0; i < renderedHeaders.length; i++) {
                expect(renderedHeaders[i].firstElementChild.innerHTML).toEqual(model.testDataSource()[i].header);
            }
            done();
        });
    });

    it("should use the itemsReorderable attribute", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemsReorderable: true, itemDataSource: testDataSource } '></div>",
                                          model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.itemsReorderable).toBeTruthy();
            var itemBoxes = compiledControl.querySelectorAll(".win-itembox");
            for (var i = 0; i < itemBoxes.length; i++) {
                expect(itemBoxes[i].draggable).toBeTruthy();
            }
            done();
        });
    });

    it("should use the itemsDraggable attribute", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemsDraggable: true, itemDataSource: testDataSource }'></div>", model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.itemsDraggable).toBeTruthy();
            var itemBoxes = compiledControl.querySelectorAll(".win-itembox");
            for (var i = 0; i < itemBoxes.length; i++) {
                expect(itemBoxes[i].draggable).toBeTruthy();
            }
            done();
        });
    });

    it("should use the loadingStateChanged event handler", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.loadingStateChangedHandler = function () {
                if (compiledControl.winControl.loadingState === "complete") {
                    done();
                }
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\" }, " +
                                              "event: { loadingstatechanged: loadingStateChangedHandler } '></div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' > </span>" +
                                          "</script>", model);
    });

    it("should use the maxDeferredItemCleanup attribute", function () {
        var compiledControl = initControl("<div data-bind='winListView: { maxDeferredItemCleanup: 10 } '></div>");

        expect(compiledControl.winControl.maxDeferredItemCleanup).toEqual(10);
    });

    it("should use the currentItem attribute", function () {
        var ControlModel = function () {
            this.testCurrentItem = {
                index: 2
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { currentItem: testCurrentItem } '></div>", model);

        expect(compiledControl.winControl.currentItem.index).toEqual(2);
    });

    it("should use the tapBehavior attribute", function () {
        var compiledControl = initControl("<div data-bind='winListView: { tapBehavior: \"toggleSelect\" } '></div>");

        expect(compiledControl.winControl.tapBehavior).toEqual("toggleSelect");
    });

    it("should use the groupHeaderTapBehavior attribute", function () {
        var compiledControl = initControl("<div data-bind='winListView: { groupHeaderTapBehavior: \"none\" } '></div>");

        expect(compiledControl.winControl.groupHeaderTapBehavior).toEqual("none");
    });

    it("should use the selectionMode attribute", function () {
        var compiledControl = initControl("<div data-bind='winListView: { selectionMode: \"none\" } '></div>");

        expect(compiledControl.winControl.selectionMode).toEqual("none");
    });

    it("should use the layout attribute", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.layout = new WinJS.UI.ListLayout();
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemsReorderable: true, itemDataSource: testDataSource, layout: layout }'></div>",
                                          model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout instanceof WinJS.UI.ListLayout).toBeTruthy();
            done();
        });
    });

    it("should use the onContentAnimating event", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.contentAnimatingEventHandler = function (e) {
                expect(e.detail.type).toEqual("entrance");
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", oncontentanimating: contentAnimatingEventHandler } '>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
    });

    it("should use the selection attribute", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.selection = ko.observableArray();
        }
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", selection: selection } '>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
        var control = compiledControl.winControl;
        waitForComplete(control).then(function () {
            expect(control.selection.count()).toEqual(0);
            model.selection.push(2);
            expect(control.selection.count()).toEqual(1);
            expect(control.selection.getIndices()[0]).toEqual(2);
            done();
        });
    });

    it("should change selection from ListView", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.selection = ko.observableArray();
        }
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", selection: " +
                                            "selection }'></div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
        var control = compiledControl.winControl;
        waitForComplete(control).then(function () {
            expect(control.selection.count()).toEqual(0);
            listenOnce(compiledControl, "selectionchanged", function () {
                expect(model.selection().length).toEqual(1);
                expect(model.selection()[0]).toEqual(2);
                done();
            })
            control.selection.set([2]);
        });
    });

    it("should apply reorders back to the scope", function (done) {
        var originalDataSource = [];

        var ControlModel = function () {
            var loadingStateCompletedCount = 0;
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            for (var i = 0; i < testDataSourceLength; i++) {
                originalDataSource[i] = this.testDataSource[i];
            }
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\" } '>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
        var control = compiledControl.winControl;
        waitForComplete(control).then(function () {
            control.selection.set([testDataSourceLength - 1]);
            control._currentMode()._reorderItems(0, control.selection, false, true, false);
            return waitForComplete(control);
        }).then(function () {
            expect(originalDataSource[testDataSourceLength - 1]).toEqual(model.testDataSource[0]);
            expect(originalDataSource[0]).toEqual(model.testDataSource[1]);
            done();
        });
    });

    it("should use the header and footer attributes", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.headerElement = document.createElement("div");
            this.footerElement = document.createElement("div");
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, header: headerElement, footer: footerElement, " +
                                              "itemTemplate: \"template\" }'>" +
                                          "</div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>", model);
        var control = compiledControl.winControl;
        waitForComplete(control).then(function () {
            expect(control.header).toEqual(model.headerElement);
            expect(control.footer).toEqual(model.footerElement);
            done();
        });
    });

});