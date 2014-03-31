module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      app: ['app/**/*.js']
    },
    connect: {
      app: {
        options: {
          hostname: '*'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      app: {
        files: ['index.html', 'app/**/*', 'styles/*']
      },
      tests: {
        files: ['test/**/*']
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'connect:app', 'watch']);
};
