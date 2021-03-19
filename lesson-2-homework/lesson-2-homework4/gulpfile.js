const gulp = require("gulp")
const sass = require("gulp-sass")

gulp.task("css", function () {
    return gulp.src('./index.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest('./'))
})