import { stage } from '../../components/stage.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { playCircularNoteEffect, playLinearNoteEffect } from '../../utils.mjs'

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
