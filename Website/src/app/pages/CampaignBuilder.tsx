import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, Home, Calendar, Users, Target, Eye, Globe, Code2 } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CampaignBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fundraisingTarget: "",
    supportType: "volunteers",
    targetAudience: "",
    outreachType: "",
    startDate: "",
    endDate: "",
    enableMonthly: true,
    campaignMessage: "",
    campaignWebsite: "",
    embedPayment: false,
    embedTheme: {
      primaryColor: "#6366f1",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      buttonText: "Donate Now",
      borderRadius: "8",
      fontFamily: "inherit",
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = () => {
    navigate("/campaign/matches");
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
              <Link to="/dashboard" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
            Create Your Campaign
          </h1>
          <p className="text-muted-foreground">
            Set up your campaign details and we'll help you find the right support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground mb-2">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Spring Food Drive 2026"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">
                    Campaign Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell people what this campaign is about and why it matters..."
                    rows={4}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep it clear and heartfelt. This will appear on your donation page.
                  </p>
                </div>
              </div>
            </div>

            {/* Goals & Timeline */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Goals & Timeline
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground mb-2">
                    Fundraising Target (CAD)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Free", "$500", "$1,000", "$5,000", "$10,000"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setFormData({ ...formData, fundraisingTarget: preset })}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          formData.fundraisingTarget === preset
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.fundraisingTarget}
                    onChange={(e) => setFormData({ ...formData, fundraisingTarget: e.target.value })}
                    placeholder="Or enter a custom amount"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Support & Outreach */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Support & Outreach
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground mb-2">
                    Preferred Support Type
                  </label>
                  <select
                    value={formData.supportType}
                    onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="volunteers">Volunteers Only</option>
                    <option value="students">Student Groups</option>
                    <option value="professional">Professional Outreach Firm</option>
                    <option value="hybrid">Hybrid Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-foreground mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g., Local community members, age 25-55"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">
                    Outreach Type
                  </label>
                  <select
                    value={formData.outreachType}
                    onChange={(e) => setFormData({ ...formData, outreachType: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select outreach approach</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Campaign</option>
                    <option value="door">Door-to-Door</option>
                    <option value="events">Community Events</option>
                    <option value="multi">Multi-Channel</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Website & Embed */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Website & Payment Embed
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground mb-2">
                    Campaign Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.campaignWebsite}
                      onChange={(e) => setFormData({ ...formData, campaignWebsite: e.target.value })}
                      placeholder="https://yourorganization.org/campaign"
                      className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Link to your existing campaign or organization page.
                  </p>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <label className="flex items-start gap-3 cursor-pointer p-4">
                    <input
                      type="checkbox"
                      checked={formData.embedPayment}
                      onChange={(e) => setFormData({ ...formData, embedPayment: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Embed Payment on Your Website
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        Get a donation widget you can drop into any webpage — no redirect needed.
                      </div>
                    </div>
                  </label>

                  {formData.embedPayment && (
                    <div className="border-t border-border bg-muted/30 p-4 space-y-5">
                      {/* Color pickers */}
                      <div>
                        <p className="text-sm text-foreground mb-3">Widget Theme</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { key: "primaryColor", label: "Button Color" },
                            { key: "backgroundColor", label: "Background" },
                            { key: "textColor", label: "Text Color" },
                          ].map(({ key, label }) => (
                            <div key={key} className="flex items-center gap-3">
                              <div className="relative">
                                <input
                                  type="color"
                                  value={formData.embedTheme[key as keyof typeof formData.embedTheme]}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      embedTheme: { ...formData.embedTheme, [key]: e.target.value },
                                    })
                                  }
                                  className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent p-0.5"
                                />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">{label}</div>
                                <div className="text-xs font-mono text-foreground">
                                  {formData.embedTheme[key as keyof typeof formData.embedTheme]}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Style options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-foreground mb-1">Button Text</label>
                          <input
                            type="text"
                            value={formData.embedTheme.buttonText}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                embedTheme: { ...formData.embedTheme, buttonText: e.target.value },
                              })
                            }
                            placeholder="Donate Now"
                            className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-foreground mb-1">Corner Radius</label>
                          <select
                            value={formData.embedTheme.borderRadius}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                embedTheme: { ...formData.embedTheme, borderRadius: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="0">Sharp (0px)</option>
                            <option value="4">Subtle (4px)</option>
                            <option value="8">Rounded (8px)</option>
                            <option value="12">More Rounded (12px)</option>
                            <option value="9999">Pill</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm text-foreground mb-1">Font</label>
                          <select
                            value={formData.embedTheme.fontFamily}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                embedTheme: { ...formData.embedTheme, fontFamily: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="inherit">Match your website</option>
                            <option value="Inter, sans-serif">Inter</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Courier New', monospace">Courier New</option>
                            <option value="system-ui, sans-serif">System UI</option>
                          </select>
                        </div>
                      </div>

                      {/* Live preview */}
                      <div>
                        <p className="text-sm text-foreground mb-2">Preview</p>
                        <div
                          className="rounded-lg p-5 border border-border"
                          style={{
                            backgroundColor: formData.embedTheme.backgroundColor,
                            fontFamily: formData.embedTheme.fontFamily,
                            color: formData.embedTheme.textColor,
                          }}
                        >
                          <p className="text-sm font-medium mb-1">
                            {formData.title || "Your Campaign"}
                          </p>
                          <p className="text-xs mb-3 opacity-70">
                            {formData.description
                              ? formData.description.slice(0, 80) + (formData.description.length > 80 ? "…" : "")
                              : "Support our cause today."}
                          </p>
                          <div className="flex gap-2 mb-3">
                            {["$10", "$25", "$50", "$100"].map((amt) => (
                              <span
                                key={amt}
                                className="text-xs px-2 py-1 border"
                                style={{
                                  borderColor: formData.embedTheme.primaryColor,
                                  color: formData.embedTheme.primaryColor,
                                  borderRadius: `${formData.embedTheme.borderRadius}px`,
                                }}
                              >
                                {amt}
                              </span>
                            ))}
                          </div>
                          <button
                            className="text-sm px-4 py-2 text-white"
                            style={{
                              backgroundColor: formData.embedTheme.primaryColor,
                              borderRadius: `${formData.embedTheme.borderRadius}px`,
                            }}
                          >
                            {formData.embedTheme.buttonText || "Donate Now"}
                          </button>
                        </div>
                      </div>

                      {/* Embed snippet */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Embed snippet (copy after launch):</p>
                        <code className="block text-xs text-primary font-mono bg-background border border-border rounded p-2 select-all break-all">
                          {`<iframe src="https://connext.ca/donate/${formData.title ? formData.title.toLowerCase().replace(/\s+/g, "-") : "your-campaign"}?primary=${encodeURIComponent(formData.embedTheme.primaryColor)}&bg=${encodeURIComponent(formData.embedTheme.backgroundColor)}&text=${encodeURIComponent(formData.embedTheme.textColor)}&radius=${formData.embedTheme.borderRadius}&btn=${encodeURIComponent(formData.embedTheme.buttonText)}" width="100%" height="420" frameborder="0" style="border:none;border-radius:${formData.embedTheme.borderRadius}px"></iframe>`}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Donation Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl text-foreground mb-4">Donation Settings</h3>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.enableMonthly}
                      onChange={(e) =>
                        setFormData({ ...formData, enableMonthly: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground">
                        Enable Monthly Giving
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Allow donors to set up recurring monthly donations
                      </div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-foreground mb-2">
                    Custom Campaign Message
                  </label>
                  <textarea
                    value={formData.campaignMessage}
                    onChange={(e) => setFormData({ ...formData, campaignMessage: e.target.value })}
                    placeholder="A personal message that will appear on your donation page..."
                    rows={3}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? "Hide Preview" : "Preview Campaign"}
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Find Support Options
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Campaign Tips</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Keep your title clear and compelling</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Be specific about your fundraising goal</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Monthly giving increases long-term support</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Share your story authentically</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-foreground mb-3">Need Help?</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-primary hover:underline">
                  Campaign Best Practices
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Donation Setup Guide
                </a>
                <a href="#" className="block text-sm text-primary hover:underline">
                  Contact Support
                </a>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Next Steps</span>
              </div>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>1.</span>
                  <span>Review support matches</span>
                </li>
                <li className="flex gap-2">
                  <span>2.</span>
                  <span>Set up donation portal</span>
                </li>
                <li className="flex gap-2">
                  <span>3.</span>
                  <span>Launch your campaign</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl text-foreground mb-4">Campaign Preview</h3>
            <div className="border border-border rounded-lg p-6 bg-background">
              <h2 className="text-2xl text-foreground mb-3">
                {formData.title || "Your Campaign Title"}
              </h2>
              <p className="text-muted-foreground mb-4">
                {formData.description || "Your campaign description will appear here..."}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Goal</div>
                  <div className="text-foreground">
                    {formData.fundraisingTarget || "$0"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Timeline</div>
                  <div className="text-foreground">
                    {formData.startDate && formData.endDate
                      ? `${formData.startDate} to ${formData.endDate}`
                      : "Not set"}
                  </div>
                </div>
              </div>
              {formData.campaignWebsite && (
                <div className="mb-3 flex items-center gap-2 text-sm text-primary">
                  <Globe className="w-4 h-4" />
                  <a href={formData.campaignWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                    {formData.campaignWebsite}
                  </a>
                </div>
              )}
              {formData.campaignMessage && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground">{formData.campaignMessage}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
