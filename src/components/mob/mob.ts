import BaseScene from "../../scene/base/base";
import { TMobType, IDebugOptions, IEnemyOptions, IMob, TMovementType } from "./data/mob";

interface Constructor<Type extends Mob> {
    new(): Type;
}

export default class Mob {
    protected type: TMobType;
    protected movementType: TMovementType;
    protected texture: string;
    readonly id: string = this.assignUUID();
    readonly name: string;
    protected textures: any;
    protected animations: Phaser.Animations.Animation[] = [];
    public sprite: Phaser.GameObjects.Sprite;
    public body: Phaser.Physics.Arcade.Body;
    protected hasIdle: boolean;
    protected scene: BaseScene;
    protected actions: any;
    protected actionsPlaying: boolean = false;
    protected _active: boolean = true;
    public container: Phaser.Physics.Arcade.Sprite;
    public instance: IMob;
    public canDamage: boolean = true;
    protected onDeath: any;
    public destoryChildren: boolean = false;

    protected childMobs: Mob[];
    protected parentMob: Mob;

    public set active(value: boolean) {
        this._active = value;
        value ? this.onSetActive : this.onSetDeactive;
    }
    protected onSetActive: () => void;
    protected onSetDeactive: () => void;

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
            enabled: false,
            graphics: this.scene.add.graphics()
        }
        this.container = this.scene.physics.add.sprite(this.instance.x, this.instance.y, this.instance.texture);
        this.container.setVisible(false);
        this.sprite = new Phaser.GameObjects.Sprite(this.scene,0,0,this.instance.texture);
        this.sprite.addToDisplayList()

        this.scene.anims.createFromAseprite(this.instance.texture,undefined,this.sprite);

        this.sprite.play({ key: `idle`, repeat: -1 });
 
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
        this.instance.x = this.container.x;
        this.instance.y = this.container.y;

        this.sprite.setPosition(this.instance.x,this.instance.y);
        if (this.debug.enabled) {
            this.debugUpdate();
        }

        this.deathCheck();
    }

    debugCreate() {
        this.debugOptions = {
            positionText: this.scene.add.text(
                (0 + this.container.width) + 5,
                0,
                `${this.container.x} , ${this.container.y}`)
        }

        // this.scene.input.setDraggable(this.sprite);

        this.scene.input.on('drag', (pointe: any, gameObject: any, dragX: any, dragY: any) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    debugUpdate() {
        this.debugOptions.positionText.text = `${Math.round(this.container.x)},${Math.round(this.container.y)}`;
        this.debugOptions.positionText.setPosition(this.container.x + 20,this.container.y)
    }

    createCollisionData(otherTag: string) {
        const collisionList = this.scene.findGameObjectsWithTag(otherTag);
        collisionList.forEach((e) => {
            const other: Mob = e;
            this.scene.physics.add.collider(
                this.container,
                other.container, (
                    _this: Phaser.Types.Physics.Arcade.GameObjectWithBody,
                    _that: Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
                if (_this.body.checkCollision && _that.body.checkCollision) {
                    this.onCollisionFunction(other);
                }
            });
        });
    }

    public deathCheck() {
        if (this.instance.health !== undefined && this.instance.health <= 0) {
            this.onDeath();
        }
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
        this.scene.destroyMob(this);
        if (this.score && this.instance.health === 0) {
            this.showDamageAnimation();
            this.scene.score += this.score;
            this.scene.combo++;
        }
        if(this.destoryChildren) {
            this.childMobs.forEach(e => e.destroy); 
        }
        this.actions?.clear();
        this.container.destroy();
        this.sprite.destroy();
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

    setParentMob(mob: Mob) {
        this.parentMob = mob;
        mob.parentMob.childMobs.push(this);
    }

    setChildMob(mob: Mob) {
        this.childMobs.push(mob);
        mob.parentMob = this;
    }

    public correctSpriteRotation(){
        let rot = this.container.rotation;
        this.sprite.setRotation(Mob.counterRotation(rot));
    }

    public static counterRotation(originalRot : number) {
        return (-Math.PI + (originalRot - (Math.PI/2)));
    }

    public static spawn<T extends Mob>(options: IMob, mobType: Constructor<T>) {
        const instance = new mobType();
        options.scene.addToMobList(instance);
        instance.create(options);
        return instance;
    }

    public static getAngle(obj1 : Phaser.Geom.Point ,obj2: Phaser.Geom.Point ) {
        return (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI)
    }

    public static getRotation(obj1 : Phaser.Geom.Point ,obj2: Phaser.Geom.Point) {
        return Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    }
}     