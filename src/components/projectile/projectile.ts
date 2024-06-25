import { MAX_SIZE_HEIGHT_SCREEN, MAX_SIZE_WIDTH_SCREEN, SIZE_WIDTH_SCREEN } from "../../app";
import { IMob, TMovementType } from "../mob/data/mob";
import Mob from "../mob/mob";

export default class Projectile extends Mob {

    projectileTimeOut: number = 10000;
    projectileTime: number = 0;

    target: Mob | null = null;

    origin: { x: number, y: number };

    bounds: {
        left: number,
        right: number,
        top: number,
        bottom : number
    }


    constructor() {
        super();
    }

    preload(): void {
        super.preload();
    }

    create(options: IMob, origin?: { x: number, y: number }): void {
        if (origin) {
            this.origin = origin;
        }

        this.collisionList = [
            'enemy',
            'player',
        ];

        this.bounds = {
            left: -64,
            right: MAX_SIZE_WIDTH_SCREEN + 64,
            top: -64,
            bottom: MAX_SIZE_HEIGHT_SCREEN + 64
        }

        super.create(options);

        this.target = options.target;

        this.sprite.play({ key: `Emit` });
        this.sprite.chain([{ key: `Idle`, repeat: -1 }]);

        this.movementType = options.movementType;

        if(this.movementType === "rotationBased" && this.target) {
            let rotation = Phaser.Math.Angle.Between(
                this.container.x,
                this.container.y,
                this.target.container.x,
                this.target.container.y
            );
            let vel =  new Phaser.Physics.Arcade.ArcadePhysics(this.scene).velocityFromRotation(rotation,this.speed);
            this.container.setRotation(rotation);
            this.container.setVelocity(vel.x,vel.y);
        }
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if(this.movementType === "normal") {
            this.container.y += -(this.instance.speed / delta);
        } else {
            this.sprite.setFlipY(true);
            this.correctSpriteRotation();
        }
        this.checkIfOutOfBounds();
    }

    checkIfOutOfBounds() {
        if(this.instance.y < this.bounds.top ||
        this.instance.x < this.bounds.left ||
        this.instance.y > this.bounds.bottom ||
        this.instance.x > this.bounds.right ) {
            this.destroy();
        }
    }
}

