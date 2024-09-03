import Mob from "../components/mob/mob";

export class Trail extends Phaser.GameObjects.Graphics {
    private parent : Mob = undefined;

    create(parent: Mob, rect: Phaser.GameObjects.Rectangle) {
        this.parent = parent;
        this.fillRect(rect.x,rect.y,rect.w,rect.z);
    }

    update() {
        this.z = Phaser.Math.Distance.Between(this.x,this.y,this.parent.x,this.parent.y);
    }


}