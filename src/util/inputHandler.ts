import BaseScene from "../scene/base/base";

class InputHandler {
    public keyboardInput: {
        left: any;
        right: any;
        up: any,
        down: any;
        fire: any;
    }

    public joyPadInput: {
        left: any;
        right: any;
        up: any,
        down: any;
        fire: any;
    }

    scene: BaseScene;
    awaitGamePad: Promise<void> = new Promise<void>((resolve) => { this.gamepadFound = resolve });
    gamepadFound: () => void;
    gamepadReady = false;

    async assign(scene: BaseScene) {

        this.keyboardInput = {
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            fire: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }

        await this.awaitGamePad;
        const gamepad = scene.input.gamepad.getPad(0);
        this.gamepadReady = true;
        this.joyPadInput = {
            left: gamepad.axes[0].getValue() > 0,
            right: gamepad.axes[0].getValue() < 0,
            up: gamepad.axes[0].getValue() > 0,
            down: gamepad.axes[0].getValue() < 0,
            fire: gamepad.A
        }
    }

    waitForGamePadInput(scene: BaseScene) {
        if (scene.input.gamepad.total === 0) {
            return;
        } else {
            this.gamepadFound();
        }
    }
}

export default new InputHandler();