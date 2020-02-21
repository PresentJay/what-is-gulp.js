import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";

sass.compiler = require('node-sass');

const routes = {
    pug: {
        watch: 'src/**/*.pug',
        src: "src/*.pug",
        // if you wanna handle more folders below, using like this : "src/**/*.pug"
        dest: "build"
    },
    img: {
        src: 'src/img/*',
        dest: 'build/img'
    },
    scss: {
        watch: 'src/scss/**/*.scss',
        src: 'src/scss/style.scss',
        dest: 'build/css'
    }
};

const pug = () =>
    gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const devserver = function () {
    gulp.src("build", {
        allowEmpty: true
    }).pipe(ws({
        port: "8008",
        livereload: true,
        open: true
    }));
};

const img = () =>
    gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
    gulp
    .src(routes.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 2 versions"]
        })
    )
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]);

const live = gulp.parallel([devserver, watch]);

// export is for "using in package.json file", if you don't use export, then you can't this command on that file
export const dev = gulp.series([prepare, assets, live]);

// what is task?
// task can be take all the pug files, and put them on a different folder,
// but first, turn them into html. this is task
// and the another task can be take all scss files, and turn them into css, and then, minify the code, and then put them on a folder called css