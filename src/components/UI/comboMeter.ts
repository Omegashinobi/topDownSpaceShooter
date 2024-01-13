import UI, { IUI } from "./UI";
import UIContainer from "./UIContainer";

export default class ComboMeter extends UI {

    text : Phaser.GameObjects.Text;
    valueText : Phaser.GameObjects.Text;
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
        // this.scene.cache.bitmapFont.add('171', Phaser.GameObjects.RetroFont.Parse(this.scene, {
        //     image: '171',
        //     width: 16,
        //     height: 18,
        //     chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ| 0123456789*#!@:.,\\?-+=^$£()\'',
        //     charsPerRow: 19,
        //     "spacing.x": 0,
        //     "spacing.y": 1,
        //     lineSpacing : 20,
        //     "offset.x" : 0,
        //     "offset.y" : 0,
        // }));

        this.text = this.scene.add.text(0,0,"Combo Meter");
        this.valueText = this.scene.add.text(70,30,`x ${this.value[0].toString()}`);
        this.addElements([this.valueText]);
    }

    update(time: number, delta: number) {
        super.update(time,delta);
        this.valueText.text = this.value[0].toString();

        this.comboTimer[0] -= delta;

        if(this.comboTimer[0] <= 0) {
            this.value[0] = 1;
        }
    }
}