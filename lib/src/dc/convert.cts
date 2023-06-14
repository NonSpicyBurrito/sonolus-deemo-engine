import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { BPMObject, ChartObject, DC, SlideNote, TapNote } from './index.cjs'

type Handler<T extends ChartObject> = (object: T) => {
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

const bpm: Handler<BPMObject> = (object) => ({
    archetype: EngineArchetypeName.BpmChange,
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        [EngineArchetypeDataName.Bpm]: object.bpm,
    },
})

const tap: Handler<TapNote> = (object) => ({
    archetype: 'TapNote',
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        lane: object.lane,
        size: object.size,
    },
})

const slide: Handler<SlideNote> = (object) => ({
    archetype: 'SlideNote',
    data: {
        [EngineArchetypeDataName.Beat]: object.beat,
        lane: object.lane,
        size: object.size,
    },
})

const handlers: {
    [K in ChartObject['type']]: Handler<Extract<ChartObject, { type: K }>>
} = {
    bpm,
    tap,
    slide,
}
