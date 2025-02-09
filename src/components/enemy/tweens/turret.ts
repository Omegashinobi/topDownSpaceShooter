import Mob from "../../mob/mob";

export const action = function(trackPosition : number, gameObject: Mob) : Phaser.Types.Time.TimelineEventConfig[] {
    const _gameObject = gameObject;

    _gameObject.container.setPosition(
        _gameObject.instance.enemyOptions.waitPosition.x,
        -64
    )

    return [{
        at: trackPosition,
        tween: {
            targets: _gameObject.container,
            duration: 50000,
            x: _gameObject.instance.enemyOptions.waitPosition.x,
            y: 704,
            ease: "Sine.easinOut",
        },
    }]
}
