import BeamEnemy from "../components/enemy/beamEnemy";
import Enemy from "../components/enemy/enemy";
import Turret from "../components/enemy/turret";
import { IMob } from "../components/mob/data/mob";
import Mob from "../components/mob/mob";

export default function(enemyType : string, options: IMob) {
    const data : IMob = options;
    let mob : Mob
    switch(enemyType) {
        case "enemy": {mob = Enemy.spawn(data,Enemy); break;}
        case "turret": {mob = Turret.spawn(data,Turret); break;}
        case "beam" : {mob = BeamEnemy.spawn(data,BeamEnemy); break;}
    }

    return mob;
}