import Mob from "../../components/mob/mob";

function enemySet1(gameObject : Mob) : Phaser.Types.Time.TimelineEventConfig[] {
    return [{
        at : 1000,
        tween : {
            targets: gameObject.container,
            duration : 2000,
            x: (200) + gameObject.instance.x,
            y: (350) + gameObject.instance.y,
            ease : "Sine.easinOut",
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
        event : "ENABLE_FIRE"
    },
    {
        at: 8000,
        tween : {
            targets: gameObject.container,
            duration: 1000,
            x: (200) + gameObject.instance.x,
            y: (1000) + gameObject.instance.y,
            ease: "Sine.easeInOut",
        }
    },
    {
        at: 10000,
        tween : {
            targets: gameObject.container,
            duration: 1000,
            x : (-1000) + gameObject.instance.x,
            y: (1000) + gameObject.instance.y,
            ease: "Sine.easeInOut",
        },
        event : "DESTROY"
    }]
}
// function* enemySet1(index: number): any {
//     for (let i = 0; i < 3; i++) {
//         yield [
//             {
//                 at: 1000,
//                 duration: 2000,
//                 x: (200 * (index + 1)),
//                 y: 350,
//                 delay: 2,
//                 ease: "Sine.easeInOut",
//                 repeat: 0,
//             },
//             {
//                 at: 3000,
//                 duration: 5000,
//                 x: (200 * (index + 1)),
//                 y: 250,
//                 delay: 0,
//                 ease: "Sine.easeInOut",
//                 repeat: 0,
//                 event : "ENABLE_FIRE"
//             },
//             {
//                 at: 8000 + (200 * (index + 1)),
//                 duration: 1000,
//                 x: (200 * (index + 1)),
//                 y: 1000,
//                 delay: 0,
//                 ease: "Sine.easeInOut",
//                 repeat: 0,
//             },
//             {
//                 at: 20000,
//                 duration: 20000,
//                 y: 1000,
//                 x : -1000,
//                 delay: 0,
//                 ease: "Sine.easeInOut",
//                 repeat: 0,
//                 event : "DESTROY"
//             },
//         ]
//         index++;
//     }
// }
function* enemySet2(index: number): any {
    for (let i = 0; i < 5; i++) {
        yield [
            {
                at: 0,
                duration: 2000,
                y: -64,
                delay: 2,
                ease: "Sine.easeInOut",
                repeat: 0,
            },
            {
                at: 3000 + (1000 * index),
                duration: 10000 + (1000 * index),
                y: 1000,
                x : 1000,
                delay: 0,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "ENABLE_FIRE"
            },
            {
                at: 20000,
                duration: 20000,
                y: 1000,
                x : -1000,
                delay: 0,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "DESTROY"
            },
        ]
        index++;
    }
}
function* enemySet3(index: number): any {
    for (let i = 0; i < 5; i++) {
        yield [
            {
                at: 0,
                duration: 2000,
                y: -64,
                delay: 2,
                ease: "Sine.easeInOut",
                repeat: 0,
            },
            {
                at: 3000 + (1000 * index),
                duration: 10000 + (1000 * index),
                y: 1000,
                x : -1000,
                delay: 0,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "ENABLE_FIRE"
            },
            {
                at: 20000,
                duration: 20000,
                y: 1000,
                x : -1000,
                delay: 0,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "DESTROY"
            },
        ]
        index++;
    }
}
function* turretSet1(index: number): any {
    for (let i = 0; i < 5; i++) {
        yield [
            {
                at: 0,
                duration: 20000,
                y: 1000,
                delay: 2,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "ENABLE_FIRE"
            },
            {
                at: 20000,
                duration: 20000,
                y: 1000,
                x : -1000,
                delay: 0,
                ease: "Sine.easeInOut",
                repeat: 0,
                event : "DESTROY"
            },
        ]
        index++;
    }
}

export const actions = {
    enemySet1, 
}