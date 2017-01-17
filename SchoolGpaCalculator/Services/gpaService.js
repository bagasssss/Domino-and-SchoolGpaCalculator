(function(){
	angular.module("gpa.services", [])
		.service("gpaService", function(){
			var grades = [
				{grade: "Grade 8A", students: [{name: "Vasya Pupkin", gpa: 4.8}, {name: "Petya Vasechkin", gpa: 3.2}], id: 1, show: false },
				{grade: "Grade 4G", students: [{name: "Sanya Pushkin", gpa: 3.7}, {name: "Ivan franko", gpa: 4.9}], id: 2, show: false }
			];

			this.grades = grades;
		})
})();