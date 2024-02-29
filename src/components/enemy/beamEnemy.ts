import { EMobType, IEnemyOptions, IMob } from "../mob/data/mob";
import constantBeam from "../projectile/constantBeam";
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
            const proj = new constantBeam();
            proj.setBeamOptions({
                shiftSpeed: 1000,
                start: 1000,
                mid: 3000,
                end: 5000,
            })
            this.scene.addToMobList(proj, {
                type: EMobType.projectile,
                name: "beam",
                texture: "blast",
                scene: this.scene,
                speed: 300,
                x: this.container.x,
                y: this.container.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
            })

            this.canFire = false;
        }
    }



}