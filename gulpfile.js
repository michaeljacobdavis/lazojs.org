var gulp = require('gulp');
var exec = require('child_process').exec;
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var path = require('path');
var sass = require('gulp-sass');
var lazo = path.normalize('.' + path.sep + 'node_modules' + path.sep + 'lazo' + path.sep + 'lazo.js');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!src/app/client/bower_components/**/**.*', '!.bowerrc'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('develop', function () {
    nodemon({ script: lazo, watch: ['src'], args: ['start', path.normalize(__dirname + path.sep + 'dist')] })
    .on('change', ['lint'])
    .on('restart', function () {
        console.log('restarted!');
    });
});

gulp.task('copy', function () {
    return gulp.src(['./src/**/*.*', '!./src/**/*.scss'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});