import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";

const routes = {
    pug: {
        src: "src/*.pug",
        // if you wanna handle more folders below, using like this : "src/**/.*.pug"
        dest: "bulid"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

// export is for "using in package.json file", if you don't use export, then you can't this command on that file
export const dev = gulp.series([prepare, assets]);

// what is task?
// task can be take all the pug files, and put them on a different folder,
// but first, turn them into html. this is task
// and the another task can be take all scss files, and turn them into css, and then, minify the code, and then put them on a folder called css