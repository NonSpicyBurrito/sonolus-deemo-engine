import { ParticleEffectName } from '@sonolus/core'
import {
    circularEffectLayout,
    linearEffectLayout,
} from '../../../../shared/src/engine/data/particle.mjs'

export const particle = defineParticle({
    effects: {
        judgmentLine: ParticleEffectName.JudgeLineLinear,

        tapNoteCircular: ParticleEffectName.NoteCircularTapNeutral,
        tapNoteLinear: ParticleEffectName.NoteLinearTapNeutral,

        slideNoteCircular: ParticleEffectName.NoteCircularTapYellow,
        slideNoteLinear: ParticleEffectName.NoteLinearTapYellow,
    },
})

export const playLinearNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(linearEffectLayout(0, 2), 0.3, false)

export const playCircularNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(circularEffectLayout(0, 2), 0.3, false)
