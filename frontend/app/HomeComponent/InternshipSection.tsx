import InternshipCard from "../components/Internship/InternshipCard";

export default function InternshipSection(){
    return <div className="py-12 px-2 sm:px-12">
        <InternshipCard title="Internships" 
        description="Find the Internships that fit your career aspirations."
        apiEndpoint="http://localhost:3001/api/v1/admin/internships"
        // apiEndpoint="/api/competitions"
        />
    </div>
}