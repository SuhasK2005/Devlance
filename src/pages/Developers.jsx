import { useState } from "react";
import Header from "../components/layout/Header";
import DeveloperCard from "../components/developers/DeveloperCard";

const Developers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  // Mock data - replace with API call
  const mockDevelopers = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      bio: "Full-stack developer passionate about building scalable web applications",
      avatar: "https://i.pravatar.cc/150?img=1",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "New York, NY",
      bio: "Frontend specialist with 5+ years experience in modern web technologies",
      avatar: "https://i.pravatar.cc/150?img=2",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Austin, TX",
      bio: "Backend engineer focused on microservices and cloud architecture",
      avatar: "https://i.pravatar.cc/150?img=3",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seattle, WA",
      bio: "Mobile and web developer building cross-platform applications",
      avatar: "https://i.pravatar.cc/150?img=4",
      skills: ["React Native", "Flutter", "Firebase", "GraphQL"],
    },
    {
      id: 5,
      name: "Jessica Lee",
      location: "Boston, MA",
      bio: "DevOps engineer specializing in CI/CD and infrastructure automation",
      avatar: "https://i.pravatar.cc/150?img=5",
      skills: ["Kubernetes", "Jenkins", "Terraform", "AWS"],
    },
    {
      id: 6,
      name: "Alex Thompson",
      location: "Los Angeles, CA",
      bio: "Full-stack developer with expertise in e-commerce solutions",
      avatar: "https://i.pravatar.cc/150?img=6",
      skills: ["Vue.js", "Laravel", "MySQL", "Redis"],
    },
  ];

  const filteredDevelopers = mockDevelopers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill =
      !skillFilter ||
      dev.skills.some((skill) =>
        skill.toLowerCase().includes(skillFilter.toLowerCase()),
      );
    return matchesSearch && matchesSkill;
  });

  const handleConnect = (developer) => {
    console.log("Connecting with:", developer);
    // In production, this would send a connection request to the backend
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Find Developers
          </h1>
          <p className="text-gray-400">
            Connect with talented developers for your next project
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2 font-medium">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or bio..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Filter by Skill
              </label>
              <input
                type="text"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                placeholder="e.g., React, Python, AWS..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400">
            Found {filteredDevelopers.length} developer
            {filteredDevelopers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Developer List */}
        <div className="space-y-4">
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                onConnect={handleConnect}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No developers found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;
