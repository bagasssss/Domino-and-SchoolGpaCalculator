(function(){
	'use strict'

	angular.module("gpa.directives", [])
		.directive("gpaDirective", function(){
			return {
				restrict: "E",
				/*scope: {},*/

				/*template: '<div ng-include="gpaTemplate.html"></div>'*/
				templateUrl: "SchoolGpaCalculator/Views/gpaTemplate.html"
			}

		})
})();