(function() {
	'use strict'

	angular.module("domino.directives", [])
		.directive("dominoDirective", function(){
			return {
				restrict: "E",
				templateUrl: "Domino/Views/dominoTemplate2.html",
				controller: function() {
					var vm=this;

					//size range attributes
					vm.range = 50;
					vm.minRange = 30;
					vm.maxRange = 70;

					/*ROTATE attributes*/
					vm.rotateDegree = 0;
					vm.rotateSpeed = 250;
					vm.minRotateSpeed = 10;
					vm.maxRotateSpeed = 5000;



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
						console.log("rotate left");
						vm.rotateDegree = vm.rotateDegree - 90;
						console.log(vm.rotateDegree);
						document.getElementById('full-domino').style.transform = "rotate("+vm.rotateDegree+"deg)";
						};

					vm.rotateRight = function() {
						console.log("rotate right");
						vm.rotateDegree = vm.rotateDegree + 90;
						document.getElementById('full-domino').style.transform = "rotate("+vm.rotateDegree+"deg)";
						};


					document.getElementById("speed").onchange = function() {
						document.getElementById('full-domino').style.transition = vm.rotateSpeed+"ms ease all";
					}


				},
				controllerAs: "dc"
			}

		})

})();