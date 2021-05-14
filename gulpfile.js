const del = require('del')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const rtlcss = require('gulp-rtlcss')
const gulp = require('gulp')
const babelrc = require('./babel.config')

const ESM_DIR = './es'
const LIB_DIR = './lib'
const DIST_DIR = './dist'
const STYLE_SOURCE_DIR = './components/styles'
const STYLE_DIST_DIR = './dist/styles'
const TS_SOURCE = ['./components/**/*.tsx', './components/**/*.ts', '!./components/**/*.d.ts']
const THEMES = ['default']

function clean(done) {
  del.sync([LIB_DIR, ESM_DIR, DIST_DIR], { force: true })
  done()
}

function buildSass() {
  return THEMES.map(theme => {
    const taskName = `buildSass:${theme}`
    gulp.task(taskName, () =>
      gulp
        .src(`${STYLE_SOURCE_DIR}/themes/${theme}/index.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([require('autoprefixer')]))
        .pipe(sourcemaps.write('./'))
        .pipe(rename(`rouui-${theme}.css`))
        .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
    )
    return taskName
  })
}

function buildCSS() {
  return THEMES.map(theme => {
    const taskName = `buildCSS:${theme}`
    gulp.task(taskName, () =>
      gulp
        .src(`${STYLE_DIST_DIR}/rouui-${theme}.css`)
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
    )
    return taskName
  })
}

function buildRTLCSS() {
  return THEMES.map(theme => {
    const taskName = `buildRTLCSS:${theme}`
    gulp.task(taskName, () =>
      gulp
        .src(`${STYLE_DIST_DIR}/rouui-${theme}.css`)
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
        .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${STYLE_DIST_DIR}`))
    )
    return taskName
  })
}

function buildLib() {
  return gulp.src(TS_SOURCE).pipe(babel(babelrc())).pipe(gulp.dest(LIB_DIR))
}

function buildEsm() {
  return gulp
    .src(TS_SOURCE)
    .pipe(
      babel(
        babelrc(null, {
          NODE_ENV: 'esm'
        })
      )
    )
    .pipe(gulp.dest(ESM_DIR))
}

function copyFontFiles() {
  return gulp.src(`${STYLE_SOURCE_DIR}/fonts/**/*`).pipe(gulp.dest(`${STYLE_DIST_DIR}/fonts`))
}

function copyTypescriptDeclarationFiles() {
  return gulp.src('./components/**/*.d.ts').pipe(gulp.dest(LIB_DIR)).pipe(gulp.dest(ESM_DIR))
}

function copyScssFiles() {
  return gulp
    .src(['./components/**/*.scss', './components/**/fonts/**/*'])
    .pipe(gulp.dest(LIB_DIR))
    .pipe(gulp.dest(ESM_DIR))
}

function watch() {
  const watcher = gulp.watch(TS_SOURCE)
  watcher.on('change', (filePath, stats) => {
    console.log('File ' + filePath + ' was changed, running tasks...')
    const libPath = filePath.replace('components/', 'lib/').replace(/\/[a-z|A-Z]+.(tsx|ts)/, '')

    return gulp.src(filePath).pipe(babel(babelrc())).pipe(gulp.dest(libPath))
  })
}

exports.buildStyle = gulp.series(
  clean,
  ...buildSass(),
  ...buildCSS(),
  ...buildRTLCSS(),
  copyFontFiles
)
exports.dev = gulp.series(clean, buildLib, watch)
exports.build = gulp.series(
  clean,
  gulp.parallel(buildLib, buildEsm, gulp.series(...buildSass(), ...buildCSS(), ...buildRTLCSS())),
  gulp.parallel(copyTypescriptDeclarationFiles, copyScssFiles, copyFontFiles)
)
