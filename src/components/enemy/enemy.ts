import { IMob, MobPathData, Position } from "../mob/data/mob";
import Mob, { Constructor } from "../mob/mob";
import EnemyProjectile from "../projectile/enemyProjectile";

export default class Enemy extends Mob {
    protected fireRate: number;
    protected maxFireRate: number = this.setRand(2000, 1000);
    public movementActive: boolean = true;
    public movementPattern: any[] = [];
    public canFire: boolean = false;
    public trackerActive: number;
    public player: Mob;
    public spawnProtect = 2000;

    public override set active(value: boolean) {
        this.sprite.setVisible(value);
        this._active = true;
    }

    collisionList: string[];

    public create(options: IMob): void {
        this.score = 100;
        this.collisionList = [
            'enemy',
        ];

        this.onDeath = () => {
            this.destroy();
        }

        this.fireRate = this.maxFireRate;
        super.create(options);
        this.player = this.scene.findGameObjectWithTag("player");

        this.canDamage = false;
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);
        if (this._active) {
            this.spawnProtect -= delta;

            if (this.spawnProtect <= 0) {
                this.spawnProtect = 0;
                this.canDamage = true;
            }

            if (this.canFire) {
                this.fireRate -= delta;
                this.fire();
            }

            if (!this.actionsPlaying) {
                this.actions.play();
                this.actionsPlaying = true;
            }
        }
    }

    public setUpActions(actions: any) {
        const parsed = actions.map((e : any) => {
            e.tween.targets = e.tween.targets === "self" ? this.container : e.tween.targets;
            return e;
        });
        this.actions = this.scene.add.timeline(parsed);
        this.enemyEvents();

        this.container.x = parsed[0].tween.x;
        this.container.y = parsed[0].tween.y;
    }

    public fire(towards: boolean = false) {
        if (this.fireRate <= 0) {
            EnemyProjectile.spawn({
                type: "projectile",
                name: "scoutBlast",
                texture: "enemyBlast",
                tag: "enemyProjectile",
                health: 1,
                scene: this.scene,
                speed: -50,
                x: this.sprite.x,
                y: this.sprite.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32),
                movementType: "normal",
            }, EnemyProjectile)
            this.maxFireRate = this.setRand(3000, 1000);
            this.fireRate = this.maxFireRate;
        }
    }

    private enemyEvents() {
        this.actions.on('IDLE', () => {
            this.canFire = false;
        })
        this.actions.on('ENABLE_FIRE', () => {
            this.canFire = true;
        })
        this.actions.on('DESTROY', () => {
            this.canFire = false;
            this.destroy();
        })
    }
}