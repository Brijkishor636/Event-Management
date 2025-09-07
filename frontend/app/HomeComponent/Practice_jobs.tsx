import { useEffect, useState } from "react"

export default function Practice_jobs(){

    const [jobs, setJobs] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch("api/competitions");
            const data = response.json();
            console.log(data);
        }
        fetchData();
    }, [])

    return <div>
        
    </div>
}