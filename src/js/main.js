//////////////////////////////////////////////////////////////////////
//
// ライブラリのインポート
//
//////////////////////////////////////////////////////////////////////

// jQueryの"$"を使えるようにする
var $ = require('jquery');
window.$ = window.jQuery = require('jquery');

// TweenMax
var TweenMax = require('gsap');

// ScrollMagic
var ScrollMagic = require('scrollmagic');

// ScrollMagicのgsapプラグイン（要imports-loader）
require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

// jQuery easing
require('jquery.easing');

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// PCの時にbodyに.hoverを付ける
var hover = require('./hover');

// ページトップへ戻る
var pagetop = require('./pagetop');
pagetop('#js-pagetop');

// SP幅のナビの処理
var spNavi = require('./sp-navi');

// front.jsを読み込み
var front = require('./front');

// def.jsを読み込み
var def = require('./def');
