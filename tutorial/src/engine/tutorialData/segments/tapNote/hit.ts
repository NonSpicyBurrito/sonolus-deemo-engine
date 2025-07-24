import { stage } from '../../components/stage.js'
import { effect } from '../../effect.js'
import { particle, playCircularNoteEffect, playLinearNoteEffect } from '../../particle.js'

export const tapNoteHit = {
    enter() {
        stage.playJudgmentLineEffect()

        effect.clips.perfect.play(0)

        playLinearNoteEffect(particle.effects.tapNoteLinear)
        playCircularNoteEffect(particle.effects.tapNoteCircular)
    },

    exit() {
        stage.clear()
    },
}
