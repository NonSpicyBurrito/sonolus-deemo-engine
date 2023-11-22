import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { layer, skin } from '../skin.mjs'

export class Stage extends Archetype {
    effectId = this.entityMemory(ParticleEffectInstanceId)

    spawnOrder() {
        return 2
    }

    initialize() {
        if (this.shouldPlayJudgmentLineEffect) this.playJudgmentLineEffect()
    }

    touch() {
        if (!this.shouldPlayJudgmentLineEffect) return

        for (const touch of touches) {
            if (!touch.started) continue

            this.playJudgmentLineEffect()
            return
        }
    }

    updateParallel() {
        this.drawStage()
        this.drawStageCover()
    }

    get shouldPlayJudgmentLineEffect() {
        return options.judgmentLineEffectEnabled && particle.effects.judgmentLine.exists
    }

    drawStage() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -note.h,
            b: note.h,
        }).translate(0, 1)

        skin.sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    }

    drawStageCover() {
        if (options.stageCover <= 0) return

        skin.sprites.cover.draw(
            new Rect({
                l: scaledScreen.l,
                r: scaledScreen.r,
                t: scaledScreen.t,
                b: Math.lerp(scaledScreen.t, 1, options.stageCover),
            }),
            layer.cover,
            1,
        )
    }

    playJudgmentLineEffect() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -2 * note.h,
            b: 0,
        }).translate(0, 1)

        particle.effects.destroy(this.effectId)
        this.effectId = particle.effects.judgmentLine.spawn(layout, 6, true)
    }
}
