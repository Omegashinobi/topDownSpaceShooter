import UI, { IUI } from "./UI";
import UIContainer from "./UIContainer";

export default class ComboMeter extends UI {

    text : Phaser.GameObjects.Sprite;
    valueText : Phaser.GameObjects.BitmapText;
    value : number[] = [0];

    comboTimer : number[] = [0];

    constructor(instance: IUI, scene : Phaser.Scene,combo: number[],comboTimer: number[]) {
        super(instance,scene);
        this.value = combo;
        this.comboTimer = comboTimer;
    }

    preload() {
        this.scene.load.image('171', 'assets/fonts/retro/171.png');
    }

    create(uiContainer : UIContainer) {
        super.create(uiContainer);

        this.text = this.scene.add.sprite(0,0,"UIText",0);
        this.valueText = this.scene.add.bitmapText(80, 0, 'comboFont', `X ${this.value[0].toString()}`);
        this.addElements([this.valueText]);
    }

    update(time: number, delta: number) {
        super.update(time,delta);
        this.valueText.text = `X ${this.value[0].toString()}`

        this.comboTimer[0] -= delta;

        if(this.comboTimer[0] <= 0) {
            this.value[0] = 1;
        }
    }
}