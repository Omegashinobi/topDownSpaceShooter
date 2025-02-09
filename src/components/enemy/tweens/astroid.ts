import Mob from "../../mob/mob";

export const action = function(trackPosition : number, gameObject: Mob) : Phaser.Types.Time.TimelineEventConfig[] {
    const _gameObject = gameObject;

    _gameObject.container.setPosition(
        _gameObject.instance.enemyOptions.waitPosition.x,
        -128
    )

    return [{
        at: trackPosition,
        tween: {
            targets: _gameObject.container,
            duration: 50000,
            x: _gameObject.instance.enemyOptions.endPosition.x,
            y: _gameObject.instance.enemyOptions.endPosition.y,
            ease: "Sine.easinOut",
        },
    }]
}
