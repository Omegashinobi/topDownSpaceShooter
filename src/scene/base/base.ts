import Mob from "../../components/mob/mob";
import mobList from "./base.mobs";
import baseLoader from "./base.loader";
import UI from "../../components/UI/UI";
import ComboMeter from "../../components/UI/comboMeter";
import ScoreMeter from "../../components/UI/scoreMeter";
import UIContainer from "../../components/UI/UIContainer";
import EnemyTracker from "../../components/enemy/enemyTracker";
import Enemy from "../../components/enemy/enemy";
import { EEnemyType, EMobType, IEnemyOptions, IMob } from "../../components/mob/data/mob";
import Player from "../../components/player/player";
import Projectile from "../../components/projectile/projectile";
import Turret from "../../components/enemy/turret";
import BeamEnemy from "../../components/enemy/beamEnemy";

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
    public get animations() : string[] {
        return this._animations;
    }
    public set animations(value : string) {
        this._animations.push(value);
    }

    private mobs: Mob[];
    private enemyTracker: EnemyTracker;
    private UIcontainer = new UIContainer(this);
    private UI: UI[] = [
        new ComboMeter({ x: 100, y: 100, name: "Combo Meter" }, this, this._combo, this._comboTimer),
        new ScoreMeter({ x: 100, y: 10, name: "Score Meter" }, this, this._score)
    ];
    private loaded: Promise<void>;

    public debug: boolean = true;
    public debugSelected: any;
    
    constructor() {
        super();
        this.mobs = mobList(this).map(this.setUpMobs.bind(this));
    }

    public setUpMobs(e : IMob & IEnemyOptions) : Mob {
        let instance: Mob;
        switch (e.type) {
            case EMobType.player: {
                instance = new Player() as Mob;
                break;
            }
            case EMobType.enemy: {
                instance = this.selectEnemyType(e.enemyType);
                break;
            }
            case EMobType.projectile: {
                instance = new Projectile() as Mob;
                break;
            }
        }
        return instance;
    }

    public selectEnemyType(e: EEnemyType) {
        let instance: Mob;
        switch (e) {
            case EEnemyType.standard: {
                instance = new Enemy() as Mob;
                break;
            }
            case EEnemyType.beam: {
                instance = new BeamEnemy() as Mob;
                break;
            }
            case EEnemyType.turret: {
                instance = new Turret() as Mob;
                break;
            }
            default : {
                instance = new Enemy() as Mob;
            }
        }
        return instance;
    }

    public async preload() {
        this.loaded = baseLoader(this);

        this.loaded.then(() => {

            this.enemyTracker = new EnemyTracker();

            this.mobs.forEach((e) => {
                e.preload();
            });
        })

    }

    public create() {
        this.loaded.then(() => {

            this.animations.forEach((e) => {
                this.anims.createFromAseprite(e);
            });

            this.mobs.forEach((e, i) => {
                e.create(mobList(this)[i]);
            })

            this.enemyTracker.create(this);
            this.physics.world.enable(this.mobs.map((e: Mob) => e.container), 0);

            this.UIcontainer.create();
            this.UI.forEach((e) => {
                e.create(this.UIcontainer);
            })
        });
    }

    public update(time: number, delta: number): void {

        this.enemyTracker.update(time, delta);

        this.loaded.then(() => {
            this.mobs.forEach((e) => {
                e.update(time, delta);
            });
        });

        this.UI.forEach((e: UI) => {
            e.update(time, delta);
        })
        this.timer += delta;
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
        return this.mobs.find((e) => { return e.name === name });
    }

    public checkDuplicateName(name: string): boolean {
        return this.mobs.find((e: Mob) => { e.name === name }) !== undefined;
    }

    public destroyMob(mob: Mob) {
        let index: number;
        this.mobs.forEach((e, i) => {
            if ((e.id === mob.id)) {
                index = i;
            };
        })
        this.mobs.splice(index, 1);
    }

    public addToMobList(mob: Mob, config: IMob) {
        this.mobs.push(mob);
        mob.create(config);
    }
}