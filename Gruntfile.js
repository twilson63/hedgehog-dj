var appFiles = [
'public/app/app.js',
'public/app/services/**/*.js',
'public/app/filters/**/*.js',
'public/app/directives/**/*.js',
'public/app/controllers/**/*.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: appFiles
    },
    concat: {
      app: {
        src: appFiles,
      dest: 'public/app/ng-app.js'
      }
    },
    uglify: {
      grxnet: {
        src: ['public/js/ng-app.js'],
        dest: 'public/js/ng-app.min.js'
      }
    },
    watch: {
      scripts: {
        files: appFiles,
        tasks: ['jshint','concat'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'jshint concat uglify');

}