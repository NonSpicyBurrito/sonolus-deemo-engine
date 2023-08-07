import { approach, note, noteLayout } from '../../../../../shared/src/engine/data/note.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    tap: skin.sprites.tapNote,
    slide: skin.sprites.slideNote,
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

let id = tutorialMemory(SkinSpriteId)

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -4
            const r = 4

            const t = 0.5 - note.h * 2
            const b = 0.5 + note.h * 2

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note, a)
        } else {
            const y = mode === 2 ? approach(0, 2, segment.time) : 1

            skin.sprites.draw(id, noteLayout(0, 2).mul(y), layer.note, 1)
        }
    },

    showOverlay(type: keyof typeof sprites) {
        mode = 1
        this.setType(type)
    },

    showFall(type: keyof typeof sprites) {
        mode = 2
        this.setType(type)
    },

    showFrozen(type: keyof typeof sprites) {
        mode = 3
        this.setType(type)
    },

    clear() {
        mode = 0
    },

    setType(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue

            id = sprite.id
        }
    },
}
