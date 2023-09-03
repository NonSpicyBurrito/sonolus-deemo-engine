import { SkinSpriteName } from 'sonolus-core'
import { note } from './note.mjs'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    sprites: {
        stageMiddle: SkinSpriteName.StageMiddle,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        tapNote: SkinSpriteName.NoteHeadNeutral,
        slideNote: SkinSpriteName.NoteHeadYellow,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
        timeScaleChangeLine: SkinSpriteName.GridYellow,
    },
})

export const layer = {
    note: 100,

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -0.4,
            r: 0.4,
            b: -note.h / 5,
            t: note.h / 5,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
