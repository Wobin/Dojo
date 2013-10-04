/**
 * Created with JetBrains WebStorm.
 * User: Wobin
 * Date: 16/09/13
 * Time: 8:55 PM
 *
 */
///<reference path="../vendor/reference.d.ts"/>
module RoomStats {

// Halls
    var ClanHall : Elements.RoomTemplate = new Elements.RoomTemplate(1, "Clan Hall", "img/Clan Hall.png", 60, 140, [ new Elements.Door(1, 0, -70),
                                                                            new Elements.Door(2, 0, 70)] );
    var GreatHall : Elements.RoomTemplate = ClanHall.Copy(2, "Great Hall", "img/Great Hall.png");

    var GreaterHall : Elements.RoomTemplate = new Elements.RoomTemplate(3, "Greater Hall","img/Greater Hall.png", 140, 160, [   new Elements.Door(1, 0, -80),
                                                                                    new Elements.Door(2, 0, 80)]);

    var GrandHall : Elements.RoomTemplate = new Elements.RoomTemplate(4, "Grand Hall", "img/Grand Hall.png", 135, 135,[   new Elements.Door(1, 68, 135),
                                                                                new Elements.Door(2, 0, 96),
                                                                                new Elements.Door(3, 0, 39),
                                                                                new Elements.Door(4, 68, 0),
                                                                                new Elements.Door(5, 135, 39),
                                                                                new Elements.Door(6, 135, 96)]);

    var GrandestHall : Elements.RoomTemplate = new Elements.RoomTemplate(4, "Grandest Hall", "img/Grandest Hall.png", 140, 140,[ new Elements.Door(1, 70, 140),
                                                                                    new Elements.Door(2, 0, 104),
                                                                                    new Elements.Door(3, 0, 34),
                                                                                    new Elements.Door(4, 70, 0),
                                                                                    new Elements.Door(5, 140, 34),
                                                                                    new Elements.Door(6, 140, 104)]);
// Connectors
    var CrossJunction : Elements.RoomTemplate = new Elements.RoomTemplate(100, "Cross Junction", "img/Cross Junction.png", 70, 70, [
                                                                            new Elements.Door(1, 35, 70),
                                                                            new Elements.Door(2, 0, 35),
                                                                            new Elements.Door(3, 35, 0),
                                                                            new Elements.Door(4, 70, 35)]);
    var TJunction = new Elements.RoomTemplate(101, "Cross Junction", "img/T Junction.png", 40, 70, [
                                                                            new Elements.Door(1, 35, 40),
                                                                            new Elements.Door(2, 0, 5),
                                                                            new Elements.Door(3, 70, 5)]);

    var LiftDown = new Elements.RoomTemplate(102, "Elevator Down", "img/Elevator Down.png", 25, 45, [new Elements.Door(1, 12,40)]);

    var LiftUp = LiftDown.Copy( 103, "Elevator Up", "img/Elevator Up.png");

    var LConnector = new Elements.RoomTemplate(104, "L Connector", "img/L Connector.png", 40, 40, [new Elements.Door(1, 35, 40),
                                                                                new Elements.Door(2, 0, 5)]);
    var LongConnector = new Elements.RoomTemplate(105, "Long Connector", "img/Long Connector.png", 12, 75, [
                                                                                new Elements.Door(1, 6, 75),
                                                                                new Elements.Door(2, 6, 0)]);
    var ShortConnector = new Elements.RoomTemplate(106, "Short Connector", "img/Short Connector.png", 12, 33, [
                                                                                new Elements.Door(1, 6, 33),
                                                                                new Elements.Door(2, 6, 0)]);
// Function Rooms
    var Duelling = new Elements.RoomTemplate(1000, "Duelling Room", "img/Duelling.png", 70, 70, [ new Elements.Door(1, 45, 70)]);

    var BioLab = new Elements.RoomTemplate(1001, "Bio Lab", "img/Bio Lab.png", 60, 60, [ new Elements.Door(1, 30, 60)]);

    var ChemLab : Elements.RoomTemplate = BioLab.Copy(1002, "Chem Lab", "img/Chem Lab.png");
    var EnergyLab : Elements.RoomTemplate = BioLab.Copy(1003, "Energy Lab", "img/Energy Lab.png" );
    var Oracle : Elements.RoomTemplate = BioLab.Copy(1004, "Oracle", "img/Oracle.png");
    var Reactor : Elements.RoomTemplate = new Elements.RoomTemplate(1005, "Reactor", "img/Reactor.png", 60, 65, [new Elements.Door(1, 30, 65)]);

    var Barracks : Elements.RoomTemplate = new Elements.RoomTemplate(1006, "Barracks","img/Barracks.png",65, 55, [new Elements.Door(1, 32, 55)] );
    var Garden : Elements.RoomTemplate = new Elements.RoomTemplate(1007, "Garden", "img/Garden.png", 70, 70, [new Elements.Door(1, 35, 70 ),
                                                                        new Elements.Door(2, 0, 35),
                                                                        new Elements.Door(3, 35, 0),
                                                                        new Elements.Door(4, 70, 35)]);
    var Parkour = new Elements.RoomTemplate(1008, "Parkour Room", "img/Parkour.png", 360, 425, [new Elements.Door(1, 175, 425)]);

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
