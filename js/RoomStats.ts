/**
 * Created with JetBrains WebStorm.
 * User: Wobin
 * Date: 16/09/13
 * Time: 8:55 PM
 *
 */
///<reference path="vendor/reference.d.ts"/>
module RoomStats {
// Halls
    var ClanHall = new Elements.RoomTemplate(1, "img/Clan Hall.png", 140, 60, [ new Elements.Door(1, 30, 140),
                                                                            new Elements.Door(2, 30, 0)] );
    var GreatHall = ClanHall.Copy("img/Great Hall.png", 2);

    var GreaterHall = new Elements.RoomTemplate(3, "img/Greater Hall.png", 160, 140,[   new Elements.Door(1, 80, 140),
                                                                                    new Elements.Door(2, 80, 0)]);

    var GrandHall = new Elements.RoomTemplate(4, "img/Grand Hall.png", 135, 135,[   new Elements.Door(1, 68, 135),
                                                                                new Elements.Door(2, 0, 96),
                                                                                new Elements.Door(3, 0, 39),
                                                                                new Elements.Door(4, 68, 0),
                                                                                new Elements.Door(5, 135, 39),
                                                                                new Elements.Door(6, 135, 96)]);

    var GrandestHall = new Elements.RoomTemplate(4, "img/Grandest Hall.png", 140, 140,[ new Elements.Door(1, 70, 140),
                                                                                    new Elements.Door(2, 0, 104),
                                                                                    new Elements.Door(3, 0, 34),
                                                                                    new Elements.Door(4, 70, 0),
                                                                                    new Elements.Door(5, 140, 34),
                                                                                    new Elements.Door(6, 140, 104)]);
// Connectors
    var CrossJunction = new Elements.RoomTemplate(100, "img/Cross Junction.png", 70, 70, [
                                                                            new Elements.Door(1, 35, 70),
                                                                            new Elements.Door(2, 0, 35),
                                                                            new Elements.Door(3, 35, 0),
                                                                            new Elements.Door(4, 70, 35)]);
    var TJunction = new Elements.RoomTemplate(101, "img/T Junction.png", 40, 70, [
                                                                            new Elements.Door(1, 35, 40),
                                                                            new Elements.Door(2, 0, 5),
                                                                            new Elements.Door(3, 70, 5)]);

    var LiftDown = new Elements.RoomTemplate(102, "img/Elevator Down.png", 45, 25, [new Elements.Door(1, 12,40)]);

    var LiftUp = LiftDown.Copy("img/Elevator Up.png", 103);

    var LConnector = new Elements.RoomTemplate(104, "img/L Connector.png", 40, 40, [new Elements.Door(1, 35, 40),
                                                                                new Elements.Door(2, 0, 5)]);
    var LongConnector = new Elements.RoomTemplate(105, "img/Long Connector.png", 75, 12, [
                                                                                new Elements.Door(1, 6, 75),
                                                                                new Elements.Door(2, 6, 0)]);
    var ShortConnector = new Elements.RoomTemplate(106, "img/Short Connector.png", 33, 12, [
                                                                                new Elements.Door(1, 6, 33),
                                                                                new Elements.Door(2, 6, 0)]);
// Function Rooms
    var Duelling = new Elements.RoomTemplate(1000, "img/Duelling.png", 70, 70, [ new Elements.Door(1, 45, 70)]);

    var BioLab = new Elements.RoomTemplate(1001, "img/Bio Lab.png", 60, 60, [ new Elements.Door(1, 30, 60)]);

    var ChemLab = BioLab.Copy("img/Chem Lab.png", 1002);
    var EnergyLab = ChemLab.Copy("img/Energy Lab.png", 1003);
    var Oracle = EnergyLab.Copy("img/Oracle.png", 1004);
    var Reactor = new Elements.RoomTemplate(1005, "img/Reactor.png", 65, 60, [new Elements.Door(1, 30, 65)]);

    var Barracks = new Elements.RoomTemplate(1006, "img/Barracks.png",55, 65, [new Elements.Door(1, 32, 55)] );
    var Garden = new Elements.RoomTemplate(1007, "img/Garden.png", 70, 70, [new Elements.Door(1, 35, 70 ),
                                                                        new Elements.Door(2, 0, 35),
                                                                        new Elements.Door(3, 35, 0),
                                                                        new Elements.Door(4, 70, 35)]);
    var Parkour = new Elements.RoomTemplate(1008, "img/Parkour.png", 425, 360, [new Elements.Door(1, 175, 425)]);

   export var Rooms =
       [
           ClanHall,
           GreatHall,
           GreaterHall,
           GrandHall,
           GrandestHall,
           CrossJunction,
           TJunction,
           LConnector,
           LiftDown,
           LiftUp,
           LongConnector,
           ShortConnector,
           Duelling,
           BioLab,
           ChemLab,
           EnergyLab,
           Reactor,
           Oracle,
           Barracks,
           Garden,
           Parkour
   ];

}
