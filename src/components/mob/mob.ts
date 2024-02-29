import BaseScene from "../../scene/base/base";
import { EMobType, IDebugOptions, IMob } from "./data/mob";

export default class Mob {
    protected type: EMobType;
    protected texture: string;
    readonly id: string = this.assignUUID();
    readonly name: string;
    protected textures: any;
    protected animations: Phaser.Animations.Animation[] = [];
    protected sprite: Phaser.Physics.Arcade.Sprite;
    protected body: Phaser.Physics.Arcade.Body;
    protected hasIdle: boolean;
    protected scene: BaseScene;
    public container: Phaser.GameObjects.Container;
    public instance: IMob;
    movementSpeed = 0;
    speed: number;

    x: number;
    y: number;

    debug: {
        enabled: boolean,
        graphics: Phaser.GameObjects.Graphics
    }

    debugOptions: IDebugOptions;

    onPointerUp: any
    onCollision: any;

    collisionList: string[];

    hitArea: Phaser.Geom.Rectangle;

    score: number;

    constructor() { }

    preload() {
        this.onPointerUpFunction(this.onPointerUp);
    }

    create(options: IMob): void {
        this.scene = options.scene;
        this.instance = options;
        this.hitArea = options.hitArea;

        this.debug = {
            enabled: true,
            graphics: this.scene.add.graphics()
        }

        this.container = this.scene.add.container(this.instance.x, this.instance.y);
        this.sprite = this.scene.physics.add.sprite(0, 0, this.instance.texture);
        this.sprite.setOrigin(0);

        this.container.add(this.sprite);     

        this.container.setInteractive(this.hitArea, Phaser.Geom.Rectangle.Contains);
        this.body = this.container.body as Phaser.Physics.Arcade.Body;

        if (this.collisionList) {
            this.collisionList.forEach((e: string) => {
                this.createCollisionData(e);
            })
        };

        if (this.debug.enabled) {
            this.debugCreate();
        }

        this.setName();
    }

    setName() {
        if (!this.scene.checkDuplicateName(this.instance.name)) {
            this.container.name = `${this.instance.name}_0`;
        } else {
            if (this.instance.name.split("_")[1] !== undefined) {
                let num = parseInt(this.instance.name.split("_")[1]);
                num += 1;
                this.instance.name = `${this.instance.name.split("_")[0]}_${num}`;
                this.setName();
            }
        }
    }

    update(time: number, delta: number): void {
        if (this.debug.enabled) {
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
    }

    debugUpdate() {
        this.debugOptions.positionText.text = `${Math.round(this.container.x)},${Math.round(this.container.y)}`;
    }

    createCollisionData(otherTag: string) {
        const collisionList = this.scene.findGameObjectsWithTag(otherTag);
        collisionList.forEach((e) => {
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

    assignUUID() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    destroy() {
        this.showDamageAnimation();
        this.scene.destroyMob(this);

        if (this.score && this.instance.health === 0) {
            this.scene.score += this.score;
            this.scene.combo++;
        }

        this.container.destroy();
    }

    setRand(max: number, min: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    showDamageAnimation(): void {
        this.sprite.setTint(0xff0000);

        this.scene.tweens.add({
            targets: this.sprite,
            duration: 2000,
            onComplete: () => {
                this.sprite.setTint(0xffffff);
            }
        }).play();
    }
}     