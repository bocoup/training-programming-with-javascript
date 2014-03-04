module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      hangman: ['app/**/*.js'],
    },
    connect: {
      hangman: {
        options: {
          hostname: '*'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      hangman: {
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

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('develop', ['connect:hangman', 'watch']);
};
