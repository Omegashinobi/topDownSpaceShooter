import Mob, { IMob, IMovementTween } from "../mob";
import enemyProjectile from "../projectile/enemyProjectile";

export default class Enemy extends Mob {
    public movementActive: boolean = true;
    public movementPattern: any[] = [];
    private onDeath: any;

    private fireRate: number;
    private maxFireRate: number = this.setRand(2000, 1000);

    private movementTimeLine: any;
    private movementTimeLinePlaying: boolean = false;

    private customTimeLine: any;

    public canFire : boolean = false;

    public trackerActive: number;

    collisionList: string[];

    constructor(options: IMob, movementPattern: any, trackerActive: number) {
        super(options);
        this.movementPattern = movementPattern;

        this.score = 100;
        this.trackerActive = trackerActive;
    }

    create(): void {
        this.collisionList = [
            'enemy'
        ];

        this.onDeath = () => {
            this.destroy();
        }

        this.fireRate = this.maxFireRate;

        super.create();

        this.movementTimeLine = this.scene.add.timeline({});

        this.enemyEvents();

        this.movementTimeLine.add(this.movementPattern.map((e: IMovementTween) => {
            return {
                at: e.at,
                tween: {
                    targets: this.container,
                    delay : 0,
                    x: e.x != null ? e.x : this.instance.x,
                    y: e.y != null ? e.y : this.instance.y,
                    duration: e.duration,
                    ease: e.ease,
                    repeat: e.repeat,
                },
                event : e.event != null ? e.event : "IDLE"
            }
        }))
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if (this.scene.timer > this.trackerActive) {

            this.deathCheck();

            if(this.canFire) {
                this.fireRate -= delta;
                this.fire();
            }
            if(this.customTimeLine) {
                this.customTimeLine.play();
            }
            if (!this.movementTimeLinePlaying) {
                this.movementTimeLine.play();
                this.movementTimeLinePlaying = true;
            }
        }
    }


    deathCheck() {
        if (this.instance.health !== undefined && this.instance.health <= 0) {
            this.onDeath();
        }
    }

    fire() {
        if (this.fireRate <= 0) {
            new enemyProjectile({
                name: "blast",
                texture: "blast",
                scene: this.scene,
                speed: -100,
                x: this.container.x,
                y: this.container.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32)
            })
            this.maxFireRate = this.setRand(2000, 1000);
            this.fireRate = this.maxFireRate;
        }
    }

    addCustomTimeline(customTimeLineOptions : any) {
        this.customTimeLine = this.scene.add.timeline(customTimeLineOptions.map((e : any)=>{
            return e;
        }));
    }

    private enemyEvents() {
        this.movementTimeLine.on('IDLE',()=>{
            this.canFire = false;
        })
        this.movementTimeLine.on('ENABLE_FIRE',()=>{
            this.canFire = true;
        })
        this.movementTimeLine.on('DESTROY',()=>{
            this.destroy();
        })
    }
}