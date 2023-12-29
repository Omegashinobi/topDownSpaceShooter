import BaseScene from "./base/base";
import Moblist from "./base/base.mobs"

export default class Level1 extends BaseScene {
    constructor(){
        super();
        this.mobs = Moblist(this);
    }

    async preload() {
        super.preload();
    }

    create() {
        super.create();
    }

    update(time: number, delta: number): void {
        super.update(time,delta);
    }
}