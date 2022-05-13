import Clients from '../../components/clients/clients';
import TemplateLibrary from '../../components/templateLib/templateLibrary';
import './dash.css';

export default function Dashboard(){
    return(
        <div id="dash" className="container">
            <nav>
            <h1>UniSign Controller</h1></nav>
            <Clients/>
            <TemplateLibrary/>
        </div>
    )
}