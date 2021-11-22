/**
 * This is the admin part
 * TODO: add authorization
 */

const account = {
    email: "admin@admin.com", 
    password: "admin"    
}

const authenticate = ({email, password}) => {
    if (email === account.email && password === account.password){
        return true;
    }
}

module.exports = authenticate;