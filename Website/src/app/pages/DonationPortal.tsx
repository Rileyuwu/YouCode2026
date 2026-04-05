import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, QrCode, Link2, Copy, Check, CreditCard, Code2 } from "lucide-react";
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
    embedPayment: false,
    embedTheme: {
      primaryColor: "#2f6b52",
      backgroundColor: "#fdfcf8",
      textColor: "#1f2937",
      buttonText: "Complete Donation",
      borderRadius: "8",
      fontFamily: "inherit",
    },
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

            {/* Embed on Website */}
            <ScrollFadeUp delay={0.05}>
              <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-1 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Embed on Your Website
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Drop a donation widget directly into your own site — no redirect needed.</p>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-4 border border-border rounded-lg cursor-pointer"
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.embedPayment}
                        onChange={(e) => setFormData({ ...formData, embedPayment: e.target.checked })}
                        className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                      />
                      <div>
                        <div className="text-foreground">Enable Embedded Donation Widget</div>
                        <div className="text-sm text-muted-foreground">Customize colors and style to match your website</div>
                      </div>
                    </label>
                  </motion.div>
                </div>

                {formData.embedPayment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border-t border-border bg-muted/30 p-6 space-y-6"
                  >
                    {/* Color pickers */}
                    <div>
                      <p className="text-sm text-foreground font-medium mb-3">Widget Colors</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { key: "primaryColor", label: "Button Color" },
                          { key: "backgroundColor", label: "Background" },
                          { key: "textColor", label: "Text Color" },
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center gap-3">
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
                            setFormData({ ...formData, embedTheme: { ...formData.embedTheme, buttonText: e.target.value } })
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
                            setFormData({ ...formData, embedTheme: { ...formData.embedTheme, borderRadius: e.target.value } })
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
                            setFormData({ ...formData, embedTheme: { ...formData.embedTheme, fontFamily: e.target.value } })
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
                      <p className="text-sm text-foreground font-medium mb-2">Live Preview</p>
                      <div
                        className="rounded-lg p-4 border border-border"
                        style={{
                          backgroundColor: formData.embedTheme.backgroundColor,
                          fontFamily: formData.embedTheme.fontFamily,
                          color: formData.embedTheme.textColor,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-5 h-5" style={{ color: formData.embedTheme.primaryColor }} />
                          <span className="font-medium">Donate Now</span>
                        </div>
                        <div className="space-y-2 mb-3">
                          {formData.suggestedAmounts.map((amt) => (
                            <div
                              key={amt}
                              className="px-3 py-2 border text-center text-sm cursor-pointer"
                              style={{
                                borderColor: `${formData.embedTheme.textColor}22`,
                                borderRadius: `${formData.embedTheme.borderRadius}px`,
                              }}
                            >
                              ${amt}
                            </div>
                          ))}
                          {formData.customAmount && (
                            <div
                              className="px-3 py-2 border text-center text-sm"
                              style={{
                                borderColor: `${formData.embedTheme.textColor}22`,
                                color: `${formData.embedTheme.textColor}88`,
                                borderRadius: `${formData.embedTheme.borderRadius}px`,
                              }}
                            >
                              Custom Amount
                            </div>
                          )}
                        </div>
                        {formData.enableMonthly && (
                          <p className="flex items-center justify-center gap-1 text-xs text-center mb-3" style={{ color: formData.embedTheme.primaryColor }}>
                            <Check className="w-3 h-3" /> Monthly giving available
                          </p>
                        )}
                        <button
                          className="w-full px-4 py-2 text-sm font-medium text-white"
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
                      <p className="text-sm text-foreground font-medium mb-1">Your Embed Code</p>
                      <p className="text-xs text-muted-foreground mb-2">Copy and paste this into your website's HTML</p>
                      <code className="block text-xs text-primary font-mono bg-background border border-border rounded-lg p-3 select-all break-all leading-relaxed">
                        {`<iframe src="${donationUrl}?primary=${encodeURIComponent(formData.embedTheme.primaryColor)}&bg=${encodeURIComponent(formData.embedTheme.backgroundColor)}&text=${encodeURIComponent(formData.embedTheme.textColor)}&radius=${formData.embedTheme.borderRadius}&btn=${encodeURIComponent(formData.embedTheme.buttonText)}" width="100%" height="420" frameborder="0" style="border:none;border-radius:${formData.embedTheme.borderRadius}px"></iframe>`}
                      </code>
                    </div>
                  </motion.div>
                )}
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
                <div
                  className="border border-border rounded-lg p-4 transition-all duration-300"
                  style={{
                    backgroundColor: formData.embedPayment ? formData.embedTheme.backgroundColor : undefined,
                    fontFamily: formData.embedPayment ? formData.embedTheme.fontFamily : undefined,
                    color: formData.embedPayment ? formData.embedTheme.textColor : undefined,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard
                      className="w-5 h-5"
                      style={{ color: formData.embedPayment ? formData.embedTheme.primaryColor : "var(--primary)" }}
                    />
                    <span>Donate Now</span>
                  </div>
                  <StaggerContainer fast className="space-y-2 mb-4">
                    {formData.suggestedAmounts.map((amount, index) => (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.15 }}
                        className="px-3 py-2 border text-center text-sm cursor-pointer transition-all duration-300"
                        style={{
                          borderRadius: formData.embedPayment ? `${formData.embedTheme.borderRadius}px` : undefined,
                          borderColor: formData.embedPayment ? `${formData.embedTheme.textColor}22` : undefined,
                        }}
                      >
                        ${amount}
                      </motion.div>
                    ))}
                    {formData.customAmount && (
                      <motion.div
                        variants={fadeUp}
                        whileHover={{ scale: 1.03 }}
                        className="px-3 py-2 border text-center text-sm transition-all duration-300"
                        style={{
                          borderRadius: formData.embedPayment ? `${formData.embedTheme.borderRadius}px` : undefined,
                          borderColor: formData.embedPayment ? `${formData.embedTheme.textColor}22` : undefined,
                          color: formData.embedPayment ? `${formData.embedTheme.textColor}88` : undefined,
                        }}
                      >
                        Custom Amount
                      </motion.div>
                    )}
                  </StaggerContainer>
                  {formData.enableMonthly && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-1 text-xs text-center mb-3 transition-colors duration-300"
                      style={{ color: formData.embedPayment ? formData.embedTheme.primaryColor : undefined }}
                    >
                      <Check className="w-3 h-3" /> Monthly giving available
                    </motion.div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full px-4 py-2 text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: formData.embedPayment ? formData.embedTheme.primaryColor : "var(--primary)",
                      color: "white",
                      borderRadius: formData.embedPayment ? `${formData.embedTheme.borderRadius}px` : undefined,
                    }}
                  >
                    {formData.embedPayment ? (formData.embedTheme.buttonText || "Donate Now") : "Complete Donation"}
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
