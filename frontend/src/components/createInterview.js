import React,{useState,useEffect} from 'react';
import axios from "axios";
import moment from "moment";


const CreateInterview=()=>{
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [candidates, setCandidates] = useState([{}]);
  
  useEffect(() => {
    axios
      .get("user/all", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
          console.log(res.data.allUsers)
          let arr=[];
        
        setCandidates(res.data.allUsers);
        console.log(candidates)
      })
      .catch((err) => console.log(err));
    }
    
    , []);

  const handleSubmit=()=>{
    //console.log(candidates)
    const stime = moment(
        `${date} ${startTime}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();
      const etime = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm:ss").format();

    axios.post('interview/create',{
        startTime:stime,
        endTime:etime,
        participants:['6101100ca76d5305e89551a3','61010ffca76d5305e89551a0']
    })
    .then(res=>console.log("aaaaaaaaaaaaa",res))
  }
    return (
        <div>
            
            <div className="card" style={{width:"70%",marginLeft:170,padding:15}}>
            <form onSubmit={handleSubmit}>
               <h3 style={{justifyContent:"center"}}>Schedule an interview</h3>
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
    )
}
export default CreateInterview;