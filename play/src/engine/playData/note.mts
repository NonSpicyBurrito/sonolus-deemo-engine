import { skin } from './skin.mjs'

export const note = {
    h: 0.02,
}

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
