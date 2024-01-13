import Enemy from "./enemy";

export default class EnemyTracker {
    container : Phaser.GameObjects.Container;
    scene : Phaser.Scene;

    isMoving : boolean = true;
    trackerTimer : number = 0
    mobList : Enemy[] = [];

    debug : boolean = true;
    debugText : Phaser.GameObjects.Text;

    constructor() { }

    create(scene : Phaser.Scene) {
        this.scene = scene;
        this.container = this.scene.add.container(0,0);
        if(this.debug) {
            this.debugCreate();
        }
    }

    update(time: number, delta: number) {
        if(this.debug) {
            this.debugUpdate();
        }
        if(this.isMoving) {
            this.trackerTimer += delta;

            this.mobList.forEach((e)=>{
                	
            });
        }
    }

    addEnemy(enemy: Enemy) {
        this.mobList.push(enemy);
    }

    debugUpdate() {
        this.debugText.text = `Enemy Tracker : ${this.trackerTimer}`
    }

    debugCreate() {
        this.debugText = this.scene.add.text(0,300,"");
    }
}