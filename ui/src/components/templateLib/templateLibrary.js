import {useState, useEffect} from 'react';

export default function TemplateLibrary(){
    const [templateList, setTemplateList] = useState([]);
    const [tempListLoaded, setTempListLoaded] = useState(false);

    useEffect(()=>{
        let api = "http://"+process.env.REACT_APP_API_URL +":"+ process.env.REACT_APP_API_PT+"/a/templates-all";
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
                    setTemplateList(data);
                    setTempListLoaded(true);
                })
            }
        })
    },[])

    

    const ClientListData = ()=>{
       return(
        templateList.map((value, key)=>{
            let dateCreated = new Date(value.dateCreated);
            let dateCYr = dateCreated.getFullYear();
            let dateCMo = String(dateCreated.getMonth() + 1).padStart(2,'0');;
            let dateCD = String(dateCreated.getDate()).padStart(2,'0');
            let dateCHr = String(dateCreated.getHours()).padStart(2,'0');
            let dateCMin = String(dateCreated.getMinutes()).padStart(2,'0');
            let dateCSec = String(dateCreated.getSeconds()).padStart(2,'0');

            let dateModified = new Date(value.dateModified);
            let dateMYr = dateModified.getFullYear();
            let dateMMo = String(dateModified.getMonth() + 1).padStart(2,'0');;
            let dateMD = String(dateModified.getDate()).padStart(2,'0');
            let dateMHr = String(dateModified.getHours()).padStart(2,'0');
            let dateMMin = String(dateModified.getMinutes()).padStart(2,'0');
            let dateMSec = String(dateModified.getSeconds()).padStart(2,'0');


            return(
                <tr id={value.friendly} key={key}>
                    <td>{value.id}</td>
                    <td>{value.templateName}</td>
                    <td>{dateCYr + "-" + dateCMo + "-" + dateCD + " " + dateCHr + ":" + dateCMin + ":" + dateCSec}</td>
                    <td>{dateMYr + "-" + dateMMo + "-" + dateMD + " " + dateMHr + ":" + dateMMin + ":" + dateMSec}</td>
                    <td>{value.author}</td>
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
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Create On</th>
                        <th scope="col">Last Modified</th>
                        <th scope="col">Author</th>
                    </tr>
                </thead>
                <tbody>
                    {tempListLoaded ? <ClientListData/>:<tr><td>Loading</td></tr>}
                </tbody>
            </table>
        </div>
    )
}