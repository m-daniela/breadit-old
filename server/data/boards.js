
const {connection} = require("./connection");

/**
 * get all available boards
 * @param {*} res 
 */
const getBoards = (res) => {
    const sql = "select * from boards;";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("GET / DB error", err);
            res.json({error: "Couldn't retrieve boards"});
        }
        else {
            res.json(result);
        }
    });
}

module.exports = {
    getBoards
};