/**
 * Created with JetBrains WebStorm.
 * User: Benjamin
 * Date: 16/09/13
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */
///<reference path="../vendor/reference.d.ts"/>

module Elements {
    export interface IDoor {
        id : number;
        x : number;
        y : number;
    }
    export interface Sheaf {
        [id : number] : Door;
    }
    export interface Connections {
        [doorNumber :number ] : number;
    }
    export class RoomTemplate {
        public doors:Sheaf;
        public xCentre : number;
        public yCentre : number;
        public doorCount : number;
        constructor(public id:number, public image:string, public height:number, public width:number, doorList: Door[]) {
            this.doors = {};
            for(var i = 0; i < doorList.length; i++)
            {
                this.doorCount++;
                this.doors[doorList[i].id] = doorList[i];
            }
            this.xCentre = height/2;
            this.yCentre = width/2;
        }
        Copy(image : string, id: number) : RoomTemplate {
            var room = jQuery.extend(true, {}, this);
            room.image = image;
            room.id = id;
            return room;
        }

        GetCoords(rotation: number) : Door[]
        {
            var currentDoors : Door[];
            for(var i = 1; i <= this.doorCount; i++){
                var door = this.doors[i];
                var x = this.xCentre + Math.cos(rotation) * (door.x - this.xCentre) - Math.sin(rotation) * ( door.y - this.yCentre)
                var y = this.yCentre + Math.sin(rotation) * (door.x - this.xCentre) - Math.cos(rotation) * ( door.y - this.yCentre)
                currentDoors.push(new Door(door.id, x, y));
            };
            return currentDoors;
        }
        Clone(): RoomTile {
            var img = new Image();
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.layer = new Kinetic.Layer();
            img.src = this.image;
            img.onload = function() {
                tile.image = new Kinetic.Image({ image : img});
                tile.layer.add(tile.image);
            };
            return tile;
        }
        GetLegend() : RoomTile {
            var img = new Image();
            img.src = this.image;
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.image = new Kinetic.Image({ image : img, width: ScaleToThumbWidth(this.width, this.height), height: ScaleToThumbHeight(this.width, this.height), draggable : true });
            tile.layer = new Kinetic.Layer();
            tile.layer.add(tile.image);
            return tile;
        }


    }
    function ScaleToThumbWidth(width :number, height: number) :number
    {
        if(width >= height) return 100;
        else return  width / height * 100;
    }
    function ScaleToThumbHeight(width :number, height: number) :number
    {
        if(height >= width) return 100;
        else return  width / height * 100;
    }

    export class RoomTile {
        image : Kinetic.Image;
        roomStats: RoomTemplate;
        layer : Kinetic.Layer;
    }

    export class Room {
        public id:number;
        public connections: Connections;
        constructor(public template : RoomTemplate) {

        }
    }
    export class Door implements IDoor {
        constructor(public id:number, public x:number, public y:number) {
        }
    }


}