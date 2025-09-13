import CompetitionCard from "../components/Competition/CompetitionCard";

export default function CompetitionSection(){
    return <div className="py-20 px-2 sm:px-12">
        <CompetitionCard title="Jobs" 
        description="Find jobs that fit your career aspirations."
        apiEndpoint="http://localhost:3001/api/v1/admin/jobs"
        // apiEndpoint="/api/competitions"
        />
    </div>
}