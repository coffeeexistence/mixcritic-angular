function MixController(mix){
	var ctrl = this;
	ctrl.mix = mix.data;
  //debugger;
}

angular
	.module('app')
	.controller('MixController', MixController);
