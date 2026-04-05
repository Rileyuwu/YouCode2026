import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle, Users, GraduationCap, Building2, Globe, ShieldCheck,
  DollarSign, ChevronDown, Mail, Award, Plus, X, Search, SlidersHorizontal, MapPin, Clock
} from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Partner {
  id: number;
  type: "volunteers" | "students" | "professional" | "community";
  title: string;
  location: string;
  availability: "Available Now" | "Available in 1 week" | "Available in 2 weeks" | "Available in 3+ weeks";
  availabilityDays: number; // for sorting
  languages: string[];
  backgroundCheck: boolean;
  cost: "Free" | string;
  costValue: number; // 0 = free, otherwise min cost for sorting
  reason: string;
  teamSize: number;
  yearsActive: number;
  people: { initials: string; name: string; role: string; detail: string }[];
  highlights: string[];
  contact: { label: string; value: string };
  icon: React.ElementType;
}

const ALL_PARTNERS: Partner[] = [
  {
    id: 1,
    type: "volunteers",
    title: "Vancouver Community Volunteers",
    location: "East Vancouver",
    availability: "Available Now",
    availabilityDays: 0,
    languages: ["English", "Mandarin", "Punjabi"],
    backgroundCheck: true,
    cost: "Free",
    costValue: 0,
    reason: "Local group with direct experience in food security campaigns across East Vancouver and Burnaby.",
    teamSize: 12,
    yearsActive: 7,
    people: [
      { initials: "AK", name: "Aisha K.", role: "Team Lead", detail: "10 yrs food bank coordination" },
      { initials: "DM", name: "David M.", role: "Volunteer", detail: "Fluent Mandarin & English" },
      { initials: "PG", name: "Priya G.", role: "Volunteer", detail: "Logistics & event setup" },
      { initials: "JS", name: "James S.", role: "Volunteer", detail: "Marketing & social media" },
    ],
    highlights: ["Available weekends & evenings", "Own transport", "Food safety certified"],
    contact: { label: "Coordinator", value: "aisha.k@vcv.org" },
    icon: Users,
  },
  {
    id: 2,
    type: "students",
    title: "UBC Social Impact Society",
    location: "UBC / Point Grey",
    availability: "Available in 2 weeks",
    availabilityDays: 14,
    languages: ["English", "French", "Cantonese"],
    backgroundCheck: true,
    cost: "Free",
    costValue: 0,
    reason: "Active student organization with a track record of community fundraising and strong social media presence.",
    teamSize: 25,
    yearsActive: 4,
    people: [
      { initials: "LW", name: "Lena W.", role: "President", detail: "Led 3 fundraising campaigns" },
      { initials: "RB", name: "Ravi B.", role: "Events Lead", detail: "UBC Commerce student" },
      { initials: "SC", name: "Sofia C.", role: "Outreach", detail: "Bilingual English/French" },
    ],
    highlights: ["On-campus tabling available", "Social media reach 4,200+", "Grant writing experience"],
    contact: { label: "President", value: "lena.w@ubc.ca" },
    icon: GraduationCap,
  },
  {
    id: 3,
    type: "professional",
    title: "BC Community Outreach Partners",
    location: "Downtown Vancouver",
    availability: "Available Now",
    availabilityDays: 0,
    languages: ["English", "Cantonese", "Spanish"],
    backgroundCheck: true,
    cost: "$2,500–$5,000",
    costValue: 2500,
    reason: "Established firm specializing in multi-channel nonprofit campaigns. Dedicated account manager included.",
    teamSize: 8,
    yearsActive: 15,
    people: [
      { initials: "MH", name: "Marcus H.", role: "Campaign Director", detail: "15 yrs nonprofit sector" },
      { initials: "YL", name: "Yuki L.", role: "Strategist", detail: "Digital & print campaigns" },
      { initials: "NP", name: "Nina P.", role: "Account Manager", detail: "Your dedicated point of contact" },
    ],
    highlights: ["Dedicated account manager", "Weekly progress reports", "45+ successful campaigns"],
    contact: { label: "Account Manager", value: "nina.p@bcco.ca" },
    icon: Building2,
  },
  {
    id: 4,
    type: "community",
    title: "Britannia Community Services",
    location: "Grandview-Woodland",
    availability: "Available Now",
    availabilityDays: 0,
    languages: ["English", "Punjabi", "Mandarin"],
    backgroundCheck: true,
    cost: "Free",
    costValue: 0,
    reason: "Long-running east Vancouver community hub with deep roots in food security and neighbourhood outreach.",
    teamSize: 18,
    yearsActive: 22,
    people: [
      { initials: "RT", name: "Rachel T.", role: "Program Lead", detail: "8 yrs community fundraising" },
      { initials: "OM", name: "Omar M.", role: "Outreach", detail: "Punjabi & English speaker" },
      { initials: "KN", name: "Karen N.", role: "Volunteer", detail: "Door-to-door canvassing" },
    ],
    highlights: ["Eastside & Surrey coverage", "Weekly volunteer meetups", "Strong ties to local temples & churches"],
    contact: { label: "Program Lead", value: "rachel.t@britannia.bc.ca" },
    icon: Users,
  },
  {
    id: 5,
    type: "students",
    title: "SFU Community Engaged Learning",
    location: "Burnaby / Surrey",
    availability: "Available in 1 week",
    availabilityDays: 7,
    languages: ["English", "Mandarin", "Korean"],
    backgroundCheck: true,
    cost: "Free",
    costValue: 0,
    reason: "SFU program connecting students with nonprofits for credit-based service learning. Large multilingual team.",
    teamSize: 30,
    yearsActive: 9,
    people: [
      { initials: "TK", name: "Tina K.", role: "Program Coordinator", detail: "Manages 50+ student placements" },
      { initials: "JP", name: "Jason P.", role: "Student Lead", detail: "Environmental studies focus" },
      { initials: "MW", name: "Maya W.", role: "Outreach", detail: "Fluent Mandarin & English" },
    ],
    highlights: ["Academic credit incentive", "Burnaby & Surrey reach", "Multilingual team"],
    contact: { label: "Coordinator", value: "t.kim@sfu.ca" },
    icon: GraduationCap,
  },
  {
    id: 6,
    type: "community",
    title: "MOSAIC Settlement Services",
    location: "Metro Vancouver",
    availability: "Available in 1 week",
    availabilityDays: 7,
    languages: ["English", "Tagalog", "Punjabi", "Arabic", "Spanish"],
    backgroundCheck: true,
    cost: "Free",
    costValue: 0,
    reason: "Established newcomer settlement organization with deep multilingual community ties across Metro Vancouver.",
    teamSize: 22,
    yearsActive: 28,
    people: [
      { initials: "FD", name: "Farah D.", role: "Partnerships Lead", detail: "Community liaison for 12 yrs" },
      { initials: "CL", name: "Carlos L.", role: "Outreach", detail: "Spanish & English outreach" },
      { initials: "BS", name: "Baljit S.", role: "Volunteer", detail: "Punjabi community connections" },
    ],
    highlights: ["Newcomer community access", "5 language capacity", "Metro-wide reach"],
    contact: { label: "Partnerships Lead", value: "farah.d@mosaicbc.com" },
    icon: Users,
  },
];

