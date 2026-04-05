import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type FirmStep = "company" | "services" | "experience" | "verification";

export function FirmSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FirmStep>("company");
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    email: "",
    phone: "",
    location: "",
    companySize: "",
    yearsInBusiness: "",
    services: [] as string[],
    specialties: [] as string[],
    languages: [] as string[],
    pastCampaigns: "",
    successStories: "",
    references: "",
    backgroundChecks: false,
    insurance: false,
    certifications: "",
  });

  const steps: FirmStep[] = ["company", "services", "experience", "verification"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      navigate("/firm/opportunities");
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const toggleArrayValue = (
    field: "services" | "specialties" | "languages",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
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
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          {/* Company Info Step */}
          {currentStep === "company" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-muted-foreground">
                  We're excited to partner with professional firms that support BC nonprofits.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g., BC Community Outreach Partners"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">Business Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(604) 555-0123"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">Primary Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select location</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="victoria">Victoria</option>
                  <option value="surrey">Surrey</option>
                  <option value="burnaby">Burnaby</option>
                  <option value="kelowna">Kelowna</option>
                  <option value="bc-wide">BC-Wide Service</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51+">51+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-foreground mb-2">Years in Business</label>
                  <select
                    value={formData.yearsInBusiness}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsInBusiness: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select range</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11+">11+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Services Step */}
          {currentStep === "services" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  What services do you offer?
                </h2>
                <p className="text-muted-foreground">
                  Select all the services your firm provides to nonprofits.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-3">Services Offered</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Fundraising Campaigns",
                    "Social Media Marketing",
                    "Community Outreach",
                    "Event Planning",
                    "Donor Engagement",
                    "Grant Writing",
                    "PR & Communications",
                    "Strategic Planning",
                    "Digital Marketing",
                    "Brand Development",
                    "Volunteer Coordination",
                    "Campaign Management",
                  ].map((service) => (
                    <button
                      key={service}
                      onClick={() => toggleArrayValue("services", service)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        formData.services.includes(service)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-3">Cause Area Specialties</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Youth Services",
                    "Senior Support",
                    "Food Security",
                    "Housing",
                    "Health",
                    "Education",
                    "Environment",
                    "Arts & Culture",
                  ].map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => toggleArrayValue("specialties", specialty)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        formData.specialties.includes(specialty)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-3">Languages Supported</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["English", "French", "Mandarin", "Cantonese", "Punjabi", "Spanish"].map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleArrayValue("languages", lang)}
                        className={`p-3 border rounded-lg transition-all ${
                          formData.languages.includes(lang)
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {lang}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Experience Step */}
          {currentStep === "experience" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Share your experience
                </h2>
                <p className="text-muted-foreground">
                  Help nonprofits understand your track record and expertise.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Number of Nonprofit Campaigns Completed
                </label>
                <input
                  type="text"
                  value={formData.pastCampaigns}
                  onChange={(e) => setFormData({ ...formData, pastCampaigns: e.target.value })}
                  placeholder="e.g., 45+"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Success Stories (Optional)
                </label>
                <textarea
                  value={formData.successStories}
                  onChange={(e) => setFormData({ ...formData, successStories: e.target.value })}
                  placeholder="Share a brief example of a successful campaign you've run for a nonprofit..."
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  References (Optional)
                </label>
                <textarea
                  value={formData.references}
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  placeholder="List contact information for nonprofit references..."
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          )}

          {/* Verification Step */}
          {currentStep === "verification" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Verification & Compliance
                </h2>
                <p className="text-muted-foreground">
                  These requirements help nonprofits trust your services.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.backgroundChecks}
                      onChange={(e) =>
                        setFormData({ ...formData, backgroundChecks: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        All Staff Have Background Checks
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Required for working with vulnerable populations
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.insurance}
                      onChange={(e) =>
                        setFormData({ ...formData, insurance: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground mb-1">
                        Professional Liability Insurance
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Coverage for professional services provided
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Certifications or Accreditations (Optional)
                </label>
                <textarea
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="List any relevant certifications, memberships, or accreditations..."
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  All applications are reviewed by our team. We'll verify your information and contact you within 3-5 business days with next steps.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            {currentStepIndex > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              {currentStepIndex === steps.length - 1 ? "Submit Application" : "Continue"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
