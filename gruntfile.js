module.exports = function (grunt) {
  grunt.initConfig({
    // Browserify lets use use require modules and transpiles to es6.
    browserify: {
       dist: {
          options: {
             transform: [
                ["babelify", {
                   loose: "all"
                }]
             ]
          },
          // Dest : source:
          files: {
            // Compile all in this folder to index.js
             "./dist/es5/index.js": ["./src/scripts/*.js"],

            // Compile separately:
            "./dist/es5/leafletmap.js": ["./src/scripts/compile-separate/leafletmap.js"],
          }
       }
    },

    eslint: {
      target: ['src/scripts/*.js']
    },

    // Minify the js code so it is all one line for performance.
    uglify: {
      dist: {
        // Dest : source:
        files: {
          // Minify all in this folder to index.js:
          './dist/compiled/index.js' : ["./dist/es5/*.js"],

          // Minify separately:
          './dist/compiled/leafletmap.js' : ["./dist/es5/leafletmap.js"],
        }
      }
    },

    // Minify CSS code.
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // When things change, run tasks.
    watch: {
       scripts: {
          files: ["./src/scripts/*.js"],
          tasks: ["browserify", "uglify"]
       },
       css: {
        files: ["./src/css/*.css"],
        tasks: ["cssmin"]
       }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask("default", ["eslint", "browserify", "uglify", "cssmin", "watch"]);
  grunt.registerTask("build", ["eslint", "browserify", "uglify"]);
};