module.exports = function(grunt) {
    grunt.initConfig({
        run: {
            testExecute: {
                args: [
                    'jasmineExecution.js'
                ]
            }
        },
        env: {
            dev : {
                BROWSER : grunt.option('browserName') || "firefox"
            }
        }
    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('installAndExecuteTest', async () => {
        await grunt.task.run(['npm-install']);
        await grunt.task.run(['executeTest']);
    });

    grunt.registerTask('executeTest', () => {
        grunt.task.run(['env:dev', 'run:testExecute']);
    });
};