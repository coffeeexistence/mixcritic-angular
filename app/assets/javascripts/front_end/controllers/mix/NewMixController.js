function NewMixController(ApiService){
	var ctrl = this;

	ctrl.show = true; //Fix later

	ctrl.fetchGenres = function() {
		ApiService.getGenres().then(function(res){
			ctrl.genres = res.data;
			ctrl.show = true;
		});
	};
  //debugger;
}

angular
	.module('app')
	.controller('NewMixController', NewMixController);
