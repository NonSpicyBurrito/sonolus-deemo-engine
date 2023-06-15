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

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `engineData`

Engine Data.

-   `engineData.path`: path to file.
-   `engineData.buffer`: buffer of file.
-   `engineData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `dsToDC(ds)`

Converts DS (Deemo Source) to DC (Deemo Chart).

-   `ds`: Deemo Source.

### `dcToLevelData(dc, offset?)`

Converts DC (Deemo Chart) to Level Data.

-   `dc`: Deemo Chart.
-   `offset`: offset (default: `0`).
