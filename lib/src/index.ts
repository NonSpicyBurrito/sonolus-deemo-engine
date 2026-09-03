import { DatabaseEngineItem, TextFunction } from '@sonolus/core'

export { dcToLevelData } from './dc/convert.js'
export * from './dc/index.js'
export { dsToDC } from './ds/convert.js'
export * from './ds/index.js'

export const version = '1.6.3'

export const engineFullName = {
    en: 'Deemo',
} as const

export const engineShortName = {
    en: 'Deemo',
} as const

export const databaseEngineItem = {
    name: 'deemo',
    version: 13,
    title: { en: `${TextFunction.Localize}:${JSON.stringify(engineShortName)}` },
    subtitle: { en: `${TextFunction.Localize}:${JSON.stringify(engineFullName)}` },
    author: {
        en: 'Burrito#1000',
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
