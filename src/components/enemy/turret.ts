import { IEnemyOptions, IMob } from "../mob/data/mob";
import EnemyProjectile from "../projectile/enemyProjectile";
import Enemy from "./enemy";

export default class Turret extends Enemy {
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this.lookAtPlayer();
    }

    public create(options: IMob & IEnemyOptions): void {
        super.create(options);
    }

    public lookAtPlayer() {
        const rotation = Phaser.Math.Angle.Between(this.container.x, this.container.y, this.player.container.x, this.player.container.y);
        this.container.setRotation(rotation);
        this.correctSpriteRotation();
    }

    public fire() {
        if (this.fireRate <= 0) {
            const proj = EnemyProjectile.spawn({
                type: "projectile",
                name: "enemyBlast",
                texture: "enemyBlast",
                scene: this.scene,
                speed: 10,
                x: this.container.x,
                y: this.container.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32),
                movementType: "rotationBased",
                target: this.scene.findGameObjectWithTag("player")
            }, EnemyProjectile);
            // proj.setTracking(true, { x: this.container.x, y: this.container.y });
            this.maxFireRate = this.setRand(2000, 1000);
            this.fireRate = this.maxFireRate;
        }
    }

    // 

}