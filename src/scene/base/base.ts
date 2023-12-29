import Mob from "../../components/mob";
import mobList from "./base.mobs";
import baseLoader from "./base.loader";

export default class BaseScene extends Phaser.Scene {
    mobs : Mob[];
    loaded : Promise<void>;
    

    constructor(){
        super();
        this.mobs = mobList(this);
    }

    async preload() {
        this.loaded = baseLoader(this);
        
        this.mobs.forEach((e)=>{
            e.preload();
        });
    }

    create() {
        this.loaded.then(()=>{
            this.mobs.forEach((e)=>{
                e.create();
            });
        })

        this.scale.displaySize.setAspectRatio( window.innerWidth / window.innerHeight );
        this.scale.refresh();
    }

    update(time: number, delta: number): void {
        this.mobs.forEach((e)=>{
            e.update(time,delta);
        });
    }
}