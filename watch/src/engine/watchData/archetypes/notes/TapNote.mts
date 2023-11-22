import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class TapNote extends Note {
    sprite = skin.sprites.tapNote

    effects = {
        linear: particle.effects.tapNoteLinear,
        circular: particle.effects.tapNoteCircular,
    }
}
