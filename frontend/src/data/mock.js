// Mock data for the data analyst portfolio

export const mockProjects = [
  {
    id: 1,
    title: "Customer Behavior Analytics Platform",
    description: "Comprehensive analysis of customer journey data to identify key touchpoints and optimize conversion rates across multiple channels.",
    category: "business-intelligence",
    technologies: ["Python", "SQL", "Tableau", "AWS", "Machine Learning", "A/B Testing"],
    date: "2024",
    impact: "15% increase in conversion rates",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 2,
    title: "Predictive Sales Forecasting Model",
    description: "Built machine learning models to predict quarterly sales performance with 92% accuracy, enabling better inventory management and resource allocation.",
    category: "machine-learning",
    technologies: ["Python", "Scikit-learn", "Pandas", "Time Series Analysis", "PostgreSQL"],
    date: "2024",
    impact: "92% prediction accuracy",
    githubUrl: null,
    featured: true
  },
  {
    id: 3,
    title: "Financial Risk Assessment Dashboard",
    description: "Interactive dashboard analyzing market trends and risk factors for investment portfolio optimization across different asset classes.",
    category: "financial-analysis",
    technologies: ["R", "Shiny", "Power BI", "Excel VBA", "SQL Server", "Monte Carlo"],
    date: "2023",
    impact: "25% risk reduction",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    id: 4,
    title: "Social Media Sentiment Analysis",
    description: "Natural language processing pipeline to analyze brand sentiment across social platforms and track reputation metrics in real-time.",
    category: "nlp-analytics",
    technologies: ["Python", "NLTK", "Sentiment Analysis", "API Integration", "MongoDB"],
    date: "2023",
    impact: "Real-time brand monitoring",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 5,
    title: "E-commerce Performance Analysis",
    description: "End-to-end analysis of e-commerce metrics including customer acquisition costs, lifetime value, and product performance optimization.",
    category: "business-intelligence",
    technologies: ["SQL", "Python", "Google Analytics", "Looker", "Statistical Analysis"],
    date: "2023",
    impact: "30% improvement in ROI",
    githubUrl: null,
    featured: false
  },
  {
    id: 6,
    title: "Supply Chain Optimization Model",
    description: "Predictive modeling for supply chain efficiency, reducing costs and improving delivery times through data-driven optimization strategies.",
    category: "operations-research",
    technologies: ["Python", "Linear Programming", "Optimization", "SQL", "Tableau"],
    date: "2022",
    impact: "20% cost reduction",
    githubUrl: "https://github.com/example",
    featured: false
  }
];

export const mockEducation = [
  {
    degree: "Master of Science in Data Science",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2020 - 2022",
    gpa: "3.9/4.0",
    description: "Specialized in machine learning, statistical modeling, and data visualization. Focused on applying advanced analytics to solve real-world business problems.",
    achievements: [
      "Dean's List for Academic Excellence (4 semesters)",
      "Graduate Research Assistant - Data Science Lab",
      "Published 2 peer-reviewed papers on predictive modeling",
      "Winner of University Data Science Competition 2022"
    ]
  },
  {
    degree: "Bachelor of Science in Statistics",
    institution: "University of California, Los Angeles",
    location: "Los Angeles, CA",
    period: "2016 - 2020",
    gpa: "3.8/4.0",
    description: "Strong foundation in mathematical statistics, probability theory, and computational methods with emphasis on business applications.",
    achievements: [
      "Magna Cum Laude graduate",
      "Statistics Department Honor Society member",
      "Research intern at UCLA Business Analytics Center",
      "Capstone project on financial market analysis"
    ]
  }
];

export const mockCertifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    expiry: "2026",
    description: "Cloud architecture certification focusing on scalable data analytics solutions and machine learning deployment.",
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
    name: "Tableau Desktop Specialist",
    issuer: "Tableau",
    date: "2023",
    expiry: "2026",
    description: "Advanced certification in data visualization and dashboard development using Tableau's comprehensive analytics platform.",
    skills: ["Data Visualization", "Dashboard Design", "Business Intelligence", "Analytics"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "Microsoft Azure Data Scientist Associate",
    issuer: "Microsoft",
    date: "2023",
    expiry: "2025",
    description: "Certification in implementing and running machine learning workloads on Azure cloud platform.",
    skills: ["Azure ML", "Data Science", "Machine Learning", "Cloud Computing"],
    credentialUrl: "https://example.com/credential"
  },
  {
    name: "Python for Data Science Specialization",
    issuer: "University of Michigan (Coursera)",
    date: "2021",
    expiry: null,
    description: "Comprehensive specialization covering Python programming for data analysis, visualization, and machine learning applications.",
    skills: ["Python Programming", "Data Analysis", "Machine Learning", "Data Visualization"],
    credentialUrl: "https://example.com/credential"
  }
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