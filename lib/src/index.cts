import { DatabaseEngineItem } from '@sonolus/core'
import { resolve } from 'node:path'

export { dcToLevelData } from './dc/convert.cjs'
export * from './dc/index.cjs'
export { dsToDC } from './ds/convert.cjs'
export * from './ds/index.cjs'

export const version = '1.3.0'

export const databaseEngineItem = {
    name: 'deemo',
    version: 12,
    title: {
        en: 'Deemo',
    },
    subtitle: {
        en: 'Deemo',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of Deemo engine in Sonolus.',
            '',
            'Version:',
            version,
            '',
            'GitHub Repository:',
            'https://github.com/NonSpicyBurrito/sonolus-deemo-engine',
        ].join('\n'),
    },
} as const satisfies Partial<DatabaseEngineItem>

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')
