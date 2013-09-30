/**
 * Created with JetBrains WebStorm.
 * User: Wobin
 * Date: 21/09/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="vendor/reference.d.ts"/>

module Engine{
    var DraftingStage : Kinetic.Stage;
    var GridLayer : Kinetic.Layer;
    var LibraryLayer : Kinetic.Layer;
    var usedWidth : number;
    export var scrolling : Kinetic.Image;

    export function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({container : "DraftingBoard", width : window.innerWidth, height: window.innerHeight});
        LibraryLayer = new Kinetic.Layer({x: 0, y: 0});
        usedWidth = 10;

        RoomStats.Rooms.forEach(function(room){
            var legend = room.GetLegend(LibraryLayer);
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer);
        var _this = this;
        $("#DraftingBoard").mousewheel(function(event, delta, deltaX, deltaY){
            if(Engine.scrolling != null)
            {
                Engine.scrolling.rotateDeg(90);
                Engine.scrolling.getLayer().draw();
                event.preventDefault();
            }

        })

    };

document.addEventListener('DOMContentLoaded', function () {
   Engine.CreateLibrary();
});

}
