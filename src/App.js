import React from 'react'
import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { STUDENTS } from './record'
const App = () => {
  let [student_name, setstudent_name] = useState({
    stud_name: '',
    doj: ''    
  })
  let inputFieldsHandler = (e)=> {
      let {name, value} = e.target;
      setstudent_name({...student_name, [name]: value})
  }
  let [filteredData, setfilteredData] = useState([]);
  let add_student = (e)=>{
    e.preventDefault();
    let {stud_name, doj} = student_name;
    if(student_name.stud_name === '' && student_name.doj === ''){
      alert('Please fill the data first');
    }else{
    let updatedObject=STUDENTS.filter((elem, index)=>{
      if(elem.name === stud_name && elem.validityDate === doj){
        return elem;
      }else{
        return null;
      }
    })
   
    if(updatedObject.length === 0){
      alert(`⚠️ Sory ${student_name.stud_name} user  is not a verified student`);
    }else{
      alert('Data matched successfully');
      setfilteredData(updatedObject);
    }
  }
    setstudent_name({
      stud_name: '',
      doj: ''
    })
  }
  let removeData = (id)=>{
    let updatedDeleted=STUDENTS.filter((elem, index)=>{
      return !index === id
    })
  setfilteredData(updatedDeleted)
  }
  return (
    <React.Fragment>
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-8 col-lg-8 col-xl-8 mx-auto bg-color'>
        <form>
          <div className='row mt-5 mb-5'>
          
            <div className='col-12 col-md-5 col-lg-5 col-xl-5'> 
              <div className="mb-3">
              <label className="form-label">Student Name</label>
              <input type="text" className="form-control" value={student_name.stud_name} name='stud_name' onChange={inputFieldsHandler} placeholder="Enter student name..."/>
            </div>
            </div>
            <div className='col-12 col-md-5 col-lg-5 col-xl-5'> 
              <div className="mb-3">
              <label className="form-label">Joining Date</label>
              <input type="date" name='doj' value={student_name.doj} onChange={inputFieldsHandler} className="form-control" />
            </div>
            </div>
            <div className='col-12 col-md-2 col-lg-2 col-xl-2'> 
              <div className="mt-4">
              <button className='btn btn-success btn-shadow' onClick={add_student}>Add</button>
            </div>
            </div>
          </div>
          </form>
        <div className='row'>
        <h3 className='text-center mb-4'>Residents List</h3>
        <div className='col-8 col-md-8 col-lg-8 col-xl-8 mx-auto text-center'>
        {
          filteredData.map((elem, index)=>{
            let {name} = elem
            return (
              <React.Fragment key={index} id={index}>
              <span className='px-3'>{name}</span><button  onClick={()=>removeData(index)} className='btn btn-danger'>Delete</button>
              
              </React.Fragment>

            )
          })
        } 
        </div>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default App

