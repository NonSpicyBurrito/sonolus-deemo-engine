# Sonolus Deemo Engine

A recreation of Deemo engine in [Sonolus](https://sonolus.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-deemo-engine
```

## Documentation

### `version`

Package version.

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `dsToDC(ds)`

Converts DS (Deemo Source) to DC (Deemo Chart).

- `ds`: Deemo Source.

### `dcToLevelData(dc, offset?)`

Converts DC (Deemo Chart) to Level Data.

- `dc`: Deemo Chart.
- `offset`: offset (default: `0`).

### Assets

The following assets are exposed as package entry points:

- `EngineConfiguration`
- `EnginePlayData`
- `EngineWatchData`
- `EnginePreviewData`
- `EngineTutorialData`
- `EngineThumbnail`

In Node.js, you can obtain path to assets using `require.resolve('sonolus-deemo-engine/EngineConfiguration')` or `import.meta.resolve('sonolus-deemo-engine/EngineConfiguration')`.
