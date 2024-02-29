import { EMobType, IBossOptions, IEnemyOptions, IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import constantBeam from "../projectile/constantBeam";
import Enemy from "./enemy";

export default class Boss extends Enemy {

    private bossParts : Mob[];

    public update(time: number, delta: number): void {
        super.update(time, delta);
    }

    public create(options: IMob & IEnemyOptions & IBossOptions): void {
        super.create(options);

        this.bossParts = options.parts.map((e : IMob & IEnemyOptions & IBossOptions)=>{
            const instance : Mob = this.scene.setUpMobs(e);
            this.scene.addToMobList(instance,e);
            return instance;
        })
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