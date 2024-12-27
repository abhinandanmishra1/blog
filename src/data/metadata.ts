import { SiteMetadata } from '../types/metadata';

export const siteMetadata: SiteMetadata = {
  title: "Abhinandan's Blog",
  description: "Exploring the latest in web development, programming, and technology through in-depth articles and tutorials.",
  siteUrl: "https://techblog.com",
  author: {
    name: "Abhinandan Mishra",
    username: 'abhinandanmishra1',
    tagline: 'Full Stack Developer & Technical Writer',
    bio: "Software Engineer and Technical Writer passionate about web development.",
    avatar: "https://abhicdn.netlify.app/images/profile.png",
    achievements: [
      "Led development of 5+ enterprise-scale web applications",
      "Increased application performance by 40% through optimization",
      "Published 50+ technical articles reaching 100k+ monthly readers",
      "Mentored 10+ junior developers to senior positions",
      "Open source contributor to React and Node.js ecosystems"
    ],
    experience: [
      {
        title: "Specialist Programmer",
        company: "Infosys",
        period: "Oct,2023 - Present",
        highlights: [
          "Architected and led development of microservices-based platform",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored team of 5 developers on best practices"
        ]
      },
      {
        title: "Software Engineer",
        company: "Cosmocloud",
        period: "Jan,2023 - Oct,2023",
        highlights: [
          "Developed responsive web applications using React",
          "Optimized database queries improving performance by 35%",
          "Led migration from monolith to microservices architecture"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Tech University",
        year: "2017",
        honors: "Magna Cum Laude"
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        school: "State University",
        year: "2015",
        honors: "Dean's List"
      }
    ],
    social: {
      twitter: "https://twitter.com/abhinandan_001",
      github: "https://github.com/abhinandanmishra1",
      linkedin: "https://linkedin.com/in/abhinandanmishra1",
      email: "mailto:abhinandanmishra360@gmail.com"
    }
  },
  categories: [
    {
      icon: "Code2", // React
      title: "React",
      description: "Modern web development with React, hooks, and best practices",
      color: "rgb(66, 153, 225)",
      tags: ["react"],
    },
    {
      icon: 'Cpu', // JavaScript
      title: "JavaScript",
      description: "Core concepts, ES6+, and advanced JavaScript patterns",
      color: "rgb(255, 193, 7)",
      tags: ["javascript"],
    },
    {
      icon: 'Gauge', // Web Development
      title: "Web Development",
      description: "Optimization techniques and responsive design patterns",
      color: "rgb(72, 187, 120)",
      tags: ["web-development"],
    },
    {
      icon: 'Code2', // TypeScript
      title: "TypeScript",
      description: "Type-safe JavaScript with modern patterns",
      color: "rgb(99, 179, 237)",
      tags: ["typescript"],
    },
    {
      icon: 'Layout', // CSS
      title: "CSS",
      description: "Styling for modern web applications",
      color: "rgb(225, 112, 85)",
      tags: ["css"],
    },
    {
      icon: 'Server', // System Design
      title: "System Design",
      description: "Architectural patterns and large-scale system planning",
      color: "rgb(144, 104, 252)",
      tags: ["system-design"],
    },
    {
      icon: 'Monitor', // Computer Networks
      title: "Computer Networks",
      description: "Networking basics and advanced concepts",
      color: "rgb(85, 212, 245)",
      tags: ["computer-networks"],
    },
    {
      icon: 'Database', // Database Management
      title: "Database Management",
      description: "Efficient data storage and querying techniques",
      color: "rgb(240, 165, 0)",
      tags: ["database-management"],
    },
    {
      icon: 'Cpu', // Operating Systems
      title: "Operating Systems",
      description: "Understanding OS fundamentals and advanced topics",
      color: "rgb(250, 87, 97)",
      tags: ["operating-systems"],
    },
    {
      icon: 'Box', // Others
      title: "Others",
      description: "Explore diverse topics in tech",
      color: "rgb(180, 180, 180)",
      tags: ["others"],
    },
  ]
};