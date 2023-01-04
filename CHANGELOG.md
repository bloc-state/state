## [2.2.1](https://github.com/bloc-state/state/compare/v2.2.0...v2.2.1) (2022-12-22)


### Bug Fixes

* **State:** replace any with unknown type ([e58e8b4](https://github.com/bloc-state/state/commit/e58e8b4e537925dbc10a7b578a327631fc627bbd))

# [2.2.0](https://github.com/bloc-state/state/compare/v2.1.4...v2.2.0) (2022-12-20)


### Features

* added BaseState and optional name property ([9d49f22](https://github.com/bloc-state/state/commit/9d49f22b9c59f40211d4787915009279fe9865a8))

## [2.1.4](https://github.com/bloc-state/state/compare/v2.1.3...v2.1.4) (2022-12-14)


### Bug Fixes

* **docs:** fix badges in README ([5f4b7a1](https://github.com/bloc-state/state/commit/5f4b7a1639df84f81c4cca4bda7913c7b5d82cf2))

## [2.1.3](https://github.com/bloc-state/state/compare/v2.1.2...v2.1.3) (2022-12-14)


### Bug Fixes

* **docs:** update README ([3870a02](https://github.com/bloc-state/state/commit/3870a0285d49dc6bce55d2fb61fa89a4505248fe))

## [2.1.2](https://github.com/bloc-state/state/compare/v2.1.1...v2.1.2) (2022-12-12)


### Bug Fixes

* **dep:** make immer a dependency instad of peerDependency ([86d3b36](https://github.com/bloc-state/state/commit/86d3b3628f3b3c980c1dd93d148f46e4458e1ebc))

## [2.1.1](https://github.com/bloc-state/state/compare/v2.1.0...v2.1.1) (2022-12-09)


### Bug Fixes

* **tsup:** added keepNames to build config ([567d885](https://github.com/bloc-state/state/commit/567d88594e92c0976893cb493184d29ab52533b0))

# [2.1.0](https://github.com/bloc-state/state/compare/v2.0.1...v2.1.0) (2022-12-09)


### Features

* added copyWith method ([2f86f5d](https://github.com/bloc-state/state/commit/2f86f5dfa555aae54a205fb0b57bb252e5654424))

## [2.0.1](https://github.com/bloc-state/state/compare/v2.0.0...v2.0.1) (2022-11-23)


### Bug Fixes

* **state:** property name must be lowercase ([1e8dccb](https://github.com/bloc-state/state/commit/1e8dccb50cb22ba0fc09794cfb1f79a8788449f7))

# [2.0.0](https://github.com/bloc-state/state/compare/v1.0.4...v2.0.0) (2022-11-22)


### Bug Fixes

* changed return type for BlocState methods ([dc3122b](https://github.com/bloc-state/state/commit/dc3122b862a9757a3bcd1a1b734fa49719608148))

### Features

* added new type argument to ready method ([86699af](https://github.com/bloc-state/state/commit/86699afc66b956767f8d58d72bcd8dba754fe908))
* made changes to handle encapsulation properly ([89db95a](https://github.com/bloc-state/state/commit/89db95a98aa120f7f530b524e8e91705bf1545ae))
* made entire State object an immerable object ([12fd431](https://github.com/bloc-state/state/commit/12fd431417b61c725b2294b28d4eade25f366126))
* updated API ([af51be3](https://github.com/bloc-state/state/commit/af51be358a1ec724be511302cef1d9a841756bc6))

### BREAKING CHANGES

* BlocState class name has been changed to State to keep
the name as generic as possible. State is also now marked with
[immerable] symbol so that immer makes it draftable. State.ready method
has been optimized with nested produce methods.
* State will now have a new property named status to identify its
        finite state, immer will now be integrated into the library and is now a
        hard dependency. State will no longer use static factory methods.
        Instantiating a state instance will set it to intial status. New state
        instances can be created using prototype methods on a state instance [ready, failed,
        loading]. These 3 methods will return a new immutable state instance.

# [2.0.0-beta.5](https://github.com/bloc-state/state/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-11-20)


### Features

* made entire State object an immerable object ([e02fb79](https://github.com/bloc-state/state/commit/e02fb796b5d541bdb0368b44dd1c3e1d8be69da3))


### BREAKING CHANGES

* BlocState class name has been changed to State to keep
the name as generic as possible. State is also now marked with
[immerable] symbol so that immer makes it draftable. State.ready method
has been optimized with nested produce methods.

# [2.0.0-beta.4](https://github.com/bloc-state/state/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-11-19)

### Features

- made changes to handle encapsulation properly ([cbdc5f7](https://github.com/bloc-state/state/commit/cbdc5f7e767238b09131ad0146db5440ed3d392e))

# [2.0.0-beta.3](https://github.com/bloc-state/state/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-11-17)

### Bug Fixes

- changed return type for State methods ([f392305](https://github.com/bloc-state/state/commit/f3923058907a54d34e45043d044ec4cd0a83a271))
- changed return type for State methods ([4e0e74b](https://github.com/bloc-state/state/commit/4e0e74b9becd4da5b038fb176c9a783e5a986e99))

# [2.0.0-beta.3](https://github.com/bloc-state/state/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-11-17)

### Bug Fixes

- changed return type for State methods ([b5583a8](https://github.com/bloc-state/state/commit/b5583a8c4089d846d39583eef2420bd877e773ec))
- changed return type for State methods ([4e0e74b](https://github.com/bloc-state/state/commit/4e0e74b9becd4da5b038fb176c9a783e5a986e99))

# [2.0.0-beta.3](https://github.com/bloc-state/state/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-11-17)

### Bug Fixes

- changed return type for State methods ([4e0e74b](https://github.com/bloc-state/state/commit/4e0e74b9becd4da5b038fb176c9a783e5a986e99))

# [2.0.0-beta.2](https://github.com/bloc-state/state/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-11-17)

### Features

- added new type argument to ready method ([2fa794f](https://github.com/bloc-state/state/commit/2fa794f4272fdc37d06470ef28ae959d7d575331))

# [2.0.0-beta.1](https://github.com/bloc-state/state/compare/v1.0.4...v2.0.0-beta.1) (2022-11-17)

### Features

- updated API ([f3a26c1](https://github.com/bloc-state/state/commit/f3a26c17ca77a32129b2a8403a9374cc8969abdb))

### BREAKING CHANGES

- State will now have a new property named status to identify its
  finite state, immer will now be integrated into the library and is now a
  hard dependency. State will no longer use static factory methods.
  Instantiating a state instance will set it to intial status. New state
  instances can be created using prototype methods on a state instance [ready, failed,
  loading]. These 3 methods will return a new immutable state instance.

## [1.0.4](https://github.com/bloc-state/state/compare/v1.0.3...v1.0.4) (2022-11-08)

### Bug Fixes

- **dep:** added changelog and git semantic-release plugins ([0cb81dc](https://github.com/bloc-state/state/commit/0cb81dc95c8db30fc29b1f3cae4814879c734005))
- **dep:** removed rxjs from peer dependencies ([4ceba84](https://github.com/bloc-state/state/commit/4ceba844592e323db2ac4504817d77ca9cf577af))

## [1.0.3](https://github.com/bloc-state/state/compare/v1.0.2...v1.0.3) (2022-11-08)

### Bug Fixes

- **build:** add typescript declaration file to build ([fbd2b29](https://github.com/bloc-state/state/commit/fbd2b2987ff61140766375b1806443efe2057069))
- **dep:** removed unused dev dependencies ([d6d22e5](https://github.com/bloc-state/state/commit/d6d22e59433881ea42b76eb17ef3811e28b030e7))

## [1.0.2](https://github.com/bloc-state/state/compare/v1.0.1...v1.0.2) (2022-11-07)

### Bug Fixes

- **ci:** add package.json to semantic-release/git assets ([5d86d4f](https://github.com/bloc-state/state/commit/5d86d4fcd55552c411916269cbd2db41204d4a29))
- **ci:** added newly needed dependencies for ci ([0c8a04a](https://github.com/bloc-state/state/commit/0c8a04adf58d51faf5e4745fe47eebf5b45a5e27))
