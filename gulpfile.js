/***********************************************************/

var gulp = require( "gulp" );
var ts = require( "gulp-typescript" );
var tsProject = ts.createProject( "tsconfig.json" );

/***********************************************************/

gulp.task( "compileTs" , function () {

  return tsProject.src()
    .pipe( tsProject() )
    .js.pipe( gulp.dest( "dist" ) );

} );

/***********************************************************/

gulp.task( "compileTests" , function () {

  return gulp.src( "test/**/*.ts" )
    .pipe( ts( {
      noImplicitAny: true,
      outDir: "test"
    } ) )
    .js.pipe( gulp.dest( "test" ) );

} );

/***********************************************************/

gulp.task( "default" , [ "compileTs" ] );
//gulp.task( "default" , [ "compileTs" , "compileTests" ] );

/***********************************************************/