type SortKey = "availability" | "teamSize" | "cost" | "experience";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Availability", value: "availability" },
  { label: "Team Size", value: "teamSize" },
  { label: "Cost", value: "cost" },
  { label: "Experience", value: "experience" },
];

const TYPE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Volunteers", value: "volunteers" },
  { label: "Student Groups", value: "students" },
  { label: "Professional", value: "professional" },
  { label: "Community Orgs", value: "community" },
];

export function MatchingResults() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("availability");
  const [search, setSearch] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    let list = ALL_PARTNERS.filter((p) => {
      const matchesType = activeFilter === "all" || p.type === activeFilter;
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.languages.some((l) => l.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "availability") return a.availabilityDays - b.availabilityDays;
      if (sortBy === "teamSize") return b.teamSize - a.teamSize;
      if (sortBy === "cost") return a.costValue - b.costValue;
      if (sortBy === "experience") return b.yearsActive - a.yearsActive;
      return 0;
    });

    return list;
  }, [activeFilter, sortBy, search]);

  const selectedPartners = ALL_PARTNERS.filter((p) => selectedIds.includes(p.id));

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
            <Link to="/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Campaign Created</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">Find support partners</h1>
          <p className="text-muted-foreground">
            Browse and add organizations to support your campaign. Select as many as you'd like.
          </p>
        </div>

        {/* Selected bar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-foreground font-medium">
                  {selectedIds.length} partner{selectedIds.length > 1 ? "s" : ""} added:
                </span>
                {selectedPartners.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-card border border-primary/30 rounded-full text-foreground"
                  >
                    {p.title}
                    <button onClick={() => toggleSelect(p.id)} className="text-muted-foreground hover:text-foreground ml-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate("/donation-setup")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Continue with these →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search + Sort + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location, or language..."
              className="w-full pl-9 pr-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TYPE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeFilter === value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} organization{filtered.length !== 1 ? "s" : ""} found
          {sortBy !== "availability" && ` · sorted by ${SORT_OPTIONS.find(s => s.value === sortBy)?.label.toLowerCase()}`}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filtered.map((partner) => {
            const Icon = partner.icon;
            const isExpanded = expandedId === partner.id;
            const isSelected = selectedIds.includes(partner.id);

            return (
              <motion.div
                key={partner.id}
                layout
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`bg-card border rounded-lg overflow-hidden transition-colors ${
                  isSelected ? "border-primary" : "border-border hover:border-primary/40"
                }`}
              >
                <div className="p-6">
                  {/* Card header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base text-foreground leading-tight">{partner.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {partner.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className={partner.availabilityDays === 0 ? "text-primary" : ""}>
                            {partner.availability}
                          </span>
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      partner.type === "professional"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {partner.type === "students" ? "students" : partner.type === "professional" ? "professional" : partner.type}
                    </span>
                  </div>

                  {/* Why recommended */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{partner.reason}</p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="text-base text-foreground">{partner.teamSize}</div>
                      <div className="text-xs text-muted-foreground">team members</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="text-base text-foreground">{partner.yearsActive} yrs</div>
                      <div className="text-xs text-muted-foreground">experience</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className={`text-base ${partner.costValue === 0 ? "text-primary" : "text-foreground"}`}>
                        {partner.cost}
                      </div>
                      <div className="text-xs text-muted-foreground">cost</div>
                    </div>
                  </div>

                  {/* Languages + background check */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Globe className="w-3.5 h-3.5" />
                      <span className="text-xs">{partner.languages.join(", ")}</span>
                    </div>
                    {partner.backgroundCheck && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        Background checked
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSelect(partner.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                        isSelected
                          ? "bg-primary/10 border border-primary text-primary hover:bg-primary/20"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add to Campaign
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : partner.id)}
                      className="flex items-center gap-1 px-3 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      Details
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border bg-muted/20 px-6 py-5 space-y-5">
                        {/* Team */}
                        <div>
                          <h4 className="text-sm text-foreground mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            Who you'll work with
                          </h4>
                          <div className="space-y-2">
                            {partner.people.map((p, i) => (
                              <motion.div
                                key={p.initials}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {p.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-foreground">{p.name}</div>
                                  <div className="text-xs text-muted-foreground">{p.detail}</div>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full flex-shrink-0">
                                  {p.role}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="text-sm text-foreground mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Highlights
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {partner.highlights.map((h) => (
                              <span
                                key={h}
                                className="text-xs px-3 py-1.5 bg-card border border-border rounded-full text-foreground"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                          <div>
                            <div className="text-xs text-muted-foreground mb-0.5">{partner.contact.label}</div>
                            <div className="text-sm text-foreground">{partner.contact.value}</div>
                          </div>
                          <a
                            href={`mailto:${partner.contact.value}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg hover:opacity-90 transition-opacity"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Contact
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground mb-1">
                {selectedIds.length > 0
                  ? `${selectedIds.length} partner${selectedIds.length > 1 ? "s" : ""} selected — ready to continue`
                  : "Add at least one partner to continue"}
              </h3>
              <p className="text-sm text-muted-foreground">
                You can always add or change partners later from your dashboard.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/donation-setup")}
                disabled={selectedIds.length === 0}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Donation Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
