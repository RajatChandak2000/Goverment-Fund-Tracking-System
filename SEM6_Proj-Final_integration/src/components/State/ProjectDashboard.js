import React, { useState} from 'react';
import Grid from '@material-ui/core/Grid';
// import './CSS/Dashboard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { CardHeader } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import { useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import rupee from '../icons/rupee.svg'
import Web3 from 'web3';
import Mycontract from "../contracts/Transactions.json"

const useStyles = makeStyles((theme)=>({

  table: {
    minWidth: 650,
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // maxWidth:100
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:800,
    height:300
  },
  root: {
    width:275,
    height:150,
    borderRadius:10,
    display:'flex',
    background:'linear-gradient(#06beb6,#48b1bf)',
    // verticalAlign:'middle',
    // alignItems:'center',
    justifyContent:'center',
    // justifyItems:'center'
    // position:'fixed'
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },


  title: {
    fontSize: 14,
    // backgroundColor:'red',
    // width: '100%'
  },


  pos: {
    marginBottom: 12,
  },

  grid:{
    overflowX:true,
  },

  head:{
    backgroundColor:'red',
    position:'relative',
    color:'red' ,
  },

centreText:{
    fontSize:15,
    top:8,
    position:'relative',
    fontFamily: 'Montserrat',
    fontWeight:'bold'
    // textDecoration:'underline',
    // textDecorationStyle:'wavy'
},

  cost:{
    fontSize:45,
  },
  pendingNum:{
    textAlign:'right',
  },
  authnum:{
    textAlign:'right',
    fontSize:100,
  },

  // smallfonts:{
  //   fontSize:5,
  //   textAlign:'right'
  // }
  PendingAuth:{
  borderTopStyle:'solid',
  marginTop:14,

  },

  text:{
      marginTop:10,
      fontSize:28,
      fontWeight:'bold',
      fontFamily: 'Montserrat',
  }



}));
    function ProjectDashboard(props) {
  const classes = useStyles();
  
  const[data,handleData]= useState(props.details)
    console.log('AJAAAA')
    // console.log(props.item)

    // useEffect(()=>{
    //   handleData(props.details)

    // })

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      
      setOpen(true);
      handleCondition(true);
    };
  
    const handleClose = () => {
      
      setOpen(false);
      handleCondition(true)
    };
    

let amountrequested=0;
const [req_amount,handleReqAmount]=useState(0);
const [req_description,handleReqDescription]=useState('')
      // const [reqdata,handleReqData]=useState([])
const [req_date,handleReqDate]=useState(new Date())

const [requests,handleRequests]=useState([])

    const handleClick=e=>{props.history.push('/contractor/'+props.route) }
    const contractor_name= props.details.contractor_Authorized.contractor_details.contractor_name
    
    // const reqdata=props.details.contractor_Authorized.contractor_details.contractor_requests
    // .contractor_details.contractor_name
    // props.details.contractor_Authorized.contractor_details.contractor_name
    console.log('#######################################################################')
    
const [condition,handleCondition]=useState(false)
const[alldata,handleAlldata]=useState([])
    const [reqdata,handleReqdata]=useState([])
    console.log('contractor',reqdata)

    let content=[]
    for (let i=0;i<reqdata.length;i++){
      if (i.requests_status==='Pending'){
        content.push()
      }
    }



function handleApprove(e,_amt){
  let d={
    proj_id:props.details._id,
    request_id:e

  }
  loadBlockChainData(_amt);
    axios.post('http://localhost:5000/states/ApproveContractorRequest',d)
    .then(r=>{
      console.log('Request Approved by state')
      // handleCondition(true)
    })

}
// async componentWillMount() 
// {
//   await this.loadWeb3()
//   //console.log(window.web3);
// //  await this.loadBlockChainData()
// }

