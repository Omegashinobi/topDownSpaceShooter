import BaseScene from "../../../scene/base/base"
import Mob from "../mob"

export type TMobType = "player" | "enemy" | "projectile";
export type TMovementType = "normal" | "rotationBased";

export interface IMob {
    type : TMobType,
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
    hitArea : Phaser.Geom.Rectangle | string,
    enemyOptions? : IEnemyOptions,
    movementType? : TMovementType
    target? : Mob | null;
}

export interface IDebugOptions {
    positionText: Phaser.GameObjects.Text,
}

export interface IEnemyOptions {
    action : any,
    tracker: number,
    xTargetOffset? : number,
    yTargetOffset? : number
}

export interface IBossOptions {
    parts : IMob[]
}