import BaseScene from "../../../scene/base/base"
import Mob from "../mob"

export enum EMobType {
    player = "player",
    enemy = "enemy",
    projectile = "projectile"
}

export enum EEnemyType { 
    standard = "standard",
    beam = "beam",
    turret = "turret",
}

export interface IMob {
    type : EMobType,
    name: string,
    tag?: string
    texture: string,
    speed: number,
    scene: BaseScene,
    x: number,
    y: number,
    runTime?: boolean,
    health?: number,
    killOnOutOfBounds?: boolean
    hitArea : Phaser.Geom.Rectangle,
}

export interface IDebugOptions {
    positionText: Phaser.GameObjects.Text,
}

export interface IEnemyOptions {
    action : any,
    tracker: number,
    enemyType : EEnemyType,
    xTargetOffset? : number,
    yTargetOffset? : number
}

export interface IBossOptions {
    parts : IMob[]
}