import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";
import { EEnemyType, EMobType, IMob } from "../../components/mob/data/mob";
import { actions } from "./base.actions";

export default function (scene: BaseScene) : IMob[] {
    return [
        {
            type : EMobType.player,  
            name: "ship",
            texture: "spaceship",
            scene: scene,
            speed: 150,
            x: 390,
            y: 517,
            runTime: false,
            tag: "player",
            hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64)
        },
        {
            type : EMobType.enemy,
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 0,
            y: -70,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
            action: actions.enemySet1,
            tracker: 3000,
            enemyType : EEnemyType.beam
        },   
    ] as IMob[]
}