// const { src, dest, watch, series } = require('gulp');
// const sass = require('gulp-sass')(require('sass'));

// function buildStyles() {
//   return src('scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(dest('css'));
// }

// function watchTask() {
//   watch(['scss/**/*.scss'], buildStyles);
// }

// exports.default = series(buildStyles, watchTask);

const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const chokidar = require('chokidar');

// Task untuk membangun file SCSS
function buildStyles() {
  return src('scss/**/*.scss') // Menggunakan wildcard untuk mencari semua file SCSS
    .pipe(sass().on('error', sass.logError)) // Memproses SCSS ke CSS
    .pipe(dest('css')); // Menyimpan hasilnya di folder 'css'
}

// Task untuk menonton perubahan pada file SCSS
function watchTask() {
  chokidar
    .watch('scss/**/*.scss') // Memantau semua file SCSS di folder 'scss'
    .on('all', (event, path) => {
      console.log(`${event} detected on ${path}, running buildStyles...`);
      buildStyles(); // Menjalankan buildStyles ketika ada perubahan
    });
}

// Menjalankan task secara berurutan (buildStyles kemudian watchTask)
exports.default = series(buildStyles, watchTask);
