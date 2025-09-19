import CompetitionCard from "../components/Competition/CompetitionCard";

export default function InternshipSection(){
    return <div className="py-12 px-2 sm:px-12">
        <CompetitionCard title="Internships" 
        description="Find the Internships that fit your career aspirations."
        apiEndpoint="http://localhost:3001/api/v1/admin/internships"
        // apiEndpoint="/api/competitions"
        />
    </div>
}