import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

let connection = mysql.createConnection({
    host: process.env.SQL_IP,
    user: process.env.SQL_USR,
    password: process.env.SQL_PWD,
    database: process.env.SQL_DB

});

/**
 * closes mysql connection
 * @param {*} connection mysql connection
 */
function dbClose(connection){
    connection.destroy();
    console.log("db closed");
}

/**
 * queries the mysql server
 * @param {*} query sql query statement
 * @returns return json from mysql
 */
function dbQuery(query){
    try{
        let queryPromise = new Promise((resolve, reject)=>{
            connection.query(query,(err, res, fields)=>{
                console.log(res)
                err? reject(err):resolve(res);
            })
        })
        return queryPromise;
    }catch(err){
        throw err;
    }
}



/* client queries */

/**
 * quries db for all registered clients
 * @returns promise resolving json results or error if fail
 */
export async function dbQueryAllClients(){
    let query = "SELECT * FROM clients";
    return dbQuery(query);
}

/**
 * 
 * @param {*} friendly friendly name for client
 * @param {*} hostname hostname of client
 * @param {*} domain domain name of client
 * @param {*} campus campus location of client
 * @param {*} building building on campus of client
 * @param {*} room room in building of client
 * @param {*} template_id assigned client id
 * @returns 
 */
export async function dbRegisterClient(friendly, hostname, domain, campus, building, room, template_id){
    let query = "INSERT INTO clients (friendly, hostname, domain, campus, building, room, template_id) VALUES (\"" + friendly +"\",\""+ hostname +"\",\""+ domain +"\",\""+ campus +"\",\""+ building +"\",\""+ room +"\","+ template_id + ")";
    return dbQuery(query);
}

/**
 * 
 * @param {*} friendly friendly name for client
 * @param {*} hostname hostname of client
 * @param {*} domain domain name of client
 * @param {*} campus campus location of client
 * @param {*} building building on campus of client
 * @param {*} room room in building of client
 * @param {*} template_id assigned client id
 * @returns 
 */
 export async function dbUpdateClient(id,friendly, hostname, domain, campus, building, room, template_id){
    let query = "UPDATE clients SET friendly = \""+friendly+"\", hostname = \""+hostname+"\", domain = \""+domain+"\", campus = \""+campus+"\", building = \""+building+"\", room = \""+room+"\", template_id = \""+template_id+"\" WHERE cli_id = "+ id;
    return dbQuery(query);
}

export async function dbQueryClientDetail(id){
    let query = "SELECT * FROM clients WHERE cli_id="+id;
    return dbQuery(query);
}

/* library queries */

export async function dbQueryAllTemplates(){
    let query = "SELECT * FROM templates";
    return dbQuery(query);
}