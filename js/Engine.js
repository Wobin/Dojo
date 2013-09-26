/**
* Created with JetBrains WebStorm.
* User: Wobin
* Date: 21/09/13
* Time: 10:02 PM
* To change this template use File | Settings | File Templates.
*/
///<reference path="vendor/reference.d.ts"/>
var Engine;
(function (Engine) {
    var LibraryStage;
    var usedWidth;

    function CreateLibrary() {
        LibraryStage = new Kinetic.Stage({ container: "Library", width: 1700, height: 500 });
        usedWidth = 0;
        RoomStats.Rooms.forEach(function (room) {
            LibraryStage.add(room.GetLegend().layer);
        });
    }
    Engine.CreateLibrary = CreateLibrary;
    ;

    document.addEventListener('DOMContentLoaded', function () {
        Engine.CreateLibrary();
    });
})(Engine || (Engine = {}));
//# sourceMappingURL=Engine.js.map
