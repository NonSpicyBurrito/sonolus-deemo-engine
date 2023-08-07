import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgmentLine: SkinSpriteName.JudgmentLine,

        tapNote: SkinSpriteName.NoteHeadNeutral,
        slideNote: SkinSpriteName.NoteHeadYellow,

        cover: SkinSpriteName.StageCover,
    },
})

export const layer = {
    cover: 1000,

    note: 100,

    judgmentLine: 0,
}
