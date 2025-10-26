import Enemy from "./enemy";

export default class EnemyGroup {
    private _triggerTimer: number = null;
    private _enemies : Enemy[] = [];

    private _active : boolean = false;
    public set active(value : boolean) {
        this._enemies.forEach((e : Enemy)=>e.active = value);
    }
    public get active() { return this._active; }
    public _activeTimer : number;

    /**
     * registerGroup
     */
    public registerGroup(enemies : Enemy[], triggerTimer: number) : void {
        this._enemies = enemies;
        this._triggerTimer = triggerTimer; 
    }

    public checkIfTriggerTimer(delta : number) {
        if(delta >= this._triggerTimer) {
            this.active = true;
        }
    }
}