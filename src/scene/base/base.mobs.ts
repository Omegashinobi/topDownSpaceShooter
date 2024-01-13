import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";
import Enemy from "../../components/enemy/enemy";
import Mob, { IMovementTween } from "../../components/mob";

export default function (scene: BaseScene, loaded : Promise<void>) {

    let mobList : Mob[] = [];

    function* enemySet1(index: number): any {
        for (let i = 0; i < 3; i++) {
            yield [
                {
                    at: 1000,
                    duration: 2000,
                    x: (200 * (index + 1)),
                    y: 350,
                    delay: 2,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at: 3000,
                    duration: 5000,
                    x: (200 * (index + 1)),
                    y: 250,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "ENABLE_FIRE"
                },
                {
                    at: 8000 + (200 * (index + 1)),
                    duration: 1000,
                    x: (200 * (index + 1)),
                    y: 1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at: 20000,
                    duration: 20000,
                    y: 1000,
                    x : -1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "DESTROY"
                },
            ]
            index++;
        }
    }
    const enemySet1Function = enemySet1(0);

    function* enemySet2(index: number): any {
        for (let i = 0; i < 5; i++) {
            yield [
                {
                    at: 0,
                    duration: 2000,
                    y: -64,
                    delay: 2,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at: 3000 + (1000 * index),
                    duration: 10000 + (1000 * index),
                    y: 1000,
                    x : 1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "ENABLE_FIRE"
                },
                {
                    at: 20000,
                    duration: 20000,
                    y: 1000,
                    x : -1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "DESTROY"
                },
            ]
            index++;
        }
    }
    const enemySet2Function = enemySet2(0);

    function* enemySet3(index: number): any {
        for (let i = 0; i < 5; i++) {
            yield [
                {
                    at: 0,
                    duration: 2000,
                    y: -64,
                    delay: 2,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at: 3000 + (1000 * index),
                    duration: 10000 + (1000 * index),
                    y: 1000,
                    x : -1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "ENABLE_FIRE"
                },
                {
                    at: 20000,
                    duration: 20000,
                    y: 1000,
                    x : -1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                    event : "DESTROY"
                },
            ]
            index++;
        }
    }
    const enemySet3Function = enemySet3(0);

    mobList = [
        new Player({
            name: "ship",
            texture: "spaceship",
            scene: scene,
            speed: 30,
            x: 390,
            y: 517,
            runTime: false,
            tag: "player",
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: -160,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet1Function.next().value, 5000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 390,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet1Function.next().value, 5000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 1200,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet1Function.next().value, 5000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 60,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet2Function.next().value, 12000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 300,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet2Function.next().value, 12000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 500,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet2Function.next().value, 12000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 200,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet2Function.next().value, 12000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 450,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet2Function.next().value, 12000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 60,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet3Function.next().value, 20000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 300,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet3Function.next().value, 20000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 500,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet3Function.next().value, 20000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 200,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet3Function.next().value, 20000),
        new Enemy({
            name: "enemy",
            texture: "alien",
            scene: scene,
            speed: 30,
            x: 450,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3,
            hitArea: new Phaser.Geom.Rectangle(-32, -32, 64, 64)
        }, enemySet3Function.next().value, 20000),

    ]

    return mobList;
}