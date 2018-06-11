class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }
    private type:number;
    private _nScaleBase:number;
    private static STEP_ROT:number= 3;
    private static STEP_SCALE:number= .3;
    private onAddToStage(event:egret.Event) {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
        imgLoader.load( "resource/tim.jpg");
        this.type=0;
        this._nScaleBase=0;
    }
    private touchmove(bitmap:egret.Bitmap): void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent) => {
            console.log("TOUCH_MOVE");

            bitmap.x= evt.localX;
            bitmap.y= evt.localY;
        })
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent) => {
            console.log("TOUCH_END");
            this.type=( this.type +1 )%3;
        })
    };
    private run(bitmap:egret.Bitmap):void{

        this.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
            if(this.type==1){
                bitmap.rotation+=Main.STEP_ROT;
            }
            if(this.type==3){
                bitmap.scaleX = bitmap.scaleY = 0.5 + 0.5* Math.abs( Math.sin( this._nScaleBase += Main.STEP_SCALE ) );


            }
        })


    }
    private imgLoadHandler( evt:egret.Event ):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;
      var  texture = new egret.Texture();
        texture._setBitmapData(bmd);
        var bitmap:egret.Bitmap = new egret.Bitmap(texture);
        this.addChild(bitmap);
        bitmap.anchorOffsetX= bmd.width/2;
        bitmap.anchorOffsetY= bmd.height/2;
        bitmap.x =this.stage.stageWidth*0.5;
        bitmap.y= this.stage.stageHeight*0.5;
       var texInfo = new egret.TextField;
       this.addChild(texInfo);
        texInfo.text= '居中显示的文字';
        texInfo.size= 28;
        texInfo.x =this.stage.stageWidth*0.5-texInfo.textWidth/2;
        texInfo.y= 50;
        texInfo.textColor=0x000080;
        texInfo.textAlign= egret.HorizontalAlign.CENTER;
       var bgInfo = new egret.Shape;
        this.addChildAt(bgInfo,0 );
        bgInfo.graphics.clear();
        bgInfo.graphics.beginFill(0xffffff);
        bgInfo.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        bgInfo.graphics.endFill();
        this.touchmove(bitmap);
        this.run(bitmap);

    }

}