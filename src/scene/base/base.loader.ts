import { Scene } from "phaser";
import BaseScene from "./base";
import * as assetManifest from "../../assets/assetManifest.json";
import { ITileChunks, ITileLayer, ITileMap } from "../data/base.data";
import { TMobType } from "../../components/mob/data/mob";
import { findAction } from "./base.actions";
import Mob from "../../components/mob/mob";

interface IAnimationList {
    key: string,
    animations: string[]
}

export interface iManifest {
    base: string,
    sprites: {
        atlas: string[],
        images: string[]
    }
    tilemaps: string[],
    tilesprites: string[],
    layout: string[],
    bitmapFont: string[]
}

let manifest: iManifest = assetManifest;

let files = [];
let queue = new Map<number, { type: string, file: () => void }>

let _loadIndex: number = 0;
let maxLoadIndex: number = 0;

let loadIndex = () => { return maxLoadIndex++ }


export function load(scene: BaseScene): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const loader: Phaser.Loader.LoaderPlugin = new Phaser.Loader.LoaderPlugin(scene);

            spriteLoader(loader, scene, queue);
            tilemapLoader(loader, queue);
            loadTileSprites(loader, queue);
            loadEnemyData(loader, queue);
            loadBitmapFont(loader, scene, queue);

            loader.setBaseURL("/assets/sprites/");
            loader.image("default", "default.png")

            maxLoadIndex = queue.size;

            loader.on("load", async (data: any) => {
                console.log(`loaded: ${data.key} >>> ${data.src} || type: ${data.type}`);
                loader.setBaseURL("/assets/");

                if (_loadIndex < maxLoadIndex) {
                    let nextLoad = queue.get(_loadIndex);

                    _loadIndex++;
                    nextLoad.file();

                }
            });

            loader.on("complete", () => {
                if (_loadIndex === maxLoadIndex) {
                    resolve();
                }
            });

            loader.on("error", (data: any) => {
                reject();
                throw new Error(data);
            });

            loader.start();
        } catch (err) {
            alert(err);
            reject();
        }
    })
}

export let animationList: IAnimationList[] = [];

export async function spriteLoader(loader: Phaser.Loader.LoaderPlugin, scene: BaseScene, queue: Map<number, { type: string, file: () => void }>): Promise<void> {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                for (let [key, value] of Object.entries(manifest.sprites.atlas)) {
                    let filterValue = value.split(".")[0];
                    queue.set(loadIndex(), { type: "aseprite", file: () => loader.aseprite(filterValue, `/sprites/${value.split(".")[0]}.png`, `/sprites/${value}`) });
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

export async function tilemapLoader(loader: Phaser.Loader.LoaderPlugin, queue: Map<number, { type: string, file: () => void }>): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            for (let [key, value] of Object.entries(manifest.tilemaps)) {
                queue.set(loadIndex(), { type: "tilemap_image", file: () => loader.image(value.split(".")[0], `/tileMaps/${value.split(".")[0]}.png`) });
                queue.set(loadIndex(), { type: "tilemap_json", file: () => loader.tilemapTiledJSON(value.split(".")[0], `/tileMaps/${value}`) });
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

export function loadTileSprites(loader: Phaser.Loader.LoaderPlugin, queue: Map<number, { type: string, file: () => void }>): Promise<void> {
    return new Promise(async (resolve, reject) => {
        for (let [key, value] of Object.entries(manifest.tilesprites)) {
            queue.set(loadIndex(), { type: "tilesprite", file: () => loader.image(`tilesprite_${value.split(".")[0]}`, `/tilesprites/${value}`) });
        }
        resolve();
    })
}

export function loadEnemyData(loader: Phaser.Loader.LoaderPlugin, queue: Map<number, { type: string, file: () => void }>): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            for (let [key, value] of Object.entries(manifest.layout)) {
                queue.set(loadIndex(), { type: "enemydata", file: () => loader.tilemapTiledJSON(value.split(".")[0], `/layout/${value}`) });
            }
            resolve();
        } catch (err: any) {
            alert(err.message);
            reject(err.message);
        }
    })
}

export function loadBitmapFont(loader: Phaser.Loader.LoaderPlugin, scene: BaseScene, queue: Map<number, { type: string, file: () => void }>): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            for (let [key, value] of Object.entries(manifest.bitmapFont)) {
                const loaderKey =  value.split(".")[0];
                queue.set(loadIndex(), { type: "bitmapFont", file: () => loader.xml(`${loaderKey}_font`, `/bitmapFont/${loaderKey}.fnt`)});
                queue.set(loadIndex(), { type: "bitmapFont_image", file: () => loader.image(`${loaderKey}_fontImage`, `/bitmapFont/${loaderKey}.png`)});
                scene.bitmapFonts.push(loaderKey);
            }
            resolve();
        } catch (err: any) {
            alert(err.message);
            reject(err.message);
        }
    })
}

export function parseBitmapFont(scene: BaseScene) {
    scene.bitmapFonts.forEach((e) => {
        Phaser.GameObjects.BitmapText.ParseFromAtlas(scene, e, `${e}_fontImage`, undefined, `${e}_font`);
    });
}

