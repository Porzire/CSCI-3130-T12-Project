module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/script.js',
        dest: 'js/script.min.js'
      }
    },
    jasmine: {
      src: 'js/script.js',
      options: {
        vendor: 'js/jquery-1.9.1.min.js',
        specs: 'js/test/scriptSpec.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['test', 'uglify']);
  grunt.registerTask('test', ['jasmine']);
};
