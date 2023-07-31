import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { dcToLevelData } from './dc/convert.cjs'
export * from './dc/index.cjs'
export { dsToDC } from './ds/convert.cjs'
export * from './ds/index.cjs'

export const version = '1.0.4'

export const engineInfo = {
    name: 'deemo',
    version: 9,
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
} as const satisfies Partial<EngineInfo>

export const engineConfiguration = new Resource('EngineConfiguration')
export const enginePlayData = new Resource('EnginePlayData')
export const engineThumbnail = new Resource('thumbnail.png')
