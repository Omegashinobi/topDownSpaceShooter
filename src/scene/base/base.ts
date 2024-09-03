import Mob from "../../components/mob/mob";
import mobList from "./base.mobs";
import { createMap, loadEnemyData, loadTileSprites, setupEnemyData, spriteLoader, tilemapLoader } from "./base.loader";
import UI from "../../components/UI/UI";
import ComboMeter from "../../components/UI/comboMeter";
import ScoreMeter from "../../components/UI/scoreMeter";
import UIContainer from "../../components/UI/UIContainer";
import EnemyTracker from "../../components/enemy/enemyTracker";
import parallax from "../../components/actions/parallax";
import Player from "../../components/player/player";

export default class BaseScene extends Phaser.Scene {

    private _score: number[] = [0];
    public get score(): number {
        return this._score[0];
    }
    public set score(value: number) {
        this._score[0] = (value * this.combo);
    }

    private _combo: number[] = [1];
    public get combo(): number {
        return this._combo[0];
    }
    public set combo(value: number) {
        this._combo[0] = value;
    }

    private _comboTimer: number[] = [0];
    public get comboTimer(): number {
        return this._comboTimer[0];
    }
    public set comboTimer(value: number) {
        this._comboTimer[0] = value;
    }

    private _timer: number[] = [0];
    public get timer(): number {
        return this._timer[0];
    }
    private set timer(value: number) {
        this._timer[0] = value;
    }

    private _animations: string[] = [];
    public get animations(): string[] {
        return this._animations;
    }
    public set animations(value: string) {
        this._animations.push(value);
    }

    private mobs: Mob[] = [];
    private enemyTracker: EnemyTracker;
    private UIcontainer = new UIContainer(this);
    private UI: UI[] = [
        new ComboMeter({ x: 100, y: 100, name: "Combo Meter" }, this, this._combo, this._comboTimer),
        new ScoreMeter({ x: 100, y: 10, name: "Score Meter" }, this, this._score)
    ];

    public backGroundCamera: any;

    private loaders: Promise<void>[];

    public debug: boolean = true;
    public debugSelected: any;

    public map: Phaser.Tilemaps.Tilemap;
    public layoutMap: Phaser.Tilemaps.Tilemap[] = [];

    public background: Phaser.GameObjects.TileSprite[] = [];
    public player: Mob;


    constructor() {
        super();
    }

    public async preload(): Promise<void> {
        let OK: boolean;
        this.loaders = [spriteLoader(this), tilemapLoader(this), loadTileSprites(this), loadEnemyData(this)]
        await Promise.allSettled(this.loaders).then((data) => {
            OK = data.every((el) => {
                return el.status === "fulfilled";
            });
            if (OK) {
                this.enemyTracker = new EnemyTracker();
            }
        });
    }

    public async create(): Promise<void> {
        let OK: boolean;
        await Promise.allSettled(this.loaders).then((data) => {
            OK = data.every((el) => {
                return el.status === "fulfilled";
            });
            if (OK) {

                this.background[0] = this.add.tileSprite(0, 0, 0, 0, "tilesprite_stars_1");
                this.background[1] = this.add.tileSprite(0, 0, 0, 0, "tilesprite_stars_2");
                this.background[2] = this.add.tileSprite(0, 0, 0, 0, "tilesprite_stars_3");

                this.background[1].tilePositionX += 32;
                this.background[2].tilePositionX -= 32;

                createMap(this, "level1");
                mobList(this);
                setupEnemyData(this,"level1");

                this.enemyTracker.create(this);
                this.physics.world.enable(this.mobs.map((e: Mob) => e.container), 0);

                this.UIcontainer.create();
                this.UI.forEach((e) => {
                    e.create(this.UIcontainer);
                });

                this.player = this.findGameObjectWithTag("player");
            }
        })
    }

    public async update(time: number, delta: number): Promise<void> {
        let OK: boolean;
        await Promise.allSettled(this.loaders).then((data) => {
            OK = data.every((el) => {
                return el.status === "fulfilled";
            });
            if (OK) {
                this.mobs.forEach((e) => {
                    e.update(time, delta);
                });

                this.enemyTracker.update(time, delta);
                this.UI.forEach((e: UI) => {
                    e.update(time, delta);
                });

                this.background[1].tilePositionY -= 0.4;
                this.background[2].tilePositionY -= 0.6;


                this.timer += delta;

                if(this.enemyTracker.isMoving) {
                    this.map.layers.forEach((e : Phaser.Tilemaps.LayerData )=>{
                        e.tilemapLayer.y += delta;
                    })
                }
            }

        })
    }

    public findGameObjectWithTag(tag: string): Mob {
        return this.mobs.find((e) => { return e.instance.tag === tag })
    }

    public findGameObjectsWithTag(tag: string): Mob[] {
        let list: Mob[] = [];

        this.mobs.forEach((e: Mob) => {
            if (e.instance.tag === tag) {
                list.push(e);
            }
        })

        return list;
    }

    public findMobByName(name: string): Mob {
        return this.mobs.find((e) => { return e.instance.name === name });
    }

    public checkDuplicateName(name: string): boolean {
        return this.mobs.find((e: Mob) => { e.name === name }) !== undefined;
    }

    public destroyMob(mob: Mob) {
        let index: number;
        this.mobs.forEach((e, i) => {
            if ((e.id === mob.id)) {
                e.container.destroy(true);
                index = i;
            };
        })
        this.mobs.splice(index, 1);
        mob = null;
    }

    public addToMobList(mob: Mob) {
        this.mobs.push(mob);
    }

    public paralexOffset(layer: Phaser.Tilemaps.LayerData, offsetX: number, offsetY: number, speed: number) {
        const mob = this.findGameObjectWithTag("player");

        if (mob) {
            layer.tilemapLayer.x = mob.instance.x - offsetX;
            layer.tilemapLayer.y = mob.instance.y - offsetY;
        }

    }
}