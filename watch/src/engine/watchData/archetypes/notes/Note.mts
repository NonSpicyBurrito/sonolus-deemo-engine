import { EngineArchetypeDataName } from 'sonolus-core'
import { approach, noteLayout } from '../../../../../../shared/src/engine/data/note.mjs'
import {
    circularEffectLayout,
    linearEffectLayout,
} from '../../../../../../shared/src/engine/data/particle.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { note } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprite: SkinSprite

    abstract effects: {
        linear: ParticleEffect
        circular: ParticleEffect
    }

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    initialized = this.entityMemory(Boolean)

    layout = this.entityMemory(Rect)
    z = this.entityMemory(Number)

    globalPreprocess() {
        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - note.duration

        if (options.mirror) this.data.lane *= -1

        if (options.sfxEnabled) this.scheduleSFX()

        this.result.time = this.targetTime
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.data.lane, this.data.size).copyTo(this.layout)
        this.z = getZ(layer.note, this.targetTime, this.data.lane)
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    render() {
        const y = approach(this.visualTime.min, this.visualTime.max, time.now)
        const a = Math.unlerpClamped(0.175, 0.25, y)

        this.sprite.draw(this.layout.mul(y), this.z, a)
    }

    despawnTerminate() {
        if (options.noteEffectEnabled) this.playNoteEffects()
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        const layout = linearEffectLayout(this.data.lane, this.data.size)

        this.effects.linear.spawn(layout, 0.3, false)
    }

    playCircularNoteEffect() {
        const layout = circularEffectLayout(this.data.lane, this.data.size)

        this.effects.circular.spawn(layout, 0.3, false)
    }
}
