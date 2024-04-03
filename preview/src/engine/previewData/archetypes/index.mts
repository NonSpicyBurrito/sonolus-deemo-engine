import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.mjs'
import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { SlideNote } from './notes/SlideNote.mjs'
import { TapNote } from './notes/TapNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    SlideNote,
})
