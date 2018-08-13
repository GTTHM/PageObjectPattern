const gulp = require('gulp');
const run = require('gulp-run-command').default;

const args = require('yargs').argv;
process.env.BROWSER = (process.env.BROWSER || args.browserName || "firefox").toLowerCase();

gulp.task('executeTest', run("node jasmineExecution.js"));

gulp.task('install', run("npm install"));

gulp.task('installAndExecuteTest', gulp.series('install', 'executeTest'));