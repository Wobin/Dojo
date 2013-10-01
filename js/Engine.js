/**
* Created with JetBrains WebStorm.
* User: Wobin
* Date: 21/09/13
* Time: 10:02 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="vendor/reference.d.ts"/>
var Engine;
(function (Engine) {
    var DraftingStage;
    Engine.GridLayer;
    var LibraryLayer;
    var usedWidth;
    Engine.scrolling;
    Engine.TileList;

    function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({ container: "DraftingBoard", width: window.innerWidth, height: window.innerHeight });
        LibraryLayer = new Kinetic.Layer();
        Engine.GridLayer = new Kinetic.Layer();
        Engine.TileList = [];
        usedWidth = 10;

        RoomStats.Rooms.forEach(function (room) {
            var legend = room.GetLegend(LibraryLayer);
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer).add(Engine.GridLayer);

        var _this = this;

        $("#DraftingBoard").mousewheel(function (event, delta, deltaX, deltaY) {
            if (Engine.scrolling != null) {
                Engine.scrolling.rotateDeg(90);
                Engine.scrolling.getLayer().draw();
                event.preventDefault();
            }
        });
    }
    Engine.CreateLibrary = CreateLibrary;
    ;

    function GetClosestAvailableDoors(CurrentTile) {
        var link = new Elements.TileConnection();
        link.Tile1 = CurrentTile;
        return link;
    }
    Engine.GetClosestAvailableDoors = GetClosestAvailableDoors;

    document.addEventListener('DOMContentLoaded', function () {
        Engine.CreateLibrary();
    });
})(Engine || (Engine = {}));
//# sourceMappingURL=Engine.js.map
