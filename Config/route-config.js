(function(){
	angular.module('config', ["ui.router"])
		.config( ['$urlRouterProvider', '$stateProvider',
			function($urlRouterProvider, $stateProvider){

			//$urlRouterProvider.otherwise('/domino');

			$stateProvider
				.state('domino',{
					url: '/domino',
					templateUrl: "/Domino/domino.html"
				})
				.state('schoolGpaCalculator', {
					url: '/school_GPA_Calculator',
					templateUrl: "/SchoolGpaCalculator/schoolGpaCalculator.html"
				});



		}])
})();