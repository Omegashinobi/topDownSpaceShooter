import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import Projectile from "./projectile";

export default class PlayerProjectile extends Projectile {

    create(options : IMob): void {
        this.onCollision = (other : Mob)=> {
            if(other.instance.tag === "enemy") {
                this.scene.comboTimer = 3000;
                other.instance.health -=1;
                this.destroy();
            }
        }

        super.create(options);
    }
}