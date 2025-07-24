import { EngineDataBucket, Text } from '@sonolus/core'

export const createBucketDefinition = (sprites: Record<'tapNote' | 'slideNote', { id: number }>) =>
    ({
        tapNote: {
            sprites: [
                {
                    id: sprites.tapNote.id,
                    x: 0,
                    y: 0,
                    w: 4,
                    h: 2,
                    rotation: 0,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        slideNote: {
            sprites: [
                {
                    id: sprites.slideNote.id,
                    x: 0,
                    y: 0,
                    w: 4,
                    h: 2,
                    rotation: 0,
                },
            ],
            unit: Text.MillisecondUnit,
        },
    }) as const satisfies Record<string, EngineDataBucket>
