import { Scene } from "phaser";
import Player from "../../components/player/player";
import BaseScene from "./base";
import { actions } from "./base.actions";
import Mob from "../../components/mob/mob";
import { MAX_SIZE_HEIGHT_SCREEN, MAX_SIZE_WIDTH_SCREEN } from "../../app";
import Enemy from "../../components/enemy/enemy";
import Turret from "../../components/enemy/turret";
import BeamEnemy from "../../components/enemy/beamEnemy";

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
        }, Player)
    ] as Mob[]
}