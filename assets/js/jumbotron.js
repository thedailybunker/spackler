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
      this.ads = [
        { name: 'nfl_sideline', weight: .25 },
        { name: 'nfl_draft', weight: .25 },
        { name: 'fan_vegas', weight: .25 },
        { name: 'fan_spinners', weight: .25 }
      ].map( function( ad ) {
        return Array.apply( ad, Array( Math.floor( ad.weight ) ) );
      });
      this.ad = []
        .concat
        .apply( [], this.ads )
          [ Math.floor( Math.random() * this.ads.length ) ];

      console.log( this.ads, this.ad );
      this._render( this.ad );
    },

    _render: function( ad ) {
      this.$el.append( this.[ '_' + ad.name ] );
    },

    _nfl_sideline: function() {
      return ''
        + '<a target="_blank" href="http://shareasale.com/r.cfm?b=1009206&amp;u=1337727&amp;m=52555&amp;urllink=&amp;afftrack=">'
          + '<img src="http://static.shareasale.com/image/52555/5156_On_The_Move_com_Ads_600x500.jpg" border="0" />'
        + '</a>';
    },

    _nfl_draft: function() {
      return ''
        + '<a target="_blank" href="http://shareasale.com/r.cfm?b=612641&amp;u=1337727&amp;m=52555&amp;urllink=&amp;afftrack=">'
          + '<img src="http://static.shareasale.com/image/52555/138361.jpg" border="0" alt="Gear up for the 2017 NFL Draft with Draft Caps from New Era" />'
        + '</a>';
    },

    _fan_vegas: function() {
      return ''
        + '<a target="_blank" href="http://shareasale.com/r.cfm?b=1018843&amp;u=1337727&amp;m=7124&amp;urllink=&amp;afftrack=">'
          + '<img src="http://static.shareasale.com/image/7124/Golden_Knights_728x90_00.jpg" border="0" alt="Welcome to the NHL Las Vegas Golden Knights! Get your Gear at Fanatics!" />'
        + '</a>';
    },

    _fan_spinners: function() {
      return ''
        + '<a target="_blank" href="http://shareasale.com/r.cfm?b=1032961&amp;u=1337727&amp;m=7124&amp;urllink=&amp;afftrack=">'
          + '<img src="http://static.shareasale.com/image/7124/team_spinners_728x90.jpg" border="0" alt="Shop for Team Logo Spinners at Fanatics.com" />'
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
