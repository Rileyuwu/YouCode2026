import { Link } from "react-router";
import { Heart, DollarSign, Users, Clock, TrendingUp, Calendar, ArrowUpRight, Settings, ShieldCheck, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Dashboard() {
  const campaignData = [
    { date: "Mar 1", amount: 450 },
    { date: "Mar 8", amount: 1200 },
    { date: "Mar 15", amount: 2100 },
    { date: "Mar 22", amount: 3800 },
    { date: "Mar 29", amount: 5200 },
    { date: "Apr 5", amount: 6500 },
  ];

  const recentActivity = [
    { id: 1, type: "donation", donor: "Sarah M.", amount: 100, time: "2 hours ago", recurring: true },
    { id: 2, type: "volunteer", name: "UBC Social Impact Society", action: "signed up", time: "5 hours ago" },
    { id: 3, type: "donation", donor: "Anonymous", amount: 50, time: "1 day ago", recurring: false },
    { id: 4, type: "donation", donor: "Michael C.", amount: 250, time: "1 day ago", recurring: true },
    { id: 5, type: "volunteer", name: "Community Volunteers", action: "completed 8 hours", time: "2 days ago" },
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
              <Link to="/trust-safety" className="flex items-center gap-2 text-foreground hover:text-primary">
                <ShieldCheck className="w-5 h-5" />
                <span className="hidden sm:inline">Trust & Safety</span>
              </Link>
              <Link to="/campaign/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                New Campaign
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
                Spring Food Drive 2026
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Mar 1 - Apr 30, 2026
                </span>
                <span>•</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Active</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                <Eye className="w-5 h-5" />
                <span className="hidden sm:inline">View Page</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Money Raised</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">$6,500</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-primary">65%</span> of $10,000 goal
            </div>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Monthly Donors</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">24</div>
            <div className="flex items-center gap-1 text-sm text-primary">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8 this week</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Volunteer Hours</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">142</div>
            <div className="text-sm text-muted-foreground">
              From 12 volunteers
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Supporters</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">87</div>
            <div className="text-sm text-muted-foreground">
              52 one-time, 24 monthly, 11 volunteers
            </div>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Campaign Progress Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-foreground">Campaign Progress</h3>
              <select className="px-3 py-2 border border-border rounded-lg text-sm bg-background">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>All time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${value}`, "Raised"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2f6b52"
                  strokeWidth={2}
                  dot={{ fill: "#2f6b52", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/donation-setup"
                className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="text-foreground mb-1">Share Donation Link</div>
                <div className="text-xs text-muted-foreground">
                  Get QR code or shareable URL
                </div>
              </Link>
              <Link
                to="/campaign/new"
                className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="text-foreground mb-1">Update Campaign</div>
                <div className="text-xs text-muted-foreground">
                  Edit details or messaging
                </div>
              </Link>
              <Link
                to="/campaign/matches"
                className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="text-foreground mb-1">View Support Team</div>
                <div className="text-xs text-muted-foreground">
                  See volunteers and partners
                </div>
              </Link>
              <button className="w-full p-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-left">
                <div className="text-foreground mb-1">Export Donors</div>
                <div className="text-xs text-muted-foreground">
                  Download donor list (CSV)
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "donation"
                        ? "bg-primary/10 text-primary"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {activity.type === "donation" ? (
                      <DollarSign className="w-5 h-5" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    {activity.type === "donation" ? (
                      <>
                        <div className="text-foreground">
                          <span className="font-medium">{activity.donor}</span> donated{" "}
                          <span className="font-medium">${activity.amount}</span>
                          {activity.recurring && (
                            <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                              Monthly
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-foreground">
                          <span className="font-medium">{activity.name}</span> {activity.action}
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            View All Activity
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-muted/30 border border-border rounded-lg p-6">
          <h3 className="text-lg text-foreground mb-3">Suggested Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div>
                <div className="text-foreground mb-1">Thank Your Donors</div>
                <p className="text-sm text-muted-foreground">
                  Send a personal thank you email to recent supporters
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div>
                <div className="text-foreground mb-1">Share Progress</div>
                <p className="text-sm text-muted-foreground">
                  Update your community on campaign progress
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent/60 text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div>
                <div className="text-foreground mb-1">Engage Volunteers</div>
                <p className="text-sm text-muted-foreground">
                  Check in with your volunteer team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
