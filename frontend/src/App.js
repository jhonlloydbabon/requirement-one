import './App.css';
import React,{useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {error, success} from "./components/toastify";

function App() {
  const [details, setDetails] = useState({
    name:"",
    email:"",
    password:"",
  });

  const [listOfFeedback, setListOfFeedback] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      await axios.get('http://localhost:5000/api/v1/feedback/fetch')
      .then((res)=>setListOfFeedback([...res.data.message]))
      .catch(err=>console.log(err));
    };
    fetchData();
  },[]);
  

  console.log(listOfFeedback);
  

  const handleOnChange = (e)=>{setDetails({...details, [e.target.name]:e.target.value})};

  const onClick = async() =>{

  await axios.post('http://localhost:5000/api/v1/auth/register', details)
  .then((res) => {
    success(res.data.message); // Show success message
    return Promise.resolve(); // Explicitly return a resolved Promise
  })
  .catch((err) => {
    error(err.response.data.message); // Handle errors
  });
  
  };

  return (
    <div className="container p-2">
      <ToastContainer />
      <div className="row">
         <div className="col-6 p-3 ">
            
            <h3>Untitled UI</h3>
            <div className="pt-5 px-5">
              <div className="px-3">
                <h4>Sign Up</h4>
                <p>Start your 30-day free trial.</p>
              </div>

              <div className="px-3 d-flex flex-column gap-3">
                  <div className="form-group">
                    <label htmlFor="name" className="">Name</label>
                    <input type="text" name="name" className="form-control" id="name" onChange={(e)=>handleOnChange(e)} placeholder="Enter your name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="">Email</label>
                    <input type="email" name="email" className="form-control" id="email" onChange={(e)=>handleOnChange(e)} placeholder="Enter your email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="">Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={(e)=>handleOnChange(e)} placeholder="Create a password"/>
                    <small className="form-text text-muted">Must be at least 8 character.</small>
                  </div>
                  <button className="btn btn-outline-secondary text-light" onClick={onClick} style={{background:"rgb(127,86,217)"}}>Get Started</button>
                  <button className="btn btn-outline-secondary">Sign up with Google</button>
                  <p className="text-center">Already have an account? <strong><NavLink to="#" style={{color:"rgb(127,86,217)", textDecoration:"none"}}>Log in</NavLink></strong></p>
              </div>


            </div>
         </div>

         {/* CAROUSEL */}
         <div className="col-6 p-3">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {
                  listOfFeedback.length > 0 && 
                  listOfFeedback.map((v, i) => (
                    <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                      <img className="d-block w-100" src={v.profile} alt={`Slide ${i + 1}`} />
                      <div className="carousel-caption d-none d-md-block">
                        <p>{v.description}</p>
                        <h5>{v.name}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{v.occupation}</span>
                          <div className="carousel-controls">
                            <a 
                              className="carousel-control-prev" 
                              href="#carouselExampleControls" 
                              role="button" 
                              data-slide="prev"
                            >
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a 
                              className="carousel-control-next" 
                              href="#carouselExampleControls" 
                              role="button" 
                              data-slide="next"
                            >
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>
                        </div>
                        <span>{v.company}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

         {/* END CAROUSEL */}
      </div>
    </div>
  );
}

export default App;
