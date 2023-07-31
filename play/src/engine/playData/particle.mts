import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        judgmentLine: ParticleEffectName.JudgeLineLinear,

        tapNoteCircular: ParticleEffectName.NoteCircularTapNeutral,
        tapNoteLinear: ParticleEffectName.NoteLinearTapNeutral,

        slideNoteCircular: ParticleEffectName.NoteCircularTapYellow,
        slideNoteLinear: ParticleEffectName.NoteLinearTapYellow,
    },
})
