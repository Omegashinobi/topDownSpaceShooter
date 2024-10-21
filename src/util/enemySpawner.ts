import BeamEnemy from "../components/enemy/beamEnemy";
import Enemy from "../components/enemy/enemy";
import Turret from "../components/enemy/turret";
import { IMob, TMobType } from "../components/mob/data/mob";
import Mob from "../components/mob/mob";
import * as assetManifest from "../assets/assetManifest.json";
import { iManifest } from "../scene/base/base.loader";
import BaseScene from "../scene/base/base";
import { findAction } from "../scene/base/base.actions";


let manifest: iManifest = assetManifest;

function enemySpawner(enemyType : string, options: IMob) {
    const data : IMob = options;
    let mob : Mob
    switch(enemyType) {
        case "enemy": {mob = Enemy.spawn(data,Enemy); break;}
        case "turret": {mob = Turret.spawn(data,Turret); break;}
        case "beam" : {mob = BeamEnemy.spawn(data,BeamEnemy); break;}
    }

    return mob;
}

export function setupEnemyData(scene: BaseScene, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            Object.entries(manifest.layout).forEach((layout,index)=>{
                const mapfile = `enemy_${value}_${index * 45}-${(index + 1) * 45}`;
                const currentMap = scene.make.tilemap({ key: mapfile });
    
                scene.layoutMap.push(currentMap);
                const enemies = currentMap.objects.find((e) => { return e.name === "enemies" }).objects;
                enemies.forEach((e) => {
                    const hitArea = e.properties.find((el: any) => el.name === "hitArea").value.split(",");
    
                    enemySpawner(e.type.toLowerCase(), {
                        type: e.type.toLowerCase() as TMobType,
                        name: e.name,
                        tag: e.properties.find((el: any) => el.name === "tag").value,
                        texture: e.properties.find((el: any) => el.name === "texture").value,
                        speed: e.properties.find((el: any) => el.name === "speed").value,
                        scene: scene,
                        x: e.x,
                        y: 0 - hitArea[3],
                        health: e.properties.find((el: any) => el.name === "health").value,
                        hitArea: new Phaser.Geom.Rectangle(hitArea[0], hitArea[1], hitArea[2], hitArea[3]),
                        enemyOptions: {
                            action: findAction(e.properties.find((el: any) => el.name === "enemyOptions_action").value),
                            tracker: calculateTrackPosition(e.y)*(index),
                            xTargetOffset: e.properties.find((el: any) => el.name === "enemyOptions_xTargetOffset").value,
                            yTargetOffset: e.properties.find((el: any) => el.name === "enemyOptions_yTargetOffset").value
                        },
                    });
                })
            })
            resolve();
        }
        catch (err) {
            alert(err);
            reject(err);
        }
    })
}

function calculateTrackPosition(y : number) {
    const baseHeight = 640
    const baseGridSpace = 64;
    const trackerDelay = 5000 / baseGridSpace;
    
    return (baseHeight - y) * trackerDelay;
}