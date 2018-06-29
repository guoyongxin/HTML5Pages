import style from './app.css';

// import "babel-polyfill"
// import 'url-search-params-polyfill'
require("jquery");
require("velocity-animate");
require("velocity-ui-pack");
require("weixin-js-sdk");

import './assets/audio/bgm1.mp3'
import { SceneManager } from "./base/sceneManager";
import { SceneDef } from "./config/sceneDef";
import { config_wx } from "./wx/wxfunc";
import * as helper from './base/helper';

window.IS_DEBUG = false;
window.scene_manager = new SceneManager('#sceneRoot');

window.sceneDef = new SceneDef(window.scene_manager);

window.addEventListener('resize', function () {
    // ??? what is roam scene
    // if (scene_manager == null 
    //     // || scene_manager.current_scene.scene_name != scene_manager.scene_names.roam_scene
    // ) {
        helper.enable_safe_zone();
    // }
}, false);

function initBGM() {
    let bgm_ctrl = $('#bgmControl');
    bgm_ctrl.velocity({ rotateZ: '360deg' }, { duration: 1000, loop: true, easing: 'linear' });
    bgm_ctrl.velocity('pause');
    $('#bgmControlContainer').bind('click', () => {
        bgm_ctrl.toggleClass('off');
        if (bgm_ctrl.hasClass('off')) {
            helper.stop_music();
        }
        else {
            helper.play_music();
        }
    });

    scene_manager.set_audio('app/assets/audio/bgm1.mp3');
    // helper.play_music();
}

function initPage() {
    helper.enable_safe_zone();
    $('#compatibleContainer').bind('touchmove', (event) => { event.preventDefault() });
}

$(function () {
    initPage();
    initBGM();
    scene_manager.load_scene(sceneDef.firstScene());
    // scene_manager.load_scene(sceneDef.chooseTeamScene());
});

if (helper.is_weixin()) {
    config_wx();
}
