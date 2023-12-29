import Mob, { IMob } from "../mob";

export default class Projectile extends Mob {
    constructor(options : IMob) {
        super(options);
     }

    preload(): void {
        super.preload();
    }

    create(): void {
        super.create();
        this.sprite.play({key: "Emit"});
        this.sprite.chain([{key: "Idle", repeat: -1}])
    }

    update(time: number, delta: number): void {
        super.update(time,delta);

        this.container.y += -(this.instance.speed / delta);
    }
}