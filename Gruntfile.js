/*jslint white: true, indent: 4 */
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mainJsFileName: 'main.js',

        tag: {
            banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.title %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * @version <%= pkg.version %>\n\n' +
                ' * Copyright <%= pkg.copyright %>\n' +
                ' * Copyright for plugin used: <%= pkg.url %>js/<%= mainJsFileName %>\n' +
                ' */\n'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['js/script.js']
        },
        concat: {
            js: {
                src: [
                    'js/plugins.js', 'js/script.js'
                ],
                dest: 'js/main.js'
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        src:
                            ['js/main.js'],
                        dest: 'js/main-min.js'
                    },
                    {
                        src:
                            ['css/style.css'],
                        dest: 'css/style-min.css'
                    }
                ]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['style.css'],
                dest: 'css',
                ext: '-min.css'
            }
        },
        /*copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src:
                                [
                                    '<%= pkg.bower_components %>/jquery/jquery.js',
                                    '<%= pkg.bower_components %>/jquery-migrate/jquery-migrate.js'
                                ],
                        dest: '<%= pkg.target %>/js/libs/debug/'
                    }
                ]
            }
        },*/

        uglify: {
            options: {
                banner: '<%= tag.banner %>',
                mangle: true,
                report: 'min'
            },
            js: {
                files: {
                    'js/main-min.js': 'js/main.js'
                }
            }/*,
            jquery: {
                options: {
                    banner: '',
                    preserveComments: 'some'
                },
                files: {
                    '<%= pkg.target %>/js/libs/jquery-1.7.2-min.js': ['<%= pkg.bower_components %>/jquery/jquery.js']
                }
            }*/
        },

        modernizr: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "<%= pkg.bower_components %>/modernizr/modernizr.js",

            // [REQUIRED] Path to save out the built file.
            "outputFile" : "modernizr.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                //"mq" : true,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : true,
                "teststyles" : true,
                "testprops" : true,
                "testallprops" : true,
                "hasevents" : false,
                "prefixes" : true,
                "domprefixes" : true
            },

            // By default, source is uglified before saving
            "uglify" : false,

            // Define any tests you want to implicitly include.
            /*"tests" : [
                    ],
            */
            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            "files" : ['js/script1.js'],

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        },

        watch: {
            all: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['js/*.js', 'css/*.css'],
                tasks: ['dev']
            },

            livereload: {
                options: {
                    livereload: true,
                    spawn: false
                },

                files: [
                    'js/*.js',
                    'css/*.css'

                ]
            }
        }




    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    //grunt.registerTask('default', ['copy', 'concat:js', 'modernizr']);
    grunt.registerTask('concatit', ['concat:js']);
    grunt.registerTask('dev', ['concatit', 'copy:dev']);
    grunt.registerTask('compress', ['concatit', 'uglify:js']);
    grunt.registerTask('default', ['jshint','compress', 'cssmin:minify']);
    grunt.registerTask('dist', ['default']);

};
