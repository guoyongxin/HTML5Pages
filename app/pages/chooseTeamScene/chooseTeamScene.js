import { Scene } from "../../base/scene";
import * as helper from '../../base/helper';
import * as VALUES from "../../config/values";
import style from './chooseTeamScene.css';
const template = require('./chooseTeamScene.html');

export class ChooseTeamScene extends Scene {
    getTemplate() {
        return template;
    }

    awake(should_transition) {
        if (!super.awake(should_transition)) {
            return false;
        }
        // this.setupCloseButton();
        setTimeout(() => {
            // this.setupAnimation();
        }, this.transition_duration);

        return true;
    }

}
