module.exports = function(grunt) {
  // Used for loading all of your grunt plugins
  require('load-grunt-tasks')(grunt);

  // Config variables for different deployment environments
  var config = {
    local: {
      options: {
        variables: {
          environment:{
            id: "local",
            host: "http://localhost/whizzy-randomizer/deploy/",
            dest: "deploy/"
          }
        }
      }
    }
  }

  // An array list of all your js files to be minified in compiling order
  var scripts = {
    // lib_head:[
    //   'bower_components/modernizr/modernizr.js'
    // ],
    lib_foot:[
      'bower_components/jquery/dist/jquery.js'
    ],
    app:[
      'src/js/**/*.js'
    ]
  }

  //----------------
  //- Grunt config
  //----------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,
    scripts: scripts,

    // Delete all files in the distribution directory
    clean: {
      dist: {
        src: [
          "<%= environment.dest %>"
        ]
      }
    },

    // Copy the asset directory
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: "src/asset/",
          src: ["**"],
          dest: "<%= environment.dest %>asset/"
        }]
      }
    },

    // SASS compilation
    sass: {
      dist: {
        options: {
          sourcemap: true
        },
        files:{
          "<%= environment.dest %>css/main.css": "src/css/main.sass"
        }
      }
    },

    // JS compilation 
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          '<%= environment.dest %>js/main-min.js': '<%= scripts.app %>',
          '<%= environment.dest %>js/libfoot-min.js': '<%= scripts.lib_foot %>'
          // '<%= environment.dest %>js/libhead-min.js': '<%= scripts.lib_head %>'
        }
      }
    },

    // Jade compilation
    // - Modify the scripts array to remove the src directory path
    jade: {
        dist: {
            options: {
                pretty: true,
                data: {
                    environment: "<%= environment %>",
                    srcDir: "src/"
                }
            },
            files: {
                "<%= environment.dest %>index.html": "src/template/pages/*"
            }
        }
    },

    // Live reload your browser when developing
    connect: {
        options: {
            port: 9000,
            hostname: 'localhost',
            livereload: 35729
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '<%= environment.dest %>'
                ]
            }
        }
    },

    // Watch files and update only changed content
    // - Added grunt-newer to compile only the jade file that pertains to what was changed
    watch: {
        jade: {
          files: ['src/template/**/*.jade'],
          tasks: ['config:local', 'newer:jade'],
          options: { spawn: false }
        },
        compass: {
          files: ['src/css/**/*.sass'],
          tasks: ['config:local', 'sass']
        },
        js: {
          files: ['src/js/**/*.js'],
          tasks: ['config:local', 'newer:uglify']
        },
        copy: {
          files: ['src/asset/**/*.{json,png,jpg,jpeg,gif,webp,svg,eot,ttf,woff,mp3,wav,swf,mp4,webm,ogv, mp4}'],
          tasks: ['config:local', 'newer:copy']
        },
        livereload: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: ['src/**/*']
        }
    }
  });


  //----------------------------------------------
  //- Grunt tasks to be run through your terminal
  //----------------------------------------------

  // The default "grunt" task is for active development
  grunt.registerTask('default', [
    'config:local',
    'clean',
    'copy:assets',
    'uglify',
    'sass',
    'jade',
    'connect:livereload',
    'watch'
  ]);

  // Compile build for the different deployment environments
  grunt.registerTask('build', function(_environment) {
    grunt.task.run([
      'config:'+_environment,
      'clean',
      'copy:assets',
      'uglify',
      'sass',
      'jade'
    ]);
  });
};