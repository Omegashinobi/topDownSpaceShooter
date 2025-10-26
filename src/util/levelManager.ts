import { Scene } from "phaser";
import * as assetManifest from "../assets/assetManifest.json";
import { IManifest, IProperty } from "../data/manifest";
import { createMap } from "../scene/base/base.loader";
import BaseScene from "../scene/base/base";
import { setupEnemyData } from "./enemySpawner";
import EnemyGroup from "../components/enemy/enemyGroup";
import { Position } from "../components/mob/data/mob";
import Enemy from "../components/enemy/enemy";

export default class LevelManager {

    private _levelID: string;
    private _levelChunkData: string[] = [];
    private _enemyGroupData: string[] = [];
    private _scene: BaseScene;
    private _totalChunks: number;

    private _currentChunk: string;

    private _manifest: IManifest = assetManifest;

    constructor(id: string, scene: BaseScene) {
        this._levelID = id;
        this._scene = scene;

        createMap(scene, id);

        [
            { manifestIndex: this._manifest.layout, store: this._levelChunkData },
            { manifestIndex: this._manifest.enemyGroups, store: this._enemyGroupData }
        ].forEach((indexerElement) => {
            indexerElement.manifestIndex.forEach((e: string) => {
                if (e.split("_")[1] === this._levelID) {
                    indexerElement.store.push(e);
                };
            });
        });

        this._totalChunks = this._levelChunkData.length;

        this._parseLevelChunkData();
    }

    private _parseLevelChunkData() {
        this._levelChunkData.forEach((key, index) => {
            const currentMap = this._scene.make.tilemap({ key: key.split(".")[0] });

            this._currentChunk = key;

            const spawners = currentMap.getObjectLayer("flags").objects.map((e: Phaser.Types.Tilemaps.TiledObject) => {
                if (e.type === "spawner") {
                    return { props: e.properties, y: e.y };
                }
            });

            spawners.forEach((e) => this._spawnEnemies(e.props, this._caculateSpawnTimer(e.y, index)));
        });
    }

    private async _spawnEnemies(spawner: IProperty[], position: number) {
        const enemyGroup = new EnemyGroup();

        const groupData = spawner.find((e) => e.name === "enemyGroup");
        const enemyGroupKey = `${this._currentChunk.split(".")[0]}_group_${groupData.value}`;

        const currentMap = this._scene.make.tilemap({ key: enemyGroupKey });

        const enemies: Phaser.Types.Tilemaps.TiledObject[] = currentMap.getObjectLayer("enemies").objects.map(e => e);
        const path: Phaser.Types.Tilemaps.TiledObject[] = currentMap.getObjectLayer("paths").objects.map(e => e);

        const enemyData: Enemy[] = await setupEnemyData(this._scene, enemies, path, position);

        enemyGroup.registerGroup(enemyData, position);

        this._scene.enemyTracker.addGroup(enemyGroup);
    }

    private _caculateSpawnTimer(value: number, chunkIndex: number): number {
        const tilePixelHeight : number = 64;
        const totalTiles: number = 10;
        const timerMultiplier : number = 100;

        return (((totalTiles * tilePixelHeight) - value) * (chunkIndex+1)) * timerMultiplier;
    }
}