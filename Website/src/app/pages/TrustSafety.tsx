import { Link } from "react-router";
import { Heart, ShieldCheck, UserCheck, FileText, Lock, AlertCircle, CheckCircle, Settings } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function TrustSafety() {
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
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Trust & Safety
          </h1>
          <p className="text-muted-foreground">
            Manage safety settings and requirements for your campaigns and volunteer partners.
          </p>
        </div>

        {/* Status Overview */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-foreground mb-2">Your Safety Settings Are Active</h3>
              <p className="text-sm text-muted-foreground mb-3">
                All volunteers and partners working with your organization meet your safety requirements.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Background checks enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Vulnerable population protections active</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-foreground">12 verified partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Background Check Requirements */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-6 h-6 text-primary" />
                <h3 className="text-xl text-foreground">Background Check Requirements</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        Require Background Checks for All Volunteers
                      </div>
                      <div className="text-sm text-muted-foreground">
                        All volunteers must have a verified criminal record check completed within the last 12 months.
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        Vulnerable Sector Checks Required
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Anyone working directly with vulnerable populations must have an enhanced vulnerable sector check.
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        Verify Professional References
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Require at least two professional references for all volunteer applicants.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Role Restrictions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-6 h-6 text-primary" />
                <h3 className="text-xl text-foreground">Role Restrictions</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-foreground mb-2">
                    Minimum Age for Volunteers
                  </label>
                  <select className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>No restriction</option>
                    <option>16 years</option>
                    <option selected>18 years</option>
                    <option>19 years (BC legal adult)</option>
                    <option>21 years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-foreground mb-2">
                    Supervision Requirements
                  </label>
                  <select className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>No supervision required</option>
                    <option selected>Direct supervision for new volunteers</option>
                    <option>Buddy system for all activities</option>
                    <option>Staff supervision at all times</option>
                  </select>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        Limit One-on-One Contact
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Volunteers should not be alone with beneficiaries. Activities should have multiple staff/volunteers present.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Vulnerable Populations */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl text-foreground">Vulnerable Population Settings</h3>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Your organization works with vulnerable populations. Additional safeguards are in place to ensure their safety and wellbeing.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground mb-2">
                    Population Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-border rounded"
                      />
                      <span className="text-foreground">Children (under 18)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-border rounded"
                      />
                      <span className="text-foreground">Seniors</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary border-border rounded"
                      />
                      <span className="text-foreground">People with disabilities</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary border-border rounded"
                      />
                      <span className="text-foreground">Other vulnerable groups</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Approved Messaging */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl text-foreground">Approved Messaging Templates</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Pre-approved messaging ensures consistent, appropriate communication with donors and community members.
              </p>

              <div className="space-y-3">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground">Donation Thank You</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      Approved
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Standard template for thanking donors after contributions
                  </p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground">Volunteer Welcome</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      Approved
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Welcome message for new volunteers with safety guidelines
                  </p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground">Campaign Update</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      Approved
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Template for sharing campaign progress with supporters
                  </p>
                </div>

                <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                  Add New Template
                </button>
              </div>
            </div>

            {/* Partner Vetting */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="text-xl text-foreground">Partner Vetting Status</h3>
                </div>
                <span className="text-sm text-primary">12 Verified Partners</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-foreground mb-1">Vancouver Community Volunteers</div>
                    <div className="text-sm text-muted-foreground">Volunteer Group</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>

                <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-foreground mb-1">UBC Social Impact Society</div>
                    <div className="text-sm text-muted-foreground">Student Group</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>

                <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-foreground mb-1">BC Community Outreach Partners</div>
                    <div className="text-sm text-muted-foreground">Professional Firm</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>

                <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                  View All Partners
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h4 className="text-foreground">Quick Settings</h4>
              </div>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
                <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Safety Resources */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Safety Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-primary hover:underline">
                  BC Criminal Record Check Guide
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Vulnerable Sector Screening
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Volunteer Management Best Practices
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Child Safety Guidelines
                </a>
              </div>
            </div>

            {/* Privacy & Consent */}
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Privacy & Consent</h4>
              <p className="text-sm text-muted-foreground mb-4">
                All safety settings comply with BC privacy laws and nonprofit best practices.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>PIPEDA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Consent Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Data Retention Policies</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our team can help you set up the right safety protocols for your organization.
              </p>
              <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
