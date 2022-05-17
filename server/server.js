// Universal-Signage Server

import express from 'express';
import path from 'path';
import cors from 'cors';

import { dbQueryAllClients, dbQueryAllTemplates, dbQueryClientDetail, dbRegisterClient, dbUpdateClient} from './api/db.mjs';
import { checkClientStatus } from './api/clients.mjs';

const app = express();
const port = 8000;

/* cors */
var corsOpt={
    origin:"*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOpt));

app.get('/', (req,res)=>{
    res.send("hello world")
})


/* api */

/**
 * returns json of all clients
 */
app.get('/a/clients-all',(req, res)=>{
    dbQueryAllClients()
    .then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        console.log("error occurred " + error);
        res.status(500).send(error);
    });
})

/**
 * register client to db
 */
app.get('/a/cli/r/:friendly/:hostname/:domain/:campus/:building/:room/:template_id',(req,res)=>{
    dbRegisterClient(req.params.friendly,req.params.hostname,req.params.domain,req.params.campus,req.params.building,req.params.room,req.params.template_id)
    .then(data=>{
        res.status(200).send();
    }).catch(error=>{
        res.status(500).send();
    });
})

/**
 * returns detailed information of registered client
 */
app.get('/a/cli/g/:cli_id', (req, res)=>{
    console.log("API: received detail req for client " + req.params.cli_id);
    dbQueryClientDetail(req.params.cli_id)
    .then(data=>{
        console.log(data);
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
})

/**
 * returns detailed information of registered client
 */
 app.get('/a/cli/u/:id/:friendly/:hostname/:domain/:campus/:building/:room/:template_id', (req, res)=>{
    console.log("API: received detail update for client with id " + req.params.id);
    dbUpdateClient(req.params.id, req.params.friendly, req.params.hostname,  req.params.domain, req.params.campus, req.params.building, req.params.room, req.params.template_id)
    .then(data=>{
        console.log("API: successfully updated client " + req.params.id);
        res.status(200);
    }).catch(error=>{
        console.log(error);
        res.status(500).send(error);
    })
})



/**
 * returns status of individual client
 */
app.get('/a/cli/ping/:target',(req, res)=>{
    let out = checkClientStatus(req.params.target);
    res.status(200).send(out.toString());
})

/**
 * returns json of all templates
 */
app.get('/a/templates-all',(req, res)=>{
    dbQueryAllTemplates()
    .then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        console.log("error occurred " + error);
        res.status(500).send(error);
    });
})




/* express server */
app.listen(port, ()=>{
    console.log(`Universal Signage Controller Listening on port ${port}`);
})