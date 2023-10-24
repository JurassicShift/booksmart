
import pkg from 'gulp';
const {src, dest, watch, series } = pkg;
import plumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import * as sass from 'sass'
const compiledSass = gulpSass(sass);

function buildStyles() {
    return src('src/styles/sass/*.scss')
        .pipe(plumber())
        .pipe(compiledSass())
        .pipe(dest('src/styles/css'))
}

function watchTask() {
    watch(['src/styles/sass/*.scss'], buildStyles)
}

export default series(buildStyles, watchTask);