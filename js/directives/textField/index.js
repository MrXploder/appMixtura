angularApp.directive('textField', function(){
	return {
		scope:{
			title: "=",
			target: "=",
			prefix: "=",
			icon: "=?",
			disabled: "=",
		},
		controller: 'textField',
		templateUrl: '/app/js/directives/textField/template.html',
	}
});