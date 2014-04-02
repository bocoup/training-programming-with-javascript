var fs = require('fs');
module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      exercises: {
        files: ['*/app/*.js']
      }
    },
  });
  var exclude = ['.git', 'node_modules'];
  fs.readdirSync('./').forEach(function (dir) {
    if(fs.lstatSync(dir).isDirectory() && exclude.indexOf(dir) === -1) {
      var taskName = dir.substring(3);
      grunt.config(['connect',taskName], {
        options: {
          base: dir
        }
      });
      grunt.registerTask(taskName, ['connect:'+taskName, 'watch']);
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', function () {
    var exercises = Object.keys(grunt.config('connect'));
    grunt.log.fail('Please run grunt with an exercise name:');
    grunt.log.writeln('grunt '+exercises.join('\ngrunt '));
  });

};
