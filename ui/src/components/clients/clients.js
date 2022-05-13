import {useState, useEffect} from 'react';
import ClientState, {getClientState} from './client_state';

/**
 * 
 * @returns client listing table with control buttons
 */
export default function Clients(){
    const [poo, forceUpdate] = useState(x => x + 1, 0)
    return(
        <div id="clients">
            <ClientTable/>
            <RegisterClient forceUpdate={forceUpdate}/>
        </div>
    )
}

/**
 * 
 * @returns button to register new client
 */
function RegisterClient({forceUpdate}){
    const [frmFriendly, setFriendly] = useState("");
    const [frmHostname, setHostname] = useState("");
    const [frmDomain, setDomain] = useState("");
    const [frmCampus, setCampus] = useState("null");
    const [frmBlg, setBldg] = useState("null");
    const [frmRm, setRm] = useState("null");
    const [frmTemp, setTemplate] = useState(0);

    const [frmError, setFrmErr] = useState(false);
    
    const validateForm = () =>{
        if(frmBlg.length < 1){
            console.log(frmBlg.length);
            setBldg("null");
        }
        if(frmCampus.length < 1){
            console.log(frmCampus.length);
            setCampus("null");
        }
        if(frmRm.length < 1){
            console.log(frmRm.length);
            setRm("null");
        }

        if((frmFriendly.length < 1) || (frmHostname.length < 1) || (frmDomain.length < 1)){
            console.log("form is invalid")
            return false;
        }else{
            console.log("form is valid")
            return true;
        }

        
    }

    const regClient = () =>{

        if(!validateForm()){
            setFrmErr(true);
        }else{            
            let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/cli/r/"+frmFriendly+"/"+frmHostname+"/"+frmDomain+"/"+frmCampus+"/"+frmBlg+"/"+frmRm+"/"+frmTemp;
            fetch(api,{
                headers:{
                    "Access-Control-Allow-Origin":process.env.REACT_APP_API_URL
                }
            })
            .then(response=>{
                console.log(response)
                if(response.status === 200){
                    window.location.reload();                
                }else{
                    alert("An error has occured");
                }
            })
        }

        
    }

    return(
        <div>
             <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#clientRegForm">
                 Register Client
             </button>
 
             <div className="modal fade" id="clientRegForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="clientRegFormLabel" aria-hidden="true">
             <div className="modal-dialog">
                 <div className="modal-content">
                 <div className="modal-header">
                     <h5 className="modal-title" id="clientRegFormLabel">Register Endpoint Client</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div className="modal-body">
                    <div className="mb-3">
                         <input type="text" className="form-control" placeholder="Friendly Name" required onChange={(e)=>{setFriendly(e.target.value)}}></input>
                     </div>
                     <label>Network:</label>
                     <div className="input-group mb-3">
                         <input type="text" className="form-control" placeholder="hostname"  onChange={(e)=>{setHostname(e.target.value)}} required></input>
                         <span className="input-group-text">.</span>
                         <input type="text" className="form-control" placeholder="FQDN" onChange={(e)=>{setDomain(e.target.value)}} required></input>
                     </div>
                     <label>Location:</label>
                     <div className="input-group mb-3">
                         <input type="text" className="form-control" placeholder="campus" onChange={(e)=>{setCampus(e.target.value)}} required></input>
                         <input type="text" className="form-control" placeholder="building" onChange={(e)=>{setBldg(e.target.value)}} required></input>
                         <input type="text" className="form-control" placeholder="room" onChange={(e)=>{setRm(e.target.value)}} required></input>
                     </div>
                     <label>Assign template to client:</label>
                     <div className="input-group mb-3">
                         <select className="form-select"  onChange={(e)=>{setTemplate(e.target.value)}}>
                             <option selected>(do not assign)</option>
                         </select>
                     </div>
                 </div>
                 <div className="modal-footer">
                     <div className="text-danger" hidden={!frmError}>**missing required fields</div>
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                     <button type="button" className="btn btn-success" onClick={()=>regClient()}>Register</button>
                 </div>
                </div>
             </div>
             </div>
        </div>
    )
}

/**
 * 
 * @returns table displaying all registered clients and status
 */
