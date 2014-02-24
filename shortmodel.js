var ShortModel = Backbone.Model.extend({
	defaults: {
		kurto: '',
		count: 1,
		url: ''
	},
	validate: function(attributes){
		if(!_.isNumber(attributes.count)){
			return 'Count nao numerico';
		}
	},
	initialize: function(){
		console.log('ShortModel inicializado');
		this.on('change', this.alterado, this);
	},
	alterado: function(){
		console.log('ShortModel alterado');
	}
});



