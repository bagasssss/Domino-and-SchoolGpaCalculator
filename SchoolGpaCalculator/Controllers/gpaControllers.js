(function(){
	'use strict';

	angular.module("gpa.controllers", ['ui.grid', 'gpa.services'])
		.controller("gpaController", function(gpaService){

			var vm = this;

			vm.grades;
			vm.averageGPA;
			var idForNewGrade =3;
			var idForNewStudents = 5;
			var dataToShow = []; //list of students for each grades
			vm.showForm = false;
			vm.currentGrade;


			activate();

			function activate() {
				getDataFromFile()
				
			};

			function getDataFromFile() {
				gpaService.getData().success(function(data) {
					vm.grades = data;
					calculateAvgGpa();
					addStudentsToGradeArray(0);
					console.log(dataToShow);
					vm.gridOptions.data = dataToShow;
					
				})
			};


			vm.gridOptions = {
		        columnDefs: [{
		            field: 'name',
		            displayName: 'Name' },
		        {   field: 'gpa',
		            displayName: 'GPA' }, 
		        {
		            field: 'Delete student',
		            cellTemplate: '<button id="editBtn" type="button" class="btn-small " ng-click="grid.appScope.deleteRow(row)" >X</button> '
		        }]
	    	};
	    	
	    	// because of ControllerAs syntax
	    	vm.gridOptions.appScopeProvider = vm;

	    	vm.deleteRow = function(row) {
	    		deleteStudentFromGrade(vm.currentGrade, row.entity.name);
	    		removeStudentFromGradeArray(row.entity.name);
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
					dataToShow = [];
					vm.gridOptions.data = dataToShow;
					if(vm.grades.length < 1) {
						vm.showForm = false;
					}
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
					show: false,
					
				}
				vm.grades.push(newGrade);
				idForNewGrade++;
			};

			vm.deleteGrade = function(idd) {
				if(confirm("are you sure?")){
					for(var i=0; i<vm.grades.length; i++) {
						if(vm.grades[i].id === idd) {
							vm.grades.splice(i, 1);
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
						} else {
							vm.grades[i].show = false;
							
						};
					};
					addStudentsToGradeArray(gradeId);
					vm.showForm =true;
					vm.currentGrade = gradeId;
			};
			// add list of students to dataToShow and ui-grid data
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
						break;
						
					};
				};
				
				dataToShow = st;
				console.log(dataToShow)
				vm.gridOptions.data = dataToShow;
			};

			//remove student from dataToShow and ui-grade data
			function removeStudentFromGradeArray(name) {
				for(var i=0; i<dataToShow.length; i++) {
					if(dataToShow[i].name === name) {
						dataToShow.splice(i,1);
						break;
					}
				}
				vm.gridOptions.data = dataToShow;
			};

			// remove student from vm.grade
			function deleteStudentFromGrade(id, name) {
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

			vm.addStudent = function(newStudent) {
				for(var i=0; i<vm.grades.length; i++) {
					if(vm.grades[i].id === vm.currentGrade) {
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

				dataToShow.push({name: newStudent.name, gpa: newStudent.gpa});
				vm.gridOptions.dataToShow = dataToShow;
				calculateAvgGpa();

			};


    })


})();