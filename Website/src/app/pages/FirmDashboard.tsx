import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, DollarSign, TrendingUp, Clock, Building2, Star, X, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Campaign = { id: number; title: string; nonprofit: string; status: string; progress: number; deadline: string; value: string; description?: string; };
type Proposal = { id: number; title: string; nonprofit: string; status: string; submitted: string; value: string; };

export function FirmDashboard() {
  const revenueData = [
    { month: "Nov", revenue: 8500 },
    { month: "Dec", revenue: 12000 },
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 19500 },
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, title: "Spring Food Drive", nonprofit: "Vancouver Community Food Bank", status: "In Progress", progress: 65, deadline: "Apr 30, 2026", value: "$4,500", description: "Running a multi-channel social media and community outreach campaign. Target: raise $10,000 and collect 5,000 lbs of food." },
    { id: 2, title: "Annual Gala Planning", nonprofit: "BC Arts Foundation", status: "Planning", progress: 30, deadline: "May 15, 2026", value: "$10,000", description: "Planning and executing the annual fundraising gala with 200+ expected attendees and a $50,000 fundraising target." },
  ]);

  const [proposals] = useState<Proposal[]>([
    { id: 1, title: "Youth Mentorship Launch", nonprofit: "Island Youth Services", status: "Under Review", submitted: "3 days ago", value: "$3,000" },
    { id: 2, title: "Environmental Conservation", nonprofit: "BC Nature Conservancy", status: "Accepted", submitted: "1 week ago", value: "$17,500" },
  ]);

  const reviews = [
    { nonprofit: "Vancouver Community Food Bank", rating: 5, text: "Outstanding work! They exceeded our expectations and helped us reach our fundraising goal.", date: "2 weeks ago" },
    { nonprofit: "Fraser Valley Seniors", rating: 5, text: "Professional, responsive, and truly understood our mission. Highly recommend!", date: "1 month ago" },
    { nonprofit: "BC Nature Conservancy", rating: 4, text: "Great team, strong execution on the digital marketing side. Would work with again.", date: "6 weeks ago" },
  ];

  // Modal state
  const [progressTarget, setProgressTarget] = useState<Campaign | null>(null);
  const [detailTarget, setDetailTarget] = useState<Campaign | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressNote, setProgressNote] = useState("");
  const [progressSaved, setProgressSaved] = useState(false);

  const openProgressModal = (campaign: Campaign) => {
    setProgressTarget(campaign);
    setProgressValue(campaign.progress);
    setProgressNote("");
    setProgressSaved(false);
  };

  const handleSaveProgress = () => {
    if (!progressTarget) return;
    setProgressSaved(true);
    setCampaigns((prev) =>
      prev.map((c) => c.id === progressTarget.id ? { ...c, progress: progressValue, status: progressValue >= 100 ? "Completed" : c.status } : c)
    );
    setTimeout(() => {
      setProgressTarget(null);
      setProgressSaved(false);
    }, 1200);
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
              <Link to="/firm/opportunities" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">BC Community Outreach Partners</h1>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span>4.9 rating</span>
            </div>
            <span>·</span>
            <span>45+ campaigns completed</span>
            <span>·</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">Verified Partner</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Campaigns", value: campaigns.length, sub: "In progress", icon: Briefcase },
            { label: "Revenue (6mo)", value: "$96K", sub: "+23% from last period", icon: DollarSign, highlight: true },
            { label: "Proposals", value: proposals.filter((p) => p.status === "Under Review").length, sub: "Under review", icon: Clock },
            { label: "Success Rate", value: "87%", sub: "Proposal acceptance", icon: TrendingUp },
          ].map(({ label, value, sub, icon: Icon, highlight }) => (
            <motion.div key={label} whileHover={{ y: -2 }} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{label}</span>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl text-foreground mb-1">{value}</div>
              <div className={`text-sm ${highlight ? "text-primary" : "text-muted-foreground"}`}>{sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-foreground">Revenue Overview</h3>
                <select className="px-3 py-2 border border-border rounded-lg text-sm bg-background">
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                  <option>All time</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#2f6b52" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Active Campaigns */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Active Campaigns</h3>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <motion.div key={campaign.id} layout className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-foreground mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{campaign.nonprofit}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${campaign.status === "Completed" ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary"}`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-sm"><span className="text-muted-foreground">Deadline: </span><span className="text-foreground">{campaign.deadline}</span></div>
                      <div className="text-sm"><span className="text-muted-foreground">Value: </span><span className="text-foreground">{campaign.value}</span></div>
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div className="bg-primary h-2 rounded-full" animate={{ width: `${campaign.progress}%` }} transition={{ duration: 0.5 }} />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button onClick={() => openProgressModal(campaign)} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        Update Progress
                      </button>
                      <button onClick={() => setDetailTarget(campaign)} className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground mb-2">{review.text}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{review.nonprofit}</span>
                      <span>{review.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {showAllReviews ? "Show Less" : `View All Reviews (${reviews.length})`}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Proposals */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Recent Proposals</h4>
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${proposal.status === "Accepted" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}>
                        {proposal.status}
                      </span>
                      <span className="text-sm text-foreground">{proposal.value}</span>
                    </div>
                    <p className="text-sm text-foreground mb-1">{proposal.title}</p>
                    <p className="text-xs text-muted-foreground mb-1">{proposal.nonprofit}</p>
                    <p className="text-xs text-muted-foreground">Submitted {proposal.submitted}</p>
                  </div>
                ))}
              </div>
              <Link to="/firm/opportunities" className="block w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center">
                Submit New Proposal
              </Link>
            </div>

            {/* Performance */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Performance</h4>
              <div className="space-y-4">
                {[
                  { label: "Client Satisfaction", value: "4.9/5.0", pct: 98 },
                  { label: "On-Time Delivery", value: "95%", pct: 95 },
                  { label: "Goal Achievement", value: "92%", pct: 92 },
                ].map(({ label, value, pct }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm text-foreground">{value}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link to="/firm/opportunities" className="block text-sm text-primary hover:underline">Browse New Campaigns</Link>
                <button onClick={() => setShowAllReviews(true)} className="block text-sm text-primary hover:underline text-left w-full">View All Reviews</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Progress Modal */}
      <AnimatePresence>
        {progressTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !progressSaved && setProgressTarget(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full">
              {progressSaved ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl text-foreground mb-1">Progress Updated!</h3>
                  <p className="text-sm text-muted-foreground">{progressValue}% complete</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-xl text-foreground">Update Progress</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{progressTarget.title}</p>
                    </div>
                    <button onClick={() => setProgressTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <label className="text-foreground">Completion</label>
                        <span className="text-primary font-medium">{progressValue}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={progressValue}
                        onChange={(e) => setProgressValue(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span><span>50%</span><span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-foreground mb-2">Update notes (optional)</label>
                      <textarea
                        value={progressNote}
                        onChange={(e) => setProgressNote(e.target.value)}
                        placeholder="What milestones were completed?"
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={handleSaveProgress} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">Save</button>
                    <button onClick={() => setProgressTarget(null)} className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">Cancel</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {detailTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDetailTarget(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full">
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
              {detailTarget.description && <p className="text-foreground text-sm mb-4">{detailTarget.description}</p>}
              <div className="space-y-2 mb-5">
                {[
                  { label: "Status", value: detailTarget.status },
                  { label: "Deadline", value: detailTarget.deadline },
                  { label: "Contract value", value: detailTarget.value },
                  { label: "Progress", value: `${detailTarget.progress}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setDetailTarget(null); openProgressModal(detailTarget); }} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Update Progress
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
