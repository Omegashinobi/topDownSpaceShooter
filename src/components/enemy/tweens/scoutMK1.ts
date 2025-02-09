import Mob from "../../mob/mob";

export const action = function(trackPosition : number, gameObject: Mob) : Phaser.Types.Time.TimelineEventConfig[] {
    const _gameObject = gameObject;

    _gameObject.container.setPosition(
        _gameObject.instance.enemyOptions.startPosition.x,
        -64
    )

    return [{
        at: trackPosition,
        tween: {
            targets: _gameObject.container,
            duration: 10000,
            x: _gameObject.instance.enemyOptions.waitPosition.x,
            y: _gameObject.instance.enemyOptions.waitPosition.y,
            ease: "Sine.easinOut",
        },
        event: "ENABLE_FIRE"
    },
    {
        at: trackPosition + 10000,
        tween: {
            targets: _gameObject.container,
            duration: 3000,
            x: _gameObject.instance.enemyOptions.waitPosition.x,
            y: _gameObject.instance.enemyOptions.waitPosition.y + 150,
            ease: "Sine.easeInOut",
        },
    },
    {
        at: trackPosition + 13000,
        tween: {
            targets: _gameObject.container,
            duration: 1000,
            x: _gameObject.instance.enemyOptions.endPosition.x,
            y: _gameObject.instance.enemyOptions.endPosition.y,
            ease: "Sine.easeInOut",
        }
    },
    {
        at: trackPosition + 14000,
        tween: {
            targets: _gameObject.container,
            duration: 1000,
            x: _gameObject.instance.enemyOptions.endPosition.x,
            y: _gameObject.instance.enemyOptions.endPosition.y,
            ease: "Sine.easeInOut",
        },
        event: "DESTROY"
    }]
}
