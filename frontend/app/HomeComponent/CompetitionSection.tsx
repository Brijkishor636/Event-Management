import CompetitionCard from "../components/Competition/CompetitionCard";

export default function CompetitionSection(){
    return <div className="pt-20 pb-15 px-2 sm:px-12">
        <CompetitionCard title="Competitions" 
        description="Explore the Competitions that are creating a buzz among your peers!"
        apiEndpoint="http://localhost:3001/api/v1/admin/competitions"
        // apiEndpoint="/api/competitions"
        />
    </div>
}