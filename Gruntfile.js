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

    grunt.registerTask('installAndExecuteTest', async () => {
        process.env.BROWSER = grunt.option('browserName') || "firefox";
        
        await grunt.task.run(['npm-install']);
        await grunt.task.run(['run:testExecute']);
    });

    grunt.registerTask('executeTest', () => {
        process.env.BROWSER = grunt.option('browserName') || "firefox";
        
        grunt.task.run(['run:testExecute']);
    });
};