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
        public doorCount : number = 0;

        constructor(public id:number, public name: string, public imageURL:string, public width:number, public height:number, doorList: Door[]) {
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
            var room = Utility.Clone(this);
            room.name = name;
            room.imageURL = imageURL;
            room.id = id;
            return room;
        }

        Clone(): RoomTile {
            var tile = new RoomTile(this);
            tile.roomStats = Utility.Clone(this);

            tile.image.setWidth(this.width)
            tile.image.setHeight(this.height);

            tile.image.setDraggable("true");
            return tile;
        }
        GetLegend() : RoomIndex {
            var tile = new RoomIndex(this);
            return tile;
        }
    }

    export class RoomTile {
        image : Kinetic.Image;
        constructor(public roomStats : RoomTemplate){
            var img = new Image();
            img.src = roomStats.imageURL;
            this.image = new Kinetic.Image({image : img, width : roomStats.width, height : roomStats.height, draggable : true, offset : {x :roomStats.width/2, y :roomStats.height/2}});
            var _this = this;

            if(Engine.Debug)
                Utility.debugImage(this.image);

            this.image.on("mouseover", function() {


                // If we're linked up, don't move
                if(Engine.HasLink(_this)) return {};

                Engine.scrolling = _this.image;
                return {};
            })
            this.image.on("mouseout",function() { Engine.scrolling = null; return { };})
        }
    }

    export class RoomIndex extends RoomTile {
        label : Kinetic.Label;
        group : Kinetic.Group;
        constructor(stats :RoomTemplate) {
            super(stats);
            this.group = new Kinetic.Group({ draggable : false });
            // Generate the image
            this.image.setWidth( Utility.ScaleToThumbWidth(this.roomStats.width, this.roomStats.height));
            this.image.setHeight(Utility.ScaleToThumbHeight(this.roomStats.width, this.roomStats.height));
            this.image.setOffset(0,0);
            // Generate the label
            this.label = new Kinetic.Label({ y: this.image.getHeight(), x : 0, opacity : 0.75  });
            this.label.add(new Kinetic.Tag({fill : 'white'}));
            this.label.add(new Kinetic.Text({ text : this.roomStats.name, fill : 'black', width : 75, align : 'center'}));
            // Centre the image to the text
            this.label.setX((this.image.getWidth() - this.label.getWidth())/2);

            // group them up
            this.group.add(this.image).add(this.label);
            var _this = this;
            this.image.on('mousedown', function(){
                var newInstance = _this.roomStats.Clone();
                var cursor = _this.group.getStage().getMousePosition();
                newInstance.image.setPosition(cursor.x, cursor.y);
                Engine.GridLayer.add(newInstance.image);
                newInstance.image.startDrag();
                Engine.TileList.push(newInstance);
                return {};
            });
        }
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
    export class TileConnection {
        public Tile1 : RoomTile;
        public Door1 : Door;
        public Tile2 : RoomTile;
        public Door2 : Door;
    }

    export class Door implements IDoor {
        constructor(public id:number, public x:number, public y:number) {
        }
    }


}