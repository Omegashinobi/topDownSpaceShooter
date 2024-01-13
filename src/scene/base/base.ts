import Mob, { IMob } from "../../components/mob";
import mobList from "./base.mobs";
import baseLoader from "./base.loader";
import UI from "../../components/UI/UI";
import ComboMeter from "../../components/UI/comboMeter";
import ScoreMeter from "../../components/UI/scoreMeter";
import UIContainer from "../../components/UI/UIContainer";
import EnemyTracker from "../../components/enemy/enemyTracker";
import Enemy from "../../components/enemy/enemy";

export default class BaseScene extends Phaser.Scene {

    private _score : number[] = [0];
    get score() : number {
        return this._score[0];
    }

    set score(value : number) {
        this._score[0] = (value * this.combo);
    }

    private _combo : number[] = [1];
    get combo() : number {
        return this._combo[0];
    }

    set combo(value : number) {
        this._combo[0] = value;
    }

    private _comboTimer : number[] = [0];
    get comboTimer() : number {
        return this._comboTimer[0];
    }

    set comboTimer(value : number) {
        this._comboTimer[0] = value;
    }

    timer : number = 0;

    mobs : Mob[];
    enemyTracker : EnemyTracker;
    animations : string[] = [];
    UIcontainer = new UIContainer(this);
    UI : UI[] = [
        new ComboMeter({x:100,y:100,name : "Combo Meter"}, this, this._combo, this._comboTimer),
        new ScoreMeter({x:100, y:10,name : "Score Meter"}, this, this._score)
    ];
    loaded : Promise<void>;

    debug : boolean = true;
    debugSelected : any;

    constructor(){
        super();
    }

    async preload() {        
        this.loaded = baseLoader(this);
        
        this.loaded.then(()=>{

            this.enemyTracker = new EnemyTracker();

            this.mobs.forEach((e)=>{
                e.preload();
            });
        })
        
    }

    create() {
        this.loaded.then(()=>{

            this.animations.forEach((e)=>{
                this.anims.createFromAseprite(e);
            });

            this.enemyTracker.create(this);

            this.mobs.forEach((e : Mob)=>{
                e.create();

                if(e.instance.tag == "enemy") {
                    this.enemyTracker.addEnemy(e as Enemy);
                }
            });

            this.UIcontainer.create();
            this.UI.forEach((e)=>{
                e.create(this.UIcontainer);
            })
        });

    }

    update(time: number, delta: number): void {

        this.enemyTracker.update(time,delta);

        this.loaded.then(()=>{
            this.mobs.forEach((e)=>{
                e.update(time,delta);
            });
        });

        this.UI.forEach((e : UI)=>{

            e.update(time, delta);
        })
        this.timer += delta;
    }

    findGameObjectWithTag(tag : string) : Mob {
        return this.mobs.find((e)=>{return e.instance.tag === tag})
    }

    findGameObjectsWithTag(tag : string) : Mob[] {
        let list : Mob[] = [];

        this.mobs.forEach((e : Mob)=>{
            if(e.instance.tag === tag) {
                list.push(e);
            }
        })

        return list;
    }

    destroyMob(mob : Mob) {
        let index : number;
        
        this.mobs.forEach((e,i)=>{
            if((e.id === mob.id)) {
                index = i;
            };
        })
        
        this.mobs.splice(index,1);
    }
}