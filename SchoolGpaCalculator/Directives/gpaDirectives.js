(function(){
	'use strict'

	angular.module("gpa.directives", [])
		.directive("gpaDirective", function(){
			return {
				restrict: "E",
				templateUrl: "SchoolGpaCalculator/Views/gpaTemplate.html"
			}

		})
})();