import { options } from '../configuration/options.mjs'
import { skin } from './skin.mjs'

export const note = {
    h: 0.02,

    get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    },
}

export const approach = (fromTime: number, toTime: number, now: number) =>
    1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))

export const noteLayout = (lane: number, size: number) =>
    new Rect({
        l: lane - size,
        r: lane + size,
        t: -note.h,
        b: note.h,
    }).translate(0, 1)

export const noteHitbox = (lane: number, size: number) =>
    new Rect({
        l: lane - size - 2,
        r: lane + size + 2,
        t: 0.5,
        b: 1.5,
    }).transform(skin.transform)
