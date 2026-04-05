import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { DollarSign, Calendar, MapPin, Building2, TrendingUp, Search, X, FileText, Users, BarChart2, Check } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

type Campaign = {
  id: number;
  title: string;
  nonprofit: string;
  location: string;
  budget: string;
  timeline: string;
  startDate: string;
  services: string[];
  cause: string;
  status: string;
  description: string;
};

export function FirmOpportunities() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showGuide, setShowGuide] = useState(false);
  const [proposalTarget, setProposalTarget] = useState<Campaign | null>(null);
  const [detailTarget, setDetailTarget] = useState<Campaign | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    coverLetter: "",
    proposedBudget: "",
    proposedTimeline: "",
    teamSize: "",
    approach: "",
  });

  const campaigns: Campaign[] = [
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

  const handleSubmitProposal = () => {
    setSubmitted(true);
  };

  const closeProposalModal = () => {
    setProposalTarget(null);
    setSubmitted(false);
    setProposalForm({ coverLetter: "", proposedBudget: "", proposedTimeline: "", teamSize: "", approach: "" });
  };

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
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">Available Campaign Opportunities</h1>
          <p className="text-muted-foreground">Connect with nonprofits looking for professional outreach partners</p>
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
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { value: "all", label: "All Campaigns" },
              { value: "active", label: "Accepting Proposals" },
              { value: "reviewing", label: "Under Review" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedFilter(value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
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
                    <span className={`px-3 py-1 rounded-full text-sm ${campaign.status === "Accepting Proposals" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}>
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
                      <span>{campaign.timeline} · {campaign.startDate}</span>
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
                      <span key={service} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{service}</span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 lg:w-40">
                  <button
                    onClick={() => campaign.status === "Accepting Proposals" ? setProposalTarget(campaign) : null}
                    disabled={campaign.status !== "Accepting Proposals"}
                    className="flex-1 lg:w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Proposal
                  </button>
                  <button
                    onClick={() => setDetailTarget(campaign)}
                    className="flex-1 lg:w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No campaigns match your search. Try adjusting your filters.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedFilter("all"); }}
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
              <p className="text-sm text-muted-foreground">Learn how to write successful proposals and stand out to nonprofits.</p>
            </div>
            <button
              onClick={() => setShowGuide(true)}
              className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
            >
              View Guide
            </button>
          </div>
        </div>
      </div>

      {/* Submit Proposal Modal */}
      <AnimatePresence>
        {proposalTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !submitted && setProposalTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 px-6"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl text-foreground mb-2">Proposal Submitted!</h3>
                  <p className="text-muted-foreground mb-6">The nonprofit will review your proposal within 3–5 business days.</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate("/firm/dashboard")} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      Go to My Dashboard
                    </button>
                    <button onClick={closeProposalModal} className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                      Browse More Campaigns
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-xl text-foreground">Submit Proposal</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{proposalTarget.title} · {proposalTarget.nonprofit}</p>
                    </div>
                    <button onClick={() => setProposalTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">Budget: {proposalTarget.budget}</span>
                    <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">Timeline: {proposalTarget.timeline}</span>
                    <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">Start: {proposalTarget.startDate}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Cover Letter <span className="text-primary">*</span></label>
                      <textarea
                        value={proposalForm.coverLetter}
                        onChange={(e) => setProposalForm({ ...proposalForm, coverLetter: e.target.value })}
                        placeholder="Why is your firm the right fit for this campaign? Highlight relevant experience..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-foreground mb-2">Proposed Budget</label>
                        <input
                          type="text"
                          value={proposalForm.proposedBudget}
                          onChange={(e) => setProposalForm({ ...proposalForm, proposedBudget: e.target.value })}
                          placeholder="e.g. $4,200"
                          className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">Timeline</label>
                        <select
                          value={proposalForm.proposedTimeline}
                          onChange={(e) => setProposalForm({ ...proposalForm, proposedTimeline: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select</option>
                          <option>2 weeks</option>
                          <option>1 month</option>
                          <option>2 months</option>
                          <option>3 months</option>
                          <option>6 months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Team size for this project</label>
                      <select
                        value={proposalForm.teamSize}
                        onChange={(e) => setProposalForm({ ...proposalForm, teamSize: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select</option>
                        <option>1 person</option>
                        <option>2-3 people</option>
                        <option>4-6 people</option>
                        <option>7+ people</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Proposed approach</label>
                      <textarea
                        value={proposalForm.approach}
                        onChange={(e) => setProposalForm({ ...proposalForm, approach: e.target.value })}
                        placeholder="Briefly outline your strategy and key milestones..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSubmitProposal}
                      disabled={!proposalForm.coverLetter.trim()}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Proposal
                    </button>
                    <button
                      onClick={() => setProposalTarget(null)}
                      className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {detailTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDetailTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl text-foreground">{detailTarget.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                    <Building2 className="w-4 h-4" />
                    <span>{detailTarget.nonprofit}</span>
                  </div>
                </div>
                <button onClick={() => setDetailTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <p className="text-foreground mb-4">{detailTarget.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: DollarSign, label: "Budget", value: detailTarget.budget },
                  { icon: Calendar, label: "Timeline", value: `${detailTarget.timeline} · ${detailTarget.startDate}` },
                  { icon: MapPin, label: "Location", value: detailTarget.location },
                  { icon: TrendingUp, label: "Cause", value: detailTarget.cause },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-3 bg-muted/40 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                    <span className="text-sm text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <p className="text-sm text-muted-foreground mb-2">Services needed</p>
                <div className="flex flex-wrap gap-2">
                  {detailTarget.services.map((s) => (
                    <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {detailTarget.status === "Accepting Proposals" ? (
                <button
                  onClick={() => { setDetailTarget(null); setProposalTarget(detailTarget); }}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Submit Proposal
                </button>
              ) : (
                <div className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg text-center text-sm">
                  Currently reviewing proposals
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-foreground">How It Works</h3>
                <button onClick={() => setShowGuide(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-5">
                {[
                  { num: 1, icon: Search, heading: "Browse Open Campaigns", desc: "Explore nonprofit campaigns that match your firm's expertise and availability." },
                  { num: 2, icon: FileText, heading: "Write a Strong Proposal", desc: "Highlight your relevant experience, team size, and what makes your firm the right fit." },
                  { num: 3, icon: Users, heading: "Get Matched & Onboarded", desc: "Once selected, you'll receive a detailed brief and be connected with the nonprofit's campaign lead." },
                  { num: 4, icon: BarChart2, heading: "Track Your Impact", desc: "Log volunteer hours, submit progress updates, and see your cumulative social impact score." },
                ].map(({ num, icon: Icon, heading, desc }) => (
                  <div key={num} className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {num}
                    </div>
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-foreground font-medium mb-1">{heading}</div>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
