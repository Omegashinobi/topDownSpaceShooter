import { ISwarmerData } from "../../mob/data/mob";
import Mob from "../../mob/mob";

export const action = function (trackPosition: number, gameObject: Mob, swarmerData: ISwarmerData): Phaser.Types.Time.TimelineEventConfig[] {
    const _gameObject = gameObject;

    _gameObject.container.setPosition(
        _gameObject.instance.enemyOptions.waitPosition.x,
        -128
    )

    function generatePathData() : Phaser.Types.Time.TimelineEventConfig[] {
        return swarmerData.paths.map((e : {x:number,y:number},i) => {
            return {
                at: (trackPosition+(10000*(i+1)))+((swarmerData.spawnDelay*1000)*swarmerData.index),
                tween: {
                    targets: _gameObject.container,
                    duration: 10000,
                    x: e.x,
                    y: e.y,
                    ease: "Sine.easinOut",
                }
            }
        })
    }

    let timeLineData = generatePathData();
    timeLineData.unshift({
        at: trackPosition,
        tween: {
            targets: _gameObject.container,
            duration: 10000,
            x: _gameObject.instance.enemyOptions.waitPosition.x,
            y: _gameObject.instance.enemyOptions.waitPosition.y,
            ease: "Sine.easinOut",
        },
    })

    return timeLineData;

}
