import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import EnemyProjectile from "./enemyProjectile";
import Projectile from "./projectile";

interface IBeamOptions {
    shiftSpeed: number,
    start: number,
    mid: number,
    end: number,
}

export default class ConstantBeam extends EnemyProjectile {
    private beam : Phaser.Time.Timeline;
    private beamConfig : Phaser.Types.Time.TimelineEventConfig[];
    private beamOptions: IBeamOptions;
    private collisionRect: Phaser.GameObjects.Rectangle;
    private isFiring: boolean = false;

    create(options: IMob): void {
        super.create(options);

        this.setupBeamControll();
        this.beam = this.scene.add.timeline(this.beamConfig);

        this.onCollision = (other : Mob) => {
            if(other.instance.tag === "player") {
                // this.destroy();
                other.destroy();
            }
        }
    }

    async update(time: number, delta: number): Promise<void> {

        if (!this.isFiring) {
            this.beam.play();
            this.isFiring = true;
        }

        this.container.body.setSize(this.container.body.width,0,true);
    }

    setBeamOptions(beamOptions : IBeamOptions) {
        this.beamOptions = beamOptions;
    }

    private setupBeamControll() {
        this.beamConfig = [{
            at: 1000,
            tween: {
                targets: this.sprite.body,
                duration: 1000 *2,
                height:0,
                width:128,
                ease: "Sine.easeInOut",
            }
        },
        {
            at: 2000,
            tween: {
                targets: this.sprite.body,
                duration: 1000,
                height:1024,
                width:128,
                ease: "Sine.easeInOut",
            }
        },
        {
            at: 3000,
            tween: {
                targets: this.sprite.body,
                duration: 1000 *2,
                height:1024,
                width:0,
                ease: "Sine.easeInOut",
                onComplete : ()=>{
                    this.beam.stop();
                    this.destroy();
                }
            }
        }
    ]
    }
}