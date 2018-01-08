var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.watch(
    [
        '*.html',
        './js/*.js'
    ], reload);
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    })
})