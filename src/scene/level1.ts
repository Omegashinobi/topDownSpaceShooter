import Enemy from "../components/enemy/enemy";
import Mob from "../components/mob/mob";
import Player from "../components/player/player";
import Projectile from "../components/projectile/projectile";
import BaseScene from "./base/base";
import Moblist from "./base/base.mobs"

export default class Level1 extends BaseScene {
    constructor(){
        super();
    }

    async preload() : Promise<void> {
        super.preload();
    }

    async create() : Promise<void> {
        super.create();
    }

    async update(time: number, delta: number) : Promise<void> {
        super.update(time,delta);
    }
}