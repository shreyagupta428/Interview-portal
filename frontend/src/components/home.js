import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Home=()=>{
    const [interviews,setInterviews]=useState([])

    useEffect(()=>{
        axios
      .get("interview/upcoming", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
          console.log(res.data.allInterviews)
          setInterviews(res.data.allInterviews);
      })
      .catch((err) => console.log(err));
    },[])

    return (
        <div>
          {interviews.length==0 && <div> No upcomming interviews </div>}
          {interviews.length>0 && <div>HII</div> && (interviews.map((interview)=>{
              return(
              <div style={{marginLeft:500,marginTop:20,backgroundColor:"#7bdcb5",width:300,padding:20,borderRadius:10,alignItems:"center"}}>
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
        
              {/* <Link
               to={{
               pathname: `/interview/${interview._id}`,
               }}> */}
            <a class="waves-effect waves-light btn-small" href="/interview/`${interview._id}`">Edit</a>
          {/* </Link> */}
             
            </div>)
          })
         )} 
        </div>
    )
}
export default Home;