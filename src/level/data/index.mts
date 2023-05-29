import { EngineArchetypeDataName, EngineArchetypeName, LevelData } from 'sonolus-core'
import { archetypes } from '../../engine/data/archetypes/index.mjs'

export const data: LevelData = {
    bgmOffset: 0,
    entities: [
        {
            archetype: archetypes.Initialization.name,
            data: [],
        },
        {
            archetype: archetypes.InputManager.name,
            data: [],
        },
        {
            archetype: archetypes.Stage.name,
            data: [],
        },

        {
            archetype: EngineArchetypeName.BpmChange,
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 0,
                },
                {
                    name: EngineArchetypeDataName.Bpm,
                    value: 60,
                },
            ],
        },

        {
            archetype: archetypes.TapNote.name,
            data: [
                {
                    name: archetypes.TapNote.data.names.beat,
                    value: 0,
                },
                {
                    name: archetypes.TapNote.data.names.lane,
                    value: 6,
                },
                {
                    name: archetypes.TapNote.data.names.size,
                    value: 2,
                },
            ],
        },
    ],
}
