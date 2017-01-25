(function(){
	angular.module("domino.services", [])
		.factory("dominoServices", function($http){
			var dataPath = "Domino/dominoParts.json";
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