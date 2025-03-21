import { SiteMetadata } from '../types/metadata';

export const siteMetadata: SiteMetadata = {
  title: "Abhinandan's Blog",
  description: "Exploring the latest in web development, programming, and technology through in-depth articles and tutorials.",
  siteUrl: "https://techblog.com",
  author: {
    name: "Abhinandan Mishra",
    username: 'abhinandanmishra1',
    tagline: 'Full Stack Developer & Technical Writer',
    bio: "Software Engineer and Technical Writer passionate about web development",
    avatar: "https://abhicdn.netlify.app/images/profile.png",
    achievements: [
      {
        title: "Achieved 311th rank globally in Google Kickstart Round H 2022",
        description: "Achieved 311th rank globally in Google Kickstart Round H 2022",
        link: "https://drive.google.com/file/d/11Ej36IDaoE5f6hUwx13f02D1IpzbrPHM/view"
      },
      {
        title: "Secured 60th rank globally in February Codechef Starters 2020",
        description: "Secured 60th rank globally in February Codechef Starters 2020",
        link: "https://www.codechef.com/rankings/START1C?order=asc&search=abhimishra1&sortBy=rank"
      },
      {
        title: "Ranked 93rd in ICPC Kanpur Mathura Region 2021",
        description: "Ranked 93rd in ICPC Kanpur Mathura Region 2021",
        link: "https://drive.google.com/file/d/1QVzYOfo_-L49EMxLi3NCRjDb4zi0VZT3/view"
      },
      {
        title: "Placed 226th globally in Codechef July Lunchtime 2021",
        description: "Placed 226th globally in Codechef July Lunchtime 2021",
        link: "https://www.codechef.com/rankings/LTIME98B?order=asc&search=abhimishra1&sortBy=rank"
      },
      {
        title: "Attained 435th rank (in ASIA) in HackerRank Hackfest 2020",
        description: "Attained 435th rank (in ASIA) in HackerRank Hackfest 2020",
        link: "https://www.hackerrank.com/results/hackerrank-hackfest-2020/abhi_mishra_1?h_r=profile"
      },
      {
        title: "Max-Rating of 2026 on Leetcode.",
        description: "Max-Rating of 2026 on Leetcode.",
        link: "https://leetcode.com/abhinandanmishra1/"
      },
      {
        title: "Max-Rating of 1825(4*) on Codechef.",
        description: "Max-Rating of 1825(4*) on Codechef.",
        link: "https://www.codechef.com/users/abhimishra1"
      }
    ],
    experience: [
      {
        title: "Specialist Programmer",
        company: "Infosys",
        period: "Oct,2023 - Present",
        highlights: [
          "Developed scalable backend services using .NET Core on Microsoft Azure for high performance.",
          "Automated deployment pipelines on Azure DevOps, reducing deployment times and errors.",
          "Enhanced efficiency by 96% through automating processes for Azure resource management."
        ]
      },
      {
        title: "Software Engineer",
        company: "Cosmocloud",
        period: "Jan,2023 - Oct,2023",
        highlights: [
          "Implemented Full Text Search feature, enabling users to create custom analyzers for faster searches.",
          "Created a Search API template to reduce time in generating search APIs using search indexes.",
          "Designed and developed an environment management system for multiple environments support.",
          "Developed a user-friendly subscription feature integrated with Zoho subscriptions for resource allocation.",
          "Designed and orchestrated a comprehensive design system using styled components and Ant Design UI library to ensure a consistent visual interface across the application."
        ]
      },
      {
        title: "SDE Intern",
        company: "Scaler",
        period: "Jul,2022 - Dec,2022",
        highlights: [
          "Developed frontend for Scaler Academy and Interviewbit using React and erb, enhancing user experience.",
          "Implemented admin dashboard with React, JavaScript, and SCSS, improving internal operations.",
          "Enhanced email filters, Freshchat visibility, and attribution tracking using Ruby on Rails and JavaScript.",
          "Contributed to backend development with Ruby on Rails, API building, and database integration.",
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Technology",
        school: "Madan Mohan Malaviya University of Technology",
        year: "2023",
        honors: "Information Technology"
      },
      {
        degree: "Intermediate",
        school: "Children Senior Secondary School",
        year: "2018",
        honors: "Science"
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
      tag: "react",
      coverImage: "https://abhicdn.netlify.app/images/cover/react-1.webp"
    },
    {
      icon: 'Cpu', // JavaScript
      title: "JavaScript",
      description: "Core concepts, ES6+, and advanced JavaScript patterns",
      color: "rgb(255, 193, 7)",
      tag: "javascript",
      coverImage: "https://abhicdn.netlify.app/images/cover/javascript-1.webp"
    },
    {
      icon: 'Gauge', // Web Development
      title: "Web Development",
      description: "Optimization techniques and responsive design patterns",
      color: "rgb(72, 187, 120)",
      tag: "web-development",
      coverImage: "https://abhicdn.netlify.app/images/cover/web-development-3.png"
    },
    {
      icon: 'Code2', // TypeScript
      title: "TypeScript",
      description: "Type-safe JavaScript with modern patterns",
      color: "rgb(99, 179, 237)",
      tag: "typescript",
      coverImage: "https://abhicdn.netlify.app/images/cover/typescript-1.webp"
    },
    {
      icon: 'Layout', // CSS
      title: "CSS",
      description: "Styling for modern web applications",
      color: "rgb(225, 112, 85)",
      tag: "css",
      coverImage: "https://abhicdn.netlify.app/images/cover/css-1.webp"
    },
    {
      icon: 'Server', // System Design
      title: "System Design",
      description: "Architectural patterns and large-scale system planning",
      color: "rgb(144, 104, 252)",
      tag: "system-design",
      coverImage: "https://abhicdn.netlify.app/images/cover/system-design.png"
    },
    {
      icon: 'Monitor', // Computer Networks
      title: "Computer Networks",
      description: "Networking basics and advanced concepts",
      color: "rgb(85, 212, 245)",
      tag: "computer-network",
      coverImage: "https://abhicdn.netlify.app/images/cover/computer-network-1.webp"
    },
    {
      icon: 'Database', // Database Management
      title: "Databases",
      description: "Efficient data storage and querying techniques",
      color: "rgb(240, 165, 0)",
      tag: "databases",
      coverImage: "https://abhicdn.netlify.app/images/cover/databases-1.png"
    },
    {
      icon: 'Cpu', // Operating Systems
      title: "Operating Systems",
      description: "Understanding OS fundamentals and advanced topics",
      color: "rgb(250, 87, 97)",
      tag: "operating-system",
      coverImage: "https://abhicdn.netlify.app/images/cover/operating-system.webp"
    },
    {
      icon: 'Box', // Others
      title: "Others",
      description: "Explore diverse topics in tech",
      color: "rgb(180, 180, 180)",
      tag: "others",
      coverImage: "https://abhicdn.netlify.app/images/cover/web-development-1.png"
    },
  ],
  tags: [
    {
      name: "react",
      slug: "react",
      description: "Modern web development with React, hooks, and best practices",
    },
    {
      name: "javascript",
      slug: "javascript",
      description: "Core concepts, ES6+, and advanced JavaScript patterns",
    },
    {
      name: "web-development",
      slug: "web-development",
      description: "Optimization techniques and responsive design patterns",
    },
    {
      name: "typescript",
      slug: "typescript",
      description: "Type-safe JavaScript with modern patterns",
    },
    {
      name: "css",
      slug: "css",
      description: "Styling for modern web applications",
    },
    {
      name: "system-design",
      slug: "system-design",
      description: "Architectural patterns and large-scale system planning",
    },
    {
      name: "computer-network",
      slug: "computer-network",
      description: "Networking basics and advanced concepts",
    },
    {
      name: "databases",
      slug: "databases",
      description: "Efficient data storage and querying techniques",
    },
    {
      name: "operating-systems",
      slug: "operating-system",
      description: "Understanding OS fundamentals and advanced topics",
    },
    {
      name: "others",
      slug: "others",
      description: "Explore diverse topics in tech",
    },
    {
      name: "programming",
      slug: "problem-solving",
      description: "Programming concepts and best practices",
    },
  ],
  seriesList: [
    {
      title: "Web Development Fundamentals",
      description:
        "Master the basics of modern web development with practical examples",
      icon:  "BookOpen",
      color: "rgb(59, 130, 246)",
      rating: 4.8,
      articleCount: 12,
      readCount: "2.5k",
    },
    {
      title: "Advanced React Patterns",
      description: "Deep dive into advanced React patterns and best practices",
      icon: "BookOpen",
      color: "rgb(236, 72, 153)",
      rating: 4.9,
      articleCount: 8,
      readCount: "1.8k",
    },
    {
      title: "System Design",
      description: "Learn how to design scalable systems and architecture",
      icon: "BookOpen",
      color: "rgb(34, 197, 94)",
      rating: 4.7,
      articleCount: 10,
      readCount: "3.2k",
    },
  ]
};
