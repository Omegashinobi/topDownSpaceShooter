import Mob from "../../components/mob";
import mobList from "./base.mobs";
import baseLoader from "./base.loader";

export default class BaseScene extends Phaser.Scene {
    mobs : Mob[];
    animations : string[] = [];
    loaded : Promise<void>;

    debug : boolean = true;
    debugSelected : any;

    timer : number = 0;

    constructor(){
        super();
    }

    async preload() {        
        this.loaded = baseLoader(this);
        
        this.loaded.then(()=>{
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

            this.mobs.forEach((e)=>{
                e.create();
            });
        });

    }

    update(time: number, delta: number): void {
        this.loaded.then(()=>{
            this.mobs.forEach((e)=>{
                e.update(time,delta);
            });
        });

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