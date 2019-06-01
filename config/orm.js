// Import (require) connection.js into orm.js
var connection = require("../config/connection.js");

// Will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
function questionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objConvertSql(obj) {
    var arr = [];
    for (var key in obj) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value + "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// Methods used to retrieve and store data in database
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";

        // console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
              throw err;
            }
      
            cb(result);
          });
        },
        updateOne: function(table, objColVals, condition, cb) {
            var queryString = "UPDATE " + table;
        
            queryString += " SET ";
            queryString += objConvertSql(objColVals);
            queryString += " WHERE ";
            queryString += condition;
        
            // console.log(queryString);
            connection.query(queryString, function(err, result) {
              if (err) {
                throw err;
              }
        
              cb(result);
            });
        }
    }   
        
module.exports = orm;