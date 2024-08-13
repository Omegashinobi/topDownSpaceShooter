import Mob from "../../components/mob/mob";

function enemySet1(gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] {
    return [{
        at: 1000,
        tween: {
            targets: gameObject.container,
            duration: 2000,
            x: (200) + gameObject.instance.x,
            y: (350) + gameObject.instance.y,
            ease: "Sine.easinOut",
        },
    },
    {
        at: 3000,
        tween: {
            targets: gameObject.container,
            duration: 5000,
            x: (200) + gameObject.instance.x,
            y: (250) + gameObject.instance.y,
            ease: "Sine.easeInOut",
        },
        event: "ENABLE_FIRE"
    },
    {
        at: 8000,
        tween: {
            targets: gameObject.container,
            duration: 1000,
            x: (200) + gameObject.instance.x,
            y: (1000) + gameObject.instance.y,
            ease: "Sine.easeInOut",
        }
    },
    {
        at: 10000,
        tween: {
            targets: gameObject.container,
            duration: 1000,
            x: (-1000) + gameObject.instance.x,
            y: (1000) + gameObject.instance.y,
            ease: "Sine.easeInOut",
        },
        event: "DESTROY"
    }]
}
function FromTopCenter(gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] {
    return [{
        at: 0,
        tween: {
            targets: gameObject.container,
            duration: 5000,
            x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
            y: (200) + gameObject.instance.enemyOptions.yTargetOffset,
            ease: "Sine.easeInOut",
        },
        event: "ENABLE_FIRE"
    },
    {
        at: 10000,
        tween: {
            targets: gameObject.container,
            duration: 1000,
            x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
            y: (50) + gameObject.instance.enemyOptions.yTargetOffset,
            ease: "Sine.easeInOut",
        },
    },
    {
        at: 11000,
        tween: {
            targets: gameObject.container,
            duration: 1000,
            x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
            y: (1000) + gameObject.instance.enemyOptions.yTargetOffset,
            ease: "Sine.easeInOut",
        },
    },
    {
        at: 12000,
        tween: {
            targets: gameObject.container,
            duration: 1000,
            x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
            y: (1000) + gameObject.instance.enemyOptions.yTargetOffset,
            ease: "Sine.easeInOut",
        },
        event: "DESTROY"
    }]
}

export const actions = {
    enemySet1,
    FromTopCenter,
}