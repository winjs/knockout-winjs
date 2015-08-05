// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("SemanticZoom control directive tests", function () {
    var topNode,
        testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();

    it("should initialize a simple SemanticZoom", function () {
        var rawData = [];
        for (var i = 0; i < testDataSourceLength; i++) {
            rawData.push({ title: "Item" + i });
        }
        var ControlModel = function () {
            function simpleGroupingFunction(data) {
                return data.title;
            }
            this.zoomedInSource = new WinJS.Binding.List(rawData).createGrouped(simpleGroupingFunction, simpleGroupingFunction);
            this.zoomedOutSource = this.zoomedInSource.groups;
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winSemanticZoom'>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedInSource.dataSource, groupDataSource: zoomedInSource.groups.dataSource }'></div>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedOutSource.dataSource } '></div>" +
                                          "</div>",
                                          model);

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.SemanticZoom);
        expect(compiledControl.className).toContain("win-semanticzoom");
    });

    it("should use the enableButton attribute", function () {
        var rawData = [];
        for (var i = 0; i < testDataSourceLength; i++) {
            rawData.push({ title: "Item" + i });
        }
        var ControlModel = function () {
            function simpleGroupingFunction(data) {
                return data.title;
            }
            this.zoomedInSource = new WinJS.Binding.List(rawData).createGrouped(simpleGroupingFunction, simpleGroupingFunction);
            this.zoomedOutSource = this.zoomedInSource.groups;
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winSemanticZoom: { enableButton: false } '>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedInSource.dataSource, groupDataSource: zoomedInSource.groups.dataSource } '></div>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedOutSource.dataSource } '></div>" +
                                          "</div>",
                                          model);

        expect(compiledControl.winControl.enableButton).toBeFalsy();
    });

    it("should use the zoomFactor attribute", function () {
        var rawData = [];
        for (var i = 0; i < testDataSourceLength; i++) {
            rawData.push({ title: "Item" + i });
        }
        var ControlModel = function () {
            function simpleGroupingFunction(data) {
                return data.title;
            }
            this.zoomedInSource = new WinJS.Binding.List(this.rawData).createGrouped(simpleGroupingFunction, simpleGroupingFunction);
            this.zoomedOutSource = this.zoomedInSource.groups;
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winSemanticZoom: { zoomFactor: 0.25 } '>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedInSource.dataSource, groupDataSource: zoomedInSource.groups.dataSource } '></div>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedOutSource.dataSource }'></div>" +
                                          "</div>",
                                          model);

        expect(compiledControl.winControl.zoomFactor).toEqual(0.25);
    });

    it("should use the onZoomChanged event handler", function (done) {
        var rawData = [];
        for (var i = 0; i < testDataSourceLength; i++) {
            rawData.push({ title: "Item" + i });
        }
        function simpleGroupingFunction(data) {
            return data.title;
        }
        var zoomedInSource = new WinJS.Binding.List(rawData).createGrouped(simpleGroupingFunction, simpleGroupingFunction);
        var controlModelAdditionalProperties = {
            zoomedInSource: zoomedInSource,
            zoomedOutSource: zoomedInSource.groups
        };
        testEventChangesProperty({
            control: "SemanticZoom",
            afterChangeEvent: "zoomchanged",
            property: "zoomedOut",
            initialValue: false,
            finalValue: true,
            childrenMarkup: "<div data-bind='winListView: { itemDataSource: zoomedInSource.dataSource, groupDataSource: zoomedInSource.groups.dataSource } '></div>" +
                                              "<div data-bind='winListView: { itemDataSource: zoomedOutSource.dataSource } '></div>",
            additionalControlModelProperties: controlModelAdditionalProperties
        }).then(function () {
            done();
        });
    });

});