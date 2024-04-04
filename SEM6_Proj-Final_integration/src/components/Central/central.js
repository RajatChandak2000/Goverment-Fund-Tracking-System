import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route,Switch} from "react-router-dom";
import PendingRequest from './PendingRequest'
import Navbar from "./navcentral.component";
import Statewise from "../statewise";
import Login from '../Login/login.component';
import alltransaction from './alltransaction';
import Home from './Home';
import CentralCard from './CentralCard'
import Pending from './Pending';
import Authorized from './Authorized';
import AllocMoney from './AllocMoney'
import Emblem from '../State/Logos/Emblem.svg'
import CentralNavbar from './CentralNavbar';
import '../State/Logos/Style/logos.css'
import {Container, makeStyles} from '@material-ui/core'
import './CSS/Central.css'
import Transactions from './Transactions';




const userStyles=makeStyles((theme)=>({
  root:{
    width:'100%',
    height:'10vh',
    textAlign:'center',
    
    // backgroundColor:theme.palette.grey[300],
    // paddingTop:theme.spacing(1),

  },
}))


function central(props) {

const classes=userStyles()
console.log(props.history.location.state.data)
const data=props.history.location.state.data
// console.log(props)
  // render() {


    return(
      
   
    <Router>
      <div className="main">
      <header className='StateHeader'>
      {/* <div className='Navdiv' > */}
        
       {/* <CentralNavbar className='Navbar' disableGutters></CentralNavbar> */}
       {/* </div>  */}

      

        
      {/* <div> */}
       {/* <Container className={classes.root} disableGutters> */}
       <div className='EmblemCentraldiv'>
        <img src={Emblem} className='EmblemCentral'></img>
        </div>
        
      {/* </Container> */}
      {/* </div> */}

     
        
     
      </header>
      {/* <Container className={classes.root} disableGutters> */}

      <CentralNavbar></CentralNavbar>
      {/* </Container> */}

    
      <Switch>
      
       
      <div className="CentralContainer container">  
      <Route exact path='/central/Home' render={(props)=>(<Home {...props} data={data}/>)}/>
      {/* <Route  path="/alltransaction" render={(props)=>(<alltransaction {...props} data={data}/>)}/> */}
      <Route path="/central/Allocate" component={AllocMoney} />
      <Route  path="/PendingRequest" render={(props)=>(<PendingRequest {...props} data={data}/>)}/>
      {/* <Route exact path="/statewisetransaction" component={Statewise}/> */}
      <Route exact path="/" component={Login} />
      <Route exact path='/central/Pending' component={Pending}/>
      <Route exact path='/alltransaction' component={alltransaction}/>
      <Route exact path='/central/Authorized' component={Authorized}/>
      <Route exact path='/central/Transactions' component={Transactions}/>
      {/* <Route exact path='/' component={Login}></Route>s */}
      </div>
      
      </Switch>
      </div>
    </Router>
  );
}
// }

export default central;