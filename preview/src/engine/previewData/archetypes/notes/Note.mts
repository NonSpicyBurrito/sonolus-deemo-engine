import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { note } from '../../note.mjs'
import { panel } from '../../panel.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    abstract sprite: SkinSprite

    preprocess() {
        chart.beats = Math.max(chart.beats, this.data.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.data.beat).time)

        if (options.mirror) this.data.lane *= -1
    }

    render() {
        const time = bpmChanges.at(this.data.beat).time

        const position = panel.positionFromTime(time)
        const z = getZ(layer.note, time, this.data.lane)

        this.sprite.draw(
            new Rect({
                l: (this.data.lane - this.data.size) * 0.08 * 9,
                r: (this.data.lane + this.data.size) * 0.08 * 9,
                b: -note.h,
                t: note.h,
            }).add(position),
            z,
            1,
        )
    }
}
