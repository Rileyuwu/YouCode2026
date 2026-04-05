import { Link } from "react-router";
import { Heart, Briefcase, DollarSign, TrendingUp, CheckCircle, Clock, Building2, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function FirmDashboard() {
  const revenueData = [
    { month: "Nov", revenue: 8500 },
    { month: "Dec", revenue: 12000 },
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 19500 },
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: "Spring Food Drive",
      nonprofit: "Vancouver Community Food Bank",
      status: "In Progress",
      progress: 65,
      deadline: "Apr 30, 2026",
      value: "$4,500",
    },
    {
      id: 2,
      title: "Annual Gala Planning",
      nonprofit: "BC Arts Foundation",
      status: "Planning",
      progress: 30,
      deadline: "May 15, 2026",
      value: "$10,000",
    },
  ];

  const proposals = [
    {
      id: 1,
      title: "Youth Mentorship Launch",
      nonprofit: "Island Youth Services",
      status: "Under Review",
      submitted: "3 days ago",
      value: "$3,000",
    },
    {
      id: 2,
      title: "Environmental Conservation",
      nonprofit: "BC Nature Conservancy",
      status: "Accepted",
      submitted: "1 week ago",
      value: "$17,500",
    },
  ];

  const reviews = [
    {
      nonprofit: "Vancouver Community Food Bank",
      rating: 5,
      text: "Outstanding work! They exceeded our expectations and helped us reach our fundraising goal.",
      date: "2 weeks ago",
    },
    {
      nonprofit: "Fraser Valley Seniors",
      rating: 5,
      text: "Professional, responsive, and truly understood our mission. Highly recommend!",
      date: "1 month ago",
    },
  ];

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
              <Link
                to="/firm/opportunities"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
            BC Community Outreach Partners
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span>4.9 rating</span>
            </div>
            <span>•</span>
            <span>45+ campaigns completed</span>
            <span>•</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">Verified Partner</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Campaigns</span>
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">2</div>
            <div className="text-sm text-muted-foreground">In progress</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Revenue (6mo)</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">$96K</div>
            <div className="text-sm text-primary">+23% from last period</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Proposals</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">3</div>
            <div className="text-sm text-muted-foreground">Under review</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">87%</div>
            <div className="text-sm text-muted-foreground">Proposal acceptance</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
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
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#2f6b52" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Active Campaigns */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Active Campaigns</h3>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-foreground mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{campaign.nonprofit}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Deadline: </span>
                        <span className="text-foreground">{campaign.deadline}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Value: </span>
                        <span className="text-foreground">{campaign.value}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        Update Progress
                      </button>
                      <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground mb-2">{review.text}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{review.nonprofit}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                View All Reviews
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
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          proposal.status === "Accepted"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-foreground"
                        }`}
                      >
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
              <Link
                to="/firm/opportunities"
                className="block w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Submit New Proposal
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Performance</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                    <span className="text-sm text-foreground">4.9/5.0</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                    <span className="text-sm text-foreground">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Goal Achievement</span>
                    <span className="text-sm text-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link
                  to="/firm/opportunities"
                  className="block text-sm text-primary hover:underline"
                >
                  Browse New Campaigns
                </Link>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Update Company Profile
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  View Payment History
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Download Invoice
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
