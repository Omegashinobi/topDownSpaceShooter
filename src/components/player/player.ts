import Mob, { IMob } from "../mob";

export default class Player extends Mob {
    sprite : Phaser.GameObjects.Sprite;

    constructor(options : IMob) {
        super(options);
    }

    movement() {
        this.instance.scene.input.keyboard.on("keydown-A",()=>{
            this.sprite.setX(this.sprite.x * -this.instance.speed);
        },this.instance.scene);
        this.instance.scene.input.keyboard.on("keydown-D",()=>{
            this.sprite.setX(this.sprite.x * -this.instance.speed);
        },this.instance.scene);
    }

    update(time: number, delta: number): void {
        this.movement();
    }
}   