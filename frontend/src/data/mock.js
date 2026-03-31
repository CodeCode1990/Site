// src/data/mock.js
import ride1 from "../assets/projects/Ride1.png";
import ride2 from "../assets/projects/Ride2.png";
import ride3 from "../assets/projects/Ride3.png";

import pharma1 from "../assets/projects/Page 1 animation.gif";
import pharma2 from "../assets/projects/Page 2 Animation.gif";
import pharma3 from "../assets/projects/Page 3 Animation.gif";

export const mockProjects = [
  {
    id: 1,
    title: "Tic Tac Toe Game",
    category: ["python-minigames"],
    description: "A classic terminal-based Tic Tac Toe game built with Python, featuring error handling, win detection, and an optional AI opponent using simple logic.",
    technologies: ["Python"],
    date: "May-2025",
    impact: "Fun side project to sharpen Python logic",
    githubUrl: "https://github.com/CodeCode1990/Python-MiniGames/tree/main/Tic-Tac-Toe"
  },
  {
    id: 2,
    title: "War Cards Game",
    category: ["python-minigames"],
    description: "A Python implementation of the card game 'War', featuring randomized deck creation, tied rounds, and score tracking.",
    technologies: ["Python"],
    date: "May-2025",
    impact: "Strengthened understanding of loops and data structures",
    githubUrl: "https://github.com/CodeCode1990/Python-MiniGames/tree/main/War_Card_Game"
  },
  {
    id: 3,
    title: "FDA CAERS Data Analysis",
    category: ["data-analysis"],
    description: "Analyzed FDA's CAERS dataset to uncover patterns in reported adverse events, applying data cleaning, visualization, and trend analysis techniques using Pandas and Matplotlib.",
    technologies: ["Python", "Pandas", "Matplotlib", "Jupyter Notebook"],
    date: "Oct-2025",
    impact: "Derived actionable insights from real-world healthcare data",
    githubUrl: "https://github.com/CodeCode1990/Data-Analysis-Projects/tree/main/Food%20Adverse%20Events"
  },
  {
    id: 4,
    title: "Ride Analysis Project",
    category: ["data-analysis", "dashboarding"],
    images: [ride1, ride2, ride3],
    description: "Performed exploratory data analysis and interactive story telling on ride-sharing data to identify trends in demand, pricing, and rider behavior.",
    technologies: ["SQL", "Excel", "Tableau"],
    date: "Sep-2025",
    impact: "Improved understanding of temporal and categorical patterns",
    githubUrl: "https://github.com/CodeCode1990/Data-Analysis-Projects/tree/main/Apex%20Rides%20Reports%20(Rides%20Analysis%20and%20Dashboarding)",
    tableauUrl: "https://public.tableau.com/app/profile/yash.patel5956/viz/ARideAnalyticsProject/Dashboard43_1",
  },
  {
    id: 5,
    title: "Automated Banking Transaction Dashboard",
    category: ["automation-bi", "dashboarding"],
    description: "Built a fully automated ETL and reporting pipeline — SSPS cleans data on SSMS, updates stored data to Power BI dashboards without manual intervention.",
    technologies: ["SSMS", "SSPS", "Power BI", "ETL"],
    date: "2025 (Ongoing)",
    impact: "Automation reduced manual reporting time by 90%",
    githubUrl: "" 
  },
  {
    id: 6,
    title: "Pharma Sales Analysis Project",
    category: ["data-analysis", "dashboarding"],
    images: [pharma1, pharma2, pharma3],
    description: "End-to-end data analytics solution analyzing synthetic pharmaceutical sales data (2021-2025). Built with Python, SQL, and Power BI to identify sales stagnation, evaluate patient retention, and develop a data-driven pivot strategy.",
    technologies: ["Python", "SQL Server", "Power BI", "DAX"],
    date: "2025",
    impact: "Identified root causes of revenue plateau and developed actionable retention strategies.",
    githubUrl: "https://github.com/CodeCode1990/Data-Analysis-Projects/tree/main/pharma%20sales%20project"
  }
];

