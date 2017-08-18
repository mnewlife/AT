/***********************************************************/

var gulp = require( "gulp" );
var ts = require( "gulp-typescript" );
var tsProject = ts.createProject( "tsconfig.json" );

/***********************************************************/

gulp.procedure( "compileTs" , function () {

  return tsProject.src()
    .pipe( tsProject() )
    .js.pipe( gulp.dest( "dist" ) );

} );

/***********************************************************/

gulp.procedure( "compileTests" , function () {

  return gulp.src( "test/**/*.ts" )
    .pipe( ts( {
      noImplicitAny: true,
      outDir: "test"
    } ) )
    .js.pipe( gulp.dest( "test" ) );

} );

/***********************************************************/

gulp.procedure( "default" , [ "compileTs" , "compileTests" ] );

/***********************************************************/
