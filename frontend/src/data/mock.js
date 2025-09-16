// Mock data for the pharmaceutical data analyst portfolio

export const mockProjects = [
  {
    id: 1,
    title: "Clinical Trial Efficacy Analysis",
    description: "Comprehensive statistical analysis of Phase III clinical trial data for a novel cardiovascular drug, identifying key efficacy markers and patient subgroups.",
    category: "clinical",
    technologies: ["R", "SAS", "Python", "SQL", "Tableau", "CDISC Standards"],
    date: "2024",
    impact: "12% improvement in patient outcomes",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 2,
    title: "Drug Safety Signal Detection",
    description: "Developed machine learning models to detect adverse drug reactions from FAERS database, implementing automated safety surveillance systems.",
    category: "safety",
    technologies: ["Python", "Machine Learning", "PostgreSQL", "PowerBI", "FDA FAERS"],
    date: "2024",
    impact: "30% faster signal detection",
    githubUrl: null,
    featured: true
  },
  {
    id: 3,
    title: "Market Access Analytics Dashboard",
    description: "Built interactive dashboard analyzing market penetration and competitive landscape for oncology therapeutics across 15 global markets.",
    category: "market",
    technologies: ["Tableau", "Python", "API Integration", "Excel VBA", "SQL Server"],
    date: "2023",
    impact: "€2M+ revenue optimization",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    id: 4,
    title: "Biomarker Discovery Platform",
    description: "Statistical analysis of genomic data to identify predictive biomarkers for immunotherapy response in lung cancer patients.",
    category: "drug-discovery",
    technologies: ["R", "Bioconductor", "Python", "Machine Learning", "Cloud Computing"],
    date: "2023",
    impact: "3 potential biomarkers identified",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 5,
    title: "Real-World Evidence Study",
    description: "Longitudinal cohort study analyzing treatment patterns and outcomes for diabetes medications using electronic health records.",
    category: "clinical",
    technologies: ["SAS", "R", "SQL", "OMOP CDM", "Epidemiology Methods"],
    date: "2023",
    impact: "Published in peer-reviewed journal",
    githubUrl: null,
    featured: false
  },
  {
    id: 6,
    title: "Pharmaceutical Supply Chain Analytics",
    description: "Predictive modeling for drug shortage prevention and inventory optimization across global pharmaceutical supply networks.",
    category: "market",
    technologies: ["Python", "Time Series Analysis", "SQL", "Apache Airflow", "AWS"],
    date: "2022",
    impact: "25% reduction in stockouts",
    githubUrl: "https://github.com/example",
    featured: false
  }
];

export const mockEducation = [
  {
    degree: "Master of Science in Biostatistics",
    institution: "Harvard T.H. Chan School of Public Health",
    location: "Boston, MA",
    period: "2020 - 2022",
    gpa: "3.9/4.0",
    description: "Specialized in pharmaceutical statistics, clinical trial design, and regulatory analytics. Thesis focused on adaptive clinical trial methodologies for rare diseases.",
    achievements: [
      "Dean's List for Academic Excellence (4 semesters)",
      "Graduate Research Assistant - Biostatistics Collaboration Center",
      "Published 2 peer-reviewed papers on clinical trial methodology",
      "Winner of Student Research Competition 2022"
    ]
  },
  {
    degree: "Bachelor of Science in Statistics",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2016 - 2020",
    gpa: "3.8/4.0",
    description: "Strong foundation in mathematical statistics, probability theory, and data analysis with emphasis on healthcare applications.",
    achievements: [
      "Magna Cum Laude graduate",
      "Statistics Department Honor Society member",
      "Research intern at UCSF Clinical Research Center",
      "Capstone project on pharmaceutical market analysis"
    ]
  }
];

