import { Scene } from "phaser";
import Player from "../../components/player/player";

export default function (scene : Scene) {
    return [
        new Player({
            name : "ship",
            scene : scene,
            texture : "spaceship",
            speed : 1,
            animations : [{
                key: 'idle',
                frames: 'spaceship',
                frameRate: 60,
                repeat: -1
            }]
        })
    ]
}