import CompetitionCard from "../components/Competition/CompetitionCard";

export default function CompetitionSection(){
    return <div className="py-20 px-12">
        <CompetitionCard title="Jobs" 
        description="Find jobs that fit your career aspirations."
        // apiEndpoint="/api/competitions"
        />
    </div>
}