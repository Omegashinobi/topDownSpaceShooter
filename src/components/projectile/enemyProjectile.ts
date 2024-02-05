import Mob, { IMob } from "../mob";
import Projectile from "./projectile";

export default class enemyProjectile extends Projectile {
    constructor(options : IMob, towards? : boolean, origin?: {x:number,y:number}) {
        super(options,towards,origin);
     }

    create(): void {

        if(this.towards) {
            let vector = new Phaser.Math.Vector2( this.container.x - this.origin.x, this.container.y - this.origin.y );
            vector.setLength(this.instance.speed);
            (this.container.body as Phaser.Physics.Arcade.Body).setVelocity(vector.x, vector.y);
        }

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