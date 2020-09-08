//gulp e un task runner si nodemon este un modul pentru a rula fara a iesii din program
var gulp = require("gulp");
    nodemon = require('gulp-nodemon'),

gulp.task('default', function(){
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