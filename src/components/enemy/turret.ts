import { IMob } from "../mob";
import enemyProjectile from "../projectile/enemyProjectile";
import Enemy from "./enemy";

export default class Turret extends Enemy {

    constructor(options: IMob, movementPattern: any, trackerActive: number) {
        super(options,movementPattern,trackerActive);
    }
    
    public update(time: number, delta: number): void {
        super.update(time,delta);
        this.lookAtPlayer();    
    }

    public create(): void {
        super.create();    
    }

    public lookAtPlayer() {
        const rotation = Phaser.Math.Angle.Between(this.container.x, this.container.y,this.player.container.x, this.player.container.y);
        this.container.setRotation(rotation);
    }

    public fire() {
        if (this.fireRate <= 0) {
            new enemyProjectile({
                name: "blast",
                texture: "blast",
                scene: this.scene,
                speed: 100,
                x: this.container.x,
                y: this.container.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32)
            },true,{x:this.container.x,y:this.container.y})
            this.maxFireRate = this.setRand(2000, 1000);
            this.fireRate = this.maxFireRate;
        }
    }
    
}