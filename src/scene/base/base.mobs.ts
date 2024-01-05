import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";
import Enemy from "../../components/enemy/enemy";
import { IMovementTween } from "../../components/mob";

export default function (scene: BaseScene) {

    let enemySpacer : number = 128;

    function* enemyMovementGenenrator(index : number) : any {
        for(let i = 0; i < 3; i++) {
            yield [
                {
                    at : 1000,
                    duration: 2000,
                    x: (200*(index+1)),
                    y: 350,
                    delay: 2,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at : 3000,
                    duration: 5000,
                    x: (200*(index+1)),
                    y: 250,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                },
                {
                    at : 8000+(200*(index+1)),
                    duration: 1000,
                    x: (200*(index+1)),
                    y: 1000,
                    delay: 0,
                    ease: "Sine.easeInOut",
                    repeat: 0,
                }
            ]
            index++;
        }
    }
    const enemyMovements = enemyMovementGenenrator(0);

    return [
        new Player({
            name: "ship",
            texture: "spaceship",
            scene: scene,
            speed: 30,
            x: 390,
            y: 517,
            runTime: false,
            tag: "player"
        }),
        new Enemy({
            name: "enemy",
            texture: "spaceship",
            scene: scene,
            speed: 30,
            x: -160,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3
        },enemyMovements.next().value,5000),
        new Enemy({
            name: "enemy",
            texture: "spaceship",
            scene: scene,
            speed: 30,
            x: 390,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3
        },enemyMovements.next().value,5000),
        new Enemy({
            name: "enemy",
            texture: "spaceship",
            scene: scene,
            speed: 30,
            x: 1200,
            y: -170,
            runTime: false,
            tag: "enemy",
            health: 3
        },enemyMovements.next().value,5000),
    ]
}