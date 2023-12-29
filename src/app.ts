import Phaser, { Scale } from "phaser";
import BaseScene from "./scene/base/base";

let scenes = [
    new BaseScene()
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

const app = new Phaser.Game(config);