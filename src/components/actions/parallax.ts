import BaseScene from "../../scene/base/base";
import Mob from "../mob/mob";

export interface IParallaxOptions {
    offsetX?: number,
    offsetY?: number,
    speed : number,
    player: Mob,
    bounds : {
        top: number,
        left: number,
        bottom: number,
        right: number,
    }
    scene : BaseScene
}

export default function(layer: Phaser.Tilemaps.LayerData,options : IParallaxOptions, delta : number) {

    const input : {
        A: Phaser.Input.Keyboard.Key
        D: Phaser.Input.Keyboard.Key;
        W: Phaser.Input.Keyboard.Key,
        S: Phaser.Input.Keyboard.Key;
    } = {
        A: options.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        D: options.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        W: options.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        S: options.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    }

    if(layer.tilemapLayer.y < options.bounds.top) {
        layer.tilemapLayer.y = options.bounds.top;
    }
    
    if(layer.tilemapLayer.x < options.bounds.left) {
        layer.tilemapLayer.x = options.bounds.left;
    }

    if(layer.tilemapLayer.y > options.bounds.bottom) {
        layer.tilemapLayer.y = options.bounds.bottom;
    }

    if(layer.tilemapLayer.x > options.bounds.right) {
        layer.tilemapLayer.x = options.bounds.right;
    }

    if(input.W.isDown) {
        layer.tilemapLayer.y -= options.speed / delta;
    }
    if(input.A.isDown) {
        layer.tilemapLayer.x -= options.speed / delta;
    }
    if(input.S.isDown) {
        layer.tilemapLayer.y += options.speed / delta;
    }
    if(input.D.isDown) {
        layer.tilemapLayer.x += options.speed / delta;
    }
}