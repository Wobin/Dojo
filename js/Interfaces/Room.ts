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

        constructor(public id:number, public imageURL:string, public height:number, public width:number, doorList: Door[]) {
            this.doors = {};
            for(var i = 0; i < doorList.length; i++)
            {
                this.doorCount++;
                this.doors[doorList[i].id] = doorList[i];
            }
            this.xCentre = height/2;
            this.yCentre = width/2;
        }
        Copy(imageURL : string, id: number) : RoomTemplate {
            var room = jQuery.extend(true, {}, this);
            room.imageURL = imageURL;
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
            img.src = this.imageURL;
            tile.image = new Kinetic.Image({ image : img, width : this.width, height : this.height});
            return tile;
        }
        GetLegend() : RoomTile {
            var img = new Image();
            img.src = this.imageURL;
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.image = new Kinetic.Image({ x :50, y: 50,  image : img, width: ScaleToThumbWidth(this.width, this.height), height: ScaleToThumbHeight(this.width, this.height), draggable : true });
            return tile;
        }


    }
    function ScaleToThumbWidth(width :number, height: number) :number
    {
        if(width >= height) return 75;
        else return  width / height * 75;
    }
    function ScaleToThumbHeight(width :number, height: number) :number
    {
        if(height >= width) return 75;
        else return  height / width * 75;
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