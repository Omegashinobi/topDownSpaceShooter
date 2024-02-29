import { EMobType, IEnemyOptions, IMob } from "../mob/data/mob";
import Mob from "../mob/mob";
import enemyProjectile from "../projectile/enemyProjectile";

export default class Enemy extends Mob {
    public movementActive: boolean = true;
    public movementPattern: any[] = [];
    private onDeath: any;

    protected fireRate: number;
    protected maxFireRate: number = this.setRand(2000, 1000);

    public actions : any;

    private actionsPlaying: boolean = false;

    public canFire : boolean = false;

    public trackerActive: number;


    public player : Mob;


    collisionList: string[];

    constructor() {
        super();
    }

    public create(options: IMob & IEnemyOptions) : void {
        this.score = 100;
        this.collisionList = [
            'enemy',
        ];

        this.onDeath = () => {
            this.destroy();
        }

        this.fireRate = this.maxFireRate;
        super.create(options);
        this.player = this.scene.findMobByName("ship_0");

        if(options.action) {
            this.setUpActions(options.action(this));
        }

        if(options.tracker) {
            this.trackerActive = options.tracker;
        }
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);
        if (this.scene.timer > this.trackerActive) {

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
            const proj = new enemyProjectile();
            this.scene.addToMobList(proj,{
                type : EMobType.projectile,
                name: "blast",
                texture: "blast",
                scene: this.scene,
                speed: -100,
                x: this.container.x,
                y: this.container.y - 20,
                runTime: true,
                hitArea: new Phaser.Geom.Rectangle(-16, -16, 32, 32)
            })
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