import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import Projectile from "./projectile";

export default class enemyProjectile extends Projectile {
    create(options : IMob): void {
        super.create(options);

        this.onCollision = (other : Mob) => {
            if(other.instance.tag === "player") {
                other.destroy();
            }
        }

        this.sprite.scaleY = -1;
        this.sprite.setOrigin(0,0.5);
    }

    setTracking(towards? : boolean, origin?: {x:number,y:number}) {
        this.towards = towards;

        if(towards) {
            const player = this.scene.findMobByName("ship_0");
            this.scene.physics.moveToObject(this.container, player.container, this.instance.speed);
        }
    }
}