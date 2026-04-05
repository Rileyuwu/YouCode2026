import { useState } from "react";
import { Link } from "react-router";
import { Heart, DollarSign, Calendar, MapPin, Building2, TrendingUp, Filter, Search } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function FirmOpportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const campaigns = [
    {
      id: 1,
      title: "Spring Food Drive Campaign",
      nonprofit: "Vancouver Community Food Bank",
      location: "Vancouver, BC",
      budget: "$3,000 - $5,000",
      timeline: "2 months",
      startDate: "May 2026",
      services: ["Social Media", "Community Outreach", "Fundraising"],
      cause: "Food Security",
      status: "Accepting Proposals",
      description: "Need help launching a spring food drive with social media strategy and community outreach. Goal is to raise $10,000 and collect 5,000 lbs of food.",
    },
    {
      id: 2,
      title: "Annual Gala Fundraising Event",
      nonprofit: "BC Arts Foundation",
      location: "Vancouver, BC",
      budget: "$8,000 - $12,000",
      timeline: "3 months",
      startDate: "June 2026",
      services: ["Event Planning", "Marketing", "Donor Engagement"],
      cause: "Arts & Culture",
      status: "Accepting Proposals",
      description: "Plan and execute our annual fundraising gala. Expected 200 attendees, targeting $50,000 in donations.",
    },
    {
      id: 3,
      title: "Youth Mentorship Program Launch",
      nonprofit: "Island Youth Services",
      location: "Victoria, BC",
      budget: "$2,500 - $4,000",
      timeline: "1 month",
      startDate: "May 2026",
      services: ["PR & Communications", "Social Media"],
      cause: "Youth Services",
      status: "Accepting Proposals",
      description: "Launch campaign for new youth mentorship program. Need to recruit 50 mentors and raise awareness.",
    },
    {
      id: 4,
      title: "Environmental Conservation Campaign",
      nonprofit: "BC Nature Conservancy",
      location: "BC-Wide",
      budget: "$15,000 - $20,000",
      timeline: "6 months",
      startDate: "May 2026",
      services: ["Strategic Planning", "Digital Marketing", "Campaign Management"],
      cause: "Environment",
      status: "Reviewing Proposals",
      description: "Major campaign to raise awareness and funds for forest conservation. Multi-channel approach needed.",
    },
    {
      id: 5,
      title: "Senior Support Services Expansion",
      nonprofit: "Fraser Valley Seniors Support",
      location: "Surrey, BC",
      budget: "$4,000 - $6,000",
      timeline: "2 months",
      startDate: "June 2026",
      services: ["Community Outreach", "Volunteer Coordination"],
      cause: "Senior Support",
      status: "Accepting Proposals",
      description: "Help us expand our senior support services. Need outreach to recruit volunteers and raise funds.",
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      searchTerm === "" ||
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.nonprofit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && campaign.status === "Accepting Proposals") ||
      (selectedFilter === "reviewing" && campaign.status === "Reviewing Proposals");

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
              <Link to="/firm/dashboard" className="text-foreground hover:text-primary">
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
            Available Campaign Opportunities
          </h1>
          <p className="text-muted-foreground">
            Connect with nonprofits looking for professional outreach partners
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
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Advanced Filters</span>
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
              All Campaigns
            </button>
            <button
              onClick={() => setSelectedFilter("active")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Accepting Proposals
            </button>
            <button
              onClick={() => setSelectedFilter("reviewing")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === "reviewing"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Under Review
            </button>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl text-foreground mb-1">{campaign.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>{campaign.nonprofit}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        campaign.status === "Accepting Proposals"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <p className="text-foreground mb-4">{campaign.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{campaign.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{campaign.timeline} • {campaign.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>{campaign.cause}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {campaign.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 lg:w-40">
                  <button className="flex-1 lg:w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                    Submit Proposal
                  </button>
                  <button className="flex-1 lg:w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No campaigns match your search. Try adjusting your filters.
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

        {/* Help Section */}
        <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground mb-1">New to the platform?</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to write successful proposals and stand out to nonprofits.
              </p>
            </div>
            <button className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
              View Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
