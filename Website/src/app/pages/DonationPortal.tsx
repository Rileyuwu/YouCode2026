import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useCampaign } from "../context/AppContext";
import {
  QrCode, Link2, Copy, Check, CreditCard, Code2, RefreshCw, Zap,
  ShieldCheck, Star, Globe, ImagePlus, Type, Palette, Upload, X, Download, Mail, Bell, ChevronDown
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollFadeUp, StaggerContainer, HoverCard, AnimatedButton, fadeUp } from "../components/animations";

export function DonationPortal() {
  const navigate = useNavigate();
  const { campaign, updateCampaign } = useCampaign();
  const [copied, setCopied] = useState(false);
  const [pageMode, setPageMode] = useState<"connext" | "embed" | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [qrBaseUrl, setQrBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      fetch("/api/local-ip")
        .then((r) => r.json())
        .then(({ url }) => {
          if (cancelled) return;
          if (url) { setQrBaseUrl(url); }
          else { setTimeout(poll, 1500); }
        })
        .catch(() => { if (!cancelled) setTimeout(poll, 1500); });
    };
    poll();
    return () => { cancelled = true; };
  }, []);
  const [emailUpdates, setEmailUpdates] = useState({
    enabled: false,
    frequency: "monthly",
    subject: "Here's what your donation helped accomplish this month",
    body: "Hi [Donor Name],\n\nWe wanted to share an update on what your generous contribution has made possible...\n\n[Update content goes here]\n\nThank you for being part of this journey.\n\nWith gratitude,\n[Your Organization]",
    previewOpen: false,
  });
  const heroInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [pageData, setPageData] = useState({
    title: campaign.title || "Spring Food Drive 2026",
    description: campaign.description || "Help us provide healthy meals to families across the Lower Mainland. Every dollar goes directly to food purchasing and distribution.",
    heroImage: campaign.heroImage as string | null,
    logoImage: campaign.logoImage as string | null,
    accentColor: campaign.accentColor || "#2f6b52",
  });

  const [formData, setFormData] = useState({
    enableOneTime: true,
    enableMonthly: true,
    suggestedAmounts: ["25", "50", "100", "250"],
    customAmount: true,
    thankYouMessage: "Thank you for your generous support! Your donation helps us make a real difference in our community.",
    collectEmail: true,
    collectName: true,
    collectPhone: false,
    embedTheme: {
      primaryColor: "#2f6b52",
      backgroundColor: "#fdfcf8",
      textColor: "#1f2937",
      buttonText: "Complete Donation",
      borderRadius: "8",
      fontFamily: "inherit",
    },
  });

  const donationUrl = `${window.location.origin}/donate/${campaign.slug || "your-campaign"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(donationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "logoImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPageData((prev) => ({ ...prev, [field]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const updateSuggestedAmount = (index: number, value: string) => {
    const newAmounts = [...formData.suggestedAmounts];
    newAmounts[index] = value.replace(/\D/g, "");
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
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
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
          <h1 className="text-3xl sm:text-4xl text-foreground mb-2">Set Up Your Donation Portal</h1>
          <p className="text-muted-foreground">Create a simple, secure way for supporters to donate to your campaign.</p>
        </motion.div>

        {/* Mode Picker */}
        <ScrollFadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                mode: "connext" as const,
                icon: Globe,
                title: "Use your Connext page",
                desc: "We host a fully branded donation page for you at connext.bc.ca. No website needed — just share the link.",
                badge: "Recommended",
              },
              {
                mode: "embed" as const,
                icon: Code2,
                title: "Embed on your own website",
                desc: "Drop a donation widget directly into your existing site. Customize it to match your brand.",
                badge: null,
              },
            ].map(({ mode, icon: Icon, title, desc, badge }) => (
              <motion.button
                key={mode}
                whileHover={{ borderColor: "var(--primary)" }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
                onClick={() => setPageMode(mode)}
                className={`text-left p-6 border rounded-lg transition-colors ${
                  pageMode === mode ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    {badge && (
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{badge}</span>
                    )}
                    {pageMode === mode && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                        <Check className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.button>
            ))}
          </div>
        </ScrollFadeUp>

        <AnimatePresence mode="wait">
          {pageMode === "connext" && (
            <motion.div
              key="connext"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Page Builder */}
                  <ScrollFadeUp>
                    <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl text-foreground">Page Content</h3>
                        <p className="text-sm text-muted-foreground mt-1">Customize how your donation page looks to donors.</p>
                      </div>

                      <div className="p-6 space-y-6">
                        {/* Hero Image */}
                        <div>
                          <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                            <ImagePlus className="w-4 h-4 text-primary" /> Hero Image
                          </label>
                          {pageData.heroImage ? (
                            <div className="relative rounded-lg overflow-hidden h-40">
                              <img src={pageData.heroImage} alt="Hero" className="w-full h-full object-cover" />
                              <button
                                onClick={() => setPageData((p) => ({ ...p, heroImage: null }))}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => heroInputRef.current?.click()}
                              className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors text-muted-foreground"
                            >
                              <Upload className="w-5 h-5" />
                              <span className="text-sm">Click to upload a photo</span>
                              <span className="text-xs">JPG, PNG, WebP</span>
                            </button>
                          )}
                          <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "heroImage")} />
                        </div>

                        {/* Logo */}
                        <div>
                          <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                            <ImagePlus className="w-4 h-4 text-primary" /> Organization Logo
                          </label>
                          {pageData.logoImage ? (
                            <div className="flex items-center gap-3">
                              <img src={pageData.logoImage} alt="Logo" className="w-14 h-14 object-contain rounded-lg border border-border" />
                              <button
                                onClick={() => setPageData((p) => ({ ...p, logoImage: null }))}
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => logoInputRef.current?.click()}
                              className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm text-muted-foreground"
                            >
                              <Upload className="w-4 h-4" /> Upload logo
                            </button>
                          )}
                          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "logoImage")} />
                        </div>

                        {/* Title */}
                        <div>
                          <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                            <Type className="w-4 h-4 text-primary" /> Campaign Title
                          </label>
                          <input
                            type="text"
                            value={pageData.title}
                            onChange={(e) => setPageData((p) => ({ ...p, title: e.target.value }))}
                            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm text-foreground mb-2">Campaign Story</label>
                          <textarea
                            value={pageData.description}
                            onChange={(e) => setPageData((p) => ({ ...p, description: e.target.value }))}
                            rows={4}
                            placeholder="Tell donors why this campaign matters..."
                            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
                          />
                        </div>

                        {/* Accent Color */}
                        <div>
                          <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-primary" /> Brand Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={pageData.accentColor}
                              onChange={(e) => setPageData((p) => ({ ...p, accentColor: e.target.value }))}
                              className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent p-0.5"
                            />
                            <span className="text-sm font-mono text-foreground">{pageData.accentColor}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCard>
                  </ScrollFadeUp>

                  {/* Donation Options */}
                  <ScrollFadeUp delay={0.05}>
                    <div className="space-y-4">
                      <h3 className="text-xl text-foreground">Donation Options</h3>
                      {[
                        {
                          key: "enableOneTime" as const,
                          icon: Zap,
                          title: "One-Time Donations",
                          badge: "one-time",
                          sub: "Instant setup",
                          why: "Low friction for new supporters. Best for event-driven campaigns and one-off appeals.",
                          detail1: <><ShieldCheck className="w-4 h-4 text-primary" /><span>Secure checkout</span></>,
                          detail2: <span>No commitment required</span>,
                        },
                        {
                          key: "enableMonthly" as const,
                          icon: RefreshCw,
                          title: "Monthly Recurring Donations",
                          badge: "recurring",
                          sub: "Sustained giving",
                          why: "Monthly donors give 42% more annually than one-time donors. Creates a reliable revenue stream.",
                          detail1: <><ShieldCheck className="w-4 h-4 text-primary" /><span>Easy to cancel anytime</span></>,
                          detail2: <><Star className="w-4 h-4 text-primary" fill="currentColor" /><span>Top fundraising feature</span></>,
                        },
                      ].map(({ key, icon: Icon, title, badge, sub, why, detail1, detail2 }) => (
                        <motion.div
                          key={key}
                          whileHover={{ borderColor: "var(--primary)" }}
                          transition={{ duration: 0.15 }}
                          className={`bg-card border rounded-lg p-6 transition-colors ${formData[key] ? "border-primary" : "border-border"}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="text-lg text-foreground mb-1">{title}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span className="px-2 py-0.5 bg-muted rounded text-xs">{badge}</span>
                                  <span>•</span>
                                  <span>{sub}</span>
                                </div>
                              </div>
                            </div>
                            {formData[key] && (
                              <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                <Check className="w-3.5 h-3.5" /><span>Selected</span>
                              </div>
                            )}
                          </div>
                          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-foreground"><span className="text-primary">Why use this: </span>{why}</p>
                          </div>
                          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">{detail1}</div>
                            <div className="flex items-center gap-1">{detail2}</div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, [key]: !formData[key] })}
                            className={`w-full px-4 py-2 rounded-lg transition-all ${
                              formData[key] ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {formData[key] ? "Deselect" : "Select This Option"}
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
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
                      <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="p-4 border border-border rounded-lg">
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

                  {/* Thank You Message */}
                  <ScrollFadeUp delay={0.05}>
                    <HoverCard className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl text-foreground mb-4">Thank You Message</h3>
                      <textarea
                        value={formData.thankYouMessage}
                        onChange={(e) => setFormData({ ...formData, thankYouMessage: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
                      />
                      <p className="text-sm text-muted-foreground mt-1">Shown to donors after completing their donation</p>
                    </HoverCard>
                  </ScrollFadeUp>

                  {/* Donor Email Updates */}
                  <ScrollFadeUp delay={0.05}>
                    <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            <h3 className="text-xl text-foreground">Donor Update Emails</h3>
                          </div>
                          <button
                            onClick={() => setEmailUpdates((e) => ({ ...e, enabled: !e.enabled }))}
                            className={`relative w-11 h-6 rounded-full transition-colors ${emailUpdates.enabled ? "bg-primary" : "bg-muted"}`}
                          >
                            <motion.span
                              animate={{ x: emailUpdates.enabled ? 20 : 2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow block"
                            />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Send donors periodic updates on what their money is going towards — keeps them engaged and more likely to give again.</p>

                        {!emailUpdates.enabled && (
                          <div className="flex flex-wrap gap-2">
                            {["Increases donor retention by 40%", "Builds long-term trust", "Easy to set up"].map((t) => (
                              <span key={t} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <AnimatePresence>
                        {emailUpdates.enabled && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-border bg-muted/20 p-6 space-y-5">

                              {/* Frequency */}
                              <div>
                                <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                                  <Bell className="w-4 h-4 text-primary" /> Update Frequency
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { value: "monthly", label: "Monthly" },
                                    { value: "quarterly", label: "Quarterly" },
                                    { value: "milestone", label: "At Milestones" },
                                  ].map(({ value, label }) => (
                                    <button
                                      key={value}
                                      onClick={() => setEmailUpdates((e) => ({ ...e, frequency: value }))}
                                      className={`py-2 text-sm rounded-lg border transition-colors ${
                                        emailUpdates.frequency === value
                                          ? "border-primary bg-primary/10 text-primary"
                                          : "border-border text-foreground hover:bg-muted"
                                      }`}
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5">
                                  {emailUpdates.frequency === "monthly" && "Sent on the 1st of each month to all active donors."}
                                  {emailUpdates.frequency === "quarterly" && "Sent every 3 months with a summary of impact."}
                                  {emailUpdates.frequency === "milestone" && "Triggered automatically when you hit a fundraising milestone."}
                                </p>
                              </div>

                              {/* Subject */}
                              <div>
                                <label className="block text-sm text-foreground mb-2">Email Subject</label>
                                <input
                                  type="text"
                                  value={emailUpdates.subject}
                                  onChange={(e) => setEmailUpdates((u) => ({ ...u, subject: e.target.value }))}
                                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-sm"
                                />
                              </div>

                              {/* Body */}
                              <div>
                                <label className="block text-sm text-foreground mb-2">Email Body</label>
                                <textarea
                                  value={emailUpdates.body}
                                  onChange={(e) => setEmailUpdates((u) => ({ ...u, body: e.target.value }))}
                                  rows={7}
                                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow text-sm font-mono"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Use <code className="bg-muted px-1 rounded">[Donor Name]</code> and <code className="bg-muted px-1 rounded">[Your Organization]</code> as placeholders — they'll be filled in automatically.</p>
                              </div>

                              {/* Preview toggle */}
                              <div>
                                <button
                                  onClick={() => setEmailUpdates((e) => ({ ...e, previewOpen: !e.previewOpen }))}
                                  className="flex items-center gap-2 text-sm text-primary hover:opacity-70 transition-opacity"
                                >
                                  <motion.span animate={{ rotate: emailUpdates.previewOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                                    <ChevronDown className="w-4 h-4" />
                                  </motion.span>
                                  {emailUpdates.previewOpen ? "Hide preview" : "Preview email"}
                                </button>

                                <AnimatePresence>
                                  {emailUpdates.previewOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: "easeOut" }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-3 border border-border rounded-lg overflow-hidden">
                                        {/* Email chrome */}
                                        <div className="bg-muted px-4 py-3 border-b border-border space-y-1">
                                          <div className="text-xs text-muted-foreground"><span className="text-foreground">From:</span> updates@connext.bc.ca</div>
                                          <div className="text-xs text-muted-foreground"><span className="text-foreground">To:</span> Sarah K. &lt;sarah@example.com&gt;</div>
                                          <div className="text-xs text-foreground font-medium">{emailUpdates.subject || "(no subject)"}</div>
                                        </div>
                                        {/* Body */}
                                        <div className="bg-card p-4">
                                          <div
                                            className="h-1.5 rounded mb-3"
                                            style={{ backgroundColor: pageData.accentColor }}
                                          />
                                          {pageData.logoImage && (
                                            <img src={pageData.logoImage} alt="Logo" className="h-8 mb-3 object-contain" />
                                          )}
                                          <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                                            {emailUpdates.body.replace("[Donor Name]", "Sarah").replace("[Your Organization]", pageData.title || "Your Organization")}
                                          </pre>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </HoverCard>
                  </ScrollFadeUp>

                  {/* Donor Contact Capture */}
                  <ScrollFadeUp delay={0.05}>
                    <HoverCard className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl text-foreground mb-1">Donor Contact Capture</h3>
                      <p className="text-sm text-muted-foreground mb-4">Select what information to collect from donors.</p>
                      <div className="space-y-3">
                        {[
                          { key: "collectName", label: "Name" },
                          { key: "collectEmail", label: "Email Address" },
                          { key: "collectPhone", label: "Phone Number (Optional)" },
                        ].map(({ key, label }) => (
                          <motion.div key={key} whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="p-4 border border-border rounded-lg">
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

                  {/* Share */}
                  <ScrollFadeUp delay={0.05}>
                    <HoverCard className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl text-foreground mb-4">Share Your Page</h3>
                      <div className="flex gap-2 mb-3">
                        <input type="text" value={donationUrl} readOnly className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground text-sm" />
                        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} onClick={handleCopy} className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                          <motion.span key={String(copied)} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                          </motion.span>
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          onClick={() => setShowQR(true)}
                          className="flex items-center justify-center gap-2 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                        >
                          <QrCode className="w-5 h-5" /> Generate QR Code
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          onClick={handleCopy}
                          className="flex items-center justify-center gap-2 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                        >
                          <Link2 className="w-5 h-5" /> Get Shareable Link
                        </motion.button>
                      </div>
                    </HoverCard>
                  </ScrollFadeUp>

                  {/* Actions */}
                  <ScrollFadeUp delay={0.05}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <AnimatedButton onClick={() => { updateCampaign({ launched: true, heroImage: pageData.heroImage, logoImage: pageData.logoImage, accentColor: pageData.accentColor, title: pageData.title, description: pageData.description }); navigate("/launch-success"); }} className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        Launch Campaign
                      </AnimatedButton>
                      <AnimatedButton className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                        Save Draft
                      </AnimatedButton>
                    </div>
                  </ScrollFadeUp>
                </div>

                {/* Live Page Preview */}
                <div className="space-y-6">
                  <ScrollFadeUp delay={0.15}>
                    <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-xs text-muted-foreground font-mono">connext.bc.ca/donate/…</span>
                        </div>
                      </div>

                      {/* Page mockup */}
                      <div className="bg-[#fdfcf8] text-[#1f2937] text-xs overflow-hidden">
                        {/* Hero */}
                        <div
                          className="relative h-24 flex items-end p-3"
                          style={{ backgroundColor: pageData.heroImage ? undefined : `${pageData.accentColor}22` }}
                        >
                          {pageData.heroImage && (
                            <img src={pageData.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${pageData.accentColor}cc, transparent)` }} />
                          <div className="relative flex items-center gap-2">
                            {pageData.logoImage && (
                              <img src={pageData.logoImage} alt="Logo" className="w-7 h-7 rounded object-contain bg-white p-0.5" />
                            )}
                            <span className="text-white font-medium text-sm leading-tight">{pageData.title || "Your Campaign"}</span>
                          </div>
                        </div>

                        <div className="p-3 space-y-3">
                          {/* Story */}
                          {pageData.description && (
                            <p className="text-[11px] text-[#4b5563] leading-relaxed line-clamp-3">{pageData.description}</p>
                          )}

                          {/* Amounts */}
                          <div className="grid grid-cols-2 gap-1.5">
                            {formData.suggestedAmounts.map((amt) => (
                              <div key={amt} className="px-2 py-1.5 border border-[#e5e7eb] rounded text-center text-[11px] cursor-pointer hover:border-primary transition-colors">
                                ${amt}
                              </div>
                            ))}
                          </div>
                          {formData.customAmount && (
                            <div className="px-2 py-1.5 border border-dashed border-[#e5e7eb] rounded text-center text-[11px] text-[#9ca3af]">
                              Enter custom amount
                            </div>
                          )}

                          {/* Monthly toggle */}
                          {formData.enableMonthly && (
                            <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                              <input type="checkbox" className="w-3 h-3 rounded" style={{ accentColor: pageData.accentColor }} />
                              Make this a monthly donation
                            </label>
                          )}

                          {/* Donate button */}
                          <button
                            className="w-full py-2 text-white text-[11px] font-medium rounded-lg"
                            style={{ backgroundColor: pageData.accentColor }}
                          >
                            Donate Now
                          </button>
                        </div>
                      </div>
                    </HoverCard>
                  </ScrollFadeUp>

                  {/* Security Badge */}
                  <ScrollFadeUp delay={0.2}>
                    <HoverCard className="bg-muted/50 border border-border rounded-lg p-5">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Secure Payment Processing</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Donations are encrypted and processed securely. Payment info is never stored on our servers.</p>
                    </HoverCard>
                  </ScrollFadeUp>
                </div>
              </div>
            </motion.div>
          )}

          {pageMode === "embed" && (
            <motion.div
              key="embed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl text-foreground mb-1 flex items-center gap-2">
                        <Code2 className="w-5 h-5" /> Widget Customizer
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">Customize the widget to match your website's look and feel.</p>

                      {/* Colors */}
                      <div className="mb-6">
                        <p className="text-sm text-foreground font-medium mb-3">Colors</p>
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
                                onChange={(e) => setFormData({ ...formData, embedTheme: { ...formData.embedTheme, [key]: e.target.value } })}
                                className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent p-0.5"
                              />
                              <div>
                                <div className="text-xs text-muted-foreground">{label}</div>
                                <div className="text-xs font-mono text-foreground">{formData.embedTheme[key as keyof typeof formData.embedTheme]}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Style */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-foreground mb-1">Button Text</label>
                          <input
                            type="text"
                            value={formData.embedTheme.buttonText}
                            onChange={(e) => setFormData({ ...formData, embedTheme: { ...formData.embedTheme, buttonText: e.target.value } })}
                            className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-foreground mb-1">Corner Radius</label>
                          <select
                            value={formData.embedTheme.borderRadius}
                            onChange={(e) => setFormData({ ...formData, embedTheme: { ...formData.embedTheme, borderRadius: e.target.value } })}
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
                            onChange={(e) => setFormData({ ...formData, embedTheme: { ...formData.embedTheme, fontFamily: e.target.value } })}
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

                      {/* Suggested Amounts */}
                      <div className="mb-6">
                        <p className="text-sm text-foreground font-medium mb-3">Suggested Amounts</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {formData.suggestedAmounts.map((amount, index) => (
                            <div key={index}>
                              <label className="block text-xs text-muted-foreground mb-1">Amount {index + 1}</label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                <input
                                  type="text"
                                  value={amount}
                                  onChange={(e) => updateSuggestedAmount(index, e.target.value)}
                                  className="w-full pl-7 pr-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Embed Code */}
                      <div>
                        <p className="text-sm text-foreground font-medium mb-1">Your Embed Code</p>
                        <p className="text-xs text-muted-foreground mb-2">Copy and paste into your website's HTML</p>
                        <code className="block text-xs text-primary font-mono bg-background border border-border rounded-lg p-3 select-all break-all leading-relaxed">
                          {`<iframe src="${donationUrl}?primary=${encodeURIComponent(formData.embedTheme.primaryColor)}&bg=${encodeURIComponent(formData.embedTheme.backgroundColor)}&text=${encodeURIComponent(formData.embedTheme.textColor)}&radius=${formData.embedTheme.borderRadius}&btn=${encodeURIComponent(formData.embedTheme.buttonText)}" width="100%" height="420" frameborder="0" style="border:none;border-radius:${formData.embedTheme.borderRadius}px"></iframe>`}
                        </code>
                      </div>
                    </div>
                  </HoverCard>

                  {/* Donor Email Updates (embed) */}
                  <HoverCard className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-primary" />
                          <h3 className="text-xl text-foreground">Donor Update Emails</h3>
                        </div>
                        <button
                          onClick={() => setEmailUpdates((e) => ({ ...e, enabled: !e.enabled }))}
                          className={`relative w-11 h-6 rounded-full transition-colors ${emailUpdates.enabled ? "bg-primary" : "bg-muted"}`}
                        >
                          <motion.span
                            animate={{ x: emailUpdates.enabled ? 20 : 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow block"
                          />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Send donors periodic updates on what their money is going towards — keeps them engaged and more likely to give again.</p>
                      {!emailUpdates.enabled && (
                        <div className="flex flex-wrap gap-2">
                          {["Increases donor retention by 40%", "Builds long-term trust", "Easy to set up"].map((t) => (
                            <span key={t} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {emailUpdates.enabled && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border bg-muted/20 p-6 space-y-5">
                            {/* Frequency */}
                            <div>
                              <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                                <Bell className="w-4 h-4 text-primary" /> Update Frequency
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { value: "monthly", label: "Monthly" },
                                  { value: "quarterly", label: "Quarterly" },
                                  { value: "milestone", label: "At Milestones" },
                                ].map(({ value, label }) => (
                                  <button
                                    key={value}
                                    onClick={() => setEmailUpdates((e) => ({ ...e, frequency: value }))}
                                    className={`py-2 text-sm rounded-lg border transition-colors ${
                                      emailUpdates.frequency === value
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border text-foreground hover:bg-muted"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1.5">
                                {emailUpdates.frequency === "monthly" && "Sent on the 1st of each month to all active donors."}
                                {emailUpdates.frequency === "quarterly" && "Sent every 3 months with a summary of impact."}
                                {emailUpdates.frequency === "milestone" && "Triggered automatically when you hit a fundraising milestone."}
                              </p>
                            </div>

                            {/* Subject */}
                            <div>
                              <label className="block text-sm text-foreground mb-2">Email Subject</label>
                              <input
                                type="text"
                                value={emailUpdates.subject}
                                onChange={(e) => setEmailUpdates((u) => ({ ...u, subject: e.target.value }))}
                                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-sm"
                              />
                            </div>

                            {/* Body */}
                            <div>
                              <label className="block text-sm text-foreground mb-2">Email Body</label>
                              <textarea
                                value={emailUpdates.body}
                                onChange={(e) => setEmailUpdates((u) => ({ ...u, body: e.target.value }))}
                                rows={7}
                                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow text-sm font-mono"
                              />
                              <p className="text-xs text-muted-foreground mt-1">Use <code className="bg-muted px-1 rounded">[Donor Name]</code> and <code className="bg-muted px-1 rounded">[Your Organization]</code> as placeholders.</p>
                            </div>

                            {/* Preview */}
                            <div>
                              <button
                                onClick={() => setEmailUpdates((e) => ({ ...e, previewOpen: !e.previewOpen }))}
                                className="flex items-center gap-2 text-sm text-primary hover:opacity-70 transition-opacity"
                              >
                                <motion.span animate={{ rotate: emailUpdates.previewOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                                  <ChevronDown className="w-4 h-4" />
                                </motion.span>
                                {emailUpdates.previewOpen ? "Hide preview" : "Preview email"}
                              </button>
                              <AnimatePresence>
                                {emailUpdates.previewOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-3 border border-border rounded-lg overflow-hidden">
                                      <div className="bg-muted px-4 py-3 border-b border-border space-y-1">
                                        <div className="text-xs text-muted-foreground"><span className="text-foreground">From:</span> updates@connext.bc.ca</div>
                                        <div className="text-xs text-muted-foreground"><span className="text-foreground">To:</span> Sarah K. &lt;sarah@example.com&gt;</div>
                                        <div className="text-xs text-foreground font-medium">{emailUpdates.subject || "(no subject)"}</div>
                                      </div>
                                      <div className="bg-card p-4">
                                        <div className="h-1.5 rounded mb-3" style={{ backgroundColor: formData.embedTheme.primaryColor }} />
                                        <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                                          {emailUpdates.body.replace("[Donor Name]", "Sarah").replace("[Your Organization]", "Your Organization")}
                                        </pre>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </HoverCard>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <AnimatedButton onClick={() => navigate("/dashboard")} className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      Launch Campaign
                    </AnimatedButton>
                    <AnimatedButton className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                      Save Draft
                    </AnimatedButton>
                  </div>
                </div>

                {/* Widget Preview */}
                <div>
                  <ScrollFadeUp delay={0.15}>
                    <HoverCard className="bg-card border border-border rounded-lg p-6">
                      <h4 className="text-foreground mb-3">Widget Preview</h4>
                      <div
                        className="rounded-lg p-4 border border-border"
                        style={{
                          backgroundColor: formData.embedTheme.backgroundColor,
                          fontFamily: formData.embedTheme.fontFamily,
                          color: formData.embedTheme.textColor,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-4 h-4" style={{ color: formData.embedTheme.primaryColor }} />
                          <span className="text-sm font-medium">Donate Now</span>
                        </div>
                        <div className="space-y-2 mb-3">
                          {formData.suggestedAmounts.map((amt) => (
                            <div key={amt} className="px-3 py-2 border text-center text-xs cursor-pointer" style={{ borderColor: `${formData.embedTheme.textColor}22`, borderRadius: `${formData.embedTheme.borderRadius}px` }}>
                              ${amt}
                            </div>
                          ))}
                          {formData.customAmount && (
                            <div className="px-3 py-2 border text-center text-xs" style={{ borderColor: `${formData.embedTheme.textColor}22`, color: `${formData.embedTheme.textColor}88`, borderRadius: `${formData.embedTheme.borderRadius}px` }}>
                              Custom Amount
                            </div>
                          )}
                        </div>
                        {formData.enableMonthly && (
                          <label className="flex items-center gap-2 text-xs mb-3 cursor-pointer select-none">
                            <input type="checkbox" className="w-3.5 h-3.5 rounded" style={{ accentColor: formData.embedTheme.primaryColor }} />
                            Make this a monthly donation
                          </label>
                        )}
                        <button className="w-full px-4 py-2 text-xs font-medium text-white" style={{ backgroundColor: formData.embedTheme.primaryColor, borderRadius: `${formData.embedTheme.borderRadius}px` }}>
                          {formData.embedTheme.buttonText || "Donate Now"}
                        </button>
                      </div>
                    </HoverCard>
                  </ScrollFadeUp>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-foreground">Donation Page QR Code</h3>
                <button onClick={() => setShowQR(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex justify-center mb-4">
                <div id="qr-wrap" className="p-4 bg-white rounded-xl border border-border">
                  <QRCodeSVG
                    value={`${qrBaseUrl}/donate/${campaign.slug || "your-campaign"}`}
                    size={180}
                    fgColor={pageData.accentColor}
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-4 break-all">
                {`${qrBaseUrl}/donate/${campaign.slug || "your-campaign"}`}
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const svg = document.querySelector("#qr-wrap svg") as SVGElement;
                    if (!svg) return;
                    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "donation-qr.svg";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <Download className="w-4 h-4" /> Download SVG
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowQR(false)}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
