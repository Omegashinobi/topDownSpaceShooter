import BaseScene from "../scene/base/base";

export interface IMob {
    name : string,
    texture : string,
    speed : number,
    scene : BaseScene,
    // animations : [Phaser.Types.Animations.Animation]
    x : number,
    y : number,
    runTime : boolean
}

export interface IDebugOptions {
    positionText : Phaser.GameObjects.Text,
}

export default class Mob {
    textures : any;
    instance : IMob;
    animations : Phaser.Animations.Animation[] = [];
    sprite : Phaser.GameObjects.Sprite;
    hasIdle : boolean;
    scene: BaseScene;
    container : Phaser.GameObjects.Container;

    debug : boolean = true;
    debugOptions : IDebugOptions;

    onPointerUp : any

    constructor(options : IMob) {
        this.scene = options.scene;
        this.instance = options;

        if(this.instance.runTime) {
            this.container = this.scene.add.container(this.instance.x,this.instance.y);
            this.create();
            this.scene.mobs.push(this);
        }
    }

    preload() {
        this.onPointerUpFunction(this.onPointerUp);
    }

    create() {

        if(!this.instance.runTime) {
            this.container = this.scene.add.container(this.instance.x,this.instance.y);
        }

        this.sprite = this.scene.add.sprite(0,0,this.instance.texture);

        this.container.add(this.sprite);
        this.container.setSize(
            this.sprite.width,
            this.sprite.height
        );
        this.container.setInteractive();

        if(this.debug) {
            this.debugCreate();
        }
    }

    update(time: number, delta: number): void {
        if(this.debug) {
            this.debugUpdate();
        }
    }

    debugCreate() {
        this.debugOptions = {
            positionText : this.scene.add.text(
                (0 + this.sprite.width) + 5,
                0,
                `${this.container.x} , ${this.container.y}`)
        }

        this.scene.input.setDraggable(this.container);

        this.scene.input.on('drag', (pointe : any, gameObject : any, dragX : any, dragY : any) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.container.add(this.debugOptions.positionText);

    }

    debugUpdate() {
        this.debugOptions.positionText.text = `${Math.round(this.container.x)},${Math.round(this.container.y)}`;
    }

    onPointerUpFunction(func : any) {
        if(this.onPointerUp) {
            this.scene.input.on('pointerup',func);
        }
    }
}   