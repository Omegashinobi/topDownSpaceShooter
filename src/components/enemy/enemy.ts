import Mob, { IMob, IMovementTween } from "../mob";
import enemyProjectile from "../projectile/enemyProjectile";

export default class Enemy extends Mob {
    public movementActive : boolean = true;
    public movementPattern : any[] = [];
    private onDeath: any;

    private fireRate : number;
    private maxFireRate : number = this.setRand(2000,1000);

    private movementTimeLine : any;
    private movementTimeLinePlaying: boolean;
    private movementTimeLineDelay : number;

    collisionList: string[];

    constructor(options: IMob, movementPattern : any, delay : number) {
        super(options);
        this.movementPattern = movementPattern;
        this.movementTimeLineDelay = delay;
    }

    create(): void {
        this.collisionList = [
            'enemy'
        ];

        this.onDeath = ()=>{
            this.destroy();
        }

        this.fireRate = this.maxFireRate;

        super.create();

        this.sprite.rotation = Math.PI;

        this.movementTimeLine = this.scene.add.timeline(this.movementPattern.map((e : IMovementTween )=>{
            return {
                at : e.at,
                tween : {
                    targets : this.container,
                    x: e.x,
                    y: e.y,
                    duration : e.duration,
                    ease : e.ease,
                    repeat: e.repeat
                }
            }
        }))
    }

    update(time: number, delta: number): void {
        super.update(time,delta);
        this.deathCheck();

        this.fireRate -= delta;

        this.fire();

        if(this.scene.timer > this.movementTimeLineDelay) {
            if(!this.movementTimeLinePlaying) {
                this.movementTimeLine.play();
                this.movementTimeLinePlaying = true
            }
        }
    }


    deathCheck() {
        if(this.instance.health !== undefined && this.instance.health <= 0) {
            this.onDeath();
        }
    }

    fire() {
        if(this.fireRate <= 0) {
            new enemyProjectile({
                name : "blast",
                texture : "blast",
                scene : this.scene,
                speed : -100,
                x: this.container.x,
                y: this.container.y - 20,
                runTime : true

            })
            this.maxFireRate = this.setRand(2000,1000);
            this.fireRate = this.maxFireRate;
        }
    }
}