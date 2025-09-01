import BaseScene from "../../../scene/base/base"
import Mob from "../mob"

export type TMobType = "player" | "enemy" | "projectile";
export type TMovementType = "normal" | "rotationBased";

export interface IMob {
    type: TMobType,
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
    hitArea: Phaser.Geom.Rectangle | string,
    enemyOptions?: IEnemyOptions,
    movementType?: TMovementType
    target?: Mob | null;
}

export interface IDebugOptions {
    positionText: Phaser.GameObjects.Text,
}

export interface IEnemyOptions {
    tracker: number
    actions: Phaser.Types.Time.TimelineEventConfig[]
}

export interface IBossOptions {
    parts: IMob[]
}

export interface ISwarmerData {
    paths :  {x:number,y:number}[],
    index : number,
    spawnDelay : number
}

export type Position = {
    x: number,
    y: number
}

export type FlagData = {
    flags: [{
        start: Position
        end: Position
    }]
}

export type MobPathData = {
    at: number
    delay: number
    duration: number
    ease: string
    event: string
    target: string
}