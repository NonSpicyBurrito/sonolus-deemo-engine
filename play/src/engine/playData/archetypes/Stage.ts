import { options } from '../../configuration/options.js'
import { note } from '../note.js'
import { particle } from '../particle.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'

export class Stage extends Archetype {
    effectId = this.entityMemory(ParticleEffectInstanceId)

    spawnOrder() {
        return 1
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    initialize() {
        if (this.shouldPlayJudgmentLineEffect) this.playJudgmentLineEffect()
    }

    touch() {
        for (const touch of touches) {
            if (!touch.started) continue

            streams.set(0, time.now, 0)

            if (this.shouldPlayJudgmentLineEffect) this.playJudgmentLineEffect()
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
