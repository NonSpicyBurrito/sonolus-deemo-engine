import { noteDisplay } from '../../components/noteDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const slideNoteFrozen = {
    enter() {
        noteDisplay.showFrozen('slide')

        instruction.texts.slide.show()
    },

    update() {
        drawHand(
            Math.PI / 3,
            Math.remapClamped(0.25, 0.75, -0.25, 0.25, segment.time % 1),
            Math.unlerpClamped(0.5, 0.25, Math.abs((segment.time % 1) - 0.5)),
        )
    },

    exit() {
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
