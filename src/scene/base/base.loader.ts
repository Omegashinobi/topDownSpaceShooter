import { Scene } from "phaser";
import BaseScene from "./base";
import * as assetManifest from "../../assets/assetManifest.json";

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
}

let manifest: iManifest = assetManifest;

export let animationList: IAnimationList[] = [];

export default async function (scene: BaseScene): Promise<void> {
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

// async function tilemapLoader(params:type) {
    
// }