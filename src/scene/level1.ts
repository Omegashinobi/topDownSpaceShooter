import Enemy from "../components/enemy/enemy";
import { EMobType, IMob } from "../components/mob/data/mob";
import Mob from "../components/mob/mob";
import Player from "../components/player/player";
import Projectile from "../components/projectile/projectile";
import BaseScene from "./base/base";
import Moblist from "./base/base.mobs"

export default class Level1 extends BaseScene {
    constructor(){
        super();
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