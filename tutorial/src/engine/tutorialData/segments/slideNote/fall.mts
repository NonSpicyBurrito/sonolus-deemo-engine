import { noteDisplay } from '../../components/noteDisplay.mjs'
import { stage } from '../../components/stage.mjs'

export const slideNoteFall = {
    enter() {
        stage.playJudgmentLineEffect()
        noteDisplay.showFall('slide')
    },

    exit() {
        stage.clear()
        noteDisplay.clear()
    },
}
