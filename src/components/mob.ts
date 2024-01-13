import BaseScene from "../scene/base/base";

export interface IMob {
    name: string,
    tag?: string
    texture: string,
    speed: number,
    scene: BaseScene,
    x: number,
    y: number,
    runTime: boolean,
    health?: number,
    killOnOutOfBounds?: boolean
    hitArea : any,
}

export interface IDebugOptions {
    positionText: Phaser.GameObjects.Text,
}

export interface IMovementTween {
    at : number,
    duration: number,
    x: number,
    y: number,
    delay: number,
    ease: string,
    repeat: number,
    event? : string
}

export default class Mob {
    id : string = this.assignUUID();
    textures: any;
    instance: IMob;
    animations: Phaser.Animations.Animation[] = [];
    sprite: Phaser.Physics.Arcade.Sprite;
    hasIdle: boolean;
    scene: BaseScene;
    container: Phaser.GameObjects.Container;
    movementSpeed = 0;

    debug: boolean = true;
    debugOptions: IDebugOptions;

    onPointerUp: any
    onCollision: any;

    collisionList: string[];

    hitArea : any;

    score : number;

    constructor(options: IMob) {
        this.scene = options.scene;
        this.instance = options;
        this.hitArea = options.hitArea;


        if (this.instance.runTime) {
            this.container = this.scene.add.container(this.instance.x, this.instance.y);
            this.create();

            this.scene.mobs.push(this);
        }
    }

    preload() {
        this.onPointerUpFunction(this.onPointerUp);
    }

    create() {
        if (!this.instance.runTime) {
            this.container = this.scene.add.container(this.instance.x, this.instance.y);
        }

        this.sprite = this.scene.physics.add.sprite(0, 0, this.instance.texture);

        this.container.add(this.sprite);
        this.container.setSize(
            this.sprite.width,
            this.sprite.height
        );

        this.container.setInteractive(this.hitArea, Phaser.Geom.Rectangle.Contains);

        if (this.collisionList) {
            this.collisionList.forEach((e: string) => {
                this.createCollisionData(e);
            })
        };

        if (this.debug) {
            this.debugCreate();
        }

        this.scene.mobs.forEach((e: Mob) => {
            this.checkDuplicateName(e.instance.name);
        });

        this.container.name = this.instance.name;
    }

    update(time: number, delta: number): void {
        if (this.debug) {
            this.debugUpdate();
        }
    }

    debugCreate() {
        this.debugOptions = {
            positionText: this.scene.add.text(
                (0 + this.sprite.width) + 5,
                0,
                `${this.container.x} , ${this.container.y}`)
        }

        this.scene.input.setDraggable(this.container);

        this.scene.input.on('drag', (pointe: any, gameObject: any, dragX: any, dragY: any) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.container.add(this.debugOptions.positionText);

        const graphics : Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0x00ffff, 1);
        graphics.strokeRect(this.hitArea.x,this.hitArea.y,this.hitArea.width,this.hitArea.height);

        this.container.add(graphics);
    }

    debugUpdate() {
        this.debugOptions.positionText.text = `${Math.round(this.container.x)},${Math.round(this.container.y)}`;
    }

    createCollisionData(otherTag: string) {
        const collisionList = this.scene.findGameObjectsWithTag(otherTag);
        collisionList.forEach((e)=>{
            const other: Mob = e;
            this.scene.physics.add.collider(
                this.sprite,
                other.sprite, (
                    _this: Phaser.Types.Physics.Arcade.GameObjectWithBody,
                    _that: Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
                if (_this.body.checkCollision && _that.body.checkCollision) {
                    this.onCollisionFunction(other);
                }
            });
        });
    }

    onPointerUpFunction(func: any) {
        if (this.onPointerUp) {
            this.scene.input.on('pointerup', func);
        }
    }

    onCollisionFunction(other: Mob) {
        if (this.onCollision) {
            this.onCollision(other);
        }
    }

    getMob(id: string): Mob {
        let data: Mob
        this.scene.mobs.forEach((e: Mob) => {
            if (e.instance.name === "") {
                data = e;
            }
        });

        return data;
    }

    checkDuplicateName(id: string): boolean {
        if (id === this.instance.name) {
            if (this.instance.name.split("_")[1] !== undefined) {
                let num = parseInt(this.instance.name.split("_")[1]);
                num += 1;
                this.instance.name = `${this.instance.name.split("_")[0]}_${num}`;

                this.checkDuplicateName(id);
            } else {
                this.instance.name = `${this.instance.name}_0`;
            }
        }
        return false;
    }

    checkIfOutOfBounds() {

    }

    addToCollisionGroup() {

    }

    assignUUID() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c : any) =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }


    destroy() {
        this.container.destroy();
        this.scene.destroyMob(this);

        if(this.score && this.instance.health === 0) {
            this.scene.score += this.score;
            this.scene.combo++;
        }
    }

    setRand(max : number,min : number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}     