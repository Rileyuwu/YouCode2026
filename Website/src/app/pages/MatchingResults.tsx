import { Link, useNavigate } from "react-router";
import { Heart, CheckCircle, Users, GraduationCap, Building2, Star, Globe, ShieldCheck, DollarSign, Sparkles } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function MatchingResults() {
  const navigate = useNavigate();

  const matches = [
    {
      id: 1,
      type: "volunteers",
      title: "Vancouver Community Volunteers",
      availability: "Available Now",
      languages: ["English", "Mandarin", "Punjabi"],
      backgroundCheck: true,
      fit: 95,
      cost: "Free",
      reason: "Strong match based on your location and cause area. This group has experience with food security campaigns.",
      volunteers: 12,
      icon: Users,
    },
    {
      id: 2,
      type: "students",
      title: "UBC Social Impact Society",
      availability: "Available in 2 weeks",
      languages: ["English", "French"],
      backgroundCheck: true,
      fit: 88,
      cost: "Free",
      reason: "Active student group with fundraising experience. They're looking for spring campaigns to support.",
      volunteers: 25,
      icon: GraduationCap,
    },
    {
      id: 3,
      type: "professional",
      title: "BC Community Outreach Partners",
      availability: "Available Now",
      languages: ["English", "Cantonese", "Spanish"],
      backgroundCheck: true,
      fit: 92,
      cost: "$2,500 - $5,000",
      reason: "Vetted firm with proven track record in nonprofit campaigns. Specializes in multi-channel outreach.",
      campaigns: 45,
      icon: Building2,
    },
    {
      id: 4,
      type: "hybrid",
      title: "Hybrid Support Package",
      availability: "Available Now",
      languages: ["English", "Mandarin", "Punjabi", "French"],
      backgroundCheck: true,
      fit: 90,
      cost: "$1,500 + Volunteers",
      reason: "Combines professional strategy with volunteer execution. Best value for your budget range.",
      description: "Professional campaign management + volunteer support team",
      icon: Sparkles,
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
              <Link to="/dashboard" className="text-foreground hover:text-primary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Campaign Created</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
            We found 4 great matches for you
          </h1>
          <p className="text-muted-foreground">
            Based on your campaign goals, location, and budget, here are the support options we recommend.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            All Matches
          </button>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            Volunteers
          </button>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            Student Groups
          </button>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            Professional Firms
          </button>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {matches.map((match) => {
            const Icon = match.icon;
            return (
              <div
                key={match.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-foreground mb-1">
                        {match.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded text-xs">
                          {match.type}
                        </span>
                        <span>•</span>
                        <span>{match.availability}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span className="text-sm">{match.fit}% fit</span>
                  </div>
                </div>

                {/* Why Recommended */}
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground">
                    <span className="text-primary">Why recommended: </span>
                    {match.reason}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Globe className="w-4 h-4" />
                      <span>Languages</span>
                    </div>
                    <div className="text-sm text-foreground">
                      {match.languages.join(", ")}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Cost</span>
                    </div>
                    <div className="text-sm text-foreground">
                      {match.cost}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  {match.backgroundCheck && (
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Background Checked</span>
                    </div>
                  )}
                  {match.volunteers && (
                    <span>{match.volunteers} volunteers available</span>
                  )}
                  {match.campaigns && (
                    <span>{match.campaigns}+ successful campaigns</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/donation-setup")}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Select This Option
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Steps Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl text-foreground mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-foreground mb-2">Choose Your Support</h4>
              <p className="text-sm text-muted-foreground">
                Select one or more support options that work best for your campaign.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-foreground mb-2">Set Up Donations</h4>
              <p className="text-sm text-muted-foreground">
                Create your donation portal and enable monthly giving.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-accent/20 text-accent-foreground rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-foreground mb-2">Launch Campaign</h4>
              <p className="text-sm text-muted-foreground">
                Go live and start tracking your campaign progress.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/donation-setup")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue to Donation Setup
            </button>
            <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
              Save and Come Back Later
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-muted/30 border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-foreground mb-1">Need help deciding?</h4>
              <p className="text-sm text-muted-foreground">
                Our team can help you choose the right support for your campaign.
              </p>
            </div>
            <button className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
              Talk to Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
