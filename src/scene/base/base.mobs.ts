import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";
import { actions } from "./base.actions";
import Mob from "../../components/mob/mob";
import { MAX_SIZE_HEIGHT_SCREEN, MAX_SIZE_WIDTH_SCREEN } from "../../app";
import Enemy from "../../components/enemy/enemy";
import Turret from "../../components/enemy/turret";

export default function (scene: BaseScene): Mob[] {
    return [
        Player.spawn({
            type: "player",
            name: "player",
            tag: "player",
            x: MAX_SIZE_WIDTH_SCREEN / 2 - 32,
            y: MAX_SIZE_HEIGHT_SCREEN - 64,
            texture: "spaceship",
            speed: 30,
            health: 1,
            hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
            scene: scene
        }, Player),
        // Turret.spawn({
        //     type: "enemy",
        //     name: "Turret",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2 - 32,
        //     y: -64,
        //     texture: "turret",
        //     speed: 10,
        //     health: 5,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.enemySet1,
        //         tracker: 1000,
        //     }
        // },Turret),
        // Enemy.spawn({
        //     type: "enemy",
        //     name: "scout",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2,
        //     y: -64,
        //     texture: "scout",
        //     speed: 10,
        //     health: 3,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.FromTopCenter,
        //         tracker: 2000,
        //         xTargetOffset: 0,
        //         yTargetOffset: 0
        //     }
        // },Enemy),
        // Enemy.spawn({
        //     type: "enemy",
        //     name: "scout",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2,
        //     y: -64,
        //     texture: "scout",
        //     speed: 10,
        //     health: 3,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.FromTopCenter,
        //         tracker: 2000,
        //         xTargetOffset: 256,
        //         yTargetOffset: 0
        //     }
        // },Enemy),
        // Enemy.spawn({
        //     type: "enemy",
        //     name: "scout",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2,
        //     y: -64,
        //     texture: "scout",
        //     speed: 10,
        //     health: 3,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.FromTopCenter,
        //         tracker: 2000,
        //         xTargetOffset: 512,
        //         yTargetOffset: 0
        //     }
        // },Enemy),
        // Enemy.spawn({
        //     type: "enemy",
        //     name: "scout",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2,
        //     y: -64,
        //     texture: "scout",
        //     speed: 10,
        //     health: 3,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.FromTopCenter,
        //         tracker: 5000,
        //         xTargetOffset: 128,
        //         yTargetOffset: -32
        //     }
        // },Enemy),
        // Enemy.spawn({
        //     type: "enemy",
        //     name: "scout",
        //     tag: "enemy",
        //     x: MAX_SIZE_WIDTH_SCREEN / 2,
        //     y: -64,
        //     texture: "scout",
        //     speed: 10,
        //     health: 3,
        //     hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        //     scene: scene,
        //     enemyOptions: {
        //         action : actions.FromTopCenter,
        //         tracker: 5000,
        //         xTargetOffset: 384,
        //         yTargetOffset: -32
        //     }
        // },Enemy)
        Enemy.spawn({
            type: "enemy",
            name: "guardian",
            tag: "enemy",
            x: MAX_SIZE_WIDTH_SCREEN / 2,
            y: -64,
            texture: "guardian",
            speed: 10,
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
            scene: scene,
            enemyOptions: {
                action: actions.FromTopCenter,
                tracker: 5000,
                xTargetOffset: 384,
                yTargetOffset: -32
            }
        }, Enemy)

    ] as Mob[]
}