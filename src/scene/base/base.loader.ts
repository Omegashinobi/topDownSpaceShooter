import { Scene } from "phaser";
import BaseScene from "./base";
import * as assetManifest from "../../assets/assetManifest.json";
import { ITileChunks, ITileLayer, ITileMap } from "../data/base.data";
import enemySpawner from "../../util/enemySpawner";
import { TMobType } from "../../components/mob/data/mob";
import { findAction } from "./base.actions";
import Mob from "../../components/mob/mob";

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
    tilesprites: string[],
    layout: string[]
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

export function loadEnemyData(scene: BaseScene): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            for (let [key, value] of Object.entries(manifest.layout)) {
                scene.load.setBaseURL("/assets/layout/");
                scene.load.tilemapTiledJSON(value.split(".")[0], value);
            }
            resolve();
        } catch (err: any) {
            alert(err.message);
            reject(err.message);
        }
    })
}

export function setupEnemyData(scene: BaseScene, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let i = 0;
        try {
            const mapfile = `enemy_${value}_${i*45}-${(i+1)*45}`;
            const currentMap = scene.make.tilemap({ key: mapfile });

            scene.layoutMap.push(currentMap);
            const enemies = currentMap.objects.find((e)=>{return e.name === "enemies"}).objects
            enemies.forEach((e) => {
                const hitArea = e.properties.find((el : any) => el.name === "hitArea").value.split(",")

                let mob : Mob = enemySpawner(e.type.toLowerCase(),{
                    type : e.type.toLowerCase() as TMobType,
                    name: e.name,
                    tag: e.properties.find((el : any) => el.name === "tag").value,
                    texture: e.properties.find((el : any) => el.name === "texture").value,
                    speed: e.properties.find((el : any) => el.name === "speed").value,
                    scene: scene,
                    x: e.x,
                    y: 0-hitArea[3],
                    health: e.properties.find((el : any) => el.name === "health").value,
                    hitArea : new Phaser.Geom.Rectangle(hitArea[0],hitArea[1],hitArea[2],hitArea[3]),
                    enemyOptions : {
                        action : findAction(e.properties.find((el : any) => el.name === "enemyOptions_action").value),
                        tracker: e.properties.find((el : any) => el.name === "enemyOptions_tracker").value,
                        xTargetOffset : e.properties.find((el : any) => el.name === "enemyOptions_xTargetOffset").value,
                        yTargetOffset : e.properties.find((el : any) => el.name === "enemyOptions_yTargetOffset").value
                    },
                });
            })
            
            resolve();
        }
        catch (err) {
            alert(err);
            reject(err);
        }
    })
}