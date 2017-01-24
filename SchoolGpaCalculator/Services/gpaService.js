(function(){
	angular.module("gpa.services", [])

		.factory("gpaService", function($http) {
			var dataPath = "SchoolGpaCalculator/data.json";
			return {
				getData: function() {
					return $http({
						method: "GET",
						url: dataPath
					}).success(function(response) {
						return response.data;
					})
				}

			}
		})
})();