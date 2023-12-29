import { Scene } from "phaser";
import assetManifest from "../../assets/assetManifest.json";
import BaseScene from "./base";

interface IAnimationList {
    key : string,
    animations : string[]
}

export let animationList : IAnimationList[] = [];

export default function(scene : BaseScene) : Promise<void>{
    return new Promise(async (resolve, reject)=>{
        try {
            for(let [key,value] of Object.entries(assetManifest.sprites.atlas)) {
                scene.load.setBaseURL("/assets/sprites/");
                scene.load.aseprite(value.split(".")[0],`${value.split(".")[0]}.png`,value);
                scene.animations.push(value.split(".")[0]);
            }
    
            resolve();
        } catch(err) {
            console.log(err);
            reject(err);
        }
    })
}

function checkIfKeyExists(key : string) : boolean{
    let keyList = animationList.map((e)=>{
        return e.key
    })

    return keyList.includes(key);
}