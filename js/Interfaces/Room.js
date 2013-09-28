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
        function RoomTemplate(id, imageURL, height, width, doorList) {
            this.id = id;
            this.imageURL = imageURL;
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
        RoomTemplate.prototype.Copy = function (imageURL, id) {
            var room = jQuery.extend(true, {}, this);
            room.imageURL = imageURL;
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
            img.src = this.imageURL;
            tile.image = new Kinetic.Image({ image: img, width: this.width, height: this.height });
            return tile;
        };
        RoomTemplate.prototype.GetLegend = function () {
            var img = new Image();
            img.src = this.imageURL;
            var tile = new RoomTile();
            tile.roomStats = this;
            tile.image = new Kinetic.Image({ x: 50, y: 50, image: img, width: ScaleToThumbWidth(this.width, this.height), height: ScaleToThumbHeight(this.width, this.height), draggable: true });
            return tile;
        };
        return RoomTemplate;
    })();
    Elements.RoomTemplate = RoomTemplate;
    function ScaleToThumbWidth(width, height) {
        if (width >= height)
            return 75;
else
            return width / height * 75;
    }
    function ScaleToThumbHeight(width, height) {
        if (height >= width)
            return 75;
else
            return height / width * 75;
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
