var ShortView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#tempShort').html()),

	initialize: function(){
		this.model.on('change', this.render, this);
	},

	render: function(){
		var url  = this.model.get('url');
		var count = this.model.get('count');
		
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});




