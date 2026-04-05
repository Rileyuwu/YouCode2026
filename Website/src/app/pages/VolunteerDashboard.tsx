import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Award, Calendar, CheckCircle, MapPin, ArrowRight, X, Check, Plus } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Opportunity = { id: number; title: string; organization: string; nextShift: string; location: string; hoursCompleted: number; totalHours: number; };
type Shift = { id: number; title: string; date: string; time: string; location: string; };

const ALL_BADGES = [
  { name: "Community Champion", desc: "20+ hours this month", color: "bg-accent/20", icon: "🏆" },
  { name: "Food Security Hero", desc: "Food drive volunteer", color: "bg-primary/10", icon: "🥗" },
  { name: "Youth Supporter", desc: "Youth mentorship volunteer", color: "bg-primary/10", icon: "🌱" },
  { name: "Early Adopter", desc: "Joined in the first month", color: "bg-muted", icon: "⭐" },
  { name: "First Shift", desc: "Completed your first shift", color: "bg-muted", icon: "✅" },
];

export function VolunteerDashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { id: 1, title: "Spring Food Drive Outreach", organization: "Vancouver Community Food Bank", nextShift: "Tomorrow, 2:00 PM", location: "Downtown Vancouver", hoursCompleted: 12, totalHours: 32 },
    { id: 2, title: "Youth Mentorship Program", organization: "Island Youth Services", nextShift: "Friday, 4:30 PM", location: "Victoria Community Center", hoursCompleted: 8, totalHours: 24 },
  ]);

  const upcomingShifts: Shift[] = [
    { id: 1, title: "Food Drive - Social Media Team", date: "Tomorrow", time: "2:00 PM - 5:00 PM", location: "Remote" },
    { id: 2, title: "Youth Mentorship Session", date: "Friday, Apr 11", time: "4:30 PM - 6:00 PM", location: "Victoria Community Center" },
    { id: 3, title: "Fundraising Gala Setup", date: "May 14", time: "9:00 AM - 12:00 PM", location: "Vancouver Convention Center" },
  ];

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "completed", text: "Completed 3 hours at Spring Food Drive", date: "2 days ago" },
    { id: 2, type: "badge", text: "Earned 'Community Champion' badge", date: "1 week ago" },
    { id: 3, type: "applied", text: "Applied to Fundraising Gala Support", date: "1 week ago" },
    { id: 4, type: "completed", text: "Completed 2 hours at Youth Mentorship", date: "2 weeks ago" },
  ]);

  const [totalHours, setTotalHours] = useState(20);

  // Modal state
  const [logTarget, setLogTarget] = useState<Opportunity | null>(null);
  const [detailTarget, setDetailTarget] = useState<Opportunity | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [logForm, setLogForm] = useState({ date: "", hours: "", notes: "" });
  const [logSaved, setLogSaved] = useState(false);

  const handleLogHours = () => {
    const hrs = parseFloat(logForm.hours);
    if (!hrs || !logTarget) return;
    setLogSaved(true);
    setOpportunities((prev) =>
      prev.map((o) => o.id === logTarget.id ? { ...o, hoursCompleted: Math.min(o.hoursCompleted + hrs, o.totalHours) } : o)
    );
    setTotalHours((t) => t + hrs);
    setRecentActivity((prev) => [
      { id: Date.now(), type: "completed", text: `Logged ${hrs} hour${hrs !== 1 ? "s" : ""} at ${logTarget.title}`, date: "Just now" },
      ...prev,
    ]);
    setTimeout(() => {
      setLogTarget(null);
      setLogSaved(false);
      setLogForm({ date: "", hours: "", notes: "" });
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
              <Link to="/volunteer/opportunities" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Find Opportunities
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">You've made a real difference with {totalHours} volunteer hours this month.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Hours", value: totalHours, sub: "This month", icon: Clock },
            { label: "Active Projects", value: opportunities.length, sub: "Ongoing commitments", icon: CheckCircle },
            { label: "Badges Earned", value: ALL_BADGES.length, sub: "Achievements unlocked", icon: Award },
            { label: "Impact Score", value: 92, sub: "Top 10% of volunteers", icon: Award, highlight: true },
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Opportunities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Your Active Opportunities</h3>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <motion.div key={opp.id} layout className="p-4 border border-border rounded-lg">
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
                        <span className="text-foreground">{opp.hoursCompleted}/{opp.totalHours} hours</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          animate={{ width: `${(opp.hoursCompleted / opp.totalHours) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setDetailTarget(opp)}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setLogTarget(opp)}
                        className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                      >
                        Log Hours
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-3 border border-border rounded-lg"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === "badge" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                      {activity.type === "completed" ? <CheckCircle className="w-5 h-5" /> : activity.type === "badge" ? <Award className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{activity.text}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </motion.div>
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
                    <div className="text-sm text-muted-foreground mb-1">{shift.date} · {shift.time}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{shift.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCalendar(true)}
                className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                View Calendar
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-4">Recent Badges</h4>
              <div className="space-y-3">
                {ALL_BADGES.slice(0, 3).map((badge) => (
                  <div key={badge.name} className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-xl`}>
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-foreground">{badge.name}</p>
                      <p className="text-sm text-muted-foreground">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowBadges(true)}
                className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                View All Badges
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link to="/volunteer/opportunities" className="block text-sm text-primary hover:underline">Browse New Opportunities</Link>
                <button onClick={() => setShowCalendar(true)} className="block text-sm text-primary hover:underline text-left w-full">Update Availability</button>
                <button onClick={() => setShowBadges(true)} className="block text-sm text-primary hover:underline text-left w-full">View All Badges</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Hours Modal */}
      <AnimatePresence>
        {logTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !logSaved && setLogTarget(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full">
              {logSaved ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl text-foreground mb-1">Hours Logged!</h3>
                  <p className="text-sm text-muted-foreground">Your progress has been updated.</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-xl text-foreground">Log Hours</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{logTarget.title}</p>
                    </div>
                    <button onClick={() => setLogTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-foreground mb-2">Date</label>
                      <input type="date" value={logForm.date} onChange={(e) => setLogForm({ ...logForm, date: e.target.value })} className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm text-foreground mb-2">Hours worked</label>
                      <input type="number" min="0.5" max="24" step="0.5" value={logForm.hours} onChange={(e) => setLogForm({ ...logForm, hours: e.target.value })} placeholder="e.g. 3" className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm text-foreground mb-2">Notes (optional)</label>
                      <textarea value={logForm.notes} onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })} placeholder="What did you work on?" rows={3} className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={handleLogHours} disabled={!logForm.hours} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">Save Hours</button>
                    <button onClick={() => setLogTarget(null)} className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">Cancel</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {detailTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDetailTarget(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl text-foreground">{detailTarget.title}</h3>
                  <p className="text-sm text-muted-foreground">{detailTarget.organization}</p>
                </div>
                <button onClick={() => setDetailTarget(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Next shift</p>
                    <p className="text-sm text-foreground">{detailTarget.nextShift}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm text-foreground">{detailTarget.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Hours progress</p>
                    <p className="text-sm text-foreground">{detailTarget.hoursCompleted} of {detailTarget.totalHours} hours completed</p>
                  </div>
                </div>
              </div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="text-foreground">{Math.round((detailTarget.hoursCompleted / detailTarget.totalHours) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-5">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${(detailTarget.hoursCompleted / detailTarget.totalHours) * 100}%` }} />
              </div>
              <button onClick={() => { setDetailTarget(null); setLogTarget(detailTarget); }} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Log Hours
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCalendar(false)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl text-foreground">Your Schedule</h3>
                <button onClick={() => setShowCalendar(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingShifts.map((shift) => (
                  <div key={shift.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground mb-0.5">{shift.title}</p>
                      <p className="text-sm text-muted-foreground">{shift.date} · {shift.time}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{shift.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/volunteer/opportunities" onClick={() => setShowCalendar(false)} className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                <Plus className="w-4 h-4" /> Add More Shifts
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Badges Modal */}
      <AnimatePresence>
        {showBadges && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBadges(false)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl text-foreground">All Badges</h3>
                <button onClick={() => setShowBadges(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                {ALL_BADGES.map((badge) => (
                  <div key={badge.name} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-foreground">{badge.name}</p>
                      <p className="text-sm text-muted-foreground">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
