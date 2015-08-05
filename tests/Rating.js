// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";
describe("Rating control tests", function () {
    var testTimeout = 5000;

    sharedSetup();

    it("should initialize a simple Rating control", function () {
        var simpleRatingControl = initControl("<div data-bind='winRating'></div>");

        expect(simpleRatingControl.winControl).toBeDefined();
        expect(simpleRatingControl.winControl instanceof WinJS.UI.Rating);
        expect(simpleRatingControl.className).toContain("win-rating");

    });

    it("should use rating attributes", function () {
        var ratingControlWithRatingAttributes = initControl("<div data-bind='winRating: { maxRating: 10, userRating: 9, averageRating: 3 } '></div>");
        var winControl = ratingControlWithRatingAttributes.winControl;

        expect(winControl.maxRating).toEqual(10);
        expect(winControl.userRating).toEqual(9);
        expect(winControl.averageRating).toEqual(3);
    });

    it("should use the disabled attribute", function () {
        var disabledRatingControl = initControl("<div data-bind='winRating: { disabled: true } '></div>");

        expect(disabledRatingControl.winControl.disabled).toBeTruthy();
    });
});