import { IBossOptions, IEnemyOptions, IMob } from "../mob/data/mob";
import ConstantBeam from "../projectile/constantBeam";
import Enemy from "./enemy";

export default class Boss extends Enemy {
    protected phaseIndex : number;
    protected phaseMap : Map<number, ()=>void>;
    protected phases : number[];

    public update(time: number, delta: number): void {
        super.update(time, delta);
    }

    public create(options: IMob & IEnemyOptions & IBossOptions): void {
        super.create(options);
    }

    protected gotoNextPhase() {
        if((this.phaseIndex + 1) <= this.phaseMap.size) {
            this.phaseIndex += 1;
        } else {
            this.phaseIndex = 0;
        }
        this.phaseMap.get(this.phases[this.phaseIndex]).call(this);
    }

    protected waitPhase() : Phaser.Types.Time.TimelineEventConfig[] {
        return [{
            at : 0,
            tween : {
                targets: this.body,
                duration : 2000,
                onComplete : this.gotoNextPhase
            },
        }]
    }

    public fire() {
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
            },ConstantBeam) as ConstantBeam;

            proj.setBeamOptions({
                shiftSpeed: 1000,
                start: 1000,
                mid: 3000,
                end: 5000,
            })

            this.canFire = false;
        }
    }
}