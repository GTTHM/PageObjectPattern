module.exports = function(grunt) {
    grunt.initConfig({
        run: {
            testExecute: {
                args: [
                    'jasmineExecution.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-run');

    process.env.BROWSER = grunt.option('browserName') || "firefox";

    grunt.registerTask('installAndExecuteTest', async () => {
        await grunt.task.run(['npm-install']);
        await grunt.task.run(['run:testExecute']);
    });

    grunt.registerTask('executeTest', () => {
        grunt.task.run(['run:testExecute']);
    });
};