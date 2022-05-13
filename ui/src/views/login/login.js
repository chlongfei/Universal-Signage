import './login.css';

export default function Login({auth}){

    let lsauth = localStorage.getItem("usctr_au");
    if(lsauth === "true") auth(true);

    const handleAuth = () =>{
        localStorage.setItem("usctr_au","true");
        auth(true);
    }

    return(
        <div id="login">
            <button onClick={()=>handleAuth()}>Authenticate</button>
        </div>
    )
}