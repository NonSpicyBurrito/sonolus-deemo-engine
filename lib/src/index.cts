import { DatabaseEngineItem } from '@sonolus/core'

export { dcToLevelData } from './dc/convert.cjs'
export * from './dc/index.cjs'
export { dsToDC } from './ds/convert.cjs'
export * from './ds/index.cjs'

export const version = '1.5.4'

export const databaseEngineItem = {
    name: 'deemo',
    version: 13,
    title: {
        en: 'Deemo',
    },
    subtitle: {
        en: 'Deemo',
    },
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
