import { app } from "../../app";
import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import PlayerProjectile from "../projectile/playerProjectile";
import Projectile from "../projectile/projectile";

export default class Player extends Mob {

    maxFireRate: number = 200;
    currFireRate: number = 0;

    bounds: {
        left: number,
        right: number,
        top: number,
        bottom : number
    }

    input: {
        A: any;
        D: any;
        W: any,
        S: any;
        Space: any;
    }

    constructor() {
        super();
    }

    create(options: IMob): void {
        super.create(options);

        this.bounds = {
            left: 0,
            right: 576,
            top: 0,
            bottom: 415
        }

        this.input = {
            A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            Space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        this.currFireRate -= delta;

        this.movement(delta);
        this.fire();
    }

    movement(delta: number) {
        if (this.input.A.isDown) {
            this.container.x -= this.instance.speed / delta;
            if (this.container.x < this.bounds.left) {
                this.container.x = this.bounds.left;
            }
        } else {
            this.movementSpeed = 0
        }
        if (this.input.D.isDown) {
            this.container.x += this.instance.speed / delta;
            if (this.container.x > this.bounds.right) {
                this.container.x = this.bounds.right;
            }
        } else {
            this.movementSpeed = 0
        }
        if (this.input.W.isDown) {
            this.container.y -= this.instance.speed / delta;
            if (this.container.y < this.bounds.top) {
                this.container.y = this.bounds.top;
            }
        } else {
            this.movementSpeed = 0
        }
        if (this.input.S.isDown) {
            this.container.y += this.instance.speed / delta;
            if (this.container.y > this.bounds.bottom) {
                this.container.y = this.bounds.bottom;
            }
        } else {
            this.movementSpeed = 0
        }
    }

    fire() {
        if (this.input.Space.isDown) {
            if (this.currFireRate <= 0) {
                this.currFireRate = this.maxFireRate;
                PlayerProjectile.spawn({
                    type: "projectile",
                    name: "blast",
                    texture: "blast",
                    scene: this.scene,
                    speed: 50,
                    x: this.instance.x,
                    y: this.instance.y - 20,
                    runTime: true,
                    hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
                }, PlayerProjectile)
            }
        }
    }
}   