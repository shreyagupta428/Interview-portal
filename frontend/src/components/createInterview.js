import React,{useState,useEffect} from 'react';
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import M from "materialize-css";
import {  useNavigate } from "react-router-dom";

const CreateInterview=()=>{
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [candidates, setCandidates] = useState([{}]);
  const [candidateEmail, setCondidateEmail] = useState([]);
  const history = useNavigate();
  
  useEffect(() => {
    let participants = [];
    axios
      .get("user/all", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        
          console.log(res.data.allUsers)
          res.data.allUsers.map(user=>{
            participants = [
              ...participants,
              { value:user._id, label:user.email },
            ];
          })
          
        
        setCandidates(participants);
       
        console.log(candidates)
      })
      
      .catch((err) => console.log(err));
    }
    
    , []);

    const handleSubmit = (e) => {

      e.preventDefault();
      const stime = moment(
        `${date} ${startTime}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();

      const etime = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm:ss").format();
      console.log(stime, etime)
      console.log(Date.parse(stime), Date.parse(etime))
      if (Date.parse(stime) < Date.now()) {
        
        M.toast({
          html: "Start time should be greater than current time",
          classes: "#c62828 red darken-3",
        });
        
      } else if (Date.parse(stime) >= Date.parse(etime)) {
        M.toast({
          html: "Start date-time has to be less than end date-time",
          classes: "#c62828 red darken-3",
        });
       
      } else {

        let ids = [];
          
        if (candidateEmail.length > 0)
          candidateEmail.map((val) => {
            ids = [...ids, val.value];
          });
     
        axios.post('interview/create', {
          participants: ids,
            startTime: stime,
            endTime: etime,
        })
        .then((res) => {
          if (res.data.error) {
            M.toast({
              html: res.data.error,
              classes: "#c62828 red darken-3",
            });
          } else {
            M.toast({
              html: res.data.message,
              classes: "#43a047 green darken-1",
            });
            history("/");
          }
        })
        .catch((err) => console.log(err));

      }
    };
 

  const handleCandidateEmailChange = (option) => {
    // console.log(options);
    setCondidateEmail(option);
  };

    return (
        <div>
            
            <div className="card" style={{width:"70%",marginLeft:170,padding:15}}>
            <form onSubmit={e=>handleSubmit(e)}>
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
                <div >
                <label>Select Participants</label>
          <Select
            // className={}
            value={candidateEmail}
            onChange={handleCandidateEmailChange}
            options={candidates}
            isSearchable={true}
            placeholder={"Add Email"}
            isMulti={true}
          />
        </div>
          
  <br></br>
  <br></br>
  <br></br>
  <input type="submit" value="Schedule an Interview" style={{color:"blue"}}/>
  </form>
            </div>
        </div>
    )
}
export default CreateInterview;