import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    renderMode: 'lightweight',
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
            l: -8,
            r: 8,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
