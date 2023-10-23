import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  requirements: [String],
  salary: String,
  postedDate: String,
  applicationDeadline: String,
  appliedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create a JobListing model from the schema
const Job = mongoose.model("Job", jobSchema);

export default Job;
