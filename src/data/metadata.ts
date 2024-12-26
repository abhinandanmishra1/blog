import { SiteMetadata } from '../types/metadata';

export const siteMetadata: SiteMetadata = {
  title: "TechBlog",
  description: "Exploring the latest in web development, programming, and technology through in-depth articles and tutorials.",
  siteUrl: "https://techblog.com",
  author: {
    name: "John Doe",
    bio: "Senior Software Engineer and Technical Writer passionate about web development and teaching others.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.0",
    achievements: [
      "Led development of 5+ enterprise-scale web applications",
      "Increased application performance by 40% through optimization",
      "Published 50+ technical articles reaching 100k+ monthly readers",
      "Mentored 10+ junior developers to senior positions",
      "Open source contributor to React and Node.js ecosystems"
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc",
        period: "2020 - Present",
        highlights: [
          "Architected and led development of microservices-based platform",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored team of 5 developers on best practices"
        ]
      },
      {
        title: "Software Engineer",
        company: "WebDev Corp",
        period: "2017 - 2020",
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
      twitter: "johndoe",
      github: "johndoe",
      linkedin: "johndoe",
      email: "john@example.com"
    }
  },
  categories: [
    // ... existing categories remain unchanged
  ],
//   navigation: {
//     // ... existing navigation remains unchanged
//   }
};