# Sonolus Deemo Engine

A recreation of Deemo engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-deemo-engine
```

## Documentation

### `version`

Package version.

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfigurationPath`

Path to Engine Configuration file.

### `enginePlayDataPath`

Path to Engine Play Data file.

### `engineWatchDataPath`

Path to Engine Watch Data file.

### `enginePreviewDataPath`

Path to Engine Preview Data file.

### `engineTutorialDataPath`

Path to Engine Tutorial Data file.

### `engineThumbnailPath`

Path to Engine Thumbnail file.

### `dsToDC(ds)`

Converts DS (Deemo Source) to DC (Deemo Chart).

-   `ds`: Deemo Source.

### `dcToLevelData(dc, offset?)`

Converts DC (Deemo Chart) to Level Data.

-   `dc`: Deemo Chart.
-   `offset`: offset (default: `0`).
