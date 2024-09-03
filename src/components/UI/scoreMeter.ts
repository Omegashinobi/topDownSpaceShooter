import UI, { IUI } from "./UI";
import UIContainer from "./UIContainer";

export default class ScoreMeter extends UI {

    text : Phaser.GameObjects.Sprite;
    valueText : Phaser.GameObjects.Text;
    value : number[] = [0];

    constructor(instance: IUI, scene : Phaser.Scene, score : number[]) {
        super(instance,scene);
        this.value = score;
    }

    preload() {
        
    }

    create(uiContainer : UIContainer) {
        super.create(uiContainer);

        this.text = this.scene.add.sprite(0,0,"UIText",1);
        this.valueText = this.scene.add.text(80,0,`x ${this.value[0].toString()}`);
        this.valueText.setFontSize(20)
        this.addElements([this.valueText]);        
    }

    update(time: number, delta: number) {
        super.update(time,delta);
        this.valueText.text = this.value[0].toString();
    }
}