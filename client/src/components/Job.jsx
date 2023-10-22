import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Job = () => {
  const params = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/job/listing/${params.id}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setJob(data.job);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {job && !loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6 ">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
            {job.title}
          </h2>
          <p className="text-gray-600 text-md">
            {job.company} - {job.location}
          </p>
          <p className="text-gray-800 mt-4">{job.description}</p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-4">
            Requirements:
          </h3>
          <ul className="list-disc ml-6">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-800">
                {requirement}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-indigo-600 font-semibold">
            Salary: {job.salary}
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Posted on: {job.postedDate} | Application Deadline:{" "}
              {job.applicationDeadline}
            </p>
            <button
              className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 focus:outline-none rounded-md transition-transform transform scale-100 hover:scale-105"
              onClick={() => handleApply(job)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;
