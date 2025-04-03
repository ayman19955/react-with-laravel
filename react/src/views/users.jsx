import { useEffect, useState } from "react"
import axiosClient from "../axios-client"

export default function users() {
  const {users,setUsers} = useState([])
  const [loading ,setLoading]  = useState(false)
  
  useEffect(() => {
    
    
    getUsers();
  }, []);
  const getUsers=()=>{
    
    axiosClient.get('/users')
    .then(({data})=>{
      setLoading(false)
    })
    .catch(()=>{
      setLoading(false)
    })
  }
  return (
      <div>
          Users
      </div>
  )
}
