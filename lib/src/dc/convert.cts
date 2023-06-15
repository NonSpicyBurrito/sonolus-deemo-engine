import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { DC, DCBPMChangeObject, DCObject, DCSlideNote, DCTapNote } from './index.cjs'

type Handler<T extends DCObject> = (object: T) => {
    archetype: string
    data: Record<string, number>
}

export const dcToLevelData = (dc: DC, offset = 0): LevelData => {
    const entities: LevelDataEntity[] = [
        {
            archetype: 'Initialization',
            data: [],
        },
        {
            archetype: 'InputManager',
            data: [],
        },
        {
            archetype: 'Stage',
            data: [],
        },
    ]

    for (const object of dc) {
        const { archetype, data } = handlers[object.type](object as never)

        entities.push({
            archetype,
            data: Object.entries(data).map(([name, value]) => ({ name, value })),
        })
    }

    return {
        bgmOffset: offset,
        entities,
    }
}

const bpm: Handler<DCBPMChangeObject> = (object) => ({
    archetype: EngineArchetypeName.BpmChange,
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        [EngineArchetypeDataName.Bpm]: object.bpm,
    },
})

const tap: Handler<DCTapNote> = (object) => ({
    archetype: 'TapNote',
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        lane: object.lane,
        size: object.size,
    },
})

const slide: Handler<DCSlideNote> = (object) => ({
    archetype: 'SlideNote',
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        lane: object.lane,
        size: object.size,
    },
})

const handlers: {
    [K in DCObject['type']]: Handler<Extract<DCObject, { type: K }>>
} = {
    bpm,
    tap,
    slide,
}
