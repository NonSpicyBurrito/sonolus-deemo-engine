import { note as _note } from '../../../../shared/src/engine/data/note.js'
import { options } from '../configuration/options.js'
import { skin } from './skin.js'

export const note = {
    ..._note,

    get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    },
}

export const noteHitbox = (lane: number, size: number) =>
    new Rect({
        l: lane - size - 2,
        r: lane + size + 2,
        t: 0.5,
        b: 1.5,
    }).transform(skin.transform)
