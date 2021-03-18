const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
let bs = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');

var path = {
    'html': './templates/**/',
    'css': './src/css/',
    'js': './src/js/',
    'images': './src/images/',
    'css_dist': './dist/css/',
    'js_dist': './dist/js/',
    'images_dist': './dist/images/'
}

// define a task processing html files
gulp.task('html', function () {
    return gulp.src(path.html + '*.html')
        .pipe(bs.stream())
})

// define a task processing css files
gulp.task('css', function () {
    return gulp.src(path.css + '*.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
});

// define a task processing js files
gulp.task('js', function () {
    return gulp.src(path.js + '*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on("error", util.log))
        .pipe(rename({'suffix': '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
});

// define a task processing images files
gulp.task('images', function () {
    return gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        // .pipe(bs.stream())
});

// define a task watching file changes
gulp.task('watch', function () {
    gulp.watch(path.html + '*.html', gulp.series('html'));
    gulp.watch(path.css + '*.scss', gulp.series('css'));
    gulp.watch(path.js + '*.js', gulp.series('js'));
    gulp.watch(path.images + '*.*', gulp.series('images'));
});

// define a task initializing browser-sync
gulp.task('bs', function () {
    bs.init({
        'server': {
            'baseDir': './',
            'index': 'templates/index.html'
        }
    });
});

// define a default task
gulp.task('default', gulp.parallel('bs', 'watch'));