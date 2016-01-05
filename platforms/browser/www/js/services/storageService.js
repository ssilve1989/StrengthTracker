/**
 * Created by ssilvestri on 12/23/15.
 */
var StorageService = (function(app){
    "use strict";

    var StorageService = angular.module('StorageService', []);

    StorageService.service('Storage', ['$log', function($log){
        var Storage = {};
        Storage.db = null;

        Storage.setupDatabase = function(database){
            this.db = openDatabase(database, '1.0', 'Test DB', 2 * 1024 * 1024);

            this.db.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS bench (recorded long, reps, weight)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS squat (recorded long, reps, weight)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS deadlift (recorded long, reps, weight)');
            });
        };

        Storage.addExercise = function(table, obj){
            if(!this.db){
                console.error('The database has not been opened.');
                return;
            }
            this.db.transaction(function(tx){
                $log.info("Adding entry into " + table);
                $log.debug(obj.date.getTime());
                tx.executeSql('INSERT INTO ' + table + '(recorded, reps, weight) VALUES (?,?,?)', [obj.date.getTime(), obj.reps, obj.weight]);
                //tx.executeSql('INSERT INTO bench(recorded, reps, weight) VALUES ('+obj.date.getTime()+', 2, 3)');
            });
        };

        Storage.dropTables = function(){
            this.db.transaction(function(tx){
                tx.executeSql('DROP TABLE bench');
                tx.executeSql('DROP TABLE squat');
                tx.executeSql('DROP TABLE deadlift');
            });
        };

        //For executing custom queries
        Storage.getConnection = function(){
            return this.db;
        };

        return Storage;
    }]);

})(window.angularApp);