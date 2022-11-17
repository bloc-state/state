# [2.0.0-beta.2](https://github.com/bloc-state/state/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-11-17)


### Features

* added new type argument to ready method ([2fa794f](https://github.com/bloc-state/state/commit/2fa794f4272fdc37d06470ef28ae959d7d575331))

# [2.0.0-beta.1](https://github.com/bloc-state/state/compare/v1.0.4...v2.0.0-beta.1) (2022-11-17)


### Features

* updated API ([f3a26c1](https://github.com/bloc-state/state/commit/f3a26c17ca77a32129b2a8403a9374cc8969abdb))


### BREAKING CHANGES

* State will now have a new property named status to identify its
        finite state, immer will now be integrated into the library and is now a
        hard dependency. State will no longer use static factory methods.
        Instantiating a state instance will set it to intial status. New state
        instances can be created using prototype methods on a state instance [ready, failed,
        loading]. These 3 methods will return a new immutable state instance.

## [1.0.4](https://github.com/bloc-state/state/compare/v1.0.3...v1.0.4) (2022-11-08)


### Bug Fixes

* **dep:** added changelog and git semantic-release plugins ([0cb81dc](https://github.com/bloc-state/state/commit/0cb81dc95c8db30fc29b1f3cae4814879c734005))
* **dep:** removed rxjs from peer dependencies ([4ceba84](https://github.com/bloc-state/state/commit/4ceba844592e323db2ac4504817d77ca9cf577af))

## [1.0.3](https://github.com/bloc-state/state/compare/v1.0.2...v1.0.3) (2022-11-08)


### Bug Fixes

* **build:** add typescript declaration file to build ([fbd2b29](https://github.com/bloc-state/state/commit/fbd2b2987ff61140766375b1806443efe2057069))
* **dep:** removed unused dev dependencies ([d6d22e5](https://github.com/bloc-state/state/commit/d6d22e59433881ea42b76eb17ef3811e28b030e7))

## [1.0.2](https://github.com/bloc-state/state/compare/v1.0.1...v1.0.2) (2022-11-07)


### Bug Fixes

* **ci:** add package.json to semantic-release/git assets ([5d86d4f](https://github.com/bloc-state/state/commit/5d86d4fcd55552c411916269cbd2db41204d4a29))
* **ci:** added newly needed dependencies for ci ([0c8a04a](https://github.com/bloc-state/state/commit/0c8a04adf58d51faf5e4745fe47eebf5b45a5e27))
