/**
 * Created by Benjamin on 13/10/13.
 */
declare module l2idb {
    interface linq2indexedDB {
        (name:string, configuration?:Config, enableDebugging?:boolean) : void;
        from(name:string) : Query;
    }

    interface Query {
        where(callback:(data:any) => boolean) : Query;
        and(callback:(data:any) => boolean): Query;
        or(callback:(data:any) => boolean): Query;
        equals(data:any) : Query;
        not() :Query;
        between(minValue:any, maxValue:any, minValueIncluded?:boolean, maxValueIncluded?:boolean) : Query;
        greaterThan(value:any, valueIncluded?:boolean) : Query;
        smallerThan(value:any, valueIncluded?:boolean) : Query;
        inArray(array:Array) : Query;
        like(value:any) : Query;
        isUndefined() :Query;
        orderBy(propertyName:any) : Query;
        orderByDesc(propertyName:any) : Query;

        get(key:any) : ObjectStore;
        select(properties?:Array[]) : ObjectStore;
        insert(item:any, key?:any) : ObjectStore;
        update(item:any, key?:any) : ObjectStore;
        merge(item:any, key:any) : ObjectStore;
        remove(key:any) : ObjectStore;
        clear() : ObjectStore;
    }

    interface ObjectStore {
        then(success:(args:any) => void, error?:(args:any) => void, progress?:(args:any) => void);
    }
    interface Config {
        version : number;
        onupgradeneeded? : any;
        schema? : any;
        definition? : any;
        onversionchange? : any;
    }
    interface MyWindow extends Window {
        linq2indexedDB : linq2indexedDB
    }
}
//declare var window : l2idb.MyWindow;

