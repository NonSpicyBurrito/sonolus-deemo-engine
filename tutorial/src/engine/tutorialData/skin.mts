import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgmentLine: SkinSpriteName.JudgmentLine,

        tapNote: SkinSpriteName.NoteHeadNeutral,
        slideNote: SkinSpriteName.NoteHeadYellow,
    },
})

export const layer = {
    note: 100,

    judgmentLine: 0,
}