export const mockCertifications = [
  {
    name: "SAS Certified Clinical Trials Programmer",
    issuer: "SAS Institute",
    date: "2023",
    expiry: "2026",
    description: "Advanced certification in SAS programming for clinical trials, including CDISC standards, regulatory submissions, and data management.",
    skills: ["SAS Programming", "CDISC", "Clinical Data Management", "Regulatory Compliance"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    expiry: "2026",
    description: "Cloud architecture certification focusing on scalable data analytics solutions and machine learning deployment in healthcare.",
    skills: ["Cloud Architecture", "Data Lakes", "Machine Learning", "Security"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "Google Professional Data Engineer",
    issuer: "Google Cloud",
    date: "2022",
    expiry: "2025",
    description: "Expertise in designing and building data processing systems and machine learning models on Google Cloud Platform.",
    skills: ["BigQuery", "Data Pipeline", "ML Engineering", "Data Governance"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "Certified Analytics Professional (CAP)",
    issuer: "INFORMS",
    date: "2022",
    expiry: null,
    description: "Professional certification recognizing mastery of the analytics process from framing business problems to deploying solutions.",
    skills: ["Analytics Strategy", "Problem Solving", "Data Science Lifecycle", "Business Intelligence"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "ICH GCP Certification",
    issuer: "CITI Program",
    date: "2023",
    expiry: "2026",
    description: "Good Clinical Practice certification essential for pharmaceutical research and clinical trial conduct.",
    skills: ["Clinical Research", "GCP Guidelines", "Ethics", "Regulatory Compliance"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "Machine Learning for Healthcare Specialization",
    issuer: "Stanford University (Coursera)",
    date: "2022",
    expiry: null,
    description: "Comprehensive specialization covering ML applications in healthcare, from predictive modeling to clinical decision support.",
    skills: ["Healthcare ML", "Predictive Modeling", "Clinical Decision Support", "Deep Learning"],
    credentialUrl: "https://example.com/credential"
  }
];

export const mockSkills = {
  "programming-languages": [
    { name: "Python", level: 5, experience: "5+ years, primary language for ML and data analysis" },
    { name: "R", level: 5, experience: "4+ years, statistical computing and bioinformatics" },
    { name: "SAS", level: 4, experience: "3+ years, clinical trials and regulatory submissions" },
    { name: "SQL", level: 5, experience: "5+ years, database design and complex queries" },
    { name: "Java", level: 3, experience: "2+ years, enterprise applications and APIs" }
  ],
  "data-analytics": [
    { name: "Statistical Modeling", level: 5, experience: "Advanced expertise in biostatistics and clinical analytics" },
    { name: "Machine Learning", level: 4, experience: "Supervised/unsupervised learning, healthcare applications" },
    { name: "Data Visualization", level: 5, experience: "Tableau, PowerBI, ggplot2, matplotlib expertise" },
    { name: "Clinical Data Analysis", level: 5, experience: "Phase I-IV trials, real-world evidence studies" },
    { name: "Regulatory Analytics", level: 4, experience: "FDA submissions, CDISC standards, validation" }
  ],
  "tools-platforms": [
    { name: "Tableau", level: 5, experience: "Advanced dashboard development and server administration" },
    { name: "Power BI", level: 4, experience: "Enterprise reporting and self-service analytics" },
    { name: "AWS", level: 4, experience: "S3, EC2, Redshift, SageMaker for healthcare analytics" },
    { name: "Google Cloud", level: 4, experience: "BigQuery, AI Platform, healthcare APIs" },
    { name: "Docker/Kubernetes", level: 3, experience: "Containerization and orchestration for analytics" }
  ],
  "domain-expertise": [
    { name: "Clinical Research", level: 5, experience: "End-to-end clinical trial analytics and reporting" },
    { name: "Pharmaceutical Industry", level: 5, experience: "Drug development lifecycle and regulatory requirements" },
    { name: "Healthcare Data", level: 5, experience: "EHR, claims data, clinical registries analysis" },
    { name: "Regulatory Compliance", level: 4, experience: "FDA, EMA guidelines and validation practices" },
    { name: "Market Access", level: 4, experience: "HEOR, pharmacoeconomics, and payer analytics" }
  ]
};