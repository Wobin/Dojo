/**
* Created with JetBrains WebStorm.
* User: Benjamin
* Date: 16/09/13
* Time: 9:15 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="../vendor/reference.d.ts"/>
var Elements;
(function (Elements) {
    var RoomTemplate = (function () {
        function RoomTemplate(id, image, height, width, doorList) {
            this.id = id;
            this.image = image;
            this.height = height;
            this.width = width;
            this.doors = {};
            for (var i = 0; i < doorList.length; i++) {
                this.doorCount++;
                this.doors[doorList[i].id] = doorList[i];
            }
            this.xCentre = height / 2;
            this.yCentre = width / 2;
        }
        RoomTemplate.prototype.Copy = function (image, id) {
            var room = jQuery.extend(true, {}, this);
            room.image = image;
            room.id = id;
            return room;
        };

        RoomTemplate.prototype.GetCoords = function (rotation) {
            var currentDoors;
            for (var i = 1; i <= this.doorCount; i++) {
                var door = this.doors[i];
                var x = this.xCentre + Math.cos(rotation) * (door.x - this.xCentre) - Math.sin(rotation) * (door.y - this.yCentre);
                var y = this.yCentre + Math.sin(rotation) * (door.x - this.xCentre) - Math.cos(rotation) * (door.y - this.yCentre);
                currentDoors.push(new Door(door.id, x, y));
            }
            ;
            return currentDoors;
        };
        RoomTemplate.prototype.Clone = function () {
            var img = new Image();
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.layer = new Kinetic.Layer();
            img.src = this.image;
            img.onload = function () {
                tile.image = new Kinetic.Image({ image: img });
                tile.layer.add(tile.image);
            };
            return tile;
        };
        RoomTemplate.prototype.GetLegend = function () {
            var img = new Image();
            img.src = this.image;
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.image = new Kinetic.Image({ image: img, width: ScaleToThumbWidth(this.width, this.height), height: ScaleToThumbHeight(this.width, this.height), draggable: true });
            tile.layer = new Kinetic.Layer();
            tile.layer.add(tile.image);
            return tile;
        };
        return RoomTemplate;
    })();
    Elements.RoomTemplate = RoomTemplate;
    function ScaleToThumbWidth(width, height) {
        if (width >= height)
            return 100;
else
            return width / height * 100;
    }
    function ScaleToThumbHeight(width, height) {
        if (height >= width)
            return 100;
else
            return width / height * 100;
    }

    var RoomTile = (function () {
        function RoomTile() {
        }
        return RoomTile;
    })();
    Elements.RoomTile = RoomTile;

    var Room = (function () {
        function Room(template) {
            this.template = template;
        }
        return Room;
    })();
    Elements.Room = Room;
    var Door = (function () {
        function Door(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
        }
        return Door;
    })();
    Elements.Door = Door;
})(Elements || (Elements = {}));
//# sourceMappingURL=Room.js.map
