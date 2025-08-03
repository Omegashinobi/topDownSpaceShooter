import { Scene } from "phaser";
import * as assetManifest from "../assets/assetManifest.json";
import { IManifest, IProperty } from "../data/manifest";
import { createMap } from "../scene/base/base.loader";
import BaseScene from "../scene/base/base";

export default class LevelManager {

    private _levelID: string;
    private _levelChunkData: string[] = [];
    private _enemyGroupData: string[] = [];
    private _scene: BaseScene;

    private _manifest: IManifest = assetManifest;

    constructor(id: string, scene : BaseScene) {
        this._levelID = id;
        this._scene = scene;

        createMap(scene,id);

        [
            { manifestIndex: this._manifest.layout, store: this._levelChunkData },
            { manifestIndex: this._manifest.enemyGroups, store: this._enemyGroupData }
        ].forEach((indexerElement) => {
            indexerElement.manifestIndex.forEach((e: string) => {
                if(e.split("_")[1] === this._levelID) {
                    indexerElement.store.push(e);
                };
            });
        })

        this._parseLevelChunkData();
    }

    private _parseLevelChunkData() {
        this._levelChunkData.forEach((key)=>{ 
            const currentMap = this._scene.make.tilemap({ key: key.split(".")[0] });
            
            const spawners = currentMap.getObjectLayer("flags").objects.map((e: Phaser.Types.Tilemaps.TiledObject)=>{
                if(e.type === "spawner") {
                    return e.properties;
                }
            });
            
            spawners.forEach((e : IProperty[])=>this._spawnEnemies(e));
        });
    }

    private _spawnEnemies(spawner : IProperty[]) {
        const groupData = spawner.find((e)=>e.name === "enemyGroup");
        const enemyGroup = this._parseEnemyGroupData(groupData.value);
    }

    private _parseEnemyGroupData(id: string) {
        return 
    }

}