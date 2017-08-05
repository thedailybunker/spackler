( function( $ ) {
  'use strict';

  var Post = function( post ) {
    var prop;

    for ( prop in post )
      this[ prop ] = post[ prop ];
  };

  Post.prototype = {};

  Post.prototype.getHTML = function() {
    var template = [ 'one', 'two' ][ Math.floor( Math.random() * 2 ) ];

    return $( '<li>' )
      .addClass( template )
      .append( this[ '_template_' + template ]() )
      .click( this._onClick.bind( this ) );
  };

  Post.prototype._template_one = function() {
    return ''
      + '<div style="background-image:url(' + this.image + ')">'
        + '<div class="title">'
          + '<span>featured</span>'
          + '<h3>' + this.title + '</h3>'
        + '</div>'
      + '</div>';
  };

  Post.prototype._template_two = function() {
    return ''
      + '<div class="image" style="background-image:url(' + this.image + ')"></div>'
      + '<div class="title">'
        + '<span>featured</span>'
        + '<h3>' + this.title + '</h3>'
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

  var ad = {
    init: function() {
      this.$el = $( '.jumbotron .ad' );

      this._render();
    },

    _render: function() {
      this.$el.append( this._template() );
    },

    _template: function() {
      return ''
        + '<a target="_blank" href="http://shareasale.com/r.cfm?b=1018843&amp;u=1337727&amp;m=7124&amp;urllink=&amp;afftrack=">'
          + '<img src="http://static.shareasale.com/image/7124/Golden_Knights_728x90_00.jpg" border="0" alt="Welcome to the NHL Las Vegas Golden Knights! Get your Gear at Fanatics!" />'
        + '</a>';
    }
  };

  var app = {
    init: function() {
      console.log( 'jumbotron' );
      featured.init();
      ad.init();
    }
  };

  $( function() {
    app.init();
  });
})( jQuery );
