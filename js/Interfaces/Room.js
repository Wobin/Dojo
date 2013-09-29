/**
* Created with JetBrains WebStorm.
* User: Benjamin
* Date: 16/09/13
* Time: 9:15 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="../vendor/reference.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Elements;
(function (Elements) {
    var RoomTemplate = (function () {
        function RoomTemplate(id, name, imageURL, height, width, doorList) {
            this.id = id;
            this.name = name;
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
        RoomTemplate.prototype.Copy = function (id, name, imageURL) {
            var room = jQuery.extend(true, {}, this);
            room.name = name;
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
        RoomTemplate.prototype.GetLegend = function (gLayer) {
            var tile = new RoomIndex(this, gLayer);
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

    var RoomIndex = (function (_super) {
        __extends(RoomIndex, _super);
        function RoomIndex(stats, layer) {
            _super.call(this);
            this.layer = layer;
            var img = new Image();
            img.src = stats.imageURL;
            this.group = new Kinetic.Group({ draggable: false });
            this.roomStats = stats;

            // Generate the image
            this.image = new Kinetic.Image({ x: 0, y: 0, image: img, width: ScaleToThumbWidth(this.roomStats.width, this.roomStats.height), height: ScaleToThumbHeight(this.roomStats.width, this.roomStats.height) });

            // Generate the label
            this.label = new Kinetic.Label({ y: this.image.getHeight(), x: 0, opacity: 0.75 });
            this.label.add(new Kinetic.Tag({ fill: 'white' }));
            this.label.add(new Kinetic.Text({ text: this.roomStats.name, fill: 'black', width: 75, align: 'center' }));

            // Centre the image to the text
            this.label.setX((this.image.getWidth() - this.label.getWidth()) / 2);

            // group them up
            this.group.add(this.image).add(this.label);
            var _this = this;
            this.image.on('mousedown', function () {
                var newInstance = _this.roomStats.Clone();
                newInstance.image.setDraggable("true");
                var cursor = _this.layer.getStage().getMousePosition();
                newInstance.image.setPosition(cursor.x, cursor.y);
                _this.layer.add(newInstance.image);
                return {};
            });
        }
        RoomIndex.prototype.getWidth = function () {
            var minX = 0;
            var maxX = 0;
            this.group.getChildren().forEach(function (child) {
                if (child.getX() <= minX) {
                    minX = child.getX();
                }
                if (child.getX() + child.getWidth() >= maxX) {
                    maxX = child.getX() + child.getWidth();
                }
            });
            return maxX - minX;
        };
        return RoomIndex;
    })(RoomTile);
    Elements.RoomIndex = RoomIndex;

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
