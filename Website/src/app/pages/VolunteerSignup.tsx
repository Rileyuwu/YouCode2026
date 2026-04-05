import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, ArrowLeft, ArrowRight, Check } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type VolunteerStep = "personal" | "skills" | "availability" | "preferences";

export function VolunteerSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<VolunteerStep>("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    languages: [] as string[],
    skills: [] as string[],
    interests: [] as string[],
    availability: [] as string[],
    hoursPerMonth: "",
    backgroundCheck: false,
    transportation: false,
  });

  const steps: VolunteerStep[] = ["personal", "skills", "availability", "preferences"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      navigate("/volunteer/opportunities");
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const toggleArrayValue = (
    field: "languages" | "skills" | "interests" | "availability",
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
          {/* Personal Info Step */}
          {currentStep === "personal" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Welcome! Let's get started
                </h2>
                <p className="text-muted-foreground">
                  Tell us a bit about yourself so we can match you with the right opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Sarah"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Chen"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(604) 555-0123"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your city</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="victoria">Victoria</option>
                  <option value="surrey">Surrey</option>
                  <option value="burnaby">Burnaby</option>
                  <option value="richmond">Richmond</option>
                  <option value="kelowna">Kelowna</option>
                  <option value="other">Other BC Location</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground mb-2">Languages You Speak (Select all that apply)</label>
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

          {/* Skills Step */}
          {currentStep === "skills" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  What skills can you offer?
                </h2>
                <p className="text-muted-foreground">
                  Select all that apply. Don't worry if you're just starting out!
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-3">Your Skills</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Fundraising",
                    "Marketing",
                    "Social Media",
                    "Event Planning",
                    "Writing",
                    "Design",
                    "Photography",
                    "Teaching",
                    "Administrative",
                    "Outreach",
                    "Public Speaking",
                    "Data Entry",
                  ].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleArrayValue("skills", skill)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        formData.skills.includes(skill)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-3">Cause Areas You Care About</label>
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
                  ].map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleArrayValue("interests", interest)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        formData.interests.includes(interest)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Availability Step */}
          {currentStep === "availability" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  When are you available?
                </h2>
                <p className="text-muted-foreground">
                  This helps us match you with opportunities that fit your schedule.
                </p>
              </div>

              <div>
                <label className="block text-foreground mb-3">Days Available</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "Weekday Mornings",
                    "Weekday Afternoons",
                    "Weekday Evenings",
                    "Weekends",
                  ].map((time) => (
                    <button
                      key={time}
                      onClick={() => toggleArrayValue("availability", time)}
                      className={`p-3 border rounded-lg transition-all ${
                        formData.availability.includes(time)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">Hours Per Month</label>
                <select
                  value={formData.hoursPerMonth}
                  onChange={(e) => setFormData({ ...formData, hoursPerMonth: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your availability</option>
                  <option value="1-5">1-5 hours per month</option>
                  <option value="5-10">5-10 hours per month</option>
                  <option value="10-20">10-20 hours per month</option>
                  <option value="20+">20+ hours per month</option>
                </select>
              </div>
            </div>
          )}

          {/* Preferences Step */}
          {currentStep === "preferences" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-foreground mb-2">
                  Final details
                </h2>
                <p className="text-muted-foreground">
                  Just a couple more things to help us serve you better.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.backgroundCheck}
                      onChange={(e) =>
                        setFormData({ ...formData, backgroundCheck: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground">I have a background check</div>
                      <div className="text-sm text-muted-foreground">
                        Or I'm willing to get one for opportunities that require it
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.transportation}
                      onChange={(e) =>
                        setFormData({ ...formData, transportation: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground">I have reliable transportation</div>
                      <div className="text-sm text-muted-foreground">
                        Can travel to volunteer locations
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Your information is private and will only be shared with nonprofits when you apply for specific opportunities. You're in full control.
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
              {currentStepIndex === steps.length - 1 ? "Find Opportunities" : "Continue"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
