/***********************************************************/

var gulp = require( "gulp" );
var ts = require( "gulp-typescript" );
var watchify = require( "watchify" );
var tsProject = ts.createProject( "tsconfig.json" );
var uglify = require( 'gulp-uglify' );

/***********************************************************/

gulp.task( "compileTs", function () {

  return tsProject.src()
    .pipe( tsProject() )
    .js
    .pipe( uglify() )
    .pipe( gulp.dest( "dist" ) );

} );

/***********************************************************/

gulp.task( "compileTests", function () {

  return gulp.src( "test/**/*.ts" )
    .pipe( ts( {
      noImplicitAny: true,
      outDir: "test"
    } ) )
    .js.pipe( gulp.dest( "test" ) );

} );

/***********************************************************/

gulp.task( "default", [ "compileTs" ] );
//gulp.task( "default" , [ "compileTs" , "compileTests" ] );

/***********************************************************/
