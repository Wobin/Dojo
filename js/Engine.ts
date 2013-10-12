/**
 * Created with JetBrains WebStorm.
 * User: Wobin
 * Date: 21/09/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="definitions/reference.d.ts"/>

module Engine{
    var DraftingStage : Kinetic.Stage;
    export var GridLayer : Kinetic.Layer = new Kinetic.Layer();
    export var DebugLayer : Kinetic.Layer = new Kinetic.Layer();
    var LibraryLayer : Kinetic.Layer = new Kinetic.Layer();
    var usedWidth : number = 10;
    export var scrolling : Elements.RoomTile;
    export var Doors : TileList = {};
    export var Tiles : Elements.RoomTile[] = [];

    export var DebugText : Kinetic.Text;
    export var Debug : boolean = true;

    export interface TileList {
        [tile : number] : Elements.Sheaf;
    }
    export function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({container : "DraftingBoard", width : window.innerWidth, height: window.innerHeight});

        // Create a legend tile for each room
        RoomStats.Rooms.forEach(function(room){
            var legend = room.GetLegend();
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer).add(GridLayer);

        if(Debug) // throw up debug window
        {
            SetupDebug();
        }

        SetupEventWatches();
    };

    function SetupEventWatches()
    {
        var _this = this;

        $("#DraftingBoard").mousewheel(function(event, delta, deltaX, deltaY){
            if(Engine.scrolling != null)
            {
                Engine.scrolling.image.rotateDeg(90);
                Engine.scrolling.rotation = ++Engine.scrolling.rotation % 3;
                //Engine.scrolling.image.fire('dragend');
                Engine.scrolling.image.getLayer().draw();
                event.preventDefault();
            }

        })
    }
    function SetupDebug()
    {
        DraftingStage.add(DebugLayer);
        DebugText = new Kinetic.Text({
            x: 10,
            y: 150,
            fontFamily: 'Calibri',
            fontSize: 24,
            text: '',
            fill: 'black'
        });

        DebugLayer.add(DebugText);
    }

    export function FindClosestDoor(CurrentTile : Elements.RoomTile)
    {
        var door : number;
        var distance : number = Number.MAX_VALUE;
        var tile : Elements.RoomTile;
        var doorIndex : number;




        console.info("argh")
    }

    export function HasLink(Tile: Elements.RoomTile) : boolean
    {
        //if(Tile)
        return false;
    }

$(window).load(Engine.CreateLibrary);
}
