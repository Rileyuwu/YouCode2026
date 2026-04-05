import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, QrCode, Link2, Copy, Check, CreditCard } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollFadeUp, StaggerContainer, HoverCard, AnimatedButton, fadeUp } from "../components/animations";

export function DonationPortal() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    enableOneTime: true,
    enableMonthly: true,
    suggestedAmounts: ["25", "50", "100", "250"],
    customAmount: true,
    campaignMessage: "",
    thankYouMessage: "Thank you for your generous support! Your donation helps us make a real difference in our community.",
    collectEmail: true,
    collectName: true,
    collectPhone: false,
  });

  const donationUrl = "https://connext.bc.ca/donate/spring-food-drive-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(donationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  const updateSuggestedAmount = (index: number, value: string) => {
    const newAmounts = [...formData.suggestedAmounts];
    newAmounts[index] = value;
    setFormData({ ...formData, suggestedAmounts: newAmounts });
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
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">
            Set Up Your Donation Portal
          </h1>
          <p className="text-muted-foreground">
            Create a simple, secure way for supporters to donate to your campaign.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation Types */}
            <ScrollFadeUp>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl text-foreground mb-4">Donation Options</h3>
                <div className="space-y-4">
                  {[
                    { key: "enableOneTime", label: "One-Time Donations", desc: "Accept single donations from supporters" },
                    { key: "enableMonthly", label: "Monthly Recurring Donations", desc: "Enable monthly giving for sustained support" },
                  ].map(({ key, label, desc }) => (
                    <motion.div
                      key={key}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="p-4 border border-border rounded-lg cursor-pointer"
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[key as keyof typeof formData] as boolean}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                          className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <div>
                          <div className="text-foreground">{label}</div>
                          <div className="text-sm text-muted-foreground">{desc}</div>
                        </div>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Suggested Amounts */}
            <ScrollFadeUp delay={0.05}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl text-foreground mb-4">Suggested Donation Amounts</h3>
                <StaggerContainer fast className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {formData.suggestedAmounts.map((amount, index) => (
                    <motion.div key={index} variants={fadeUp}>
                      <label className="block text-sm text-muted-foreground mb-1">Amount {index + 1}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => updateSuggestedAmount(index, e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        />
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-4 border border-border rounded-lg"
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.customAmount}
                      onChange={(e) => setFormData({ ...formData, customAmount: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <div>
                      <div className="text-foreground">Allow Custom Amounts</div>
                      <div className="text-sm text-muted-foreground">Let donors enter their own amount</div>
                    </div>
                  </label>
                </motion.div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Campaign Messaging */}
            <ScrollFadeUp delay={0.05}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl text-foreground mb-4">Campaign Messaging</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-foreground mb-2">Campaign Message</label>
                    <textarea
                      value={formData.campaignMessage}
                      onChange={(e) => setFormData({ ...formData, campaignMessage: e.target.value })}
                      placeholder="A message that will appear at the top of your donation page..."
                      rows={3}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Optional: Add a personal message to encourage donations</p>
                  </div>
                  <div>
                    <label className="block text-foreground mb-2">Thank You Message</label>
                    <textarea
                      value={formData.thankYouMessage}
                      onChange={(e) => setFormData({ ...formData, thankYouMessage: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
                    />
                    <p className="text-sm text-muted-foreground mt-1">This message will be shown after someone donates</p>
                  </div>
                </div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Donor Information */}
            <ScrollFadeUp delay={0.05}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl text-foreground mb-4">Donor Contact Capture</h3>
                <p className="text-sm text-muted-foreground mb-4">Select what information you'd like to collect from donors.</p>
                <div className="space-y-3">
                  {[
                    { key: "collectName", label: "Name" },
                    { key: "collectEmail", label: "Email Address" },
                    { key: "collectPhone", label: "Phone Number (Optional)" },
                  ].map(({ key, label }) => (
                    <motion.div
                      key={key}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="p-4 border border-border rounded-lg"
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[key as keyof typeof formData] as boolean}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                          className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-foreground">{label}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Share Options */}
            <ScrollFadeUp delay={0.05}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl text-foreground mb-4">Share Your Donation Page</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Donation Page URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={donationUrl}
                        readOnly
                        className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground"
                      />
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={handleCopy}
                        className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <motion.span
                          key={String(copied)}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { Icon: QrCode, label: "Generate QR Code" },
                      { Icon: Link2, label: "Get Shareable Link" },
                    ].map(({ Icon, label }) => (
                      <motion.button
                        key={label}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Submit Button */}
            <ScrollFadeUp delay={0.05}>
              <div className="flex flex-col sm:flex-row gap-3">
                <AnimatedButton
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Launch Campaign
                </AnimatedButton>
                <AnimatedButton className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                  Save Draft
                </AnimatedButton>
              </div>
            </ScrollFadeUp>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <ScrollFadeUp delay={0.15}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h4 className="text-foreground mb-3">Donation Page Preview</h4>
                <div className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Donate Now</span>
                  </div>
                  <StaggerContainer fast className="space-y-2 mb-4">
                    {formData.suggestedAmounts.map((amount, index) => (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        whileHover={{ scale: 1.03, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                        transition={{ duration: 0.15 }}
                        className="px-3 py-2 border border-border rounded text-center text-sm cursor-pointer"
                      >
                        ${amount}
                      </motion.div>
                    ))}
                    {formData.customAmount && (
                      <motion.div
                        variants={fadeUp}
                        whileHover={{ scale: 1.03 }}
                        className="px-3 py-2 border border-border rounded text-center text-sm text-muted-foreground cursor-pointer"
                      >
                        Custom Amount
                      </motion.div>
                    )}
                  </StaggerContainer>
                  {formData.enableMonthly && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-center text-muted-foreground mb-3"
                    >
                      ✓ Monthly giving available
                    </motion.div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                  >
                    Complete Donation
                  </motion.button>
                </div>
              </HoverCard>
            </ScrollFadeUp>

            {/* Tips Card */}
            <ScrollFadeUp delay={0.2}>
              <HoverCard className="bg-card border border-border rounded-lg p-6">
                <h4 className="text-foreground mb-3">Donation Setup Tips</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Monthly giving creates sustainable support",
                    "Offer 4-5 suggested donation amounts",
                    "Keep your thank you message warm and personal",
                    "Share your QR code at events",
                  ].map((tip) => (
                    <motion.li
                      key={tip}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex gap-2"
                    >
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </HoverCard>
            </ScrollFadeUp>

            {/* Security Badge */}
            <ScrollFadeUp delay={0.25}>
              <HoverCard className="bg-muted/50 border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Secure Payment Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All donations are processed securely. Your donors' payment information is encrypted and never stored on our servers.
                </p>
              </HoverCard>
            </ScrollFadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
