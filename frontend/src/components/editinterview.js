import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

const EditInterview=()=>{
    const { iid } = useParams();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [candidates, setCandidates] = useState([{}]);
    const [interviews,setInterviews]=useState([]);

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
          for(let i=0;i<res.data.allInterviews.length;i++)
          {
              if(res.data.allInterviews[i]._id===iid)
              {  
                  console.log(res.data.allInterviews[i].startTime)
                setStartTime(res.data.allInterviews[i].startTime);
                setEndTime(res.data.allInterviews[i].endTime);
                setDate(res.data.allInterviews[i].startTime)
              }
          }
      })
      .catch((err) => console.log(err));
    },[])
    
    
   const handleSubmit=()=>{

   }
    return (
            <div>
            <div>
            <div className="card" style={{width:"70%",marginLeft:170,padding:15}}>
            <form onSubmit={handleSubmit}>
               <h3 style={{justifyContent:"center"}}>Edit Interview</h3>
               <label>Select Date </label>
               <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
               />
               <label>Set Start Time </label>
               <input 
                   type="time"
                   required
                   value={startTime}
                   onChange={(e) => setStartTime(e.target.value)} 
               />
               <label>Set End Time</label>
                <input
                   type="time"
                   value={endTime}
                   required
                   onChange={(e) => setEndTime(e.target.value)}
                />
           <label>Select Participants</label>
            <br></br>
            <br></br>
            <br></br>
            <input type="submit" value="Submit" />
            </form>
            </div>
            </div> 
            </div>
         
    )
}


export default EditInterview;