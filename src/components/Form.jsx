import React,{useState,useEffect} from "react";
import axios from "axios";
const Form =()=>{
    const [page,setPage]=useState(1);
    const [form,setForm]=useState({name:"",address:"",dept:"",age:0,salary:0,isMarried:false,photo:null});
    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    const handleChange=(e)=>{
        let {checked,type,name,value,files}=e.target;
        if(type==="checkbox"){
            setForm({
                ...form,[name]:checked,
            }); 
        }
        else if(type==="file"){
            setForm({
                ...form,[name]:files[0].name,
            }); 
        }
        else{
        setForm({
            ...form,[name]:value,
        });
    }
    };
    const saveinfo=(e)=>{
        e.preventDefault();
        console.log(form);
        
        fetch("http://localhost:8080/dataList",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(form),
        })
        .then((r)=>r.json())
        .then((d)=>{
            console.log("post d",d);
            setData([...data,d]);
        });
         
     };
     const ondelete=(id)=>{
        axios.delete('http://localhost:8080/dataList/'+id)
        .then((r)=>{
            console.log(r);
        });
        let newdata=data.filter((id)=>
            data.id!==id);
            setData(newdata);
        
     };
     useEffect(()=>{
        const getInfo=()=>{
         axios.get(`http://localhost:8080/dataList?_page=${page}&_limit=5`)
         //  .then((r)=>r.json())
         .then((d)=>{
           console.log(d);
           setTotal(d.headers["x-total-count"]);
           setData(d.data);
         });
        }; 
        getInfo(); 
     },[page]);
    return (
<div>
    Form
    <form onSubmit={saveinfo}>
    <div>
        
        <div>
            <label>Name:</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}/>
        </div>
        <div>
            <label>Age:</label>
            <input type="number" name="age"value={form.age} onChange={handleChange}/>
        </div>
        <div>
            <label>Address:</label>
            <input type="text" name="address"value={form.address} onChange={handleChange}/>
        </div>
        <div>
            <label>Department:</label>
            <input type="text" name="dept"value={form.dept} onChange={handleChange}/>
        </div>
        <div>
            <label>Salary:</label>
            <input type="number" name="salary"value={form.salary} onChange={handleChange}/>
        </div>
        <div>
            
            <input type="checkbox" name="isMarried"checked={form.isMarried} onChange={handleChange}/>
            <label>Is Married</label>
        </div>
        {/* <div>
            
            <input type="radio" name="gender" value={"male"} onChange={handleChange}/>
            <label>Male</label>
            <input type="radio" name="gender" value={"female"} onChange={handleChange}/>
            <label>FeMale</label>
        </div> */}
        <div>
            <label>Upload Photo:</label>
            <input type="file" name="photo" onChange={handleChange}/>
        </div>
        
    </div>
    <button type="submit">Submit</button>
    </form>
    <div style={{marginLeft:'32%',marginTop:'30px'}}>
    <table>
        <th>Name</th><th>Age</th><th>Address</th><th>Dept</th><th>Salary</th><th>isMarried</th><th>Photo</th>
        {data.map((item)=>(
            
                <tr key={item.id}>
                    <td>{item.name}</td><td>{item.age}</td><td>{item.address}</td>
                    <td>{item.dept}</td><td>{item.salary}</td><td>{item.isMarried}</td><td>{item.photo}</td>
                    <td><button onClick={()=>ondelete(item.id)}>Delete</button></td>
                </tr>
            
        ))}
        </table>
        <div>
        <button disabled={page<=1} onClick={()=>setPage(page-1)}>{'<'}</button>
             <button disabled={page*5>total} onClick={()=>setPage(page+1)}>{'>'}</button></div>
</div>
</div>
    );
};
export default Form;