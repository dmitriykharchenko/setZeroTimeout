module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      unit: {
        src: "dist/setZeroTimeout.js",
        options: {
          keepRunner: true,
          specs: 'spec/*_spec.js',
          // vendor: 'spec/vendor/*.js'
          helpers: ['spec/**/**_fixture.js']
        }
      }
    },

    clean: {
      tmp: ['_tmp']
    },

    uglify: {
      javascripts: {
        files: {
          'dist/setZeroTimeout.min.js': [
            'dist/setZeroTimeout.js'
          ]
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'dist/setZeroTimeout.js': 'src/setZeroTimeout.coffee'
        },
        options: {
          bare: true
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/**.js', 'src/**/**.coffee', 'test/**/**.js'],
        tasks: ['compile'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('compile', ['clean', 'coffee']);
  grunt.registerTask('build', ['compile', 'uglify']);
  grunt.registerTask('test', ['compile', 'jasmine:unit']);

};
