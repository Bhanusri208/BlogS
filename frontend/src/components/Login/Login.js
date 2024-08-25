import {useState} from 'react'
import { Api_Url } from '../ApiUrl/ApiUrl';

const Login = () => {
   
     const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")

    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${Api_Url}/api/register`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email,password})
            })

            const data = response.json();
            
            if(response.ok){
                console.log(data);
                alert('Registered Succesfully')
            }
        }catch(err){
            console.log('Registerd Failed',err)
            alert('Registration Failed')
        }

    }

    return (
        <div>
            <center>
            <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <input type="email" value={email} placeholder="Enter E-mail" name="email" onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input type="password" value={password} placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="submit">Submit</button>
            </form>
            </center>
        </div>
    )
}

export default Login;