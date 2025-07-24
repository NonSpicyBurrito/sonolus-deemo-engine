import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

export class TapNote extends Note {
    sprite = skin.sprites.tapNote

    effects = {
        linear: particle.effects.tapNoteLinear,
        circular: particle.effects.tapNoteCircular,
    }

    bucket = buckets.tapNote
}
