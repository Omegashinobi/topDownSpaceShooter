import { IEnemyOptions, IMob } from "../mob/data/mob";
import ConstantBeam from "../projectile/constantBeam";
import Enemy from "./enemy";

export default class BeamEnemy extends Enemy {

    public update(time: number, delta: number): void {
        super.update(time, delta);
    }

    public create(options: IMob & IEnemyOptions): void {
        super.create(options);
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
            }, ConstantBeam);

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