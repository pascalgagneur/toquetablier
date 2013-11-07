/*jslint white: true, indent: 4 */
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        tag: {
            banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.title %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * @version <%= pkg.version %>\n\n' +
                ' * Copyright <%= pkg.copyright %>\n' +
                ' */\n'
        },

        concat: {
            js: {
                src: [
                    '<%= pkg.bower_components %>/swfobject/swfobject/src/swfobject.js'
                ],
                dest: '<%= pkg.target %>/js/spl-game.js'
            }
        },
        jshint: {
            all: ['js/script.1.js']
        },
        copy: {
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
        },

        uglify: {
            options: {
                banner: '<%= tag.banner %>',
                mangle: true,
                report: 'min'
            },
            js: {
                options: {
                    banner: '<%= tag.banner %>\n\n' +
                            '/* <%= concat.js.src.join(", ").match(/(?:\\/([^,\/]+\\.js))/g).join(\', \').replace(/\\//g, "") %> */\n\n'
                },
                files: {
                    '<%= pkg.target %>/js/spl-min.js': ['<%= pkg.target %>/js/spl.js']
                }
            },

            jquery: {
                options: {
                    banner: '',
                    preserveComments: 'some'
                },
                files: {
                    '<%= pkg.target %>/js/libs/jquery-1.7.2-min.js': ['<%= pkg.bower_components %>/jquery/jquery.js']
                }
            }
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
            "tests" : [
                    ],

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




    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-modernizr');

    // Default task.
    grunt.registerTask('default', ['copy', 'concat:js', 'modernizr']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('compress', ['default', 'uglify:js']);
    grunt.registerTask('dist', ['hint','compress']);

};
