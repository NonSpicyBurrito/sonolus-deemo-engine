import { DC } from '../dc/index.cjs'
import { Chart } from './index.cjs'

export const chartToDC = (chart: Chart): DC => {
    const dc: DC = [
        {
            type: 'bpm',
            beat: 0,
            bpm: 60,
        },
    ]

    const slideIds = chart.links.flatMap((link) => link.notes.map((note) => note.$ref))

    for (const note of chart.notes) {
        if (note.pos > 2) continue

        dc.push({
            type: slideIds.includes(note.$id) ? 'slide' : 'tap',
            beat: note.time,
            lane: note.pos * 4,
            size: note.size * 2,
        })
    }

    return dc
}
