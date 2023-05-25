import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { backendURL } from "../../backendurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { CourseList,SSCourse } from "./CourseList";
import {Icon} from "../../components/Component";
const Verify = ({ alter, toggleIconTab,Data,updateCollegeInfo }) => {
  const [Course, setCourse] = useState([]);
  const [clgCAT, setclgCAT] = useState("NM");
  const [data,setData]=useState();
  const [buttonDisabled, setButtonDisabled] = useState([]);
  const { errors, register, handleSubmit } = useForm();
  const [freezeFlag, setfreezeFlag] = useState(false);
  const onFormSubmit = () => {
    fetch(`${backendURL}/setCourseDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        CourseDetails: Course,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          const notify = () => {
            toast.success("Data added successfully");
          };
          notify();
          updateCollegeInfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GOVTSeats = {
    "CENTRAL GOVT": 0.5,
    CHRISTIAN: 0.5,
    GOVT: 1,
    "GOVT AIDED": 0.7,
    HINDI: 0.5,
    JAIN: 0.5,
    MALAYALAM: 0.5,
    "MALAYALAM LINGUISTIC": 0.5,
    MIN: 0.5,
    MUSLIM: 0.5,
    NM: 0.65,
    SOWRASHTRA: 0.5,
    TELUGU: 0.5,
    UNIV: 0.7,
    IRTT: 0.65,
    SS:0.7
  };
 
  const getCollegeInfo =(Data) => {
        const data=Data;
        setCourse(data.CourseDetails.length ? data.CourseDetails : []);
        setButtonDisabled(Array.from({ length: seatsToAdd() }, () =>({ disabled: false,content:"plus",color:"success",index:null})));
        setfreezeFlag(data?.FreezeFlag ? data.FreezeFlag : false);
  };
  const seatsToAdd=()=>{
    console.log("seatsToAdd=>",Data)
    let intake=0;
    let GOVT=0;
    
    Data?.CourseDetails.forEach((element) => {
      console.log(element.Quota);
      if(element.Quota!=1)
      {
      intake+=element.intake;
      GOVT+=element.Govt;
      }
   })
   if((GOVTSeats[Data?.Category]*intake-GOVT)<1)
   return 0;
   else
   return Math.round(GOVTSeats[Data?.Category]*intake-GOVT)
 }
  useEffect(() => {
    getCollegeInfo(Data);
    
  }, [Data]);
  const onAddSeat=(i,j)=>{
    const course=[...Course];
    course[i]["Govt"]+=1;
    course[i]["Management"]-=1;
    course[i]["SWS"]+=1;
    const btn =[...buttonDisabled];
    btn[j].index=i;
    btn[j].disabled=true;
    btn[j].color="secondary";
    setButtonDisabled(btn);
    setCourse(course);
  }
  const onRemoveSeat=(i,j)=>{
    const course=[...Course];
    course[i]["Govt"]-=1;
    course[i]["Management"]+=1;
    course[i]["SWS"]-=1;
    const btn =[...buttonDisabled];
    btn[j].index=null;
    btn[j].disabled=false;
    btn[j].color="success";
    setButtonDisabled(btn);
    setCourse(course);
  }
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });
 
  const pending=()=>{
    let GOVTSeats=0;
    let intake=0;
    const data=Course;
    data.forEach((element) => {
      if(element.Quota!=1)
        {
      intake+=element.intake;
      GOVTSeats+=element.Govt;
        }
    })
    return [intake,GOVTSeats,(GOVTSeats/intake*100).toFixed(2)];
  }
  const managementSum=()=>{
    let mgmt=0;
    const data=Course;
    data.forEach((element) => {
      mgmt+=element.Management;
    })
    return mgmt;
  }


  return (
    <React.Fragment>
      <h5 style={{color:"red"}}> Total Intake: {pending()[0]}</h5>
      <h5 style={{color:"red"}}> Total Govt Seats: {pending()[1]}</h5>
      <h5 style={{color:"red"}}> Total Percentage: {pending()[2]}%</h5>
      <h5 style={{color:"red"}}> Quota Percentage: {GOVTSeats[Data?.Category]*100}%</h5>
      <h5 style={{color:"red"}}> Seats needed to Add: {seatsToAdd()}</h5>


      <Form className={formClass} onSubmit={(e) => e.preventDefault()}>
        <Row className="g-gs">
          <Col md="12">
          <div className={window.innerWidth <= 1150 ? "table-responsive " : ""}>
          <table className="table">  
    <thead className="table-dark">    
        <tr>      
            <th scope="col">#</th>      
            <th scope="col">Course Name</th>      
            <th scope="col">Govt Seats</th>   
            <th scope="col">Management</th>    

            {
          buttonDisabled.map((item,index) => (
            <th key={index} scope="col">Seat {index+1}</th>
          ))
         }
        </tr>  
    </thead>  
    <tbody>   
      {Course.map((element, index) => (
         <tr key={element.courseCode}>      
         <th scope="row">{index+1}</th>      
         <td>{element.courseName.label}</td>      
         <td> 

         {element.Govt}
         </td>      
         <td> 

{element.Management}
</td> 
         {
          buttonDisabled.map((item,idx) => {
            if(element.Quota!=1)
            return (<td key={idx}>
              {
            item.index!=index?(
            <Button 
            disabled={item.disabled||element.Management<1}
            onClick={(e) => {
              console.log(buttonDisabled);
              e.preventDefault();
              onAddSeat(index,idx);
            }} className="btn btn-icon" color={item.color} size="lg">
            <Icon name="plus" />
          </Button>
          ):
          (
            <Button 
            onClick={(e) => {
              e.preventDefault();
              onRemoveSeat(index,idx);
            }} className="btn btn-icon" color="danger" size="lg">
            <Icon name="minus" />
          </Button>
          )
            }
            
          </td>)
          else
          return(<td></td>)
})
         }
     </tr> 
      ))}
        
          

    </tbody>
</table>
            </div>
          </Col>
         
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            onClick={() => {
              toggleIconTab("6");
            }}
            className="text-center m-4"
            color="danger"
          >
            &lt; Back
          </Button>
          {freezeFlag == true ? (
            <Button
              type="submit"
              onClick={() => {
                toggleIconTab("7");
              }}
              className="text-center m-4"
              color="success"
              disabled={seatsToAdd()}
            >
              Next &gt;
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                onFormSubmit();
                toggleIconTab("7");
              }}
              className="text-center m-4"
              color="success"
              disabled={seatsToAdd()}
            >
              Save and Proceed to Next &gt;
            </Button>
          )}
        </div>
   
      </Form>
    </React.Fragment>
  );
};
export default Verify;
