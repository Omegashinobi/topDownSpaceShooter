import { IMob, IEnemyOptions, IBossOptions } from "../../mob/data/mob";
import Boss from "../boss";
import Enemy from "../enemy";
import ConstantBeam from "../../projectile/constantBeam";
import EnemyProjectile from "../../projectile/enemyProjectile";

export default class Level1Boss extends Boss {
    private head: Enemy;
    private leftHand: Enemy;
    private rightHand: Enemy;

    private handBeam: () => void = () => {
        if (this.fireRate <= 0) {
            const proj = ConstantBeam.spawn({
                type: "projectile",
                name: "beam",
                texture: "enemyBlast",
                scene: this.scene,
                speed: 300,
                x: this.sprite.x,
                y: this.sprite.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
            },ConstantBeam)

            proj.setBeamOptions({
                shiftSpeed: 1000,
                start: 1000,
                mid: 3000,
                end: 5000,
            })

            this.canFire = false;
        }
    };
    private handScatterShot: () => void = () => {
        if (this.fireRate <= 0) {
            EnemyProjectile.spawn({
                type: "projectile",
                name: "blast",
                texture: "enemyBlast",
                scene: this.scene,
                speed: 300,
                x: this.sprite.x,
                y: this.sprite.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
            },EnemyProjectile);
            this.canFire = false;
        }
    };
    private headBeam: () => void = () => {
        if (this.fireRate <= 0) {

            const proj = ConstantBeam.spawn({
                type: "projectile",
                name: "beam",
                texture: "blast",
                scene: this.scene,
                speed: 300,
                x: this.sprite.x,
                y: this.sprite.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
            },ConstantBeam)
            proj.setBeamOptions({
                shiftSpeed: 1000,
                start: 1000,
                mid: 3000,
                end: 5000,
            })
            this.canFire = false;
        };
    }

    public create(options: IMob & IEnemyOptions & IBossOptions): void {
        super.create(options);

        [this.head, this.rightHand, this.leftHand].forEach((e) => {
            e = new Enemy();
            e.canFire = false;
            e.setParentMob(this);
            this.setChildMob(e);
            this.canDamage = false;
        });

        this.phaseMap = new Map<number, () => void>([
            [1, this.handsScatterShot],
            [2, this.leftHandDragBeam],
            [3, this.rightHandDragBeam],
            [4, this.singularirty],
            [5, this.crossBeams]
        ]);

        this.phases = [1,2,1,3,1,4];
    }

    private handsScatterShot(): Phaser.Types.Time.TimelineEventConfig[] {
        //Hands Face Downwards towards player and fire scattering bullets randomly in a cone shape
        return [{
            at: 0,
            tween: {
                targets: this.leftHand,
                duration: 2000,
                x: 128,
                Y: 64,
                ease: "Sine.easinOut",
                onStart: () => {
                    this.head.canDamage = true;
                }
            },
        }, {
            at: 0,
            tween: {
                targets: this.rightHand,
                duration: 2000,
                x: 352,
                Y: 64,
                ease: "Sine.easinOut",
            },
        }, {
            at: 2000,
            tween: {
                targets: this,
                duration: 2000,
                onComplete: () => {
                    [this.leftHand, this.rightHand].forEach((e) => {
                        e.fire = this.handScatterShot;
                        e.canFire = true;
                    })
                }
            },
        },{
            at: 5000,
            tween: {
                targets: this,
                onStart: () => {
                    [this.leftHand, this.rightHand].forEach((e) => {
                        e.canFire = false;
                    })
                    this.head.canDamage = false;
                },
                event: "WAIT"
            },
        }]
    }

    private rightHandDragBeam(): Phaser.Types.Time.TimelineEventConfig[] {
        //Right Hand Face Downwards and head to the end of the respective side of the screen then move towards the other side of the screen slowly while firing a continuous beam. When they've travelled 90% of the screen they then stop.
        return [
            {
                at: 0,
                tween: {
                    targets: this.rightHand,
                    duration: 2000,
                    x: 400,
                    Y: 64,
                    ease: "Sine.easinOut",
                },
            },{
                at: 2000,
                tween: {
                    targets: this.rightHand,
                    duration: 2000,
                    x: 96,
                    Y: 64,
                    ease: "Sine.easinOut",
                    onStart: () => {
                        this.rightHand.fire = this.handBeam;
                        this.rightHand.canFire = true;
                        this.head.canDamage = true;
                    }
                },
            },{
                at: 4000,
                tween: {
                    targets: this,
                    duration: 2000,
                    ease: "Sine.easinOut",
                    onStart: () => {
                        this.rightHand.canFire = false;
                        this.head.canDamage = false;
                    }
                },
            },{
                at: 6000,
                tween: {
                    targets: this.rightHand,
                    duration: 2000,
                    x: 400,
                    Y: 64,
                    ease: "Sine.easinOut",
                },
            }, {
                at: 8000,
                tween : {
                    targets:this
                }, event: "WAIT"
            }
        ]
    }

    private leftHandDragBeam(): Phaser.Types.Time.TimelineEventConfig[] {
        //Left Hand Face Downwards and head to the end of the respective side of the screen then move towards the other side of the screen slowly while firing a continuous beam. When they've travelled 90% of the screen they then stop.
        return [
            {
                at: 0,
                tween: {
                    targets: this.leftHand,
                    duration: 2000,
                    x: 400,
                    Y: 64,
                    ease: "Sine.easinOut",
                },
            },{
                at: 2000,
                tween: {
                    targets: this.leftHand,
                    duration: 2000,
                    x: 96,
                    Y: 64,
                    ease: "Sine.easinOut",
                    onStart: () => {
                        this.leftHand.fire = this.handBeam;
                        this.leftHand.canFire = true;
                        this.head.canDamage = true;
                    }
                },
            },{
                at: 4000,
                tween: {
                    targets: this,
                    duration: 2000,
                    ease: "Sine.easinOut",
                    onStart: () => {
                        this.leftHand.canFire = false;
                        this.head.canDamage = false;
                    }
                },
            },{
                at: 6000,
                tween: {
                    targets: this.leftHand,
                    duration: 2000,
                    x: 400,
                    Y: 64,
                    ease: "Sine.easinOut",
                },
            }, {
                at: 8000,
                tween : {
                    targets:this
                }, event: "WAIT"
            }
        ]
    }

    private singularirty(): Phaser.Types.Time.TimelineEventConfig[] {
        //The hands Face Each other spaced apart in the middle of the screen and create a singularity in the middle of them slowly pulling in the ship, After a few seconds the head fire a massive beam into the singularity
        return [];
    }

    private crossBeams(): Phaser.Types.Time.TimelineEventConfig[] {
        //the hands move to the top of the screen and fire a beams at the player in an intersecting cross shape. moving closer together tightening the safe area for the player
        return [];
    }
}