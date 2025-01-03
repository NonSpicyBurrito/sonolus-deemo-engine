import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    renderMode: 'lightweight',
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

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
