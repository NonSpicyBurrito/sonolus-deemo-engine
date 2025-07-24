import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

export class SlideNote extends Note {
    sprite = skin.sprites.slideNote

    effects = {
        linear: particle.effects.slideNoteLinear,
        circular: particle.effects.slideNoteCircular,
    }

    bucket = buckets.slideNote
}
