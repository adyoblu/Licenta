//gulp e un task runner si nodemon este un modul pentru a rula fara a iesii din program
var gulp = require("gulp");
    nodemon = require('gulp-nodemon'),
    open = require('gulp-open');
gulp.task('testTask', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    }).on('restart', function(){
        console.log('Restart...');
    });
});
gulp.task('open', function(){
    var options = {
        app: 'chrome'
    };
    gulp.src(__dirname + '/views/index.html')
    .pipe(open(options));
});

gulp.task('default', gulp.parallel('testTask','open')) ;