import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Job = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [applied, setApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const applyJob = async (id) => {
    try {
      if (selectedFile == null) {
        alert("Please Select File");
        return;
      }
      setLoading(true);
      let myHeaders = new Headers();
      let token = sessionStorage.getItem("token");

      myHeaders.append("Authorization", `Bearer ${token}`);
      const reqBody = {
        method: "POST",
        headers: myHeaders,
      };

      let res = await fetch(
        `http://localhost:3000/api/job/apply/${id}`,
        reqBody
      );
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(false);
      if (data.success === true) {
        fetchListing();
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const fetchListing = async () => {
    try {
      setLoading(true);
      let myHeaders = new Headers();
      let token = sessionStorage.getItem("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      let reqOptions = {
        method: "GET",
        headers: myHeaders,
      };
      const res = await fetch(
        `http://localhost:3000/api/job/listing/${params.id}`,
        reqOptions
      );
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      if (data.applied == true) {
        setApplied(true);
      }
      setJob(data.job);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {job && !loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 ">
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

            {applied && (
              <button
                onClick={() => navigate("/")}
                className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 focus:outline-none rounded-md transition-transform transform scale-100 hover:scale-105"
              >
                Already Applied Go back to Home Page
              </button>
            )}
            {!applied && (
              <div>
                <div>
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  onClick={() => applyJob(job._id)}
                  className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 focus:outline-none rounded-md transition-transform transform scale-100 hover:scale-105"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;
