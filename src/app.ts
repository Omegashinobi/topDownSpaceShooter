import Phaser, { Scale } from "phaser";
import BaseScene from "./scene/base/base";
import Level1 from "./scene/level1";

let scenes = [
    new Level1()
]

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: scenes,
    scale : {
        mode : Phaser.Scale.FIT
    }
}

export const app = new Phaser.Game(config);

// @ts-ignore
globalThis.__PHASER_GAME__ = app;
