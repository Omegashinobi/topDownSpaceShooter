import Mob, { IMob } from "../mob";
import Projectile from "./projectile";

export default class enemyProjectile extends Projectile {
    constructor(options : IMob) {
        super(options);
     }

    create(): void {

        this.onCollision = (other : Mob)=> {
            if(other.instance.tag === "player") {
                this.destroy();
                alert("DESTORYED!!!");
            }
        }
        super.create();

        this.sprite.rotation = Math.PI;

    }
}