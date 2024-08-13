import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import Projectile from "./projectile";

export default class EnemyProjectile extends Projectile {
    create(options : IMob): void {
        super.create(options);
        this.canDamage = true;

        this.onDeath = () => {
            this.destroy();
        }

        this.onCollision = (other : Mob) => {
            if(other.instance.tag === "player") {
                other.destroy();
            }
        }
    }

}