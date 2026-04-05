import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { DollarSign, Users, Clock, TrendingUp, Calendar, ArrowUpRight, Settings, ShieldCheck, Eye, Bell, Menu, X, Search, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCampaign } from "../context/AppContext";

const mockDonors = [
  { name: "Sarah Mitchell", amount: 100, type: "Monthly", date: "Apr 3, 2026", status: "Active" },
  { name: "James Okafor", amount: 250, type: "One-time", date: "Apr 2, 2026", status: "Completed" },
  { name: "Priya Sharma", amount: 50, type: "Monthly", date: "Apr 1, 2026", status: "Active" },
  { name: "Daniel Kim", amount: 500, type: "One-time", date: "Mar 30, 2026", status: "Completed" },
  { name: "Anonymous", amount: 25, type: "One-time", date: "Mar 29, 2026", status: "Completed" },
  { name: "Rachel Nguyen", amount: 75, type: "Monthly", date: "Mar 28, 2026", status: "Active" },
  { name: "Marcus Johnson", amount: 200, type: "One-time", date: "Mar 27, 2026", status: "Completed" },
  { name: "Linda Torres", amount: 100, type: "Monthly", date: "Mar 25, 2026", status: "Active" },
  { name: "Ahmed Hassan", amount: 150, type: "One-time", date: "Mar 23, 2026", status: "Completed" },
  { name: "Emily Chen", amount: 50, type: "Monthly", date: "Mar 21, 2026", status: "Active" },
  { name: "Tom Beaumont", amount: 300, type: "One-time", date: "Mar 19, 2026", status: "Completed" },
  { name: "Fatima Al-Rashid", amount: 75, type: "Monthly", date: "Mar 15, 2026", status: "Active" },
];

interface LiveDonation {
  id: string;
  amount: number;
  monthly: boolean;
  timestamp: string;
}

const BASE_RAISED = 6500;
const BASE_MONTHLY = 6;
const BASE_SUPPORTERS = 75;


