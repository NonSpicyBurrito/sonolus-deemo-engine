import { DC } from '../dc/index.cjs'
import { DS } from './index.cjs'

export const dsToDC = (ds: DS): DC => {
    const dc: DC = [
        {
            type: 'bpm',
            beat: 0,
            bpm: 60,
        },
    ]

    const slideIds = ds.links.flatMap((link) => link.notes.map((note) => note.$ref))

    for (const note of ds.notes) {
        const pos = note.pos ?? 0
        if (pos > 2) continue

        dc.push({
            type: slideIds.includes(note.$id) ? 'slide' : 'tap',
            beat: note._time,
            lane: pos * 4,
            size: note.size * 2,
        })
    }

    return dc
}
