import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { dcToLevelData } from './dc/convert.cjs'
export { dsToDC } from './ds/convert.cjs'

export const version = '1.0.0'

export const engineInfo = {
    name: 'deemo',
    version: 8,
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
export const engineData = new Resource('EngineData')
export const engineThumbnail = new Resource('thumbnail.png')