export function Dashboard() {
  const { campaign } = useCampaign();
  const [showPagePreview, setShowPagePreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [donorSearch, setDonorSearch] = useState("");
  const [liveDonations, setLiveDonations] = useState<LiveDonation[]>([]);
  const [toast, setToast] = useState<{ amount: number; monthly: boolean } | null>(null);
  const prevCountRef = useRef(0);
  const [settingsData, setSettingsData] = useState({
    orgName: campaign.orgName || "",
    contactEmail: "",
    slug: campaign.slug || "",
    timezone: "PT",
  });

  const donationUrl = `${window.location.origin}/donate/${campaign.slug || "your-campaign"}`;

  // Poll live donations
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch("/api/donations");
        const data: LiveDonation[] = await res.json();
        setLiveDonations((prev) => {
          if (data.length > prevCountRef.current) {
            const newest = data[data.length - 1];
            setToast({ amount: newest.amount, monthly: newest.monthly });
            setTimeout(() => setToast(null), 3500);
          }
          prevCountRef.current = data.length;
          return data;
        });
      } catch {}
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  const liveTotal = liveDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalRaised = BASE_RAISED + liveTotal;
  const goalNum = parseFloat((campaign.goal || "10000").replace(/[^0-9.]/g, "")) || 10000;
  const pct = Math.min(Math.round((totalRaised / goalNum) * 100), 100);
  const monthlyCount = BASE_MONTHLY + liveDonations.filter((d) => d.monthly).length;
  const totalSupporters = BASE_SUPPORTERS + liveDonations.length;

  const campaignData = [
    { date: "Mar 1", amount: 450 },
    { date: "Mar 8", amount: 1200 },
    { date: "Mar 15", amount: 2100 },
    { date: "Mar 22", amount: 3800 },
    { date: "Mar 29", amount: 5200 },
    { date: "Apr 5", amount: totalRaised },
  ];

  const allDonors = [
    ...[...liveDonations].reverse().map((d) => ({
      name: "Anonymous",
      amount: d.amount,
      type: d.monthly ? "Monthly" : "One-time",
      date: new Date(d.timestamp).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }),
      status: d.monthly ? "Active" : "Completed",
      isLive: true,
    })),
    ...mockDonors.map((d) => ({ ...d, isLive: false })),
  ];

  const filteredDonors = allDonors.filter((d) =>
    d.name.toLowerCase().includes(donorSearch.toLowerCase())
  );

  const handleExportCSV = () => {
    const header = "Name,Amount,Type,Date,Status\n";
    const rows = allDonors
      .map((d) => `"${d.name}",${d.amount},"${d.type}","${d.date}","${d.status}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donors.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const accentColor = campaign.accentColor || "#2f6b52";

  // Empty state
  if (!campaign.launched && !campaign.title) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <ImageWithFallback src={logo} alt="Connext" className="w-14 h-14" />
                <span className="text-xl text-foreground">Connext</span>
              </Link>
              <Link to="/campaign/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                New Campaign
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl text-foreground mb-2">No active campaign yet</h2>
          <p className="text-muted-foreground mb-6">Create your first campaign to start raising funds and connecting with supporters.</p>
          <Link to="/campaign/new" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Create a Campaign
          </Link>
        </div>
      </div>
    );
  }

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
              <Link to="/trust-safety" className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary">
                <ShieldCheck className="w-5 h-5" />
                <span>Trust & Safety</span>
              </Link>
              <Link to="/campaign/new" className="hidden sm:block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                New Campaign
              </Link>
              {/* Mobile hamburger */}
              <button
                className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border-b border-border p-4 space-y-2"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-foreground font-medium">Menu</span>
                <button onClick={() => setMobileNavOpen(false)} className="p-1.5 hover:bg-muted rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {[
                { to: "/dashboard", label: "Dashboard" },
                { to: "/donation-setup", label: "Donation Setup" },
                { to: "/alerts", label: "Alert Channels" },
                { to: "/trust-safety", label: "Trust & Safety" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block px-4 py-3 rounded-lg hover:bg-muted text-foreground transition-colors"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
                {campaign.title || "Spring Food Drive 2026"}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {campaign.startDate && campaign.endDate
                    ? `${campaign.startDate} – ${campaign.endDate}`
                    : "Mar 1 - Apr 30, 2026"}
                </span>
                <span>•</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Active</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPagePreview(true)}
                className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
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
            <motion.div
              key={totalRaised}
              initial={{ scale: 1.05, color: "#2f6b52" }}
              animate={{ scale: 1, color: "var(--foreground)" }}
              transition={{ duration: 0.4 }}
              className="text-3xl mb-1"
            >
              ${totalRaised.toLocaleString()}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              <span className="text-primary">{pct}%</span> of {campaign.goal ? "$" + Number(campaign.goal).toLocaleString() : "$10,000"} goal
            </div>
            <div className="mt-3 w-full bg-muted rounded-full h-2 relative">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: pct >= 100 ? "#ffe65e" : "var(--primary)" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Monthly Donors</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <motion.div key={monthlyCount} initial={{ scale: 1.08 }} animate={{ scale: 1 }} className="text-3xl text-foreground mb-1">
              {monthlyCount}
            </motion.div>
            <div className="flex items-center gap-1 text-sm text-primary">
              <ArrowUpRight className="w-4 h-4" />
              <span>recurring supporters</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Volunteer Hours</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl text-foreground mb-1">142</div>
            <div className="text-sm text-muted-foreground">From 12 volunteers</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Supporters</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <motion.div key={totalSupporters} initial={{ scale: 1.08 }} animate={{ scale: 1 }} className="text-3xl text-foreground mb-1">
              {totalSupporters}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              {liveDonations.length > 0 && <span className="text-primary">+{liveDonations.length} live · </span>}
              {BASE_SUPPORTERS} existing
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
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  formatter={(value) => [`$${value}`, "Raised"]}
                />
                <Line type="monotone" dataKey="amount" stroke="#2f6b52" strokeWidth={2} dot={{ fill: "#2f6b52", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/donation-setup" className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-foreground mb-1">Share Donation Link</div>
                <div className="text-xs text-muted-foreground">Get QR code or shareable URL</div>
              </Link>
              <Link to="/campaign/new" className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-foreground mb-1">Update Campaign</div>
                <div className="text-xs text-muted-foreground">Edit details or messaging</div>
              </Link>
              <Link to="/campaign/matches" className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-foreground mb-1">View Support Team</div>
                <div className="text-xs text-muted-foreground">See volunteers and partners</div>
              </Link>
              <button onClick={handleExportCSV} className="w-full p-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-left">
                <div className="text-foreground mb-1">Export Donors</div>
                <div className="text-xs text-muted-foreground">Download donor list (CSV)</div>
              </button>
              <Link to="/alerts" className="flex items-center gap-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <Bell className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-foreground mb-0.5">Alert Channels</div>
                  <div className="text-xs text-muted-foreground">Set up donation & milestone alerts</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Donations Feed */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl text-foreground">Live Donations</h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              LIVE
            </span>
          </div>

          <AnimatePresence initial={false}>
            {liveDonations.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground py-4 text-center"
              >
                Waiting for donations — share your QR code to get started
              </motion.p>
            ) : (
              <div className="space-y-2">
                {[...liveDonations].reverse().map((d) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: -12, backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    animate={{ opacity: 1, y: 0, backgroundColor: "transparent" }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between px-4 py-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-foreground text-sm">Anonymous donated </span>
                        <span className="text-primary font-medium">${d.amount}</span>
                        {d.monthly && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">Monthly</span>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {new Date(d.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* All Donors Table */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-xl text-foreground">All Donors</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={donorSearch}
                  onChange={(e) => setDonorSearch(e.target.value)}
                  placeholder="Search donors..."
                  className="pl-9 pr-4 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-3 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor, i) => (
                  <tr key={i} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${donor.isLive ? "bg-primary/5" : ""}`}>
                    <td className="py-3 px-2 text-foreground flex items-center gap-2">
                      {donor.name}
                      {donor.isLive && <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded">NEW</span>}
                    </td>
                    <td className="py-3 px-2 text-foreground">${donor.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${donor.type === "Monthly" ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}>
                        {donor.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{donor.date}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${donor.status === "Active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {donor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredDonors.length === 0 && (
              <p className="text-center py-6 text-muted-foreground">No donors match your search.</p>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-muted/30 border border-border rounded-lg p-6">
          <h3 className="text-lg text-foreground mb-3">Suggested Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">1</div>
              <div>
                <div className="text-foreground mb-1">Thank Your Donors</div>
                <p className="text-sm text-muted-foreground">Send a personal thank you email to recent supporters</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">2</div>
              <div>
                <div className="text-foreground mb-1">Share Progress</div>
                <p className="text-sm text-muted-foreground">Update your community on campaign progress</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent/60 text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm">3</div>
              <div>
                <div className="text-foreground mb-1">Engage Volunteers</div>
                <p className="text-sm text-muted-foreground">Check in with your volunteer team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New donation toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-card border border-primary/40 rounded-xl shadow-xl"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground">New donation received!</div>
              <div className="text-base text-primary font-medium">
                ${toast.amount}{toast.monthly ? "/month" : ""}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Page Modal */}
      <AnimatePresence>
        {showPagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPagePreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2 bg-background rounded px-3 py-1 text-xs text-muted-foreground font-mono truncate">
                  {donationUrl}
                </div>
                <button onClick={() => setShowPagePreview(false)} className="p-1 hover:bg-muted rounded">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Page content mockup */}
              <div className="overflow-y-auto max-h-96">
                {/* Hero */}
                <div className="relative h-28 overflow-hidden">
                  {campaign.heroImage ? (
                    <img src={campaign.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: `${accentColor}22` }} />
                  )}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accentColor}cc, transparent)` }} />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {campaign.logoImage && (
                      <img src={campaign.logoImage} alt="Logo" className="w-8 h-8 rounded object-contain bg-white p-0.5" />
                    )}
                    <span className="text-white text-sm font-medium">{campaign.title || "Your Campaign"}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-[#fdfcf8] text-[#1f2937]">
                  {campaign.description && (
                    <p className="text-xs text-[#4b5563] leading-relaxed line-clamp-3">{campaign.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-1.5">
                    {(campaign.suggestedAmounts.length > 0 ? campaign.suggestedAmounts : ["25", "50", "100", "250"]).map((amt) => (
                      <div key={amt} className="px-2 py-1.5 border border-[#e5e7eb] rounded text-center text-xs cursor-pointer">
                        ${amt}
                      </div>
                    ))}
                  </div>
                  {campaign.enableMonthly && (
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input type="checkbox" className="w-3 h-3 rounded" style={{ accentColor }} readOnly />
                      Make this a monthly donation
                    </label>
                  )}
                  <button
                    className="w-full py-2 text-white text-xs font-medium rounded-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg text-foreground">Campaign Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="block text-sm text-foreground mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={settingsData.orgName}
                    onChange={(e) => setSettingsData({ ...settingsData, orgName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settingsData.contactEmail}
                    onChange={(e) => setSettingsData({ ...settingsData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1">Campaign Slug</label>
                  <input
                    type="text"
                    value={settingsData.slug}
                    onChange={(e) => setSettingsData({ ...settingsData, slug: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">connext.bc.ca/donate/{settingsData.slug || "your-slug"}</p>
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1">Timezone</label>
                  <select
                    value={settingsData.timezone}
                    onChange={(e) => setSettingsData({ ...settingsData, timezone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="PT">Pacific Time (PT)</option>
                    <option value="MT">Mountain Time (MT)</option>
                    <option value="CT">Central Time (CT)</option>
                    <option value="ET">Eastern Time (ET)</option>
                  </select>
                </div>

                {/* Danger Zone */}
                <div className="border border-red-300 rounded-lg p-4">
                  <h4 className="text-sm text-red-600 font-medium mb-2">Danger Zone</h4>
                  <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                    End Campaign
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