async function loadWeb3() {
  if(window.ethereum)
  {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable();
  }
  else if(window.web3)
  {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else
  {
    window.alert('Non-Ethereum browser derected')
  }
}
async function loadBlockChainData(_amt){
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts()
  console.log(accounts);
  const id = await web3.eth.net.getId();
  const networkData = Mycontract.networks[id]
  const instance = new web3.eth.Contract(Mycontract.abi, networkData.address)
  //console.log(networkData.address)
        var part_amount = _amt;
       //var etherValue1 = Web3.utils.toWei(part_amount, 'ether')
       const send_to_contractor = instance.methods.funds_To_Contractor('0xE4f026137C4BfCD6e75304d69DB8833868c98de0',part_amount)
       .send({
         from:'0xdC9E3631F7fa43E4CEEf53C491A2A788815ae9f3',
         value: web3.utils.toWei((part_amount).toString(),"ether")
       })
      }
useEffect(()=>{
  
   loadWeb3();
  //console.log(window.web3);
   //loadBlockChainData();

  // if(condition===true){
  axios.get('http://localhost:5000/project/details/'+props.details._id)
  .then(res=>{
    handleReqdata(res.data.contractor_Authorized.contractor_details.contractor_requests)
    console.log(reqdata)
    handleAlldata(res.data)
    handleCondition(false)
  }
    )
// }
})

    // console.log(data)
    
    // axios.get('http://localhost:5000/states/pendingcontractor'+props.details._id)
    // .then(res=>{
    //     handleReqData(res.data);
    //     console.log('')
    //     console.log(reqdata)
    // })



    
  return (
    

    <div > 
        


<Grid container xs={12} sm={12} className={classes.grid}>


    <Grid item xs={3}>
    <Card className={classes.root} 
    // style={{backgroundColor:props.color}}
      >
    
      <CardContent style={{textAlign:'center'}} >
          <div className={classes.text}>{props.details.contractor_Authorized.bid_amount}</div>
          <hr></hr>
        <div className={classes.centreText}>TOTAL MONEY FOR PROJECT</div>
      </CardContent>
  
    </Card>
    </Grid>




    <Grid item xs={3}>
    <Card className={classes.root} 
  
     >
    
      <CardContent style={{textAlign:'center'}} >
      <div className={classes.text}>{alldata.state_projectaccount}</div>
      <hr></hr>
        <div className={classes.centreText}>MONEY LEFT</div>
      </CardContent>
  
    </Card>
    </Grid>



    <Grid item xs={3}>
    <Card className={classes.root} 
    // style={{backgroundColor:props.color}} 
     >
    
      <CardContent style={{textAlign:'center'}} >
      <div className={classes.text}>{contractor_name}</div>
      <hr></hr>
        <div className={classes.centreText}>CONTRACTOR</div>
      </CardContent>
  
    </Card>
    </Grid>




    <Grid item xs={3}>
    <Card className={classes.root} onClick={handleOpen} style={{cursor:'pointer'}}
    // style={{backgroundColor:props.color}} 
     >
     { reqdata.filter(i=>i.requests_status==='Pending').map((row) => {
                  amountrequested+=row.requests_amount
     })}
      <CardContent style={{textAlign:'center'}} >
          <div className={classes.text}>{amountrequested}</div>
          <hr></hr>
        <div className={classes.centreText}>REQUEST</div>
      </CardContent>

      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}


<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell> */}
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>



          {console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRR',reqdata)}
          { reqdata.filter(i=>i.requests_status==='Pending').map((row) => {
            
            
            // if(reqdata.requests_status==='Pending'){

            
            
          
            return (



            <TableRow>
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="right">{row.requests_amount}</TableCell>
              <TableCell align="right">{row.requests_description}</TableCell>
              <TableCell align="right">{JSON.stringify(row.requests_date).substring(1,10)}</TableCell>
              <TableCell align='right'><Button onClick={()=>handleApprove(row._id,row.requests_amount)}>ACCEPT</Button></TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </Fade>
      </Modal>





  
    
    </Grid>


    















</Grid>

    </div>
  );
}


export default withRouter(ProjectDashboard)