import { EngineArchetypeDataName } from 'sonolus-core'
import { approach, noteLayout } from '../../../../../../shared/src/engine/data/note.mjs'
import {
    circularEffectLayout,
    linearEffectLayout,
} from '../../../../../../shared/src/engine/data/particle.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect, getScheduleSFXTime, sfxDistance } from '../../effect.mjs'
import { note, noteHitbox } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'
import { windows } from '../../windows.mjs'

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

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    hitbox = this.entityMemory(Rect)

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

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
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.scheduleSFXTime = getScheduleSFXTime(this.targetTime)

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - note.duration

        this.spawnTime = Math.min(this.visualTime.min, this.scheduleSFXTime)

        if (options.mirror) this.data.lane *= -1
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

        this.inputTime.min = this.targetTime + windows.good.min + input.offset
        this.inputTime.max = this.targetTime + windows.good.max + input.offset

        noteLayout(this.data.lane, this.data.size).copyTo(this.layout)
        this.z = getZ(layer.note, this.targetTime, this.data.lane)

        noteHitbox(this.data.lane, this.data.size).copyTo(this.hitbox)

        this.result.accuracy = windows.good.max
    }

    touchOrder = 1

    updateParallel() {
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

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

        this.hasSFXScheduled = true
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
        const layout = linearEffectLayout(this.data.lane, this.data.size)

        this.effects.linear.spawn(layout, 0.3, false)
    }

    playCircularNoteEffect() {
        const layout = circularEffectLayout(this.data.lane, this.data.size)

        this.effects.circular.spawn(layout, 0.3, false)
    }
}
