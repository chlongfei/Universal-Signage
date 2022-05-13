import {execSync} from 'child_process';


export function checkClientStatus(hostname){
    //perform ping
    try{
        let out = execSync('ping -c 1 ' + hostname, {encoding: 'utf-8'});
        //extract data
        console.log("Pinging " + hostname);
        const regex = new RegExp("(\\d+)% packet loss, time (\\d+)ms","g");
        let regexRes = regex.exec(out);
        let res = parseInt(regexRes[1]) + parseInt(regexRes[2]);
        return res;
    }catch(error){
        return -1;
    }
}