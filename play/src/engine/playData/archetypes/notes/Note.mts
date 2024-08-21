import { EngineArchetypeDataName } from '@sonolus/core'
import { approach, noteLayout } from '../../../../../../shared/src/engine/data/note.mjs'
import {
    circularEffectLayout,
    linearEffectLayout,
} from '../../../../../../shared/src/engine/data/particle.mjs'
import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { note, noteHitbox } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprites: {
        note: SkinSprite
    }

    clips = {
        perfect: effect.clips.perfect,
        great: effect.clips.great,
        good: effect.clips.good,
    }

    abstract effects: {
        linear: ParticleEffect
        circular: ParticleEffect
    }

    abstract bucket: Bucket

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    hitbox = this.entityMemory(Rect)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    inputTime = this.entityMemory({
        min: Number,
        max: Number,
    })

    layout = this.entityMemory(Rect)
    z = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: JudgmentWindow) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(windows.perfect),
            great: toMs(windows.great),
            good: toMs(windows.good),
        })

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - note.duration

        this.inputTime.min = this.targetTime + windows.good.min + input.offset

        this.spawnTime = Math.min(this.visualTime.min, this.inputTime.min)

        if (options.mirror) this.import.lane *= -1

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        this.inputTime.max = this.targetTime + windows.good.max + input.offset

        noteLayout(this.import.lane, this.import.size).copyTo(this.layout)
        this.z = getZ(layer.note, this.targetTime, this.import.lane)

        noteHitbox(this.import.lane, this.import.size).copyTo(this.hitbox)

        this.result.accuracy = windows.good.max
    }

    touchOrder = 1

    updateParallel() {
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
    }

    scheduleSFX() {
        this.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    render() {
        const y = approach(this.visualTime.min, this.visualTime.max, time.now)
        const a = Math.unlerpClamped(0.175, 0.25, y)

        this.sprites.note.draw(this.layout.mul(y), this.z, a)
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffects()
    }

    playSFX() {
        switch (this.result.judgment) {
            case Judgment.Perfect:
                this.clips.perfect.play(sfxDistance)
                break
            case Judgment.Great:
                this.clips.great.play(sfxDistance)
                break
            case Judgment.Good:
                this.clips.good.play(sfxDistance)
                break
        }
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        const layout = linearEffectLayout(this.import.lane, this.import.size)

        this.effects.linear.spawn(layout, 0.3, false)
    }

    playCircularNoteEffect() {
        const layout = circularEffectLayout(this.import.lane, this.import.size)

        this.effects.circular.spawn(layout, 0.3, false)
    }
}
