import Phaser, { Scale } from "phaser";
import BaseScene from "./scene/base/base";
import Level1 from "./scene/level1";

let scenes = [
    new Level1()
]

export const MAX_SIZE_WIDTH_SCREEN = 800
export const MAX_SIZE_HEIGHT_SCREEN = 600
export const MIN_SIZE_WIDTH_SCREEN = 270
export const MIN_SIZE_HEIGHT_SCREEN = 480
export const SIZE_WIDTH_SCREEN = 800
export const SIZE_HEIGHT_SCREEN = 600

const config = {
    type: Phaser.AUTO,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN, 
    scene: scenes,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
}

export const app = new Phaser.Game(config);

// @ts-ignore
globalThis.__PHASER_GAME__ = app;
