/**
 * Created by ssilvestri on 12/23/15.
 */
var StorageService = (function(){
    "use strict";

    var StorageService = angular.module('StorageService', []);

    StorageService.service('Storage', ['$log', function($log){
        var Storage = {};
        Storage.db = null;

        Storage.setupDatabase = function(forceCreation){
            this.db = this.getConnection();

            if(forceCreation) {
                this.dropTables();
            }
            this.db.transaction(function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS bench (id INTEGER PRIMARY KEY, recorded long, reps, weight, max)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS squat (id INTEGER PRIMARY KEY, recorded long, reps, weight, max)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS deadlift (id INTEGER PRIMARY KEY, recorded long, reps, weight, max)');
            });
        };

        Storage.checkDatabase = function(){
            return !!this.db;
        };

        Storage.addExercise = function(table, obj){
            if(!this.db){
                console.error('The database has not been opened.');
                return;
            }
            this.db.transaction(function(tx){
                $log.info("Adding entry into " + table);
                $log.debug(obj.date.getTime());
                tx.executeSql('INSERT INTO ' + table + '(recorded, reps, weight, max) VALUES (?,?,?,?)',
	                [obj.date.getTime(), obj.reps, obj.weight, obj.max]);
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
            if(!this.db){
                this.db = openDatabase('strengthTracker', '1.0', 'StrengthTracker DB', 2 * 1024 * 1024);
            }
            return this.db;
        };
        return Storage;
    }]);

})();