var path = require("path")

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var debug = require("gulp-debug");
var watch = require("gulp-watch");

gulp.task("default", ["prepareWatchers"])


gulp.task("prepareWatchers", function(){
  console.log('prepare watcher');
  gulp.watch(["stylus/**/*.styl"], ["stylus"]);
})


// STYLUS
gulp.task("stylus", function(){compileStylus(false)});
gulp.task("watchStylus", function(){compileStylus(true)});

function compileStylus(watchFiles){
  var stream = gulp.src(["./stylus/**/*.styl", "!./stylus/questions/**"]);

  if(watchFiles){
    stream = stream.pipe(watch("./style/**/*.styl"));
  }

  stream.pipe(stylus())
    .pipe(debug({title:"Compiling: "}))
    .pipe(gulp.dest("./public/stylesheets"));
}