export interface IMob {
    name : string,
    scene : Phaser.Scene,
    texture : string,
    speed : number
    animations : [Phaser.Types.Animations.Animation]
}

export interface IDebugOptions {
    positionText : Phaser.GameObjects.Text
}

export default class Mob {
    position : {x : 0, y: 0};
    textures : any;
    instance : IMob;
    animations : Phaser.Animations.Animation[] = [];
    sprite : Phaser.GameObjects.Sprite;
    hasIdle : boolean;

    debug : boolean = true;
    debugOptions : IDebugOptions;

    constructor(options : IMob) {
        this.instance = options;
    }

    preload() {
        
    }

    create() {
        if(this.debug) {
            this.debugCreate();
        }
        this.textures = this.instance.scene.textures.get("spaceship")
        this.sprite = this.instance.scene.add.sprite(this.position.x,this.position.y,this.instance.texture,this.instance.animations[0].frames+"/0" as string);
        this.animations = this.instance.animations.map((e)=>{
            if((e.key as string) === "idle") {
                this.hasIdle = true;
            }
            return this.instance.scene.anims.create(e);
        }) as Phaser.Animations.Animation[];
        if(!this.hasIdle) {
            throw new Error(`No Idle animation found for >>> ${this.instance.name}`);
        }
        this.sprite.play("idle");
    }

    update(time: number, delta: number): void {
        if(this.debug) {
            this.debugUpdate();
        }

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }

    debugCreate() {
        this.debugOptions.positionText = this.instance.scene.add.text(
            (this.position.x + this.sprite.width) + 5,
            this.position.y,
            `${this.position.x} , ${this.position.y}`);
    }

    debugUpdate() {
        this.debugOptions.positionText.text = `${this.position.x} , ${this.position.y}`;
    }
}   