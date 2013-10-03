/**
 * Created by Benjamin on 3/10/13.
 */
///<reference path="../vendor/reference.d.ts"/>

module Utility {
    export function ScaleToThumbWidth(width :number, height: number) :number
    {
        if(width >= height) return 75;
        else return  width / height * 75;
    }
    export function ScaleToThumbHeight(width :number, height: number) :number
    {
        if(height >= width) return 75;
        else return  height / width * 75;
    }
    export function Clone<T>(item : T) : T
    {
        return jQuery.extend(true, {}, item);
    }
    export function debugImage(_this : Kinetic.Image)
    {
        _this.on("mousemove", function(){
        var mousePos = Engine.GridLayer.getStage().getMousePosition();
        var x = mousePos.x - _this.getX();
        var y = mousePos.y - _this.getY();
        Engine.DebugText.setText(x + ":" + y);
        Engine.DebugLayer.draw();
            return {};
        });
    }
}