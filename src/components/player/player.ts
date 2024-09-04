import { app } from "../../app";
import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import PlayerProjectile from "../projectile/playerProjectile";
import Projectile from "../projectile/projectile";
import InputHandler from "../../util/inputHandler"
;export default class Player extends Mob {

    maxFireRate: number = 200;
    currFireRate: number = 0;

    bounds: {
        left: number,
        right: number,
        top: number,
        bottom : number
    }

    constructor() {
        super();
    }

    create(options: IMob): void {
        super.create(options);

        this.bounds = {
            left: 32,
            right: 608,
            top: 0,
            bottom: 608
        }

        InputHandler.assign(this.scene);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        this.currFireRate -= delta;

        this.movement(delta);
        this.fire();

        InputHandler.waitForGamePadInput(this.scene);
    }

    movement(delta: number) {
        if (InputHandler.keyboardInput.left.isDown || (InputHandler.gamepadReady ? InputHandler.joyPadInput.right.isDown : null)) {
            this.container.x -= this.instance.speed / delta;
            if (this.container.x < this.bounds.left) {
                this.container.x = this.bounds.left;
            }
        } else {
            this.movementSpeed = 0
        }
        if (InputHandler.keyboardInput.right.isDown || (InputHandler.gamepadReady ? InputHandler.joyPadInput.right.isDown : null)) {
            this.container.x += this.instance.speed / delta;
            if (this.container.x > this.bounds.right) {
                this.container.x = this.bounds.right;
            }
        } else {
            this.movementSpeed = 0
        }
        if (InputHandler.keyboardInput.up.isDown || (InputHandler.gamepadReady ? InputHandler.joyPadInput.up.isDown : null)) {
            this.container.y -= this.instance.speed / delta;
            if (this.container.y < this.bounds.top) {
                this.container.y = this.bounds.top;
            }
        } else {
            this.movementSpeed = 0
        }
        if (InputHandler.keyboardInput.down.isDown || (InputHandler.gamepadReady ? InputHandler.joyPadInput.down.isDown : null)) {
            this.container.y += this.instance.speed / delta;
            if (this.container.y > this.bounds.bottom) {
                this.container.y = this.bounds.bottom;
            }
        } else {
            this.movementSpeed = 0
        }
    }

    fire() {
        if (InputHandler.keyboardInput.fire.isDown || (InputHandler.gamepadReady ? InputHandler.joyPadInput.fire.isDown : null)) {
            if (this.currFireRate <= 0) {
                this.currFireRate = this.maxFireRate;
                PlayerProjectile.spawn({
                    type: "projectile",
                    name: "blast",
                    texture: "blast",
                    scene: this.scene,
                    speed: 50,
                    x: this.instance.x,
                    y: this.instance.y - 40,
                    runTime: true,
                    hitArea: new Phaser.Geom.Rectangle(0, 0, 32, 32)
                }, PlayerProjectile)
            }
        }
    }
}   