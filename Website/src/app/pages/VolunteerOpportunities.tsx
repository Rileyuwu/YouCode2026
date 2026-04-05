import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, MapPin, Clock, Calendar, Users, Star, Filter, Search } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function VolunteerOpportunities() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const opportunities = [
    {
      id: 1,
      title: "Spring Food Drive Outreach",
      organization: "Vancouver Community Food Bank",
      location: "Vancouver, BC",
      timeCommitment: "4-8 hours/week",
      duration: "Mar 1 - Apr 30, 2026",
      skills: ["Outreach", "Communication"],
      causes: ["Food Security"],
      volunteers: 8,
      spots: 12,
      match: 95,
      description: "Help spread the word about our spring food drive through community outreach and social media.",
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      organization: "Island Youth Services",
      location: "Victoria, BC",
      timeCommitment: "2-3 hours/week",
      duration: "Ongoing",
      skills: ["Teaching", "Mentoring"],
      causes: ["Youth Services"],
      volunteers: 15,
      spots: 20,
      match: 88,
      description: "Be a mentor to youth aged 13-17. Help them with homework, life skills, and career planning.",
    },
    {
      id: 3,
      title: "Senior Tech Support",
      organization: "Fraser Valley Seniors Support",
      location: "Surrey, BC",
      timeCommitment: "3-5 hours/week",
      duration: "Ongoing",
      skills: ["Teaching", "Technology"],
      causes: ["Senior Support"],
      volunteers: 6,
      spots: 10,
      match: 82,
      description: "Help seniors learn to use smartphones, tablets, and video calling to stay connected with family.",
    },
    {
      id: 4,
      title: "Community Garden Volunteers",
      organization: "Burnaby Community Gardens",
      location: "Burnaby, BC",
      timeCommitment: "2-4 hours/week",
      duration: "Apr - Oct 2026",
      skills: ["Gardening", "Community Building"],
      causes: ["Environment", "Food Security"],
      volunteers: 20,
      spots: 30,
      match: 78,
      description: "Join our community garden team. No experience needed - we'll teach you everything!",
    },
    {
      id: 5,
      title: "Fundraising Event Support",
      organization: "BC Arts Foundation",
      location: "Vancouver, BC",
      timeCommitment: "8-12 hours (one-time)",
      duration: "May 15, 2026",
      skills: ["Event Planning", "Customer Service"],
      causes: ["Arts & Culture"],
      volunteers: 12,
      spots: 25,
      match: 85,
      description: "Help with our annual fundraising gala. Roles include registration, guest services, and auction support.",
    },
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      searchTerm === "" ||
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "remote" && opp.location.includes("Remote")) ||
      (selectedFilter === "ongoing" && opp.duration.includes("Ongoing")) ||
      (selectedFilter === "one-time" && opp.timeCommitment.includes("one-time"));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <ImageWithFallback src={logo} alt="Connext" className="w-14 h-14" />
              <span className="text-xl text-foreground">Connext</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/volunteer/dashboard" className="text-foreground hover:text-primary">
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
            Find Your Perfect Volunteer Opportunity
          </h1>
          <p className="text-muted-foreground">
            Discover meaningful ways to give back in your community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All Opportunities
            </button>
            <button
              onClick={() => setSelectedFilter("ongoing")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === "ongoing"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setSelectedFilter("one-time")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === "one-time"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              One-Time Events
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl text-foreground mb-1">{opp.title}</h3>
                      <p className="text-muted-foreground">{opp.organization}</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                      <Star className="w-4 h-4" fill="currentColor" />
                      <span className="text-sm">{opp.match}% match</span>
                    </div>
                  </div>

                  <p className="text-foreground mb-4">{opp.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{opp.timeCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{opp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>
                        {opp.volunteers}/{opp.spots} volunteers
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {opp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-muted text-foreground text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {opp.causes.map((cause) => (
                      <span
                        key={cause}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 lg:w-40">
                  <button className="flex-1 lg:w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                    Apply Now
                  </button>
                  <button className="flex-1 lg:w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No opportunities match your search. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground mb-1">Can't find what you're looking for?</h3>
              <p className="text-sm text-muted-foreground">
                Set up alerts to be notified when new opportunities that match your interests are posted.
              </p>
            </div>
            <button className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
              Set Up Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
