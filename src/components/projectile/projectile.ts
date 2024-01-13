import Mob, { IMob } from "../mob";

export default class Projectile extends Mob {

    projectileTimeOut : number = 10000;
    projectileTime : number = 0;

    constructor(options : IMob) {
        super(options);
     }

    preload(): void {
        super.preload();
    }

    create(): void {
        this.collisionList = [
            'enemy',
            'player',
        ];

        super.create();
        this.sprite.play({key: "Emit"});
        this.sprite.chain([{key: "Idle", repeat: -1}]);
    }

    update(time: number, delta: number): void {
        super.update(time,delta);
        this.container.y += -(this.instance.speed / delta);

        this.projectileTime += delta;

        if(this.projectileTime > this.projectileTimeOut) {
            this.destroy();
        }
    }
}

