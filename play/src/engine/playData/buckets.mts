import { UnitText } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    tapNote: {
        sprites: [
            {
                id: skin.sprites.tapNote.id,
                x: 0,
                y: 0,
                w: 4,
                h: 2,
                rotation: 0,
            },
        ],
        unit: UnitText.Millisecond,
    },
    slideNote: {
        sprites: [
            {
                id: skin.sprites.slideNote.id,
                x: 0,
                y: 0,
                w: 4,
                h: 2,
                rotation: 0,
            },
        ],
        unit: UnitText.Millisecond,
    },
})
