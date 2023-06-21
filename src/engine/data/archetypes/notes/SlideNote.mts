import { options } from '../../../configuration/options.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { windows } from '../windows.mjs'
import { Note } from './Note.mjs'

export class SlideNote extends Note {
    sprites = {
        note: skin.sprites.slideNote,
    }

    effects = {
        linear: particle.effects.slideNoteLinear,
        circular: particle.effects.slideNoteCircular,
    }

    bucket = buckets.slideNote

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (touch.position.x === touch.lastPosition.x) continue
            if (!this.hitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        const hitTime = Math.max(touch.time, this.targetTime)

        this.result.judgment = input.judge(hitTime, this.targetTime, windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
