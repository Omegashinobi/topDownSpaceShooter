import BeamEnemy from "../components/enemy/beamEnemy";
import Enemy from "../components/enemy/enemy";
import Turret from "../components/enemy/turret";
import { IMob, TMobType, Position, ISwarmerData } from "../components/mob/data/mob";
import Mob from "../components/mob/mob";
import * as assetManifest from "../assets/assetManifest.json";
import { iManifest } from "../scene/base/base.loader";
import BaseScene from "../scene/base/base";

import { action as astroidAction } from "../components/enemy/tweens/astroid";
import { action as scoutMK1Action } from "../components/enemy/tweens/scoutMK1";
import { action as turretAction } from "../components/enemy/tweens/turret";
import { action as swarmerAction } from "../components/enemy/tweens/swarmers";
import { Scene } from "phaser";


let manifest: iManifest = assetManifest;

interface IextendedIMobOptions {
    spawnFlag: number,
    endFlag: number,
    spawnDelay: number,
}

function enemySpawner(enemyType: string, options: IMob): Enemy {
    const data: IMob = options;
    let mob: Enemy
    switch (enemyType) {
        case "enemy": { mob = Enemy.spawn(data, Enemy); break; }
        case "turret": { mob = Turret.spawn(data, Turret); break; }
        case "beam": { mob = BeamEnemy.spawn(data, BeamEnemy); break; }
        case "swamer": { mob = BeamEnemy.spawn(data, BeamEnemy); break; }
    }

    return mob;
}

export function setupEnemyData(scene: BaseScene, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            Object.entries(manifest.layout).forEach((layout, index) => {
                const mapfile = `enemy_${value}_${index * 45}-${(index + 1) * 45}`;
                const currentMap = scene.make.tilemap({ key: mapfile });

                scene.layoutMap.push(currentMap);

                const enemies = currentMap.objects.find((e) => { return e.name === "enemies" }).objects;
                const flagData = currentMap.objects.find((e) => { return e.name === "flags" }).objects;
                const pathData = currentMap.objects.find((e) => { return e.name === "swarmerPath" })?.objects;

                enemies.forEach((e) => {
                    const baseClass = getBaseClass(e.properties);
                    const hitArea: number[] = baseClass.hitArea.toString().split(",").map(e => parseInt(e));
                    const trackPosition = calculateTrackPosition(e.y) * (index + 1);
                    const pathRef = e.properties.find((el: Phaser.Types.Tilemaps.TiledObject)=>{return el.name === "path"})?.value;

                    if (e.type.toLowerCase() === "swarmer") {
                        for(let i = 0; i < e.properties.find((e : Phaser.Types.Tilemaps.TiledObject)=>{return e.name === "amount"}).value; i++) {
                            const mob = spawn(baseClass, e, scene, hitArea, trackPosition, flagData);                            
                            mob.setUpActions(getEnemyActionSet(mob, trackPosition, {
                                paths: pathData.find((el)=>{return el.id === pathRef}).polyline as {x:number,y:number}[],
                                index: i,
                                spawnDelay: e.properties.find((el: Phaser.Types.Tilemaps.TiledObject)=>{return el.name === "spawnDelay"}).value
                            }));
                        }
                    } else {
                        const mob = spawn(baseClass, e, scene, hitArea, trackPosition, flagData);
                        mob.setUpActions(getEnemyActionSet(mob, trackPosition));
                    }
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

function spawn(baseClass: IMob & IextendedIMobOptions,
    e: Phaser.Types.Tilemaps.TiledObject,
    scene: BaseScene,
    hitArea: number[],
    trackPosition: number,
    flagData : Phaser.Types.Tilemaps.TiledObject[]
) {
    return enemySpawner(baseClass.type.toLowerCase(), {
        type: e.type.toLowerCase() as TMobType,
        name: e.name,
        tag: baseClass.tag,
        texture: baseClass.texture,
        speed: baseClass.speed,
        scene: scene,
        x: e.x,
        y: e.y,
        health: baseClass.health,
        hitArea: new Phaser.Geom.Rectangle(hitArea[0], hitArea[1], hitArea[2], hitArea[3]),
        enemyOptions: {
            tracker: trackPosition / 100,
            startPosition: baseClass.spawnFlag === 0 || undefined ? undefined : { x: flagData.find(e => e.id === baseClass.spawnFlag).x, y: flagData.find(e => e.id === baseClass.spawnFlag).y },
            waitPosition: { x: e.x, y: e.y } as Position,
            endPosition: baseClass.endFlag === 0 || undefined ? undefined : { x: flagData.find(e => e.id === baseClass.endFlag).x, y: flagData.find(e => e.id === baseClass.endFlag).y }
        },
    });
}

function calculateTrackPosition(y: number) {
    const baseHeight = 640
    const baseGridSpace = 64;
    const trackerDelay = 5000 / baseGridSpace;

    return (baseHeight - y) * trackerDelay;
}

function getEnemyActionSet(mob: Mob, trackPosition: number, swarmerData?: ISwarmerData): Phaser.Types.Time.TimelineEventConfig[] {

    const name: string = mob.instance.name;
    const gameObject: Mob = mob;

    let action: Phaser.Types.Time.TimelineEventConfig[];

    switch (name) {
        case "scoutMK1": {
            action = scoutMK1Action(trackPosition, gameObject);
            break;
        }
        case "astroid": {
            action = astroidAction(trackPosition, gameObject);
            break;
        }
        case "turret": {
            action = turretAction(trackPosition, gameObject);
            break;
        }
        case "swarmer": {
            action = swarmerAction(trackPosition, gameObject, swarmerData);
        }
    }

    return action;
}

function getBaseClass(props: [{ value: {} }]): IMob & IextendedIMobOptions {
    return props.find((el: any) => el.name === "baseClass").value as IMob & IextendedIMobOptions;
}