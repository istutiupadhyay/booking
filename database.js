const mysql = require('mysql2');
let instance = null;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '18Ebkcs048@',
    database: 'booking'
});
connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    //console.log('db'+connection.state);
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance: new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                }) 
            });
            //console.log(response);
            return response;
        } catch(err) {
            console.log(err);
        }
    }
    async insertNewName(data) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, email, phone) VALUES (?,?,?);";

                connection.query(query, [name, email, phone] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                email : email,
                phone : phone
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";

                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name, email, phone) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ?, email = ?, phone = ? WHERE id = ?;";

                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = DbService