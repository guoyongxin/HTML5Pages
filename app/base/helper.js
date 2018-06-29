export function add_template(root_selector, templateText) {
    var template = $(templateText);
    $(root_selector).append(template);
}

export function enable_safe_zone() {
    var design_width = 750;
    var design_height = 1206;
    var ratio = Math.min(window.innerHeight / design_height, window.innerWidth / design_width);
    var delta_height = (window.innerHeight - design_height * ratio) / 2;
    var delta_width = (window.innerWidth - design_width * ratio) / 2;
    $('#sceneRoot').css('top', delta_height + 'px');
    $('#sceneRoot').css('bottom', delta_height + 'px');
    $('#sceneRoot').css('left', delta_width + 'px');
    $('#sceneRoot').css('right', delta_width + 'px');
}

export function disable_safe_zone() {
    $('#sceneRoot').css('top', '0px');
    $('#sceneRoot').css('bottom', '0px');
    $('#sceneRoot').css('left', '0px');
    $('#sceneRoot').css('right', '0px');
}

export function unhide_element(ele_selector) {
    $(ele_selector).removeClass('hide');
}

export function hide_element(ele_selector) {
    $(ele_selector).addClass('hide');
}

export function get_safe_zone_offset() {
    return $('#sceneRoot').offset();
}

export function is_playing_music() {
    return !$('#bgmControl').hasClass('off');
}

export function play_music() {
    let bgm_ctrl = $('#bgmControl');
    bgm_ctrl.removeClass('off');
    bgm_ctrl.velocity('resume');
    window.scene_manager.play_audio();
}

export function stop_music() {
    let bgm_ctrl = $('#bgmControl');
    bgm_ctrl.addClass('off');
    bgm_ctrl.velocity('pause');
    window.scene_manager.pause_audio();
}

export function is_weixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}