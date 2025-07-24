export const note = {
    h: 0.02,
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
