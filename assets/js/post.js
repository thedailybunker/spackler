( function( $ ) {
  'use strict';

  var ad = {
    init: function() {
      this.$el = $( '.post-ad .ad' );
      if ( this.$el.width() < 728 ) return false;
      this.ads = [
        { name: 'nfl_sideline', weight: .25 },
        { name: 'nfl_draft', weight: .25 },
        { name: 'fan_vegas', weight: .25 },
        { name: 'fan_spinners', weight: .25 }
      ].map( function( ad ) {
        return Array
          .apply( null, Array( Math.floor( ad.weight * 100 ) ) )
          .map( function() {
            return ad;
          });
      });
      this.ad = []
        .concat
        .apply( [], this.ads )[ Math.floor( Math.random() * 100 ) ];

      this._render( this.ad );
    },

    _render: function( ad ) {
      this.$el
        .append( this[ '_' + ad.name ] )
        .show();
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
      ad.init();
    }
  };

  $( function() {
    app.init();
  });
})( jQuery );
