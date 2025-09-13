"use client";

import { useContext } from "react";
import UserContext from "../provider/userContext";

export default function Practice_jobs() {
  const context = useContext(UserContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-bl from-gray-100 to-pink-50">
      <div className="text-center p-4">
        <div>{context.user?.name ?? "No user logged in"}</div>
      </div>
    </div>
  );
}




// const [jobs, setJobs] = useState([]);

    // useEffect(()=>{
    //     async function fetchData(){
    //         const response = await axios.get("http://localhost:3001/api/v1/admin/jobs");
    //         const data = response.json();
    //         console.log(data);
    //     }
    //     fetchData();
    // }, [])