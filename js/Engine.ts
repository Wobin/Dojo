/**
 * Created with JetBrains WebStorm.
 * User: Wobin
 * Date: 21/09/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="vendor/reference.d.ts"/>

module Engine{
    var LibraryStage : Kinetic.Stage;
    var LibraryLayer : Kinetic.Layer;
    var usedWidth : number;

    export function CreateLibrary() {
        LibraryStage = new Kinetic.Stage({container : "Library", width : 1700, height: 500});
        LibraryLayer = new Kinetic.Layer();

        usedWidth = 0;

        RoomStats.Rooms.forEach(function(room){
            LibraryLayer.add(room.GetLegend().image);
        });
        LibraryStage.add(LibraryLayer);
    };

document.addEventListener('DOMContentLoaded', function () {
   Engine.CreateLibrary();
});

}
