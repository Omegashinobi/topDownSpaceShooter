import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import EnemyProjectile from "./enemyProjectile";
import Projectile from "./projectile";

export default class DelayedSpawnerProjectile extends Projectile {

    spawnerTimer: number;
    spawnerObject: EnemyProjectile;
    spawnerAmount: number;

    create(options: IMob, origin?: { x: number; y: number; }): void {
        super.create(options);
    }

    async update(time: number, delta: number): Promise<void> {
        super.update(time, delta);

        if (this.spawnerTimer <= 0) {
            await this.spawnMobs();
            this.destroy();
        }
    }

    spawnMobs(): Promise<void> {
        return new Promise((resolve) => {
            for (let i = 0; i < this.spawnerAmount; i++) {
                EnemyProjectile.spawn({
                    type: "projectile",
                    name: "blast",
                    texture: "enemyBlast",
                    scene: this.scene,
                    speed: -100,
                    x: 0,
                    y: 0,
                    runTime: true,
                    hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32),
                    movementType : "rotationBased"
                }, EnemyProjectile);

                if (i === this.spawnerAmount) {
                    resolve();
                }
            }
        })
    }
}