import { note } from '../../../../../shared/src/engine/data/note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    judgmentLine: skin.sprites.judgmentLine,
}

let effectId = tutorialMemory(ParticleEffectInstanceId)

export const stage = {
    update() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -note.h,
            b: note.h,
        }).translate(0, 1)

        sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    },

    playJudgmentLineEffect() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -2 * note.h,
            b: 0,
        }).translate(0, 1)

        effectId = particle.effects.judgmentLine.spawn(layout, 6, true)
    },

    clear() {
        particle.effects.destroy(effectId)
    },
}
