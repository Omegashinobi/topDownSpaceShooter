import { MAX_SIZE_WIDTH_SCREEN, MAX_SIZE_HEIGHT_SCREEN } from "../../app";
import UIContainer from "./UIContainer";

export interface IUI {
    x: number,
    y: number,
    name : string
}

export default class UI {

    text : Phaser.GameObjects.Text;
    bitmapText : Phaser.GameObjects.BitmapText;
    container : Phaser.GameObjects.Container;
    scene : Phaser.Scene;
    instance : IUI;
    UIcontainer : UIContainer;
    onCreateActions : Function[]

    constructor(instance: IUI, scene : Phaser.Scene) {
        this.scene = scene;
        this.instance = instance;
        this.onCreateActions = [];

        
    }

    preload() {
        
    }

    create(uiContainer : UIContainer) {
        this.container = this.scene.add.container();
        this.container.x = this.instance.x;
        this.container.y = this.instance.y;
        this.container.name = this.instance.name;
        uiContainer.addToContainer({ UI : this.container, actions : this.onCreateActions});
    }

    update(time: number, delta: number) {}

    addElements(elements : any[]) {
        if(this.text) {
            this.container.add(this.text);
        }
        if(this.bitmapText) {
            this.container.add(this.bitmapText);
        }

        elements.forEach((e)=>{
            this.container.add(e);
        })
    }
}