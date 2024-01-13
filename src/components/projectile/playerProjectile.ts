import Mob, { IMob } from "../mob";
import Projectile from "./projectile";

export default class PlayerProjectile extends Projectile {
    constructor(options : IMob) {
        super(options);
     }

    create(): void {

        this.onCollision = (other : Mob)=> {
            if(other.instance.tag === "enemy") {
                this.scene.comboTimer = 3000;
                other.instance.health -=1;
                this.destroy();
            }
        }

        super.create();
    }
}