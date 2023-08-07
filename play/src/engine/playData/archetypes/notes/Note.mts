import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { layer } from '../../layer.mjs'
import {
    circularEffectLayout,
    getHitbox,
    getScheduleSFXTime,
    getZ,
    linearEffectLayout,
    noteLayout,
} from '../../utils.mjs'
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
        this.visualTime.min = this.visualTime.max - this.duration

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
            this.visualTime.hidden = this.visualTime.max - this.duration * options.hidden

        this.inputTime.min = this.targetTime + windows.good.min + input.offset
        this.inputTime.max = this.targetTime + windows.good.max + input.offset

        noteLayout(this.data.lane, this.data.size).copyTo(this.layout)
        this.z = getZ(layer.note, this.targetTime, this.data.lane)

        getHitbox(this.data.lane, this.data.size).copyTo(this.hitbox)

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = windows.good.max
        }
    }

    touchOrder = 1

    updateParallel() {
        if (options.autoplay && time.now >= this.targetTime) this.despawn = true
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffects()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    scheduleSFX() {
        this.clips.perfect.schedule(this.targetTime, sfxDistance)

        this.hasSFXScheduled = true
    }

    render() {
        const y = this.approach(this.visualTime.min, this.visualTime.max, time.now)
        const a = Math.unlerpClamped(0.175, 0.25, y)

        this.sprites.note.draw(this.layout.mul(y), this.z, a)
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffects()
    }

    playSFX() {
        if (this.result.judgment === Judgment.Perfect) {
            this.clips.perfect.play(sfxDistance)
        } else if (this.result.judgment === Judgment.Great) {
            this.clips.great.play(sfxDistance)
        } else if (this.result.judgment === Judgment.Good) {
            this.clips.good.play(sfxDistance)
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

    approach(fromTime: number, toTime: number, now: number) {
        return 1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))
    }

    get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    }
}
