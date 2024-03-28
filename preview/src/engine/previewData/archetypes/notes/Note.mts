import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { note } from '../../note.mjs'
import { panel } from '../../panel.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    abstract sprite: SkinSprite

    preprocess() {
        chart.beats = Math.max(chart.beats, this.import.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.import.beat).time)

        if (options.mirror) this.import.lane *= -1
    }

    render() {
        const time = bpmChanges.at(this.import.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.note, time, this.import.lane)

        this.sprite.draw(
            new Rect({
                l: (this.import.lane - this.import.size) * 0.04 * 2 * 8,
                r: (this.import.lane + this.import.size) * 0.04 * 2 * 8,
                b: -note.h,
                t: note.h,
            }).add(pos),
            z,
            1,
        )
    }
}
