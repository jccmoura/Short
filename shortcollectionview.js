var ShortCollectionView = Backbone.View.extend({
	el: 'tbody',
	
	initialize: function(){
		this.collection.on('add', this.addOne, this);
	},
	reset: function(){
		this.collection.on('remove', this.remove, this)
	},
	addAll: function(){
		this.collection.forEach(this.addOne, this);
	},
	addOne: function(shortmodel){
		var viewshort = new ShortView({ model: shortmodel });
		//this.$el.append(viewshort.render().el);
		document.body.appendChild(viewshort.render().el);
	},
	remove: function(){
		this.$el.empty();
	},
	render: function(){
		return this;
	}
});

