/**
* Created with JetBrains WebStorm.
* User: Wobin
* Date: 21/09/13
* Time: 10:02 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="definitions/reference.d.ts"/>
var Engine;
(function (Engine) {
    var DraftingStage;
    Engine.GridLayer = new Kinetic.Layer();
    Engine.DebugLayer = new Kinetic.Layer();
    var LibraryLayer = new Kinetic.Layer();
    var usedWidth = 10;
    Engine.scrolling;
    Engine.Doors = {};
    Engine.Tiles = [];

    Engine.DebugText;
    Engine.Debug = true;

    function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({ container: "DraftingBoard", width: window.innerWidth, height: window.innerHeight });

        // Create a legend tile for each room
        RoomStats.Rooms.forEach(function (room) {
            var legend = room.GetLegend();
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer).add(Engine.GridLayer);

        if (Engine.Debug) {
            SetupDebug();
        }

        SetupEventWatches();
    }
    Engine.CreateLibrary = CreateLibrary;
    ;

    function SetupEventWatches() {
        var _this = this;

        $("#DraftingBoard").mousewheel(function (event, delta, deltaX, deltaY) {
            if (Engine.scrolling != null) {
                Engine.scrolling.image.rotateDeg(90);
                Engine.scrolling.rotation = ++Engine.scrolling.rotation % 3;

                //Engine.scrolling.image.fire('dragend');
                Engine.scrolling.image.getLayer().draw();
                event.preventDefault();
            }
        });
    }
    function SetupDebug() {
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

    function FindClosestDoor(CurrentTile) {
        var door;
        var distance = Number.MAX_VALUE;
        var tile;
        var doorIndex;

        console.info("argh");
    }
    Engine.FindClosestDoor = FindClosestDoor;

    function HasLink(Tile) {
        //if(Tile)
        return false;
    }
    Engine.HasLink = HasLink;

    $(window).load(Engine.CreateLibrary);
})(Engine || (Engine = {}));
//# sourceMappingURL=Engine.js.map
