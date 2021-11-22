const {connection} = require("./data/connection");

/**
 * This is the admin part
 * TODO: add authorization
 */


const authenticate = ({email, password}, res) => {
    const sql = "select email from admins where email = ? and password = ?;";
    connection.query(sql, [email, password], (err, result) => {
        if (err){
            console.log(err);
            res.json({
                error: "Something went wrong"
            })
        }
        else{
            if (result.length > 0){
                res.json({
                    success: "Authentication successful"
                });
            }
            else{
                res.json({
                    error: "Incorrect email or password"
                });
            }
        }
    });
};

module.exports = authenticate;