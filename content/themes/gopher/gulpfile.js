var gulp = require( 'gulp' );
var babel = require( 'gulp-babel' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );

var config = {
  paths: {
    js: './assets/js',
    sass: './assets/sass',
    dist: './assets/dist'
  }
};

// babel
gulp.task( 'babel', function () {
  return gulp.src([
    config.paths.js + '/**/*.jsx',
    config.paths.js + '/**/*.js'
  ]).pipe( babel() )
    .pipe( gulp.dest( config.paths.dist + '/js' ) );
});

// browserify
gulp.task( 'browserify', [ 'babel' ], function() {
  return browserify([
    config.paths.dist + '/js/index.js'
  ]).bundle()
    .pipe( source( 'app.js' ) )
    .pipe( gulp.dest( config.paths.dist + '/js' ) );
});

// concat
// gulp.task( 'concat', [ 'browserify' ], function() {
//   return gulp.src([
//     config.paths.dist + '/js/_app.js'
//   ]).pipe( concat( 'app.js' ) )
//     .pipe( gulp.dest( config.paths.dist + '/js' ) );
// });

// uglify
gulp.task( 'uglify', [ 'browserify' ], function() {
  return gulp.src( config.paths.dist + '/js/app.js' )
    .pipe( uglify() )
    .pipe( rename( { extname: '.min.js' } ) )
    .pipe( gulp.dest( config.paths.dist + '/js' ) );
});

// sass
gulp.task( 'sass', function() {
  return gulp.src( config.paths.sass + '/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( config.paths.dist + '/css' ) );
});

// build
gulp.task( 'build',
  [
    'babel',
    'browserify',
    'uglify',
    'sass'
  ]
);
