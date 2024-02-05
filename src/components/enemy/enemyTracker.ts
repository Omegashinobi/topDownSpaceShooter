import Enemy from "./enemy";

export default class EnemyTracker {
    container : Phaser.GameObjects.Container;
    scene : Phaser.Scene;

    isMoving : boolean = true;
    trackerTimer : number = 0
    mobList : Enemy[] = [];

    debug : boolean = true;
    debugText : Phaser.GameObjects.Text;

    debugGraphicContainer : Phaser.GameObjects.Container;
    lineText : Phaser.GameObjects.Text;
    lineTextValue : number = 0;
    zone : any;

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
            this.debugUpdate(delta);
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

    debugTimeSet(val : number) : string {
        let minutes = Math.floor(val / 60);  
        let seconds = val % 60;
        return `mins : ${minutes} : seconds : ${seconds}`;
    }

    debugUpdate(delta :number) {
        this.debugText.text = `Enemy Tracker : ${this.trackerTimer}`
        this.debugGraphicContainer.y += delta;
        Phaser.Display.Align.In.Center(this.lineText,this.zone);

        if(this.debugGraphicContainer.y > 1000) {
            this.debugGraphicContainer.y = 0;
            this.lineText.text = (this.debugTimeSet((this.lineTextValue+=1)))
        }
    }

    debugCreate() {
        this.debugText = this.scene.add.text(0,300,"");

        this.debugGraphicContainer = this.scene.add.container();

        let graphic : Phaser.GameObjects.Graphics = this.scene.add.graphics();
        this.lineText = this.scene.add.text(400,0,this.lineTextValue.toString(),{
            fontSize: 30,
            align:"center"
        });
        Phaser.Display.Align.In.Center(this.lineText, this.scene.add.zone(0, 0, 800, 600));

        this.debugGraphicContainer.add(graphic);
        this.debugGraphicContainer.add(this.lineText);

        graphic.lineStyle(1,0xAAFF00,1);
        graphic.strokeLineShape(new Phaser.Geom.Line(0,0,800,0));

        this.zone = this.scene.add.zone(400, 0, 800, 600)
    }
}