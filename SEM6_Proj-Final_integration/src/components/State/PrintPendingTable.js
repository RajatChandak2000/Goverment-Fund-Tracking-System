import React, { Component } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InitForm from './InitForm'
import {withRouter} from 'react-router-dom'

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     // backgroundColor:,
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// //   select:{
// //    backgroundColor: "white",
// //   }
// }));



// const Initform = props=>(
  
  
//   <form  className={props.classes.form} noValidate>


//   <TextField
//     variant="outlined"
//     type='number'
//     margin="normal"
//     required
//     fullWidth
//     id="email"
//     label="Email"
//     name="email"
//     // onChange={(e)=>handleEmailChange(e.target.value)}
//     autoComplete="email"
//     autoFocus
//   />

//   <TextField
//     variant="outlined"
//     margin="normal"
//     required
//     fullWidth
//     name="password"
//     label="Password"
//     type="password"
//     id="password"
//     // onChange={(e)=>handlePassChange(e.target.value)}
//     autoComplete="current-password"
//   />
// </form>
// )






const Pendingrequest = props => 
  
   (
  <tr>
    <td>{props.pendingrequest.state_gov.username}</td>
    <td>{props.pendingrequest.req_Projname}</td>
    {/* <td>{props.pendingrequest.req_state}</td> */}
    {/* <td>{props.pendingrequest.req_category}</td> */}
    <td>{props.pendingrequest.req_description}</td>
    <td>{props.pendingrequest.req_duration}</td>

    <td>{props.pendingrequest.req_amount}</td>
    <td>{props.pendingrequest.state_gov.req_date.substring(0,10)}</td>
    <td>{props.pendingrequest.req_status}</td>
    <td>


  
</td>
{/* <div>
<InitForm open={props.open}></InitForm></div> */}
  </tr>
  
  
)


class PrintPendingTable extends Component {
  constructor(props) {
    super(props);
    console.log('------------')
    console.log(this.props.init)
    // if(this.props.init===false){
    //   this.componentDidMount()
    // }

    this.state = {
      pendingrequests: [],
      init:false,
      send_id:0,
    
      category:this.props.history.location.state.category,
      statename:this.props.history.location.state.statename
    };
  
  }

  componentDidMount() {
    console.log('Mai agaya')
    console.log(this.props.init)
    
  
  console.log('prop aaya')
    console.log(this.state.statename)

 
  
    var request = {
      params: {
          statename:this.props.history.location.state.statename,
          category:this.props.history.location.state.category
    }
  }

  axios.get('http://localhost:5000/states/findPending/',request)
  .then(response => {
    console.log('length',response.data.length)
    if (response.data.length > 0) {
      console.log('length exceeded')
      console.log(response.data)
      
      this.setState({
        pendingrequests: response.data,
      })
    }
  })
  .catch((error) => {
    console.log(error);
  })
  }

  



  pendingrequestList() {
    console.log(this.state.pendingrequests)
    return this.state.pendingrequests.map(allpendingrequestlist => {
      return <Pendingrequest pendingrequest={allpendingrequestlist}  key={allpendingrequestlist._id}/>;
    })
  }


  render() {
    // let init=false
    return (
        <div>
          {/* <br></br> */}
          <h3 style={{fontFamily:'Montserrat', textAlign:'center'}}>PENDING PROJECTS: <hr></hr></h3>
          <div>
      
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Leader Name</th>
              <th>Project Name</th>
              {/* <th>State</th> */}
              {/* <th>Category</th> */}
              <th>Project Descript</th>
              <th>Project duration</th>
              <th>Project Amount</th>
              <th>Date</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {this.pendingrequestList()}
          </tbody>
        </table>
        <Button style={{color:'white',backgroundColor:'black', fontSize:12, fontFamily:'Montserrat'}} className="Register" onClick={()=>{this.props.history.push('/stategov/Pending')}}>Back</Button>
        </div>
        
      {/* : */}
      
            {/* // <InitForm id={this.state.send_id}></InitForm> */}
          

      
      </div>
    )
  }
}

export default withRouter(PrintPendingTable);