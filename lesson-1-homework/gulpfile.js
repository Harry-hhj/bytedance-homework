const gulp = require('gulp');
let bs = require('browser-sync').create()

gulp.task("html", function () {
    return gulp.src('./*.html')
        .pipe(bs.stream())
});

gulp.task("watch", function () {
    gulp.watch('./*.html', gulp.series('html'))
})

gulp.task("bs", function () {
    bs.init({
        'server': {
            'baseDir': './',
            'index': 'index.html'
        },
        'port': 3000
    })
});

gulp.task("server", gulp.parallel('bs', 'watch'));