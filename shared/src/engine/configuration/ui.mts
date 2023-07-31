import { EngineConfigurationUI } from 'sonolus-core'

export const ui: EngineConfigurationUI = {
    scope: 'Deemo',
    primaryMetric: 'arcade',
    secondaryMetric: 'life',
    menuVisibility: {
        scale: 1,
        alpha: 1,
    },
    judgmentVisibility: {
        scale: 1,
        alpha: 1,
    },
    comboVisibility: {
        scale: 1,
        alpha: 1,
    },
    primaryMetricVisibility: {
        scale: 1,
        alpha: 1,
    },
    secondaryMetricVisibility: {
        scale: 0,
        alpha: 0,
    },
    tutorialNavigationVisibility: {
        scale: 1,
        alpha: 1,
    },
    tutorialInstructionVisibility: {
        scale: 1,
        alpha: 1,
    },
    judgmentAnimation: {
        scale: {
            from: 1,
            to: 1,
            duration: 0,
            ease: 'Linear',
        },
        alpha: {
            from: 1,
            to: 0,
            duration: 0.2,
            ease: 'InCubic',
        },
    },
    comboAnimation: {
        scale: {
            from: 1,
            to: 1,
            duration: 0,
            ease: 'Linear',
        },
        alpha: {
            from: 1,
            to: 0.5,
            duration: 0.2,
            ease: 'InCubic',
        },
    },
    judgmentErrorStyle: 'arrowDown',
    judgmentErrorPlacement: 'both',
    judgmentErrorMin: 20,
}
