import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import Projectile from "./projectile";

export default class PlayerProjectile extends Projectile {

    create(options : IMob): void {

        const destoryables : string[] = [
            "enemy",
            "enemyProjectile"
        ];

        this.onCollision = (other : Mob)=> {
            if(destoryables.indexOf(other.instance.tag) !== -1) {
                if(other.canDamage) {
                    this.scene.comboTimer = 3000;
                    other.instance.health -=1;
                }
                this.destroy();
            }
        }

        super.create(options);
        this.movementType = "normal";
    }
}