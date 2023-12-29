import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";

export default function (scene : BaseScene) {
    return [
        new Player({
            name : "ship",
            texture : "spaceship",
            scene : scene,
            speed : 30,
            x: 390,
            y: 517,
            runTime : false
        })
    ]
}