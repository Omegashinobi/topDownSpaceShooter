import { app } from "../../app";
import { EMobType, IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import PlayerProjectile from "../projectile/playerProjectile";
import Projectile from "../projectile/projectile";

export default class Player extends Mob {

    maxFireRate : number = 300;
    currFireRate : number = 0;

    input : {
        A : any;
        D : any;
        Space : any;
    }

    constructor() {
        super();
    }

    create(options: IMob): void {
        super.create(options);

        this.input = {
            A : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            Space : this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }
    }

    update(time: number, delta: number): void {
        super.update(time,delta);
        this.currFireRate -= delta;

        this.movement(delta);
        this.fire();
    }

    movement(delta : number) {
        if(this.input.A.isDown) {
            this.container.x -= this.instance.speed/delta;
        } else {
            this.movementSpeed = 0
        }
        if(this.input.D.isDown) {
            this.container.x += this.instance.speed/delta;
        } else {
            this.movementSpeed = 0
        }
    }

    fire() {
        if(this.input.Space.isDown) {
            if(this.currFireRate <= 0) {
                this.currFireRate = this.maxFireRate;
                const proj = new PlayerProjectile()
                this.scene.addToMobList(proj,{
                    type : EMobType.projectile,   
                    name : "blast",
                    texture : "blast",
                    scene : this.scene,
                    speed : 300,
                    x: this.container.x,
                    y: this.container.y - 20,
                    runTime : true,
                    hitArea : new Phaser.Geom.Rectangle(0,0,32,32)
                })
            }
        }
    }
}   