export const mockEducation = [
  {
    degree: "Bachelor of Pharmacy",
    institution: "Rajiv Gandhi University of Health Science",
    location: "Bangalore, Karnataka, India",
    period: "2007 - 2011",
    gpa: "3.7/4.0",
    description: "Completed a comprehensive four-year degree covering pharmaceutical science, drug formulation, and clinical pharmacy, with strong emphasis on practical training and research methodology.",
    achievements: [
      "Volunteered and participated at Entrepreneurship Awareness Camp conducted by college",
      "Have worked on various instruments like UV-Visible spectrophotometer, HPLC, Gas Chromatography, HPTLC, Biochemistry Semi-Auto analyzer, PCR, Gel electrophoresis.",
      "Internship at TROIKAA pharmaceuticals - training in methods of production, QA/QC, formulation and development and other practical aspects of pharmacy."
          ]
  },
  {
    degree: "Master of Pharmacy (Major: Pharmacology)",
    institution: "NIRMA University",
    location: "Ahmedabad, Gujarat, India",
    period: "2012 - 2014",
    gpa: "3.7/4.0",
    description: "Completed a two-year postgraduate program specializing in pharmacology and clinical studies, incorporating rigorous coursework, research, and industry-relevant trainings.",
    achievements: [
      "Publishing research and completed thesis on exploring the effect of secoisolariciresinol diglycoside (SDG) rich fraction of Linumusitatissimum L. on skin cancer and determination of its mechanism of action.",
      "Poster presentations entitled 'Stem Cell Therapy for Cardiac Failure' in NIPiCON-2013 and 'Oncolytic Virus: A help by an old foe' presented in NIPiCON-2014.",
      "Volunteered in Preclinical workshop 'Preclinical animal models and drug evaluation techniques' held at Institute of Pharmacy, NIRMA university",
      "Internship at ACCUTEST Research Laboratories - training related clinical trial development and quality control department."
    ]
  },
  {
    degree: "Post Graduate Diploma (PGDM) - Clinical Research, Drug Safety and Pharmacovigilance",
    institution: "Academy of Applied Pharmaceutical Sciences (AAPS)",
    location: "Mississauga, Ontario, Canada",
    period: "2020 - 2021",
    gpa: "3.8/4.0",
    description: "Completed comprehensive coursework covering Canadian pharmaceutical industry insights, regulatory affairs, and good manufacturing and clinical practices, emphasizing drug development, safety assessments, and compliance frameworks. Gained practical knowledge in clinical trial management, pharmacovigilance, technical writing, and global regulatory strategies for pharmaceuticals, biologics, and medical devices.",
    achievements: [
      "Knowledge on different regulatory submissions like CTA, ANDA/ANDS, NDA/NDS, eCTD.",
      "Learned principles of clinical trial design, GCP, and global research regulations.",
      "Gained knowledge of regulatory guidelines and drug safety frameworks for ensuring compliance and patient safety.",
      "Acquired skills in regulatory submissions, documentation, and coding systems (MedDRA, ICD-10, WHO-DD)."
    ]
  }
];

