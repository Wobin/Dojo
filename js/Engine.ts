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
    export var GridLayer : Kinetic.Layer;
    export var DebugLayer : Kinetic.Layer;
    export var DebugText : Kinetic.Text;
    export var Debug : boolean = true;
    var LibraryLayer : Kinetic.Layer;
    var usedWidth : number;
    export var scrolling : Elements.RoomTile;
    export var Doors : TileList;
    export var Tiles : Elements.RoomTile[]

    export interface TileList {
        [tile : number] : Elements.Sheaf;
    }
    export function CreateLibrary() {
        DraftingStage = new Kinetic.Stage({container : "DraftingBoard", width : window.innerWidth, height: window.innerHeight});
        LibraryLayer = new Kinetic.Layer();
        GridLayer = new Kinetic.Layer();
        DebugLayer = new Kinetic.Layer();
        Tiles = [];
        Doors = {};
        usedWidth = 10;

        RoomStats.Rooms.forEach(function(room){
            var legend = room.GetLegend();
            legend.group.setX(usedWidth);
            LibraryLayer.add(legend.group);
            usedWidth += legend.getWidth() + 5;
        });
        DraftingStage.add(LibraryLayer).add(GridLayer);

        if(Debug)
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


        var _this = this;

        $("#DraftingBoard").mousewheel(function(event, delta, deltaX, deltaY){
            if(Engine.scrolling != null)
            {
                Engine.scrolling.image.rotateDeg(90);
                Engine.scrolling.rotation = ++Engine.scrolling.rotation % 3;
                Engine.scrolling.image.fire('dragend');
                Engine.scrolling.image.getLayer().draw();
                event.preventDefault();
            }

        })

    };

    export function GetClosestAvailableDoors(CurrentTile : Elements.RoomTile) : Elements.TileConnection
    {
        var link = new Elements.TileConnection();
        link.Tile1 = CurrentTile;
        return link;
    }

    export function HasLink(Tile: Elements.RoomTile) : boolean
    {
        //if(Tile)
        return false;
    }
    export function Connect(Connector : Elements.TileConnection )
    {

    }
document.addEventListener('DOMContentLoaded', function () {
   Engine.CreateLibrary();
});

}
