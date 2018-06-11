var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/tim.jpg");
        this.type = 0;
        this._nScaleBase = 0;
    };
    Main.prototype.touchmove = function (bitmap) {
        var _this = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (evt) {
            console.log("TOUCH_MOVE");
            bitmap.x = evt.localX;
            bitmap.y = evt.localY;
        });
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            console.log("TOUCH_END");
            _this.type = (_this.type + 1) % 3;
        });
    };
    ;
    Main.prototype.run = function (bitmap) {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            if (_this.type == 1) {
                bitmap.rotation += Main.STEP_ROT;
            }
            if (_this.type == 2) {
                bitmap.scaleX = bitmap.scaleY = 0.5 + 0.5 * Math.abs(Math.sin(_this._nScaleBase += Main.STEP_SCALE));
            }
        });
    };
    Main.prototype.imgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        var texture = new egret.Texture();
        texture._setBitmapData(bmd);
        var bitmap = new egret.Bitmap(texture);
        this.addChild(bitmap);
        bitmap.anchorOffsetX = bmd.width / 2;
        bitmap.anchorOffsetY = bmd.height / 2;
        bitmap.x = this.stage.stageWidth * 0.5;
        bitmap.y = this.stage.stageHeight * 0.5;
        var texInfo = new egret.TextField;
        this.addChild(texInfo);
        texInfo.text = '居中显示的文字';
        texInfo.size = 28;
        texInfo.x = this.stage.stageWidth * 0.5 - texInfo.textWidth / 2;
        texInfo.y = 50;
        texInfo.textColor = 0x000080;
        texInfo.textAlign = egret.HorizontalAlign.CENTER;
        var bgInfo = new egret.Shape;
        this.addChildAt(bgInfo, 0);
        bgInfo.graphics.clear();
        bgInfo.graphics.beginFill(0xffffff);
        bgInfo.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        bgInfo.graphics.endFill();
        this.touchmove(bitmap);
        this.run(bitmap);
    };
    Main.STEP_ROT = 3;
    Main.STEP_SCALE = .3;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
