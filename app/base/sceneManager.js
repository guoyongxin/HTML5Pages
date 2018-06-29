import * as helper from './helper'
import * as SceneDef from "../config/sceneDef";

//def SceneManager
export class SceneManager {
    constructor(root_selector) {
        this.audio = new Audio();
        if (typeof (this.audio.loop) == 'boolean') {
            this.audio.loop = true;
        }
        else {
            this.audio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        this.current_scene = null;
        this.root_selector = root_selector;
        this.scene_names = SceneDef.scene_names;
        this.scene_caches = {
        }
        this.user_info = null;
        this.render_texture = null;

        // this.user_info = {
        //     name: '李.大猫 mr.li da mao',
        //     display_name: '李.大猫 Mr.Li Da Mao',
        //     department: 'ZJU',
        //     cat_type: 3,
        //     team_number: 2,
        // }
    }

    set_audio(audio_path) {
        this.audio.src = audio_path;
    }

    play_audio() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause_audio() {
        this.audio.pause();
    }

    preload_scene(scene_name, scene_def) {
        var scene = this.get_or_add_scene_cache(scene_name, scene_def);
        scene.awake();
    }

    get_or_add_scene_cache(scene_name, scene_def) {
        var scene_cache = this.scene_caches[scene_name];
        if (null == scene_cache || scene_cache.is_destroyed) {
            scene_cache = new scene_def(this, scene_name);
            scene_cache.is_retain = true;
        }
        this.scene_caches[scene_name] = scene_cache;
        return scene_cache;
    }

    load_scene(scene, should_transition = true) {
        if (this.current_scene != null) {
            this.current_scene.on_disable();
            this.current_scene.on_destroy(should_transition);
        }
        this.current_scene = scene;
        console.log(`load_scene ${this.current_scene.getName()}`);
        this.current_scene.awake(should_transition);
        this.current_scene.on_enable();
    }
}
//end
