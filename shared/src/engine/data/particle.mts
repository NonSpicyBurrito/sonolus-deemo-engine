export const linearEffectLayout = (lane: number, size: number) =>
    new Rect({
        l: lane - size,
        r: lane + size,
        t: -0.2,
        b: 0,
    }).translate(0, 1)

export const circularEffectLayout = (lane: number, size: number) => {
    const w = 2.5
    const h = 0.2

    const t = 1 - h
    const b = 1 + h

    const tm = lane * t
    const bm = lane * b

    return {
        x1: bm - size * w,
        y1: b,
        x2: tm - size * w,
        y2: t,
        x3: tm + size * w,
        y3: t,
        x4: bm + size * w,
        y4: b,
    }
}
