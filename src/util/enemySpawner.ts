import BeamEnemy from "../components/enemy/beamEnemy";
import Enemy from "../components/enemy/enemy";
import Turret from "../components/enemy/turret";
import { IMob, TMobType, Position, ISwarmerData, MobPathData, IEnemyMapData } from "../components/mob/data/mob";
import Mob from "../components/mob/mob";
import * as assetManifest from "../assets/assetManifest.json";
import BaseScene from "../scene/base/base";

import { IManifest } from "../data/manifest";
import { Math } from "phaser";

let manifest: IManifest = assetManifest;
let levelData: IEnemyMapData;

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

export function setupEnemyLevelData(data: IEnemyMapData) {
    levelData = data;
}

export function setupEnemyData(
    scene: BaseScene,
    enemies: Phaser.Types.Tilemaps.TiledObject[],
    paths: Phaser.Types.Tilemaps.TiledObject[],
): Promise<Enemy[]> {
    return new Promise((resolve, reject) => {
        const enemyData: Enemy[] = [];
        try {
            enemies.forEach((e) => {
                const baseClass = e.properties.find((e: Phaser.Types.Tilemaps.TiledObject) => e.name === "baseClass");
                const pathDataRef = baseClass.value.path_data;
                const pathData = e.properties.filter((e: Phaser.Types.Tilemaps.TiledObject) => e.name.substring(0, e.name.length - 2) === "path_data")
                    .map((el: any) => {
                        return el.value;
                    })
                const linkedPath = paths.find((e) => e.id === pathDataRef);
                const actions: Phaser.Types.Time.TimelineEventConfig[] = setupPathData(e, linkedPath, pathData);
                const mob = spawn(baseClass.value, e, actions, scene);

                mob.setUpActions(actions);

                enemyData.push(mob);
            });
        }
        catch (err) {
            alert(err);
            reject(err);
        }
        resolve(enemyData);
    });
}

function setupPathData(baseClass: Phaser.Types.Tilemaps.TiledObject, linkedPath: Phaser.Types.Tilemaps.TiledObject, pathData: MobPathData[]): Phaser.Types.Time.TimelineEventConfig[] {
    const polyLineData = linkedPath.polyline.map((e) => { return { x: e.x, y: e.y } });
    let actionData: Phaser.Types.Time.TimelineEventConfig[] = [];
    polyLineData.forEach((e, i, a) => {
        if (pathData[i] === undefined) {
            console.error(`Missing Path ${i} data for Path Array ${i}`);
        } else {
            actionData.push({
                at: pathData[i].at,
                tween: {
                    targets: pathData[i].target || "self",
                    x: (linkedPath.x + e.x),
                    y: (linkedPath.y + e.y),
                    duration: pathData[i].duration,
                    ease: pathData[i].ease,
                },
                event: pathData[i].event || undefined
            });
        }
    });

    return actionData;
}

function generateHitData(texture: string): number[] {
    return [
        texture.length
    ];
}

function spawn(baseClass: IMob & IextendedIMobOptions,
    e: Phaser.Types.Tilemaps.TiledObject,
    actions: Phaser.Types.Time.TimelineEventConfig[],
    scene: BaseScene,
) {
    const hitArea = generateHitData(baseClass.texture);

    return enemySpawner(baseClass.type.toLowerCase(), {
        type: e.type.toLowerCase() as TMobType,
        name: e.name,
        tag: baseClass.tag,
        texture: baseClass.texture,
        speed: baseClass.speed,
        scene: scene,
        x: e.x,
        y: -(levelData.levelHeight - e.y),
        health: baseClass.health,
        hitArea: new Phaser.Geom.Rectangle(hitArea[0], hitArea[1], hitArea[2], hitArea[3]),
        enemyOptions: {
            actions: actions
        },
    });
}

function calculateTrackPosition(y: number) {
    const baseHeight = 640
    const baseGridSpace = 64;
    const trackerDelay = 5000 / baseGridSpace;

    return (baseHeight - y) * trackerDelay;
}

function checkForHoldPositionData(e: Phaser.Types.Tilemaps.TiledObject, flagData: Phaser.Types.Tilemaps.TiledObject[]): Position {
    const prop = e.properties.find((e: Phaser.Types.Tilemaps.TiledObject) => e.name === "holdLocation")?.value || undefined;

    if (prop === undefined) {
        return undefined;
    }

    const data = flagData.find((el) => { return el.id === prop });

    return {
        x: data.x,
        y: data.y
    };
}