import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import M from "materialize-css";
// import Edit from '../components/editinterview'

const Home=()=>{
    const [interviews,setInterviews]=useState([])
    // const [particular,setParticular]=useState({})
    useEffect(()=>{
        axios
      .get("interview/upcoming", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //console.log(res)
         // console.log(res.data.allInterviews)
          setInterviews(res.data.allInterviews);
      })
      .catch((err) => console.log(err));
    },[])

    //delete interview
    const handleDelete=(iid)=>{
       axios.delete(`interview/delete/${iid}`)
      .then((res) => {
        M.toast({
          html: res.data.message,
          classes: "#c62828 green darken-3",
        }
        );    
    })}

    //send mail to participants
    const handleNotify=(iid)=>{
      axios.get(`http://localhost:5000/interview/mail/${iid}`,{
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        M.toast({
          html: res.data.message,
          classes: "#c62828 green darken-3",
        }
        ); 
    })
    }

    return (
        <div>
          {interviews.length===0 && <div> No upcomming interviews... </div>}
          {interviews.length>0 && <div>HII</div> && (interviews.map((interview)=>{
            // {setParticular(interview)}
              return(
              <div style={{marginLeft:500,marginTop:20,backgroundColor:"#7bdcb5",width:350,padding:20,borderRadius:10,alignItems:"center"}}>
                <p>Interview {interview._id}</p>
                <p>
                Date: <Moment format="DD-MM-YYYY">{interview.endTime}</Moment>
              </p>
              <p>
                StartTime:{" "}
                <Moment format="hh:mm A">{interview.startTime}</Moment>
              </p>
              <p>
                EndTime: <Moment format="hh:mm A">{interview.endTime}</Moment>
              </p>
        
              <Link
                  to={`/interview/edit/${interview._id}`}
            // `/interview/edit/${interview._id}` 
                  
                >
                  Edit
                  
                  {/* {console.log(interview)} */}
                  {/* <button class="waves-effect waves-light btn-small"  onClick={<Edit interview="hi" />}>Edit</button> */}
                </Link>
          
          
          <button  class="waves-effect waves-light btn-small" style={{"marginLeft":"240px"}} onClick={()=>handleDelete(interview._id)} >Delete</button>
          <button  class="waves-effect waves-light btn-small" onClick={()=>handleNotify(interview._id)} >Notify Participants</button> 
           
            </div>
            )
          })
         )} 
        </div>
    )
}
export default Home;