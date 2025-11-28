import Image from 'next/image';
import { Award, Briefcase, Github, GraduationCap, Linkedin, Mail, Twitter } from 'lucide-react';
import { siteMetadata } from '@/data/metadata';

export default function AboutPage() {
  const { author } = siteMetadata;

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Image
            src={author.avatar}
            alt={author.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-4">{author.name}</h1>
          <p className="text-xl text-gray-400 mb-8">{author.bio}</p>

          <div className="flex justify-center space-x-6">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {author.social.github && (
              <a
                href={author.social.github}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {author.social.email && (
              <a
                href={author.social.email}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        {author.achievements && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="space-y-3">
              {author.achievements.map((achievement, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {achievement.description}
                  <a target="_blank" rel="noopener noreferrer" href={achievement.link} className="text-blue-500 ml-2">
                    Link
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience Section */}
        {author.experience && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Briefcase className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Experience</h2>
            </div>
            <div className="space-y-8">
              {author.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-800 pl-4">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-gray-400 mb-2">{exp.company} • {exp.period}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {author.education && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {author.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-800 pl-4">
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.school} • {edu.year}</p>
                  {edu.honors && (
                    <p className="text-blue-400 mt-1">{edu.honors}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
