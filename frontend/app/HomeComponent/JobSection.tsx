import JobCard from "../components/Jobs/JobCard";

export default function JobSection(){
    return <div className="py-12 px-2 sm:px-12">
        <JobCard title="Jobs" 
        description="Find jobs that fit your career aspirations."
        apiEndpoint="http://localhost:3001/api/v1/admin/jobs"
        // apiEndpoint="/api/competitions"
        />
    </div>
}