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

        constructor(public id:number, public name: string, public imageURL:string, public height:number, public width:number, doorList: Door[]) {
            this.doors = {};
            for(var i = 0; i < doorList.length; i++)
            {
                this.doorCount++;
                this.doors[doorList[i].id] = doorList[i];
            }
            this.xCentre = height/2;
            this.yCentre = width/2;
        }
        Copy(id: number, name : string, imageURL : string) : RoomTemplate {
            var room = jQuery.extend(true, {}, this);
            room.name = name;
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
            tile.group = new Kinetic.Group({ draggable : true, });
            tile.roomStats = this;
            // Generate the image
            tile.image = new Kinetic.Image({ x :0, y: 0,  image : img, width: ScaleToThumbWidth(this.width, this.height), height: ScaleToThumbHeight(this.width, this.height)});

            // Generate the label
            tile.label = new Kinetic.Label({ y: tile.image.getHeight(), x : 0, opacity : 0.75  });
            tile.label.add(new Kinetic.Tag({fill : 'white'}));
            tile.label.add(new Kinetic.Text({ text : this.name, fill : 'black', width : 75, align : 'center'}));
            // Centre the image to the text
            tile.label.setX((tile.image.getWidth() - tile.label.getWidth())/2);

            // group them up
            tile.group.add(tile.image).add(tile.label);

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
        label : Kinetic.Label;
        group : Kinetic.Group;
        roomStats: RoomTemplate;
        layer : Kinetic.Layer;
        getWidth() : number {
            var minX : number = 0;
            var maxX : number = 0;
            this.group.getChildren().forEach(function(child : Kinetic.Node){
                if(child.getX() <= minX) {
                    minX = child.getX();
                }
                if(child.getX() + child.getWidth() >= maxX) {
                    maxX = child.getX() + child.getWidth();
                }
            });
            return maxX - minX;
        }
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