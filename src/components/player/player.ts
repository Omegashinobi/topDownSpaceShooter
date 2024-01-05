import Mob, { IMob } from "../mob";
import PlayerProjectile from "../projectile/playerProjectile";
import Projectile from "../projectile/projectile";

export default class Player extends Mob {
    constructor(options : IMob) {
        super(options);
    }

    create(): void {
        super.create();
        this.movement();
        this.fire();
    }

    update(time: number, delta: number): void {
        super.update(time,delta);
        this.container.x += (this.movementSpeed / delta);
    }

    movement() {
        this.scene.input.keyboard.on("keydown-A",()=>{
            this.movementSpeed = -this.instance.speed;
        },this.scene);
        this.scene.input.keyboard.on("keydown-D",()=>{
            this.movementSpeed = this.instance.speed;
        },this.scene);

        this.scene.input.keyboard.on("keyup-A",()=>{
            this.movementSpeed = 0;
        },this.scene);
        this.scene.input.keyboard.on("keyup-D",()=>{
            this.movementSpeed = 0;
        },this.scene);
    }

    fire() {
        this.scene.input.keyboard.on("keydown-SPACE",()=>{
            new PlayerProjectile({
                name : "blast",
                texture : "blast",
                scene : this.scene,
                speed : 100,
                x: this.container.x,
                y: this.container.y - 20,
                runTime : true

            })
        },this.scene);
    }
}   