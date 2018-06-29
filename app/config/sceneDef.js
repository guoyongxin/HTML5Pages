import { FirstScene } from '../pages/firstScene/firstScene'
import { ChooseTeamScene } from '../pages/chooseTeamScene/chooseTeamScene'

export class SceneDef {
    constructor(scene_manager) {
        this.scene_manager = scene_manager;
    }

    firstScene() {
        const first = new FirstScene(this.scene_manager, 'firstScene');
        return first
    }

    chooseTeamScene() {
        const chooseTeamScene = new ChooseTeamScene(this.scene_manager, 'chooseTeamScene');
        return chooseTeamScene;
    }

}