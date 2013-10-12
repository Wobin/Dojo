/**
 * Created by Benjamin on 11/10/13.
 */
///<reference path="../definitions/reference.d.ts"/>


module DataStore{

    export var db : l2idb.linq2indexedDB;
    export function Setup(){
        var window : l2idb.MyWindow;
        db = new window.linq2indexedDB("test");
        db.from("test");
    }
}