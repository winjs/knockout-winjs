// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("ListView Layout control directive tests", function () {
    var topNode,
        testDataSourceLength = 5;

    sharedSetup();
    enableFastAnimations();

    it("should initialize the ListLayout", function (done) {
        var compiledControl;
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, " +
                                          "layout: { type: WinJS.UI.ListLayout } } '>" +
                                      "</div>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout instanceof WinJS.UI.ListLayout).toBeTruthy();
            done();
        });

    });

    it("should use the orientation attribute on the ListLayout element", function (done) {
        var compiledControl;
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, " +
                                          "layout: { type: WinJS.UI.ListLayout, orientation: \"horizontal\" } } '>" +
                                      "</div>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("horizontal");
            done();
        });
    });

    it("should use the groupHeaderPosition attribute on the ListLayout element", function (done) {
        var compiledControl;
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                          "layout: { type: WinJS.UI.ListLayout, groupHeaderPosition: \"left\" } } '>" +
                                      "</div>" +
                                      "<script id=\"template\" type=\"text/html\">" +
                                          "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.groupHeaderPosition).toEqual("left");
            done();
        });
    });

    it("should initialize GridLayout", function (done) {
        var compiledControl;
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                          "layout: { type: WinJS.UI.GridLayout } } '>" +
                                      "</div>" +
                                      "<script id=\"template\" type=\"text/html\">" +
                                          "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout instanceof WinJS.UI.GridLayout).toBeTruthy();
            done();
        });
    });

    it("should use the orientation attribute on the GridLayout element", function (done) {
        var compiledControl;

        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                          "layout: { type: WinJS.UI.GridLayout, orientation: \"horizontal\" } } '>" +
                                      "</div>" +
                                      "<script id=\"template\" type=\"text/html\">" +
                                          "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("horizontal");
            done();
        });

    });

    it("should switch layout declared as type", function (done) {
        var compiledControl;
        var horizontalLayout = new WinJS.UI.GridLayout();
        horizontalLayout.orientation = "horizontal";
        var verticalLayout = new WinJS.UI.GridLayout();
        verticalLayout.orientation = "vertical";
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.listViewLayout = ko.observable(horizontalLayout);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                          "layout: listViewLayout }'>" +
                                      "</div>" +
                                      "<script id=\"template\" type=\"text/html\">" +
                                          "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("horizontal");
            model.listViewLayout(verticalLayout);
            return waitForComplete(compiledControl.winControl);
        }).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("vertical");
            done();
        });
    });

    it("should switch layout declared as object", function (done) {
        var firstLoadingCompleteFired = false;
        var compiledControl;
        var horizontalLayout = { type: WinJS.UI.GridLayout, orientation: "horizontal" }; 
        var verticalLayout = { type: WinJS.UI.GridLayout, orientation: "vertical" };
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
            this.listViewLayout = ko.observable(horizontalLayout);
        };
        var model = new ControlModel();

        compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                          "layout: listViewLayout } '>" +
                                      "</div>" +
                                      "<script id=\"template\" type=\"text/html\">" +
                                          "<span data-bind='text: title' >" +
                                      "</script>",
                                      model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("horizontal");
            model.listViewLayout(verticalLayout);
            return waitForComplete(compiledControl.winControl);
        }).then(function () {
            expect(compiledControl.winControl.layout.orientation).toEqual("vertical");
            done();
        });
    });

    it("should use the groupHeaderPosition attribute on the GridLayout element", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                              "layout: { type: WinJS.UI.GridLayout, groupHeaderPosition: \"left\" } } '></div>" +
                                          "<script id=\"template\" type=\"text/html\">" +
                                              "<span data-bind='text: title' >" +
                                          "</script>",
                                          model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.groupHeaderPosition).toEqual("left");
            done();
        });
    });

    it("should use the maximumRowsOrColumns attribute on the GridLayout element", function (done) {
        var ControlModel = function () {
            this.testDataSource = generateTestKOArray(testDataSourceLength);
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winListView: { itemDataSource: testDataSource, itemTemplate: \"template\", " +
                                             "layout: { type: WinJS.UI.GridLayout, maximumRowsOrColumns: 3 } } '>" +
                                         "</div>" +
                                         "<script id=\"template\" type=\"text/html\">" +
                                             "<span data-bind='text: title' >" +
                                         "</script>",
                                         model);
        waitForComplete(compiledControl.winControl).then(function () {
            expect(compiledControl.winControl.layout.maximumRowsOrColumns).toEqual(3);
            done();
        });
    });
});