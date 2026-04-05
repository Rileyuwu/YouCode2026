import { Link } from "react-router";
import { Heart, Clock, Award, Calendar, CheckCircle, MapPin, ArrowRight } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function VolunteerDashboard() {
  const activeOpportunities = [
    {
      id: 1,
      title: "Spring Food Drive Outreach",
      organization: "Vancouver Community Food Bank",
      nextShift: "Tomorrow, 2:00 PM",
      location: "Downtown Vancouver",
      hoursCompleted: 12,
      totalHours: 32,
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      organization: "Island Youth Services",
      nextShift: "Friday, 4:30 PM",
      location: "Victoria Community Center",
      hoursCompleted: 8,
      totalHours: 24,
    },
  ];

  const upcomingShifts = [
    {
      id: 1,
      title: "Food Drive - Social Media Team",
      date: "Tomorrow",
      time: "2:00 PM - 5:00 PM",
      location: "Remote",
    },
    {
      id: 2,
      title: "Youth Mentorship Session",
      date: "Friday, Apr 11",
      time: "4:30 PM - 6:00 PM",
      location: "Victoria Community Center",
    },
    {
      id: 3,
      title: "Fundraising Gala Setup",
      date: "May 14",
      time: "9:00 AM - 12:00 PM",
      location: "Vancouver Convention Center",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "completed",
      text: "Completed 3 hours at Spring Food Drive",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "badge",
      text: "Earned 'Community Champion' badge",
      date: "1 week ago",
    },
    {
      id: 3,
      type: "applied",
      text: "Applied to Fundraising Gala Support",
      date: "1 week ago",
    },
    {
      id: 4,
      type: "completed",
      text: "Completed 2 hours at Youth Mentorship",
      date: "2 weeks ago",
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
                to="/volunteer/opportunities"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Find Opportunities
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">
            You've made a real difference with 20 volunteer hours this month.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Hours</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">20</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Projects</span>
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">2</div>
            <div className="text-sm text-muted-foreground">Ongoing commitments</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Badges Earned</span>
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl text-foreground mb-1">5</div>
            <div className="text-sm text-muted-foreground">Achievements unlocked</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Impact Score</span>
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">92</div>
            <div className="text-sm text-primary">Top 10% of volunteers</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Opportunities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Your Active Opportunities</h3>
              <div className="space-y-4">
                {activeOpportunities.map((opp) => (
                  <div key={opp.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-foreground mb-1">{opp.title}</h4>
                        <p className="text-sm text-muted-foreground">{opp.organization}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Next: {opp.nextShift}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{opp.location}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">
                          {opp.hoursCompleted}/{opp.totalHours} hours
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(opp.hoursCompleted / opp.totalHours) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                        Log Hours
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 border border-border rounded-lg"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "completed"
                          ? "bg-primary/10 text-primary"
                          : activity.type === "badge"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {activity.type === "completed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : activity.type === "badge" ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{activity.text}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Shifts */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Upcoming Shifts</h4>
              <div className="space-y-3">
                {upcomingShifts.map((shift) => (
                  <div key={shift.id} className="p-3 border border-border rounded-lg">
                    <p className="text-foreground mb-1">{shift.title}</p>
                    <div className="text-sm text-muted-foreground mb-1">
                      {shift.date} • {shift.time}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{shift.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                View Calendar
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Recent Badges</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground">Community Champion</p>
                    <p className="text-sm text-muted-foreground">20+ hours this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground">Food Security Hero</p>
                    <p className="text-sm text-muted-foreground">Food drive volunteer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground">Youth Supporter</p>
                    <p className="text-sm text-muted-foreground">Youth mentorship</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                View All Badges
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link
                  to="/volunteer/opportunities"
                  className="block text-sm text-primary hover:underline"
                >
                  Browse New Opportunities
                </Link>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Update Availability
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Download Hours Report
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Invite a Friend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
