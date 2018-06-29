import * as helper from './helper'
//def Scene
export class Scene {
    constructor(scene_manager, scene_name) {
        this.scene_manager = scene_manager;
        this.scene_name = scene_name;
        this.is_awake = false;
        this.is_destroyed = false;
        this.is_enabled = false;
        this.is_retain = false;
        this.transition_duration = 500;
    }

    awake(should_transition) {
        if (this.is_awake) {
            return false;
        }
        else {
            helper.add_template(this.scene_manager.root_selector, this.getTemplate());
            if (should_transition) {
                let root_jq = $('#' + this.scene_name + 'Root');
                let bg_jq = $('#' + this.scene_name + 'Background');
                $('<div>').velocity({ tween: [0, 100] }, {
                    progress: (e, c, r, s, t) => {
                        root_jq.css('top', t + '%');
                        bg_jq.css('transform', 'translateY(' + t + '%' + ')');
                    },
                    easing: 'linear', duration: this.transition_duration, loop: false
                })
            }
            this.is_awake = true;
            return true;
        }
    }

    on_destroy(should_transition) {
        if (this.is_retain) {
            return false;
        }
        if (this.is_destroyed) {
            return false;
        }
        else {
            if (should_transition) {
                let root_jq = $('#' + this.scene_name + 'Root');
                let bg_jq = $('#' + this.scene_name + 'Background');
                $('<div>').velocity({ tween: [-100, 0] }, {
                    progress: (e, c, r, s, t) => {
                        root_jq.css('top', t + '%');
                        bg_jq.css('transform', 'translateY(' + t + '%' + ')');
                    },
                    complete: () => {
                        root_jq.remove();
                    },
                    easing: 'linear', duration: this.transition_duration, loop: false
                })
            }
            else {
                $('#' + this.scene_name + 'Root').remove();
            }
            this.is_destroyed = true;
            return true;
        }
    }

    on_enable() {
        if (this.is_enabled) {
            return false;
        }
        else {
            this.is_enabled = true;
            return true;
        }
    }

    on_disable() {
        if (!this.is_enabled) {
            return false;
        }
        else {
            this.is_enabled = false;
            return true;
        }
    }

    getTemplate() {
        return '';
    }

    getName() {
        return this.scene_name;
    }
}
//end