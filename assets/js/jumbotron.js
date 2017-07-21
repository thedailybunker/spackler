( function( $ ) {
  'use strict';

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
