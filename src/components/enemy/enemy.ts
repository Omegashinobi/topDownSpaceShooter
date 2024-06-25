import { IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import EnemyProjectile from "../projectile/enemyProjectile";

export default class Enemy extends Mob {
    public movementActive: boolean = true;
    public movementPattern: any[] = [];
    private onDeath: any;

    protected fireRate: number;
    protected maxFireRate: number = this.setRand(2000, 1000);

    public canFire : boolean = false;

    public trackerActive: number;

    public player : Mob;

    public spawnProtect = 2000;

    collisionList: string[];

    constructor() {
        super();

        this.onSetActive = () => {
            this.sprite.setVisible(true);
        };

        this.onSetActive = () => {
            this.sprite.setVisible(false);
        };
    }

    public create(options: IMob) : void {
        this.score = 100;
        this.collisionList = [
            'enemy',
        ];

        this.onDeath = () => {
            this.destroy();
        }

        this.fireRate = this.maxFireRate;
        super.create(options);
        this.player = this.scene.findMobByName("Player");

        if(options.enemyOptions.action) {
            this.setUpActions(options.enemyOptions.action(this));
        }

        if(options.enemyOptions.tracker) {
            this.trackerActive = options.enemyOptions.tracker;
        }

        this.canDamage = false;
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);
        if ((this.scene.timer > this.trackerActive) && this._active) {

            this.spawnProtect -= delta;

            if(this.spawnProtect <= 0) {
                this.spawnProtect = 0;
                this.canDamage = true;
            }

            this.deathCheck();

            if(this.canFire) {
                this.fireRate -= delta;
                this.fire();
            }

            if(!this.actionsPlaying) {
                this.actions.play();
                this.actionsPlaying = true;
            }
        }
    }

    public deathCheck() {
        if (this.instance.health !== undefined && this.instance.health <= 0) {
            this.onDeath();
        }
    }

    public setUpActions(action : Phaser.Types.Time.TimelineEvent) {
        this.actions = this.scene.add.timeline(action);
        this.enemyEvents();
    }

    public fire(towards : boolean = false) {
        if (this.fireRate <= 0) {
            EnemyProjectile.spawn({
                type : "projectile",
                name: "scoutBlast",
                texture: "scoutBlast",
                scene: this.scene,
                speed: -10,
                x: this.sprite.x,
                y: this.sprite.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32),
                movementType : "normal",
            },EnemyProjectile)
            this.maxFireRate = this.setRand(2000, 1000);
            this.fireRate = this.maxFireRate;
        }
    }

    private enemyEvents() {
        this.actions.on('IDLE',()=>{
            this.canFire = false;
        })
        this.actions.on('ENABLE_FIRE',()=>{
            this.canFire = true;
        })
        this.actions.on('DESTROY',()=>{
            this.canFire = false;
            this.destroy();
        })
    }
}