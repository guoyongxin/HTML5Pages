import { Scene } from "../../base/scene";
import * as helper from '../../base/helper';
import * as VALUES from "../../config/values";
import style from './firstScene.css';
const template = require('./firstScene.html');

export class FirstScene extends Scene {
    getTemplate() {
        return template;
    }
    

    // awake(should_transition) {
    //     if (this.is_awake) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    on_enable() {
        if (!super.on_enable()) {
            return false;
        }
        // this.report_visitor();
        // this.my_preload();
        // this.setup_animation();
        this.handleComplete();
        return true;
    }

    report_visitor() {
        var urlParams = new URLSearchParams(window.location.search);
        var from = urlParams.get('from') || '';
        var utc_millseconds = new Date().getTime();
        console.log('report from: ' + from + ', date: ' + String(utc_millseconds));
        var requestParam = new URLSearchParams();
        requestParam.append('from', from);
        requestParam.append('date', utc_millseconds);
        requestParam.append('appid', VALUES.APP_ID);
        $.ajax({
            url: VALUES.API_BASE + 'reportVisitor?' + requestParam.toString(),
            type: 'GET',
            success: function (data, textStatus) {
                console.log('report ok, ' + textStatus);
            },
            error: function (jqXHR, textStatus) {
                console.log('report fail, ' + textStatus);
            }
        });
    }

    handleComplete() {
        $('#startTest').on('click', () => {
            this.scene_manager.load_scene(window.sceneDef.chooseTeamScene());
        });
        // this.scene_manager.load_scene(this.scene_manager.scene_names.q1_scene);
        this.setup_animation();
    }

    setup_animation() {
        $('#logo').velocity({ opacity: 1.0 }, { delay: 700, duration: 300 });

        $('#startTest').velocity({ opacity: 1 }, { delay: 700, duration: 300 });

        let start_test_button_jq = $('#startTest');
        let start_test_button_seq = [
            { e: start_test_button_jq, p: { scale: 1.1 }, o: { delay: 500, duration: 200, loop: false, easing: 'linear' } },
            { e: start_test_button_jq, p: { scale: 1.0 }, o: { duration: 200, loop: false, easing: 'linear' } },
            { e: start_test_button_jq, p: { scale: 1.1 }, o: { duration: 200, loop: false, easing: 'linear' } },
            {
                e: start_test_button_jq, p: { scale: 1.0 }, o: {
                    duration: 200, loop: false, easing: 'linear', complete: () => {
                        $.Velocity.RunSequence(start_test_button_seq);
                    }
                }
            },
        ];
        $.Velocity.RunSequence(start_test_button_seq);

        $('#smallCat').velocity({ rotateZ: '10deg' }, { duration: 500, loop: true });
    }
}
