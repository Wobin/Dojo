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
    Engine.DebugLayer;
    Engine.DebugText;
    Engine.Debug = true;
    var LibraryLayer;
    var usedWidth;
    Engine.scrolling;
    Engine.Doors;
    Engine.Tiles;

    function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({ container: "DraftingBoard", width: window.innerWidth, height: window.innerHeight });
        LibraryLayer = new Kinetic.Layer();
        Engine.GridLayer = new Kinetic.Layer();
        Engine.DebugLayer = new Kinetic.Layer();
        Engine.Tiles = [];
        Engine.Doors = {};
        usedWidth = 10;

        RoomStats.Rooms.forEach(function (room) {
            var legend = room.GetLegend();
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer).add(Engine.GridLayer);

        if (Engine.Debug) {
            DraftingStage.add(Engine.DebugLayer);
            Engine.DebugText = new Kinetic.Text({
                x: 10,
                y: 150,
                fontFamily: 'Calibri',
                fontSize: 24,
                text: '',
                fill: 'black'
            });

            Engine.DebugLayer.add(Engine.DebugText);
        }

        var _this = this;

        $("#DraftingBoard").mousewheel(function (event, delta, deltaX, deltaY) {
            if (Engine.scrolling != null) {
                Engine.scrolling.image.rotateDeg(90);
                Engine.scrolling.rotation = ++Engine.scrolling.rotation % 3;
                Engine.scrolling.image.fire('dragend');
                Engine.scrolling.image.getLayer().draw();
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

    function HasLink(Tile) {
        //if(Tile)
        return false;
    }
    Engine.HasLink = HasLink;
    function Connect(Connector) {
    }
    Engine.Connect = Connect;
    document.addEventListener('DOMContentLoaded', function () {
        Engine.CreateLibrary();
    });
})(Engine || (Engine = {}));
//# sourceMappingURL=Engine.js.map
