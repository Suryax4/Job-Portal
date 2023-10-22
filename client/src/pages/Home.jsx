import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/job/listing`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setJobs(data.jobs);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {jobs && jobs.length > 0 && !loading && !error && (
        <div className="mb-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Job Listing
          </h1>
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="mt-2">Salary: {job.salary}</p>
              <Link to={`/job/${job._id}`}>
                <button className="bg-indigo-600 text-white px-4 py-2 mt-4 hover:bg-indigo-700">
                  Show Detail
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
