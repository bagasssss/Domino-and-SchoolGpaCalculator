(function() {
	'use strict'

	angular.module("domino.directives", ["domino.services"])
		.directive("dominoDirective", function(dominoServices){
			return {
				restrict: "E",
				templateUrl: "Domino/Views/dominoTemplate.html",
				controller: function() {
					var vm=this;

					//size range attributes
					vm.range = 50;
					vm.minRange = 30;
					vm.maxRange = 70;

					/*ROTATE attributes*/
					vm.rotation;
					vm.rotateDegree = 0;
					vm.rotateSpeed = 2000;
					vm.minRotateSpeed = 10;
					vm.maxRotateSpeed = 5000;
					

					vm.dominos = [];
					vm.domino = [[[0,0,1],[0,1,0],[1,0,0]],[[0,0,1],[0,1,0],[1,0,0]]];

					activate();

					function activate() {
						getDataFromFile();
						
					};

					function getDataFromFile() {
						dominoServices.getData().success(function(data) {
							vm.dominos = data;
						});
					};

					vm.newDomino = function() {
						vm.domino = [];
					};	

					vm.chooseParts = function(part) {
						if(vm.domino.length<2) {
							vm.domino.push(vm.dominos[part]);
						}
					};

				},
				controllerAs: "dc"
			}

		})

})();