import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class Initialization extends Archetype {
    preprocess() {
        const b = Math.lerp(screen.b, screen.t, 0.175)
        const t = Math.lerp(screen.b, screen.t, 1.175)

        const w = screen.w * 0.04

        scaledScreen.l = screen.l / w
        scaledScreen.r = screen.r / w
        scaledScreen.b = Math.unlerp(t, b, screen.b)
        scaledScreen.t = Math.unlerp(t, b, screen.t)

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        score.base.set({
            perfect: 1,
            great: 0.8,
            good: 0.5,
        })
        score.consecutive.great.set({
            multiplier: 0.01,
            step: 100,
            cap: 1000,
        })

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.rt.sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.primary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: screen.w * 0.35, y: 0 },
            pivot: { x: 0.5, y: 0 },
            size: new Vec(0, screen.h * 0.12).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
        ui.judgment.set({
            anchor: { x: screen.w * 0.35, y: 0 },
            pivot: { x: 0.5, y: 1.5 },
            size: new Vec(0, screen.h * 0.05).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        archetypes.InputManager.spawn({})

        this.despawn = true
    }
}
