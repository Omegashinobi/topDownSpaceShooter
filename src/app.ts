import Phaser, { Scale, Scene } from "phaser";
import BaseScene from "./scene/base/base";
import Level1 from "./scene/level1";

let scenes = [
    new Level1()
]

export const MAX_SIZE_WIDTH_SCREEN = 640;
export const MAX_SIZE_HEIGHT_SCREEN = 480;
export const MIN_SIZE_WIDTH_SCREEN = window.innerWidth;
export const MIN_SIZE_HEIGHT_SCREEN = window.innerHeight;
export const SIZE_WIDTH_SCREEN = 640;
export const SIZE_HEIGHT_SCREEN = 480;

let parentContainer = document.getElementsByTagName("body").item(0);

const config = {
    type: Phaser.AUTO,
    scene: scenes,
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: parentContainer,
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    pixelArt: true
}

export const app = new Phaser.Game(config);

// @ts-ignore
globalThis.__PHASER_GAME__ = app;
