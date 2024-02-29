import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";

export default class Projectile extends Mob {

    projectileTimeOut : number = 10000;
    projectileTime : number = 0;

    towards : boolean = false;
    origin : {x:number,y:number};

    constructor() {
        super();
     }

    preload(): void {
        super.preload();
    }

    create(options : IMob, origin?: {x:number,y:number}): void {
        if(origin) {
            this.origin = origin;
        }

        this.collisionList = [
            'enemy',
            'player',
        ];

        super.create(options);
        this.sprite.play({key: "Emit"});
        this.sprite.chain([{key: "Idle", repeat: -1}]);

        if(this.towards) {
            let vector = new Phaser.Math.Vector2( this.container.x - this.origin.x, this.origin.y - this.origin.y );
            (this.container.body as Phaser.Physics.Arcade.Body).setVelocity(vector.x, vector.y);
        }

    }

    update(time: number, delta: number): void {
        super.update(time,delta);

        if(!this.towards) {
            this.container.y += -(this.instance.speed / delta);
        }

        this.projectileTime += delta;

        if(this.projectileTime > this.projectileTimeOut) {
            this.destroy();
        }
    }
}

