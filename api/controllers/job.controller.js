import Job from "../models/job.model.js";

export const initializeJob = async (req, res) => {
  try {
    const jobList = [
      {
        title: "Software Engineer",
        company: "TechCo",
        location: "New York",
        description:
          "We are looking for a skilled software engineer to join our team. You will work on cutting-edge projects and collaborate with a talented team.",
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "Proficiency in Java and JavaScript",
          "Experience with web development frameworks (e.g., React, Angular)",
          "Strong problem-solving skills",
          "Excellent teamwork and communication skills",
        ],
        salary: "$80,000 - $100,000 per year",
        postedDate: "2023-10-15",
        applicationDeadline: "2023-11-15",
      },
      {
        title: "Graphic Designer",
        company: "DesignWorks",
        location: "Los Angeles",
        description:
          "DesignWorks is seeking a creative graphic designer to create stunning visuals for various projects. Join our dynamic design team and make a significant impact.",
        requirements: [
          "Bachelor's degree in Graphic Design or related field",
          "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
          "Strong artistic and creative abilities",
          "Attention to detail",
          "Portfolio showcasing previous design work",
        ],
        salary: "$50,000 - $70,000 per year",
        postedDate: "2023-10-10",
        applicationDeadline: "2023-11-10",
      },
      {
        title: "Marketing Specialist",
        company: "MarketingPro",
        location: "Chicago",
        description:
          "We need a marketing specialist to promote our brand and products. Join our team and help shape our marketing strategies.",
        requirements: [
          "Bachelor's degree in Marketing or related field",
          "Experience in digital marketing and social media",
          "Strong communication and analytical skills",
          "Creativity in marketing strategies",
          "Knowledge of SEO and content marketing",
        ],
        salary: "$60,000 - $80,000 per year",
        postedDate: "2023-10-05",
        applicationDeadline: "2023-11-05",
      },
      {
        title: "Data Scientist",
        company: "DataTech",
        location: "San Francisco",
        description:
          "We are seeking a data scientist to analyze and interpret complex data sets. Join our team to drive data-driven decisions.",
        requirements: [
          "Master's or Ph.D. in Data Science, Statistics, or related field",
          "Proficiency in Python and data analysis libraries (e.g., Pandas, NumPy)",
          "Experience in machine learning and predictive modeling",
          "Strong problem-solving and analytical skills",
          "Excellent communication and data visualization skills",
        ],
        salary: "$90,000 - $120,000 per year",
        postedDate: "2023-10-20",
        applicationDeadline: "2023-11-20",
      },
      {
        title: "UX/UI Designer",
        company: "DesignHub",
        location: "Seattle",
        description:
          "DesignHub is looking for a talented UX/UI designer to create user-friendly interfaces and enhance user experiences.",
        requirements: [
          "Bachelor's degree in Design or related field",
          "Proficiency in design tools (e.g., Adobe XD, Sketch, Figma)",
          "Strong knowledge of UX and interaction design principles",
          "Portfolio showcasing previous design work",
          "Collaborative and creative mindset",
        ],
        salary: "$60,000 - $80,000 per year",
        postedDate: "2023-10-18",
        applicationDeadline: "2023-11-18",
      },
      {
        title: "Product Manager",
        company: "TechX",
        location: "Austin",
        description:
          "TechX is hiring a product manager to oversee product development and drive product success.",
        requirements: [
          "Bachelor's degree in Business, Marketing, or related field",
          "Proven experience in product management",
          "Strong project management skills",
          "Excellent leadership and communication abilities",
          "Understanding of agile methodologies",
        ],
        salary: "$70,000 - $90,000 per year",
        postedDate: "2023-10-14",
        applicationDeadline: "2023-11-14",
      },
    ];
    await Job.insertMany(jobList);
    res.json({ success: true, message: "Job initialized successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to initialize Job" });
  }
};

export const getAvailableJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch Jobs" });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch Job" });
  }
};
