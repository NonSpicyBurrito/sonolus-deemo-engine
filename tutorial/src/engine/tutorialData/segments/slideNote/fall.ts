import { noteDisplay } from '../../components/noteDisplay.js'
import { stage } from '../../components/stage.js'

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
