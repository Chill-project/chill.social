module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    website: {
      folders: {
        'web': 'website', 
        'js':  '<%= website.folders.web %>/js',
        'bower': './bower_components',
	      'src': './src',
        'temp': './temp',
        'less': '<%= website.folders.src %>/less'
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

    less: {
      options: {
        strictMath: true,
        sourceMap: true,
        outputSourceFiles: true,
        sourceMapURL: '<%= pkg.name %>.css.map',
        sourceMapFilename: '<%= website.folders.web %>/css/<%= pkg.name %>.css.map',
        paths: ['<%= website.folders.bower %>/bootstrap/less' ]
      },
      '<%= website.folders.web %>/css/chill.social.css': '<%= website.folders.less %>/index.less'

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
          {cwd: '<%= website.folders.bower %>/font-awesome/css/', src: '*', dest: '<%= website.folders.web %>/css', expand: true},
          {cwd: '<%= website.folders.bower %>/font-awesome/fonts/', src: '*', dest: '<%= website.folders.web %>/fonts', expand: true}
        ]
      },

      img: {
         files: [
           {expand: true, src: ['**'], cwd: '<%= website.folders.src %>/img',  dest: '<%= website.folders.web %>/img'} 
         ]
      }
    },

    concat: {
      bootstrap: {
        dest: '<%= website.folders.temp %>/js/bootstrap.js', 
        src: [
          //'<%= website.folders.bower %>/bootstrap/js/transition.js',
          //'<%= website.folders.bower %>/bootstrap/js/alert.js',
          //'<%= website.folders.bower %>/bootstrap/js/button.js',
          //'<%= website.folders.bower %>/bootstrap/js/carousel.js',
          //'<%= website.folders.bower %>/bootstrap/js/collapse.js',
          //'<%= website.folders.bower %>/bootstrap/js/dropdown.js',
          //'<%= website.folders.bower %>/bootstrap/js/modal.js',
          '<%= website.folders.bower %>/bootstrap/js/tooltip.js',
          '<%= website.folders.bower %>/bootstrap/js/popover.js',
          //'<%= website.folders.bower %>/bootstrap/js/scrollspy.js',
          '<%= website.folders.bower %>/bootstrap/js/tab.js',
          //'<%= website.folders.bower %>/bootstrap/js/affix.js'
        ]
      },
      jquery_bootstrap: {
        dest: '<%= website.folders.temp %>/js/all.js',
        src: [
          '<%= website.folders.bower %>/jquery/dist/jquery.js',
          '<%= website.folders.temp %>/js/bootstrap.js'
        ]
      }
    },


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= website.folders.js %>/all.min.js': 
             [
               '<%= website.folders.temp %>/js/all.js'
             ]
        }
      }
    },

   'sftp-deploy': {
      build: {
        auth: {
          host: 'srv0.champs-libres.coop',
          port: 22,
          authKey: 'chill.social'
        },
        cache: 'sftpCache.json',
        src: '<%= website.folders.web %>',
        dest: '/srv/www/chill.social',
        exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
        serverSep: '/',
        concurrency: 4,
        progress: true
      }
    },

    watch: {
      files: ['<%= website.folders.less %>/*.less'],
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sftp-deploy');

  grunt.registerTask('default', ['concat', 'uglify', 'bootlint', 'less']);
  grunt.registerTask('install', ['bower', 'concat', 'less', 'uglify', 'copy:img', 'copy:css']);
  grunt.registerTask('deploy', ['install', 'sftp-deploy']);
};



