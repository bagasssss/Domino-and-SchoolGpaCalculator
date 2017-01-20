(function(){
	'use strict';

	angular.module("gpa.controllers", ['gpa.services'])
		.controller("gpaController", function(gpaService){
			var vm = this;
			vm.grades = gpaService.grades;
			var idForNewGrade =3;
			var idForNewStudents = 5;
			vm.averageGPA;

			activate();

			function activate() {
				calculateAvgGpa();
			};
			

			function calculateAvgGpa() {
				var numbersOfStudents = 0;
				var sumGpa = 0;
				for(var i=0; i<vm.grades.length; i++){
					for(var s=0; s<vm.grades[i].students.length; s++) {
						numbersOfStudents++;
						sumGpa+=vm.grades[i].students[s].gpa;
					};
				};
				vm.averageGPA = Math.round((sumGpa/numbersOfStudents) * 100) / 100;
			};

			vm.addGrade = function() {
				var newGrade = {
					grade: "new Grade",
					students: [],
					id: idForNewGrade,
					show: false
				}
				vm.grades.push(newGrade);
				idForNewGrade++;
				console.log("grade added");
			};

			vm.deleteGrade = function(idd) {
				if(confirm("are you sure?")){
					for(var i=0; i<vm.grades.length; i++) {
						if(vm.grades[i].id === idd) {

							vm.grades.splice(i, 1);
							console.log("grade deleted..")
							break;
						};
					};
				};
			};

			vm.showGrid = function(gradeId) {
				for(var i=0; i<vm.grades.length; i++) {
						if(vm.grades[i].id === gradeId) {

							vm.grades[i].show = true;
							console.log("show changed..")
						} else {
							vm.grades[i].show = false;
						};
					};
			};

			vm.deleteStudent = function(id, name) {
				for(var i=0; i<vm.grades.length; i++){
					if(vm.grades[i].id === id){
						for(var s=0; s<vm.grades[i].students.length; s++) {
							if(vm.grades[i].students[s].name === name) {
								vm.grades[i].students.splice(s,1);
								console.log("student removed");
								break;
							};

						};
						break;
					};

				};
				calculateAvgGpa();
			};

			vm.addStudent = function(id, newStudent) {
				for(var i=0; i<vm.grades.length; i++) {
					if(vm.grades[i].id === id) {
						var studentNew = {
							name: newStudent.name,
							gpa: newStudent.gpa,
							id_s: idForNewStudents
						}
						vm.grades[i].students.push(studentNew);
						studentNew++;
						break;
					}
				};
				calculateAvgGpa();
			};
		})

})();