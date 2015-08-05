// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("AutoSuggestBox control directive tests", function () {
    
    sharedSetup();

    it("should initialize a simple autosuggestbox", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox' ></div>");

        expect(compiledControl.winControl).toBeDefined();
        expect(compiledControl.winControl instanceof WinJS.UI.AutoSuggestBox);
        expect(compiledControl.className).toContain("win-autosuggestbox");
    });

    it("should use the chooseSuggestionOnEnter attribute", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { chooseSuggestionOnEnter: true }' ></div>");

        expect(compiledControl.winControl.chooseSuggestionOnEnter).toBeTruthy();
    });

    it("should use the placeholderText attribute", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { placeholderText: \"Some Placeholder Text\" } '></div>");

        expect(compiledControl.winControl.placeholderText).toEqual("Some Placeholder Text");
    });

    it("should use the queryText attribute", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { queryText: \"Some Query Text\" } '></div>");

        expect(compiledControl.winControl.queryText).toEqual("Some Query Text");
    });

    // TODO: Enable after AutoSuggestBox does not fire onquerychanged when queryText is programmatically updated #1293  is fixed
    xit("should bind the queryText attribute to observable", function () {
        var ControlModel = function () {
            this.textObservable = ko.observable("Query1");
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { queryText: textObservable } '></div>", model);

        expect(compiledControl.winControl.queryText).toEqual("Query1");
        compiledControl.winControl.queryText = "Query2";
        expect(model.textObservable()).toEqual("Query2");
    });

    it("should use the searchHistoryContext attribute", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { searchHistoryContext: \"searchContext\" } '></div>");

        expect(compiledControl.winControl.searchHistoryContext).toEqual("searchContext");
    });

    it("should use the searchHistoryDisabled attribute", function () {
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { searchHistoryDisabled: true } '></div>");

        expect(compiledControl.winControl.searchHistoryDisabled).toBeTruthy();
    });

    // TODO: Enable after AutoSuggestBox does not fire onquerychanged when queryText is programmatically updated #1293  is fixed
    xit("should use the querychanged event", function (done) {
        var ControlModel = function () {
            this.textObservable = "originalQuery";
            this.changedQuery = function () {
                expect(this.textObservable()).toEqual("changedQuery");
                done();
            }
        };
        var model = new ControlModel();
        var compiledControl = initControl("<div data-bind='winAutoSuggestBox: { queryText: textObservable } , event: { querychanged: changedQuery } '> <\div>", model);

        compiledControl.winControl.queryText = "changedQuery";
    });

});