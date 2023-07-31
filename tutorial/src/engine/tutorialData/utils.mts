import { note } from './constants.mjs'
import { instruction } from './instruction.mjs'
import { hand } from './shared.mjs'

export const noteLayout = () =>
    new Rect({
        l: -2,
        r: 2,
        t: -note.h,
        b: note.h,
    }).translate(0, 1)

const linearEffectLayout = () =>
    new Rect({
        l: -2,
        r: 2,
        t: -0.2,
        b: 0,
    }).translate(0, 1)

const circularEffectLayout = () => {
    const w = 2.5
    const h = 0.2

    const t = 1 - h
    const b = 1 + h

    return {
        x1: -2 * w,
        y1: b,
        x2: -2 * w,
        y2: t,
        x3: 2 * w,
        y3: t,
        x4: 2 * w,
        y4: b,
    }
}

export const playLinearNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(linearEffectLayout(), 0.3, false)

export const playCircularNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(circularEffectLayout(), 0.3, false)

export const approach = (now: number) => 1.06 ** (45 * Math.remap(0, 2, -1, 0, now))

export const drawHand = (angle: number, x: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(x, 0),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )
