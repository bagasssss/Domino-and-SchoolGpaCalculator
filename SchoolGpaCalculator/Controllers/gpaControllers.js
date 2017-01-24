(function(){
	'use strict';

	angular.module("gpa.controllers", ['ui.grid', 'gpa.services'])
		.controller("gpaController", function(gpaService){

			var vm = this;

			vm.grades;
			vm.averageGPA;
			var idForNewGrade =3;
			var idForNewStudents = 5;
			var dataToShow = [];


			activate();

			function activate() {
				getDataFromFile()
				
			};

			function getDataFromFile() {
				gpaService.getData().success(function(data) {
					vm.grades = data;
					calculateAvgGpa();
					//addStudentsToGradeArray(0);

					var m=[];
					for(var t=0;t<data.length;t++) {
						for(var r=0; r<data[t].students.length; r++) {
							m.push(data[t].students[r]);
						}
					}
					dataToShow = m;
					
				})
			};
			

			function calculateAvgGpa() {
				var avgp;
				var numbersOfStudents = 0;
				var sumGpa = 0;
				for(var i=0; i<vm.grades.length; i++){
					for(var s=0; s<vm.grades[i].students.length; s++) {
						numbersOfStudents++;
						sumGpa+=vm.grades[i].students[s].gpa;
					};
				};
				avgp = Math.round((sumGpa/numbersOfStudents) * 100) / 100;
				if(isNaN(avgp)) {
					vm.averageGPA = "no students";
				} else {
					vm.averageGPA = avgp;
				}
			};


			/* GRADES*/

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
					calculateAvgGpa();
				};
			};

			//
			//
			//


			vm.showGrid = function(gradeId) {
				for(var i=0; i<vm.grades.length; i++) {
						if(vm.grades[i].id === gradeId) {

							vm.grades[i].show = true;
							console.log("show changed..")
						} else {
							vm.grades[i].show = false;
						};
					};
					addStudentsToGradeArray(gradeId);
			};

			function addStudentsToGradeArray(gradeId) {
				var st = [];
				for(var i=0; i<vm.grades.length; i++) {
					if(vm.grades[i].id === gradeId) {
						for(var s=0; s<vm.grades[i].students.length; s++) {
							var student = {
								name: vm.grades[i].students[s].name,
								gpa: vm.grades[i].students[s].gpa,
							};

							st.push(student);
						};
						/*st.push(vm.grades[i].students);
						break;*/
						
					};
				};
				
				dataToShow = st;
				console.log(dataToShow)

			}

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

			vm.gridOptions = {};
			vm.gridOptions.columnDefs = [
				{field: 'name'},
				{field: 'gpa'},
				{name: ' ', celltemplate: '<button class="btn primary" ng-click="ctrl.deleteStudent()">Delete</button>'}
			];
/*			vm.gridOptions.data = [
				{"name": "Vasya Pupkin", "gpa": 4.8, "id_s": 1}
			];
*/
			vm.gridOptions.data = dataToShow;

		})

/*		.controller("studentsCtrl", function(gpaService){

			var vm=this;

			vm.grades;
			vm.students;
			vm.averageGPA;

			var idForNewStudent = 5;

			activate();

			function activate() {
				getDataFromFile();
			};

			function getDataFromFile() {
				gpaService.getData().success(function(data) {
					vm.students = data;
					calculateAvgGpa();
					getUniqueGrades();
				})
			};

			function getUniqueGrades() {
				var uGrades = [];
				for(var i=0; i<vm.students.length; i++) {
					for(var g=0; g<uGrades.length; g++) {
						if(vm.students[i].grade !=== uGrades[g]) {
							uGrades.push(vm.students[i].grade);
						}
					}
				}
				vm.gardes = uGrades;
			};

			function calculateAvgGpa() {
				var numbersOfStudents = 0;
				var sumGpa = 0;
				for(var i=0; i<vm.students; i++) {
					numbersOfStudents++;
					sumGpa+=vm.students[i].gpa;
				}
				vm.averageGPA = Math.round((sumGpa/numbersOfStudents) * 100) / 100;
			};






			

		})*/

})();