import UI, { IUI } from "./UI";
import UIContainer from "./UIContainer";

export default class ScoreMeter extends UI {

    text : Phaser.GameObjects.Text;
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

        this.text = this.scene.add.text(0,0,"score");
        this.valueText = this.scene.add.text(70,30,`${this.value[0].toString()}`);
        this.addElements([this.valueText]);        
    }

    update(time: number, delta: number) {
        super.update(time,delta);
        this.valueText.text = this.value[0].toString();
    }
}