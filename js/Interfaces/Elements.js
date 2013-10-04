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
        function RoomTemplate(id, name, imageURL, width, height, doorList) {
            this.id = id;
            this.name = name;
            this.imageURL = imageURL;
            this.width = width;
            this.height = height;
            this.doorCount = 0;
            this.doors = {};
            this.doorCount = doorList.length;
            var _this = this;
            doorList.forEach(function (door) {
                _this.doors[door.id] = door;
            });
            this.xCentre = height / 2;
            this.yCentre = width / 2;
        }
        RoomTemplate.prototype.Copy = function (id, name, imageURL) {
            var room = Utility.Clone(this);
            room.name = name;
            room.imageURL = imageURL;
            room.id = id;
            return room;
        };

        RoomTemplate.prototype.Clone = function () {
            var tile = new RoomTile(this, RoomTemplate.idSeed++);

            // tile.roomStats = Utility.Clone(this);
            tile.image.setWidth(this.width);
            tile.image.setHeight(this.height);

            tile.image.setDraggable("true");
            return tile;
        };
        RoomTemplate.prototype.GetLegend = function () {
            var tile = new RoomIndex(this);
            return tile;
        };
        RoomTemplate.idSeed = 0;
        return RoomTemplate;
    })();
    Elements.RoomTemplate = RoomTemplate;

    var RoomTile = (function () {
        function RoomTile(roomStats, id) {
            this.roomStats = roomStats;
            this.id = id;
            this.rotation = 0;
            var img = new Image();
            img.src = roomStats.imageURL;
            this.image = new Kinetic.Image({ image: img, width: roomStats.width, height: roomStats.height, draggable: true, offset: { x: roomStats.width / 2, y: roomStats.height / 2 } });
            var _this = this;

            if (Engine.Debug)
                Utility.debugImage(this.image);

            this.image.on("mouseover", function () {
                Engine.scrolling = _this;
                return {};
            });
            this.image.on("mouseout", function () {
                Engine.scrolling = null;
                return {};
            });
            this.image.on("dragend", function () {
                var doors = _this.getDoors();
                Engine.Doors[_this.id] = doors;
                console.debug("Doors: ", doors);
                return {};
            });
        }
        RoomTile.prototype.getDoors = function () {
            var doors = {};
            for (var i = 1; i <= this.roomStats.doorCount; i++) {
                var sDoor = this.roomStats.doors[i];
                doors[sDoor.id] = Utility.Rotate(sDoor, this.rotation, this.image.getX(), this.image.getY());
            }
            return doors;
        };
        return RoomTile;
    })();
    Elements.RoomTile = RoomTile;

    var RoomIndex = (function (_super) {
        __extends(RoomIndex, _super);
        function RoomIndex(stats) {
            _super.call(this, stats, -1);
            this.group = new Kinetic.Group({ draggable: false });

            // Generate the image
            this.image.setWidth(Utility.ScaleToThumbWidth(this.roomStats.width, this.roomStats.height));
            this.image.setHeight(Utility.ScaleToThumbHeight(this.roomStats.width, this.roomStats.height));
            this.image.setOffset(0, 0);

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
                var cursor = _this.group.getStage().getMousePosition();
                newInstance.image.setPosition(cursor.x, cursor.y);
                Engine.GridLayer.add(newInstance.image);
                newInstance.image.startDrag();
                Engine.Tiles.push(newInstance);
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
    var TileConnection = (function () {
        function TileConnection() {
        }
        return TileConnection;
    })();
    Elements.TileConnection = TileConnection;

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
//# sourceMappingURL=Elements.js.map
