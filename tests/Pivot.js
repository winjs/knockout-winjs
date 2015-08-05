// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Pivot control directive tests", function () {
    var topNode,
       testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();
    extendTimeout();

    it("should initialize a simple Pivot", function () {
        var compiledControl = initControl("<div data-bind='winPivot'></div>");
        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.Pivot);
        expect(compiledControl.className).toContain("win-pivot");
    });

    it("should use the locked attribute", function () {
        var compiledControl = initControl("<div data-bind='winPivot: { locked: true } '></div>");
        expect(compiledControl.winControl.locked).toBeTruthy();
    });

    it("should use the title attribute", function () {
        var compiledControl = initControl("<div data-bind='winPivot: { title: \"PivotTitle\" } '></div>");
        expect(compiledControl.winControl.title).toEqual("PivotTitle");
    });

    it("should use inline pivot items", function (done) {
        var ControlModel = function () {
            // The Pivot doesn't have a loadingStateChanged event (or any similar loading complete events).
            // We'll use item animation end to ensure it loaded
            this.itemAnimationEndHandler = function (e) {
                var pivotHeaders = compiledControl.querySelectorAll(".win-pivot-header");
                var pivotItemContent = compiledControl.querySelectorAll(".win-pivot-item-content");
                expect(pivotHeaders.length).toEqual(2);
                expect(pivotItemContent.length).toEqual(2);
                expect(pivotHeaders[0].innerHTML).toEqual("Header1");
                expect(pivotHeaders[1].innerHTML).toEqual("Header2");
                expect(pivotItemContent[0].innerHTML).toEqual("Item1");
                expect(pivotItemContent[1].innerHTML).toEqual("Item2");
                done();
            }
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winPivot, event: { itemanimationend: itemAnimationEndHandler } '>" +
                                              "<div data-bind='winPivotItem: { header: \"Header1\" } '>Item1</div>" +
                                              "<div data-bind='winPivotItem: { header: \"Header2\" } '>Item2</div>" +
                                          "</div>", model);
    });

    it("should use the selectedIndex attribute", function (done) {
        var pivot;
        var selectionChangeCount = 0;
        var firstItemAnimationEndHandlerFired = false;
        var ControlModel = function () {
            this.selectedIndex = ko.observable(0);
           
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winPivot: { selectedIndex: selectedIndex }'>" +
                                              "<div data-bind='winPivotItem: { header: \"Header1\" } '>Item1</div>" +
                                              "<div data-bind='winPivotItem: { header: \"Header2\" } '>Item2</div>" +
                                          "</div>", model);

        pivot = compiledControl.winControl;
        listenOnce(pivot, "itemanimationend", function () {
            expect(pivot.selectedIndex).toEqual(0);
            listenOnce(pivot, "selectionchanged", function (event) {
                expect(event.detail.index).toEqual(1);
                done();
            })
            model.selectedIndex(1);
        })
    });

    it("should use the selectedItem attribute", function (done) {
        var compiledControl;
        var pivot;
        var selectionChangeCount = 0;
        var ControlModel = function () {
            this.selectedItem = ko.observable(null);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winPivot: { selectedItem: selectedItem }'>" +
                                          "<div data-bind='winPivotItem: { header: \"Header1\" } '>Item1</div>" +
                                          "<div data-bind='winPivotItem: { header: \"Header2\" } '>Item2</div>" +
                                      "</div>",
                                      model),
        pivot = compiledControl.winControl;
        listenOnce(pivot, "itemanimationend", function () {
            expect(pivot.selectedIndex).toEqual(0);
            listenOnce(pivot, "selectionchanged", function (event) {
                expect(event.detail.index).toEqual(1);
                done();
            })
            model.selectedItem(pivot.items.getAt(1));
        })
    });

    it("should ensure changing selection updates ko selectedItem", function (done) {
        testEventChangesProperty({
            control: "Pivot",
            afterChangeEvent: "selectionchanged",
            property: "selectedItem",
            initialValue: null,
            finalValue: function (control) {
                return control.winControl.items.getAt(1);
            },
            childrenMarkup: "<div data-bind='winPivotItem: { header: \"Header1\" } '>Item1</div>" +
                            "<div data-bind='winPivotItem: { header: \"Header2\" } '>Item2</div>",
            controlLoadingComplete: function (control) {
                return new WinJS.Promise(function (complete) {
                    listenOnce(control, "itemanimationend", function () {
                        complete();
                    });
                });
            }
        }).then(function () {
            done();
        });
    });

    it("should ensure changing selection updates ko selectedIndex", function (done) {
        testEventChangesProperty({
            control: "Pivot",
            afterChangeEvent: "selectionchanged",
            property: "selectedIndex",
            initialValue: 0,
            finalValue: 1,
            childrenMarkup: "<div data-bind='winPivotItem: { header: \"Header1\" } '>Item1</div>" +
                            "<div data-bind='winPivotItem: { header: \"Header2\" } '>Item2</div>",
            controlLoadingComplete: function (control) {
                return new WinJS.Promise(function (complete) {
                    listenOnce(control, "itemanimationend", function () {
                        complete();
                    });
                });
            }
        }).then(function () {
            done();
        });
    });

    it("should use the itemanimationend event handler", function (done) {
        var ControlModel = function () {
            this.itemAnimationEndHandler = function (e) {
                done();
            };
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winPivot, event: { itemanimationend: itemAnimationEndHandler } '>" +
                                              "<div data-bind='winPivotItem'>Item1</div>" +
                                          "</div>",
                                          model);
    });

    it("should use the custom header attributes", function () {
        var compiledControl;
        var ControlModel = function () {
            this.customLeftHeader = document.createElement("div");
            this.customRightHeader = document.createElement("div");
            this.itemAnimationEndHandler = function (e) {
                var winControl = compiledControl.winControl;
                expect(winControl.customLeftHeader).toEqual(this.customLeftHeader);
                expect(winControl.customRightHeader).toEqual(this.customRightHeader);
            };
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winPivot: { customLeftHeader: customLeftHeader, customRightHeader: customRightHeader }, event: { itemanimationend: itemAnimationEndHandler } '>" +
                                          "<div data-bind='winPivotItem'>Item1</div>" +
                                      "</div>",
                                      model);
    });

    it("should render child pivot items with observable array data", function (done) {
        var ControlModel = function () {
            this.childData = ko.observableArray([1, 2, 3]);
        }
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winPivot'>" +
                                              "<div data-bind='winPivotItem'><div id=\"listView\" data-bind='winListView: { itemDataSource: childData }'></div></div>" +
                                          "</div>",
                                          model);
        waitForComplete(document.getElementById("listView").winControl).then(function () {
            expect(compiledControl.querySelectorAll(".win-item").length > 0);
            done();
        });
    });

    it("should let foreach add new pivot items", function (done) {
        var compiledControl;
        var ControlModel = function () {
            this.items = ko.observableArray([
                { title: "Item0" },
                { title: "Item1" }
            ]);
            this.itemAnimationEndHandler = function (e) {
                var pivot = compiledControl.winControl;
                var pivotHeaders = compiledControl.querySelectorAll(".win-pivot-header");
                expect(pivotHeaders.length).toEqual(2);
                expect(pivotHeaders[0].innerHTML).toEqual("Item0");
                expect(pivotHeaders[1].innerHTML).toEqual("Item1");
                /*
        
                // TODO: Enable the foreach items updating test after #4 Foreach binding with hubs is not updated after the initial binding is fixed
                model.items.push({ title: "NewItem" });
                pivotHeaders = compiledControl.querySelectorAll(".win-pivot-header");
                expect(pivotHeaders.length).toEqual(3);
                expect(pivotHeaders[0].innerHTML).toEqual("Item0");
                expect(pivotHeaders[1].innerHTML).toEqual("Item1");
                expect(pivotHeaders[2].innerHTML).toEqual("NewItem");
                */
                done();
            }
        }
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winPivot, event: { itemanimationend: itemAnimationEndHandler } '>" +
                                          "<!-- ko foreach: items -->" +
                                              "<div data-bind='winPivotItem: { header: title } '></div>" +
                                          "<!-- /ko -->" +
                                      "</div>",
                                      model);
    });

});