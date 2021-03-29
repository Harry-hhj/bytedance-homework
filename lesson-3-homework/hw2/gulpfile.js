const gulp = require('gulp');
let bs = require('browser-sync').create();

// define a task initializing browser-sync
gulp.task('bs', function () {
    bs.init({
        'server': {
            'baseDir': './',
            'index': 'index.html'
        }
    });
});

// define a default task
gulp.task('default', gulp.series('bs'));