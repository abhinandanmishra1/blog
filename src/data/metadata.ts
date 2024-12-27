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
    // ... existing categories remain unchanged
  ],
//   navigation: {
//     // ... existing navigation remains unchanged
//   }
};