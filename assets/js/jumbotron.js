( function( $ ) {
  'use strict';

  var Post = function( post ) {
    var prop;

    for ( prop in post )
      this[ prop ] = post[ prop ];
  };

  Post.prototype = {};

  Post.prototype.getHTML = function() {
    return $( '<li>' )
      .append( this._template() )
      .click( this._onClick.bind( this ) );
  };

  Post.prototype._template = function() {
    return ''
      + '<div style="background-image:url(' + this.image + ')">'
        + '<span>' + this.title + '</span>'
      + '</div>';
  };

  Post.prototype._onClick = function() {
    window.location = this.url;
  };

  var featured = {
    init: function() {
      this.$el = $( '.jumbotron .featured' );

      this._get();
    },

    _get: function() {
      $.get( ghost.url.api( 'posts', { limit: 3, filter: 'featured:true' } ) )
        .done( this._done.bind( this ) );
    },

    _done: function( data ) {
      console.log( 'data', data );
      data = data || {};
      var posts = this.posts = data.posts || [];

      posts
        .slice( 0, 3 )
        .forEach( function( post ) {
          post = new Post( post );
          this.$el.append( post.getHTML() );
        }.bind( this ) );
    }
  };

  var app = {
    init: function() {
      console.log( 'jumbotron' );
      featured.init();
    }
  };

  $( function() {
    app.init();
  });
})( jQuery );
