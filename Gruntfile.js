module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    website: {
      folders: {
        'web': 'website', 
        'js':  '<%= website.folders.web %>/js',
        'bower': './bower_components',
	'src': './src'
      }
    },
    bower: {
         install: {
            options: {
               targetDir: '<%= website.folders.bower %>',
               install: true,
               copy: false,
               //cleanBowerDir: true,
               verbose: true
            }
         }
      },
    bootlint: {
      options: {
        stoponerror: false,
        relaxerror: ['W005']
      },
      files: ['<%= website.folders.web %>/*.html']
    },
    copy: {
      css: {
        files: [
          {cwd: '<%= website.folders.bower %>/bootstrap/dist/css/', src: '*', dest: '<%= website.folders.web %>/css', expand: true},
          {cwd: '<%= website.folders.bower %>/bootstrap/dist/fonts/', src: '*', dest: '<%= website.folders.web %>/fonts', expand: true}
        ]
      },
      img: {
         files: [
           {expand: true, src: ['**'], cwd: '<%= website.folders.src %>/img',  dest: '<%= website.folders.web %>/img'} 
         ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= website.folders.js %>/all.js': 
             [
               '<%= website.folders.bower %>/jquery/dist/js/jquery.js',
               '<%= website.folders.bower %>/bootstrap/dist/js/bootstrap.js'
             ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify', 'bootlint']);
  grunt.registerTask('install', ['bower', 'uglify', 'copy:img', 'copy:css']);
};



