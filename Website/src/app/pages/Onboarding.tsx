import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, ArrowLeft, ArrowRight, Check } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type OnboardingStep =
  | "organization"
  | "campaign"
  | "goal"
  | "support"
  | "location"
  | "safety";

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("organization");
  const [formData, setFormData] = useState({
    orgName: "",
    cause: "",
    campaignType: "",
    fundraisingGoal: "",
    timeline: "",
    location: "",
    supportType: [] as string[],
    budgetRange: "",
    languages: [] as string[],
    vulnerablePopulation: false,
    backgroundChecks: false,
  });

  const steps: OnboardingStep[] = [
    "organization",
    "campaign",
    "goal",
    "support",
    "location",
    "safety",
  ];

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      navigate("/campaign/new");
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const toggleArrayValue = (field: "supportType" | "languages", value: string) => {
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
            <div1
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          {/* Organization Step */}
          {currentStep === "organization" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-muted-foreground">
                  Help us understand who you are and what you do.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  placeholder="e.g., Vancouver Youth Services"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Primary Cause Area
                </label>
                <select
                  value={formData.cause}
                  onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a cause area</option>
                  <option value="youth">Youth Services</option>
                  <option value="seniors">Senior Support</option>
                  <option value="food">Food Security</option>
                  <option value="housing">Housing & Homelessness</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="environment">Environment</option>
                  <option value="arts">Arts & Culture</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Campaign Step */}
          {currentStep === "campaign" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  What type of campaign?
                </h2>
                <p className="text-muted-foreground">
                  Let us know what you're planning.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: "fundraising", label: "Fundraising Campaign", desc: "Raise money for your cause" },
                  { value: "volunteer", label: "Volunteer Recruitment", desc: "Find volunteers to help" },
                  { value: "awareness", label: "Awareness Campaign", desc: "Spread the word about your mission" },
                  { value: "hybrid", label: "Hybrid Campaign", desc: "Combination of fundraising and outreach" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, campaignType: option.value })}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      formData.campaignType === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-foreground">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </div>
                      {formData.campaignType === option.value && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Goal Step */}
          {currentStep === "goal" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Set your goals
                </h2>
                <p className="text-muted-foreground">
                  What are you hoping to achieve?
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Fundraising Goal (CAD)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.fundraisingGoal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData({ ...formData, fundraisingGoal: val });
                  }}
                  placeholder="e.g., 10000"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a timeline</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a budget range</option>
                  <option value="free">Free</option>
                  <option value="under1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k+">$25,000+</option>
                </select>
              </div>
            </div>
          )}

          {/* Support Step */}
          {currentStep === "support" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  What kind of support do you need?
                </h2>
                <p className="text-muted-foreground">
                  Select all that apply.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: "volunteers", label: "Volunteers", desc: "Community members who want to help" },
                  { value: "students", label: "Student Groups", desc: "University and college volunteers" },
                  { value: "firms", label: "Professional Outreach Firms", desc: "Vetted agencies with experience" },
                  { value: "hybrid", label: "Hybrid Support", desc: "Mix of volunteers and professionals" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayValue("supportType", option.value)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      formData.supportType.includes(option.value)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-foreground">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </div>
                      {formData.supportType.includes(option.value) && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location Step */}
          {currentStep === "location" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Where are you located?
                </h2>
                <p className="text-muted-foreground">
                  This helps us match you with local support.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  City or Region
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your location</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="victoria">Victoria</option>
                  <option value="surrey">Surrey</option>
                  <option value="burnaby">Burnaby</option>
                  <option value="richmond">Richmond</option>
                  <option value="kelowna">Kelowna</option>
                  <option value="kamloops">Kamloops</option>
                  <option value="nanaimo">Nanaimo</option>
                  <option value="other">Other BC Location</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Languages Needed (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
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

          {/* Safety Step */}
          {currentStep === "safety" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Trust and safety settings
                </h2>
                <p className="text-muted-foreground">
                  Help us ensure the right protections are in place.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.vulnerablePopulation}
                      onChange={(e) =>
                        setFormData({ ...formData, vulnerablePopulation: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground">
                        Working with vulnerable populations
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Children, seniors, or others who may need additional safeguards
                      </div>
                    </div>
                  </label>
                </div>

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
                      <div className="text-foreground">
                        Require background checks
                      </div>
                      <div className="text-sm text-muted-foreground">
                        All volunteers and partners must have verified background checks
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  We take safety seriously. All partners are vetted, and you can set additional requirements at any time. Your settings can be updated later in the Trust & Safety section.
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
              {currentStepIndex === steps.length - 1 ? "Complete Setup" : "Continue"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
