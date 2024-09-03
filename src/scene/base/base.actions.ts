import Mob from "../../components/mob/mob";
export const actions = {
    enemySet1: (gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] => {
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
    },
    FromTopCenter: (gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] => {
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
    },
    FromTopCenterBeam: (gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] => {
        return [{
            at: 0,
            tween: {
                targets: gameObject.container,
                duration: 5000,
                x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
                y: (200) + gameObject.instance.enemyOptions.yTargetOffset,
                ease: "Sine.easeInOut",
            },
        },
        {
            at: 3000,
            event: "ENABLE_FIRE"
        },
        {
            at: 15000,
            tween: {
                targets: gameObject.container,
                duration: 1000,
                x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
                y: (50) + gameObject.instance.enemyOptions.yTargetOffset,
                ease: "Sine.easeInOut",
            },
        },

        {
            at: 16000,
            tween: {
                targets: gameObject.container,
                duration: 1000,
                x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
                y: (1000) + gameObject.instance.enemyOptions.yTargetOffset,
                ease: "Sine.easeInOut",
            },
        },
        {
            at: 17000,
            tween: {
                targets: gameObject.container,
                duration: 1000,
                x: (64) + gameObject.instance.enemyOptions.xTargetOffset,
                y: (1000) + gameObject.instance.enemyOptions.yTargetOffset,
                ease: "Sine.easeInOut",
            },
            event: "DESTROY"
        }]
    },
    SlowDrift: (gameObject: Mob): Phaser.Types.Time.TimelineEventConfig[] => {
        return [{
            at: 0,
            tween: {
                targets: gameObject.container,
                duration: 30000,
                x: 0 + gameObject.instance.enemyOptions.xTargetOffset,
                y: (1000) + gameObject.instance.enemyOptions.yTargetOffset,
                ease: "Sine.liner",
            },
        }]
    },
}

export function findAction(search : string) {
    let action : (gameObject: Mob)=>void
    switch(search) {
        case "FromTopCenter" : { action = actions.FromTopCenter; break;}
        case "FromTopCenterBeam" : { action = actions.FromTopCenterBeam; break;}
        case "SlowDrift" : { action = actions.SlowDrift; break;}
    }
    return action;
}