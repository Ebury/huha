# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.5.0] - 2024-02-09
### Changed
- Added typings


## [3.4.3] - 2023-06-16
### Changed
- Removed legacy analytics.js commands for Google Analytics

## [3.4.2] - 2022-10-04
### Changed
- Removed "value" from GA event

## [3.4.0] - 2021-09-24

- Updating CODEOWNERS.
- Fix mixed import/exports in `huha.js`.
- Add module entry point.

## [3.3.1] - 2020-12-23
### Changed
- Bump babel-jest from 25.0.0 to 26.6.3
- Bump browserify from 16.2.2 to 17.0.0
- Bump eslint from 4.19.1 to 7.16.0
- Bump eslint-config-airbnb-base from 12.1.0 to 14.2.1
- Bump eslint-plugin-import from 2.14.0 to 2.22.1
- Bump eslint-plugin-jest from 22.7.0 to 24.1.3
- Bump gulp-awspublish from 3.3.3 to 4.1.2
- Bump gulp-eslint from 4.0.0 to 6.0.0
- Bump gulp-load-plugins from 1.5.0 to 2.0.6
- Bump gulp-size from 2.1.0 to 3.0.0
- Bump gulp-sourcemaps from 2.6.1 to 3.0.0
- Bump gulp-uglify from 3.0.1 to 3.0.2
- Bump jest from 25.0.0 to 26.6.3
- Remove gulp-size dependency
- Remove run-sequence dependency

## [3.3.0] - 2020-11-04
### Added
- Adding VISION and CONTRIBUTING files.

### Changed
- Updating README file.

## [3.0.0] - 2020-09-04
### BREAKING CHANGES
- It is necessary pass an object to create an event.

### Added
- Export HuhaTask and HuhaEvent classes.

### Changed
- Renamed `section` to `category` for events.

## [2.0.2] - 2020-03-13
### Fixes
- Fix to mute error 'invalid operand to in' on IE11.

## [2.0.1] - 2020-01-16
### Fixes
- Fix to not modify the existing DEFAULT properties.

## [2.0.0] - 2020-01-03
### Fixes
- Upgrade vulnerable versions found on dependencies.

## [1.6.4] - 2019-09-12
### Fixes
- Remove `--delete` option from deploy command.

## [1.6.3] - 2019-09-12
### Fixes
- Fix order for CI steps.

## [1.6.2] - 2019-09-12
### Features
- Release github and npm with CI.
