module.exports = function (grunt) {
    grunt.initConfig({
        // package.json
        pkg: grunt.file.readJSON('package.json'),
        
        // opt
        opt: {
            "tsDir": "src",
            "outDir": "dest"
        },
        // grunt-ts 
        ts: {
            options: {
                target: 'es5', // --target
                module: 'commonjs', // --module
                noImplicitAny: true // --noImplicitAny                
            },
            // main
            // test
            main: {
                src: ['<%= opt.tsDir %>/**/*.ts'],
                out: '<%= opt.outDir %>/js/Main.js' 
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',
                    
                    //optional: always get from HEAD
                    latest: true,
                    
                    // specify config file
                    config: './conf/tsd.json',
                    
                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("./conf/tslint.json")
            },
            files: {
                src: ['<%= opt.tsDir %>/Main.ts']
            }
        },
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: './docs',
                    name: 'my-project',
                    target: 'es5'
                },
                src: ['./src/**/*']
            }
        },
        copy: {
            app: {
                files: [
                    {expand: true, cwd: 'skeleton/', src: ['**'], dest: '<%= opt.outDir %>/'}
                ]
            }
        },
        clean: {
            build: {
                src: [
                    '<%= opt.outDir %>/**/*'
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: 'dest',
                    open: {
                        target: 'http://localhost:9001',
                        appName: 'Chrome' // open, Firefox, Chrome
                    },
                    keepalive: true
                    
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './<%= opt.outDir %>/libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        }
    });
    
    grunt.registerTask('setup', ['clean', 'tsd', 'copy', 'bower']);
    grunt.registerTask('default', ['ts']);
    
    // 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-bower-task');
};