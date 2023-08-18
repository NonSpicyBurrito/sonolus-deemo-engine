import { noteDisplay } from '../../components/noteDisplay.mjs'
import { stage } from '../../components/stage.mjs'

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
