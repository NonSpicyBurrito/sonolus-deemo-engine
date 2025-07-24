import { noteDisplay } from '../../components/noteDisplay.js'
import { stage } from '../../components/stage.js'

export const tapNoteFall = {
    enter() {
        stage.playJudgmentLineEffect()
        noteDisplay.showFall('tap')
    },

    exit() {
        stage.clear()
        noteDisplay.clear()
    },
}
