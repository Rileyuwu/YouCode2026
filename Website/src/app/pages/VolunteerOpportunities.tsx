import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, Calendar, Users, Star, Search, X, Check } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Opportunity = {
  id: number;
  title: string;
  organization: string;
  location: string;
  timeCommitment: string;
  duration: string;
  skills: string[];
  causes: string[];
  volunteers: number;
  spots: number;
  match: number;
  description: string;
};

export function VolunteerOpportunities() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [applyTarget, setApplyTarget] = useState<Opportunity | null>(null);
  const [detailTarget, setDetailTarget] = useState<Opportunity | null>(null);
  const [applyForm, setApplyForm] = useState({ message: "", availability: "", backgroundCheck: false });
  const [submitted, setSubmitted] = useState(false);

  const opportunities: Opportunity[] = [
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

  const handleSubmitApplication = () => {
    setSubmitted(true);
    setTimeout(() => {
      setApplyTarget(null);
      setSubmitted(false);
      setApplyForm({ message: "", availability: "", backgroundCheck: false });
      navigate("/volunteer/dashboard");
    }, 1500);
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
              <Link to="/volunteer/dashboard" className="text-foreground hover:text-primary">
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { value: "all", label: "All Opportunities" },
              { value: "ongoing", label: "Ongoing" },
              { value: "one-time", label: "One-Time Events" },
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

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
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
                      <span>{opp.volunteers}/{opp.spots} volunteers</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {opp.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">{skill}</span>
                    ))}
                    {opp.causes.map((cause) => (
                      <span key={cause} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{cause}</span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 lg:w-40">
                  <button
                    onClick={() => setApplyTarget(opp)}
                    className="flex-1 lg:w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setDetailTarget(opp)}
                    className="flex-1 lg:w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No opportunities match your search. Try adjusting your filters.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedFilter("all"); }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="mt-8 bg-muted/30 border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground mb-1">Can't find what you're looking for?</h3>
              <p className="text-sm text-muted-foreground">Browse more opportunities or check back later for new listings.</p>
            </div>
            <Link to="/volunteer/dashboard" className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
              My Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !submitted && setApplyTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-lg w-full"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground">Redirecting to your dashboard…</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-xl text-foreground">Apply to Volunteer</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{applyTarget.title} · {applyTarget.organization}</p>
                    </div>
                    <button onClick={() => setApplyTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Why do you want to volunteer here?</label>
                      <textarea
                        value={applyForm.message}
                        onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                        placeholder="Share a little about yourself and why this opportunity interests you..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">Your availability</label>
                      <select
                        value={applyForm.availability}
                        onChange={(e) => setApplyForm({ ...applyForm, availability: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select when you're available</option>
                        <option>Weekday mornings</option>
                        <option>Weekday afternoons</option>
                        <option>Weekday evenings</option>
                        <option>Weekends</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={applyForm.backgroundCheck}
                          onChange={(e) => setApplyForm({ ...applyForm, backgroundCheck: e.target.checked })}
                          className="w-4 h-4 text-primary border-border rounded"
                        />
                        <span className="text-sm text-foreground">I have or am willing to obtain a background check</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSubmitApplication}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Submit Application
                    </button>
                    <button
                      onClick={() => setApplyTarget(null)}
                      className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More Modal */}
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
                  <p className="text-sm text-muted-foreground mt-0.5">{detailTarget.organization}</p>
                </div>
                <button onClick={() => setDetailTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <p className="text-foreground mb-4">{detailTarget.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: MapPin, label: "Location", value: detailTarget.location },
                  { icon: Clock, label: "Time", value: detailTarget.timeCommitment },
                  { icon: Calendar, label: "Duration", value: detailTarget.duration },
                  { icon: Users, label: "Spots left", value: `${detailTarget.spots - detailTarget.volunteers} remaining` },
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
                <p className="text-sm text-muted-foreground mb-2">Skills needed</p>
                <div className="flex flex-wrap gap-2">
                  {detailTarget.skills.map((s) => (
                    <span key={s} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setDetailTarget(null); setApplyTarget(detailTarget); }}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
