import { InstructionIconName, InstructionText } from 'sonolus-core'

export const instruction = defineInstruction({
    texts: {
        tap: InstructionText.Tap,
        slide: InstructionText.Slide,
    },

    icons: {
        hand: InstructionIconName.Hand,
    },
})
