import {useState, useEffect} from 'react';

export default function ClientState ({target}){
    const [state, setState] = useState(false);
    useEffect(()=>{
        getClientState(target)
        .then(res =>{
            setState(res);
        })
    },[])

    return(
        <>
        {state ? <a href={"https://"+target}><div className="bg-success p-1 text-white fw-bold text-center">ONLINE</div></a>:<div className="bg-danger p-1 text-white fw-bold text-center">OFFLINE</div>}
        </>   
    )

}

export function getClientState(target){
    let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/cli/ping/"+target;
    console.log(api);
    return new Promise((resolve, reject)=>{
        fetch(api,{
            headers:{
                "Access-Control-Allow-Origin":process.env.REACT_APP_API_URL
            }
        })
        .then(response=>{
            if(response.status === 200){
                response.json()
                .then(data=>{
                    if(data < 0){
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                })
            }else{
                reject(false);
            }
        })
    })
}