function ClientTable(){
    const [clientList, setClientList] = useState([]);
    const [clistLoaded, setclistLoaded] = useState(false);

    useEffect(()=>{
        let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/clients-all";
        console.log(api);
        fetch(api,{
            headers:{
                "Access-Control-Allow-Origin":process.env.REACT_APP_API_URL
            }
        })
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                response.json()
                .then(data=>{
                    setClientList(data);
                    setclistLoaded(true);
                })
            }
        })
    },[])

    /**
     * 
     * @returns individual client device row info
     */
    const ClientListData = ()=>{
       return(
        clientList.map((value, key)=>{
            return(
                <tr id={value.friendly+"_"+value.cli_id} key={value.cli_id}>
                    <td><ClientState target={value.hostname+"."+value.domain}/></td>
                    <td>{value.friendly}</td>
                    <td>{value.hostname+"."+value.domain}</td>
                    <td>{value.campus + ", " + value.building + ", " + value.room}</td>
                    <td>

                        {/* TODO: add actions to buttons */}
                        <ClientDetails cli_id={value.cli_id}/>
                        <button type="button" className="btn btn-outline-success btn-sm me-1">MEDIA</button>
                        <button type="button" className="btn btn-outline-dark btn-sm">CTRL</button>
                    </td>
                </tr>
            )
        })
       ) 
    }

    return(
        <div id="clients_tbl" className='table-responsive'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Frindly Name</th>
                        <th scope="col">Hostname/IP</th>
                        <th scope="col">Location</th>
                        <th scope="col">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {clistLoaded ? <ClientListData/>:<tr><td>Loading</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

function ClientDetails({cli_id}){
    const [detailFriendly, setdetailFriendly] = useState(null);
    const [detailHostname, setdetailHostname] = useState(null);
    const [detailDomain, setdetailDomain] = useState(null);
    const [detailCampus, setdetailCampus] = useState(null);
    const [detailBlg, setdetailBldg] = useState(null);
    const [detailRm, setdetailRm] = useState(null);
    const [detailTemp, setdetailTemplate] = useState(null);
    const [detailDetailState, setDetailState] = useState(false);

    const getClientDetails = () => {
        let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/cli/g/"+cli_id;
        console.log(api);
        fetch(api,{
            headers:{
                "Access-Control-Allow-Origin":process.env.REACT_APP_API_URL
            }
        })
            .then(response=>{
                console.log(response)
                if(response.status === 200){
                    response.json()
                        .then(data=>{
                            console.log(data);
                            data = data[0];
                            setdetailFriendly(data.friendly);
                            setdetailHostname(data.hostname);
                            setdetailDomain(data.domain);
                            setdetailCampus(data.campus);
                            setdetailBldg(data.building);
                            setdetailRm(data.room);
                            setdetailTemplate(data.template_id);
                            getClientState(data.hostname+"."+data.domain)
                                .then(res => { 
                                    setDetailState(res);
                                })
                        })
                }
            })

        


    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={"#cli"+cli_id} onClick={()=>getClientDetails()}>
            INFO
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id={"cli"+cli_id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span className={detailDetailState? "text-success":"text-danger"}>● </span>
                        {detailFriendly+" ("+detailHostname+"."+detailDomain+")"}
                        </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                            <input type="text" className="form-control" placeholder="Friendly Name" value={detailFriendly} required onChange={(e)=>{setdetailFriendly(e.target.value)}}></input>
                        </div>
                        <label className="mt-3">Network:</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="hostname"  value={detailHostname}  onChange={(e)=>{setdetailHostname(e.target.value)}} disabled readonly></input>
                            <span className="input-group-text">.</span>
                            <input type="text" className="form-control" placeholder="FQDN" value={detailDomain} onChange={(e)=>{setdetailDomain(e.target.value)}}   aria-describedby='netHelp'disabled readonly></input>

                        </div>
                        <div id="netHelp" className="form-text">Network Configuration Cannot be Changed After Registeration</div>
                        <label className="mt-3">Location:</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="campus" value={detailCampus} onChange={(e)=>{setdetailCampus(e.target.value)}} required></input>
                            <input type="text" className="form-control" placeholder="building" value={detailBlg} onChange={(e)=>{setdetailBldg(e.target.value)}} required></input>
                            <input type="text" className="form-control" placeholder="room" value={detailRm} onChange={(e)=>{setdetailRm(e.target.value)}} required></input>
                        </div>
                        <label className="mt-3">Assign template to client:</label>
                        <div className="input-group">
                            <select className="form-select"  value={detailTemp} onChange={(e)=>{setdetailTemplate(e.target.value)}}>
                                <option selected>(do not assign)</option>
                            </select>
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger btn-sm me-auto" data-bs-dismiss="modal">Delete</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary btn-sm">Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}


function editClient(friendly, hostname, domain, campus, blg, rm, template){
    let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/cli/r/"+friendly+"/"+hostname+"/"+domain+"/"+campus+"/"+blg+"/"+rm+"/"+template;
    fetch(api,{
        headers:{
            "Access-Control-Allow-Origin":process.env.REACT_APP_API_URL
        }
    })
    .then(response=>{
        console.log(response)
        if(response.status === 200){
            window.location.reload();                
        }else{
            alert("An error has occured");
        }
    })    
}