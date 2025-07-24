import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { isUsed, markAsUsed } from '../InputManager.js'
import { Note } from './Note.js'

export class SlideNote extends Note {
    sprites = {
        note: skin.sprites.slideNote,
    }

    effects = {
        linear: particle.effects.slideNoteLinear,
        circular: particle.effects.slideNoteCircular,
    }

    bucket = buckets.slideNote

    slideTime = this.entityMemory(Number)

    initialize() {
        super.initialize()

        this.slideTime = this.targetTime + input.offset
    }

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            markAsUsed(touch)
            this.complete(touch.startTime)
            return
        }

        if (time.now < this.slideTime) return

        for (const touch of touches) {
            if (touch.position.x === touch.lastPosition.x) continue
            if (!this.hitbox.contains(touch.lastPosition)) continue

            this.complete(Math.max(touch.time, this.targetTime))
            return
        }
    }

    complete(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