export const mockCertifications = [
  {
    name: "The Complete Python Bootcamp From Zero to Hero in Python",
    issuer: "Udemy",
    date: "Jul-2025",
    expiry: "N/A",
    description: "Completed core Python concepts from basics to advanced topics through hands-on coding exercises, projects, and practical applications. This highly rated course strengthened skills in data handling, automation, web scraping, and object-oriented programming, supporting real-world development and data-driven solutions.",
    skills: ["Python Programming", "Web Scraping", "Error Handling", "Data Structure"],
    credentialUrl: "https://www.udemy.com/certificate/UC-08b0f3ab-9ef9-417b-8baa-3acadc0ecb4e/"
  },
  {
    name: "Google Analytics 4 Certification",
    issuer: "Skillshop",
    date: "Sep-2025",
    expiry: "Sep-2026",
    description: "Certification includes mastering key concepts in event-based tracking, conversion optimization, and the new GA4 reporting interface. Gained practical experience in configuring properties, analyzing user behavior, and integrating GA4 with Google Ads for data-driven marketing insights",
    skills: ["Data Tracking", "User Analytics", "Tag Management", "Conversion Measurement"],
    credentialUrl: "https://skillshop.credential.net/d823b29a-56ac-4c9d-ae09-d24ff519b1b7#acc.6xzkQ59T"
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    date: "2025",
    expiry: null,
    description: "Completed eight comprehensive courses focused on foundational data analytics skills. Gained hands-on experience with key tools like spreadsheets, SQL, Tableau, and R to prepare, process, analyze, and visualize data, enabling data-driven decision making for business contexts.",
    skills: ["BigQuery", "Tableau", "R", "Data Analysis", "Data Visualization"],
    credentialUrl: "https://www.credly.com/badges/df8a4f31-9b95-4d41-8315-ad3cd45996a0/linked_in_profile"
  },
  {
    name: "IBM Data Analyst - From Basics of Data Analytics to Capstone Project",
    issuer: "Coursera",
    date: "2026",
    expiry: null,
    description: "Covers core concepts, basic statistics, and data handling in Excel, SQL, and Python to building clear visualizations and dashboards for stakeholders. You then apply all these skills in an end‑to‑end, real‑world style capstone project that showcases your complete analytics workflow and becomes a strong portfolio piece.",
    skills: ["Data Visualization", "Dashboard Design", "Business Intelligence", "Analytics"],
    credentialUrl: "https://www.credly.com/users/yash-patel.e8a2fbd7/badges"
  },
];

export const mockSkills = {
  "programming-languages": [
    { name: "Python", level: 5, experience: "5+ years, primary language for data analysis and ML" },
    { name: "R", level: 4, experience: "4+ years, statistical computing and visualization" },
    { name: "SQL", level: 5, experience: "5+ years, database design and complex queries" },
    { name: "JavaScript", level: 3, experience: "2+ years, web development and data visualization" },
    { name: "Scala", level: 3, experience: "2+ years, big data processing with Spark" }
  ],
  "data-analytics": [
    { name: "Statistical Modeling", level: 5, experience: "Advanced expertise in predictive and descriptive analytics" },
    { name: "Machine Learning", level: 4, experience: "Supervised/unsupervised learning, deep learning frameworks" },
    { name: "Data Visualization", level: 5, experience: "Tableau, Power BI, D3.js, matplotlib expertise" },
    { name: "Business Intelligence", level: 4, experience: "KPI development, dashboard design, stakeholder reporting" },
    { name: "A/B Testing", level: 4, experience: "Experimental design and statistical significance testing" }
  ],
  "tools-platforms": [
    { name: "Tableau", level: 5, experience: "Advanced dashboard development and server administration" },
    { name: "Power BI", level: 4, experience: "Enterprise reporting and self-service analytics" },
    { name: "AWS", level: 4, experience: "S3, EC2, Redshift, SageMaker for data analytics" },
    { name: "Google Cloud", level: 4, experience: "BigQuery, AI Platform, data engineering tools" },
    { name: "Apache Spark", level: 3, experience: "Big data processing and distributed computing" }
  ],
  "domain-expertise": [
    { name: "Business Analytics", level: 5, experience: "End-to-end business intelligence and KPI development" },
    { name: "Financial Analysis", level: 4, experience: "Risk modeling, portfolio optimization, market analysis" },
    { name: "Marketing Analytics", level: 4, experience: "Customer segmentation, campaign optimization, attribution" },
    { name: "Operations Research", level: 3, experience: "Supply chain optimization and process improvement" },
    { name: "Data Strategy", level: 4, experience: "Data governance, architecture planning, team leadership" }
  ]
};