import { MAX_SIZE_WIDTH_SCREEN, MAX_SIZE_HEIGHT_SCREEN } from "../../app";
import UI, { IUI } from "./UI";

interface IUIContainer {
    UI : Phaser.GameObjects.Container,
    actions : Function[]
}

export default class UIContainer {
    
    container : Phaser.GameObjects.Container;
    scene : Phaser.Scene;

    constructor(scene : Phaser.Scene ) {
        this.scene = scene;
    }

    create() {
        this.container = this.scene.add.container();
        this.container.name = "UIContainer";
        this.container.width = MAX_SIZE_WIDTH_SCREEN;
        this.container.height = MAX_SIZE_HEIGHT_SCREEN;
    }

    addToContainer(uiContainers : IUIContainer) {
        this.container.add(uiContainers.UI);
        uiContainers.actions.forEach((e)=>{
            e();
        })
    }
}