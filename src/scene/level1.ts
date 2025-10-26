import BaseScene from "./base/base";

export default class Level1 extends BaseScene {
    constructor(){
        super();
    }

    async preload() : Promise<void> {
        super.preload();
    }

    async create() : Promise<void> {
        this.levelName = "level1";
        await super.create();
        this.player.active = true;
    }

    async update(time: number, delta: number) : Promise<void> {
        super.update(time,delta);
    }
}