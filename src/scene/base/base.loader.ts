import { Scene } from "phaser";
import BaseScene from "./base";
import * as assetManifest from "../../assets/assetManifest.json";
import { ITileChunks, ITileLayer, ITileMap } from "../data/base.data";

interface IAnimationList {
    key: string,
    animations: string[]
}

interface iManifest {
    base: string,
    sprites: {
        atlas: string[],
        images: string[]
    }
    tilemaps: string[],
    tilesprites: string[]
}

let manifest: iManifest = assetManifest;

export let animationList: IAnimationList[] = [];

export async function spriteLoader(scene: BaseScene): Promise<void> {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                for (let [key, value] of Object.entries(manifest.sprites.atlas)) {
                    scene.load.setBaseURL("/assets/sprites/");

                    let filterValue = value.split(".")[0];

                    await scene.load.aseprite(filterValue, `${value.split(".")[0]}.png`, value);
                    scene.animations.push(value.split(".")[0]);
                }

                resolve();
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })

    } catch (err) {
        throw new Error(`cannot find game manifest: ${err}`);
    }
}

export async function tilemapLoader(scene: BaseScene): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            for (let [key, value] of Object.entries(manifest.tilemaps)) {
                scene.load.setBaseURL("/assets/tilemaps/");
                scene.load.image(value.split(".")[0], `${value.split(".")[0]}.png`);
                scene.load.tilemapTiledJSON(value.split(".")[0], value);
            }
            resolve();
        } catch (err: any) {
            alert(err.message);
            reject(err.message);
        }
    })
}

export function createMap(scene: BaseScene, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        scene.map = scene.make.tilemap({ key: value });
        const tiles = scene.map.addTilesetImage(value);

        scene.map.layers.forEach(element => {
            const layer = scene.map.createLayer(element.name, tiles, -384, -128);
            console.log(layer);
        });
        resolve();
    })
}

export function loadTileSprites(scene: BaseScene): Promise<void> {
    return new Promise((resolve, reject) => {
        for (let [key, value] of Object.entries(manifest.tilesprites)) {
            scene.load.setBaseURL("/assets/tilesprites/");
            scene.load.image(`tilesprite_${value.split(".")[0]}`, value);
        }
        resolve();
    })
}