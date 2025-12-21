import { Scene } from "phaser";
import * as assetManifest from "../assets/assetManifest.json";
import { IManifest, IProperty } from "../data/manifest";
import { createMap } from "../scene/base/base.loader";
import BaseScene from "../scene/base/base";
import { setupEnemyData, setupEnemyLevelData } from "./enemySpawner";
import EnemyGroup from "../components/enemy/enemyGroup";
import { IEnemyMapData, Position } from "../components/mob/data/mob";
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
        this.parseEnemyData(id.concat("Enemies"));
    }

    parseEnemyData(id: string) {
        const enemyMapData = this._scene.make.tilemap({ key: id });
        const pathData = enemyMapData.objects.find(e => e.name === "paths").objects;
        const enemyData = enemyMapData.objects.find(e => e.name === "enemies").objects;
        const enemyDataParams = Object.values(enemyMapData.properties).reduce((a, v) => ({
            ...a,
            [v.name]: v.value
        }), {});


        setupEnemyLevelData(enemyDataParams);
        setupEnemyData(this._scene, enemyData, pathData);
    }
}