"use client"
import { useEffect, useState } from "react"

type Internship = {
  id: number;
  title: string;
  description: string;
  remote_derived: boolean;
  url: string;
  date_created: string;
  date_posted: string;
  cities_derived: string[];
  locations_derived: string[];
};

export default function Fetchdata() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("/api/competitions");
    const data = await response.json();
    console.log("Client received:", data.data);
    setInternships(data.data);
  };
  fetchData();
}, []);

  return (
    <div>
      <h1>Internship List:</h1>
      <div>
        {internships.map((item, id) => (
          <div key={id} className="border p-2 my-2 rounded">
            <h2>{item.title}</h2>
            <a href={item.url} target="_blank">{item.url}</a>
            <p>Created: {item.date_created}</p>
            <p>Posted: {item.date_posted}</p>
            <p>{item.locations_derived?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
