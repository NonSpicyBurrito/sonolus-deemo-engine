import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.js'
import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { SlideNote } from './notes/SlideNote.js'
import { TapNote } from './notes/TapNote.js'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    SlideNote,
})
