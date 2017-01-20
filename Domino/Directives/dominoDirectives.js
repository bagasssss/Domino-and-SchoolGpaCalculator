(function() {
	'use strict'

	angular.module("domino.directives", [])
		.directive("dominoDirective", function(){
			return {
				restrict: "E",
				templateUrl: "Domino/Views/dominoTemplate.html",
				controller: function() {
					var vm=this;
					vm.domino = [[[0,0,1],[0,1,0],[1,0,0]],[[0,0,1],[0,1,0],[1,0,0]]];
					vm.newDomino = function() {
						vm.domino = [];
						console.log("domino empty: "+ vm.domino);
					};

					vm.chooseParts = function(part) {
						if(vm.domino.length<2){
							switch(part) {
								case 0:
									var empty = [[0,0,0],[0,0,0],[0,0,0]];
									vm.domino.push(empty);
									console.log(vm.domino);
									break;
								case 1:
									var one = [[0,0,0],[0,1,0],[0,0,0]];
									vm.domino.push(one);
									console.log(vm.domino);
									break;
								case 2:
									var two = [[0,0,1],[0,0,0],[1,0,0]];
									vm.domino.push(two);
									console.log(vm.domino);
									break;
								case 3:
									var three = [[0,0,1],[0,1,0],[1,0,0]];
									vm.domino.push(three);
									console.log(vm.domino);
									break;
								case 4:
									var four = [[1,0,1],[0,0,0],[1,0,1]];
									vm.domino.push(four);
									console.log(vm.domino);
									break;
								case 5:
									var five = [[1,0,1],[0,1,0],[1,0,1]];
									vm.domino.push(five);
									console.log(vm.domino);
									break;
								case 6:
									var six = [[1,0,1],[1,0,1],[1,0,1]];
									vm.domino.push(six);
									console.log(vm.domino);
									break;
								default:
									console.log("domino changed");
								}
							}
						};

					vm.rotateLeft = function () {


						};

					vm.rotateRight = function() {

						};
					vm.ranger = document.getElementById('range');
					vm.fulldomino = document.getElementById('full-domino');
					var width = vm.fulldomino.width;
					var height = vm.fulldomino.height;
/*					vm.ranger.onchange = function() {
						vm.fulldomino.width = width*(vm.ranger.value / 100);
						vm.fulldomino.height = height*(vm.ranger.value /100);

						};*/
/*					vm.sizeChanger = function(size) {
						var fulldomino = document.getElementById('full-domino');
						var width = fulldomino.width;
						var height = fulldomino.height;
						fulldomino.width = width*(size / 100);
						fulldomino.height = height*(size /100);
					};*/

					vm.speedChanger = function(speed) {

						};

				},
				controllerAs: "dc"
			}

		})

})();