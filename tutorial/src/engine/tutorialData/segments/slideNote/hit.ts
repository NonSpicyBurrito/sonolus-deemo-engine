import { stage } from '../../components/stage.js'
import { effect } from '../../effect.js'
import { particle, playCircularNoteEffect, playLinearNoteEffect } from '../../particle.js'

export const slideNoteHit = {
    enter() {
        stage.playJudgmentLineEffect()

        effect.clips.perfect.play(0)

        playLinearNoteEffect(particle.effects.slideNoteLinear)
        playCircularNoteEffect(particle.effects.slideNoteCircular)
    },

    exit() {
        stage.clear()
    },
}
