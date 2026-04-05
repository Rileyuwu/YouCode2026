import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell, Mail, MessageSquare, Slack, ChevronDown, Check, Plus, X,
  Zap, DollarSign, Users, TrendingUp, AlertCircle, RefreshCw, ArrowLeft, Send
} from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const EVENTS = [
  { key: "newDonation", icon: DollarSign, label: "New donation received", desc: "Any time someone donates" },
  { key: "largeDonation", icon: TrendingUp, label: "Large donation", desc: "When a donation exceeds your threshold" },
  { key: "newMonthly", icon: RefreshCw, label: "New monthly donor", desc: "Someone sets up recurring giving" },
  { key: "monthlyCancelled", icon: AlertCircle, label: "Monthly donor cancelled", desc: "A recurring donor stops giving" },
  { key: "volunteerSignup", icon: Users, label: "Volunteer signup", desc: "A new volunteer joins your campaign" },
  { key: "milestone", icon: Zap, label: "Campaign milestone", desc: "25%, 50%, 75%, or 100% of goal reached" },
];

type EventKey = typeof EVENTS[number]["key"];
type ChannelKey = "email" | "sms" | "slack";

interface Channel {
  enabled: boolean;
  expanded: boolean;
  tested: boolean;
  testing: boolean;
  events: Record<EventKey, boolean>;
}

interface EmailChannel extends Channel {
  addresses: string[];
  newAddress: string;
  largeThreshold: string;
}

interface SmsChannel extends Channel {
  phone: string;
  largeThreshold: string;
}

interface SlackChannel extends Channel {
  webhookUrl: string;
  largeThreshold: string;
}

export function AlertChannels() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const [email, setEmail] = useState<EmailChannel>({
    enabled: false,
    expanded: false,
    tested: false,
    testing: false,
    addresses: [],
    newAddress: "",
    largeThreshold: "100",
    events: { newDonation: true, largeDonation: true, newMonthly: true, monthlyCancelled: true, volunteerSignup: false, milestone: true },
  });

  const [sms, setSms] = useState<SmsChannel>({
    enabled: false,
    expanded: false,
    tested: false,
    testing: false,
    phone: "",
    largeThreshold: "250",
    events: { newDonation: false, largeDonation: true, newMonthly: true, monthlyCancelled: false, volunteerSignup: false, milestone: true },
  });

  const [slack, setSlack] = useState<SlackChannel>({
    enabled: false,
    expanded: false,
    tested: false,
    testing: false,
    webhookUrl: "",
    largeThreshold: "100",
    events: { newDonation: true, largeDonation: true, newMonthly: true, monthlyCancelled: true, volunteerSignup: true, milestone: true },
  });

  const activeCount = [email, sms, slack].filter((c) => c.enabled).length;

  const simulateTest = (
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setter((c: Channel) => ({ ...c, testing: true }));
    setTimeout(() => setter((c: Channel) => ({ ...c, testing: false, tested: true })), 1800);
  };

  const addEmail = () => {
    const addr = email.newAddress.trim();
    if (!addr || email.addresses.includes(addr)) return;
    setEmail((e) => ({ ...e, addresses: [...e.addresses, addr], newAddress: "" }));
  };

  const removeEmail = (addr: string) =>
    setEmail((e) => ({ ...e, addresses: e.addresses.filter((a) => a !== addr) }));

  const toggleEvent = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: EventKey
  ) => setter((c: Channel) => ({ ...c, events: { ...c.events, [key]: !c.events[key] } }));

  return (
    <div className="min-h-screen bg-background">
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl text-foreground">Alert Channels</h1>
          </div>
          <p className="text-muted-foreground">Get notified instantly when things happen on your campaign — donations, milestones, volunteer signups, and more.</p>

          {activeCount > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
              <Check className="w-3.5 h-3.5" />
              {activeCount} channel{activeCount > 1 ? "s" : ""} active
            </motion.div>
          )}
        </motion.div>

        <div className="space-y-4">

          {/* ── EMAIL ── */}
          <ChannelCard
            icon={Mail}
            title="Email Notifications"
            badge="Recommended"
            desc="Receive alerts directly to one or more email addresses."
            enabled={email.enabled}
            expanded={email.expanded}
            tested={email.tested}
            testing={email.testing}
            onToggle={() => setEmail((e) => ({ ...e, enabled: !e.enabled, expanded: !e.enabled ? true : e.expanded }))}
            onExpand={() => setEmail((e) => ({ ...e, expanded: !e.expanded }))}
            onTest={() => simulateTest(setEmail)}
          >
            {/* Addresses */}
            <div>
              <label className="block text-sm text-foreground mb-2">Send alerts to</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="email"
                  value={email.newAddress}
                  onChange={(e) => setEmail((s) => ({ ...s, newAddress: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addEmail()}
                  placeholder="you@yourorg.ca"
                  className="flex-1 px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button onClick={addEmail} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {email.addresses.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {email.addresses.map((addr) => (
                    <span key={addr} className="flex items-center gap-1.5 px-2.5 py-1 bg-muted border border-border rounded-full text-xs text-foreground">
                      {addr}
                      <button onClick={() => removeEmail(addr)} className="hover:text-destructive transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <EventToggles
              events={email.events}
              largeThreshold={email.largeThreshold}
              onToggle={(key) => toggleEvent(setEmail, key)}
              onThreshold={(v) => setEmail((e) => ({ ...e, largeThreshold: v }))}
            />
          </ChannelCard>

          {/* ── SMS ── */}
          <ChannelCard
            icon={MessageSquare}
            title="SMS / Text Message"
            badge={null}
            desc="Get a text message for high-priority events. Best for large donations and milestones."
            enabled={sms.enabled}
            expanded={sms.expanded}
            tested={sms.tested}
            testing={sms.testing}
            onToggle={() => setSms((s) => ({ ...s, enabled: !s.enabled, expanded: !s.enabled ? true : s.expanded }))}
            onExpand={() => setSms((s) => ({ ...s, expanded: !s.expanded }))}
            onTest={() => simulateTest(setSms)}
          >
            <div>
              <label className="block text-sm text-foreground mb-2">Phone number</label>
              <input
                type="tel"
                value={sms.phone}
                onChange={(e) => setSms((s) => ({ ...s, phone: e.target.value }))}
                placeholder="+1 (604) 555-0100"
                className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Include country code. Standard messaging rates apply.</p>
            </div>

            <EventToggles
              events={sms.events}
              largeThreshold={sms.largeThreshold}
              onToggle={(key) => toggleEvent(setSms, key)}
              onThreshold={(v) => setSms((s) => ({ ...s, largeThreshold: v }))}
            />
          </ChannelCard>

          {/* ── SLACK ── */}
          <ChannelCard
            icon={Slack}
            title="Slack"
            badge={null}
            desc="Post alerts to a Slack channel using a webhook. Great for keeping your whole team in the loop."
            enabled={slack.enabled}
            expanded={slack.expanded}
            tested={slack.tested}
            testing={slack.testing}
            onToggle={() => setSlack((s) => ({ ...s, enabled: !s.enabled, expanded: !s.enabled ? true : s.expanded }))}
            onExpand={() => setSlack((s) => ({ ...s, expanded: !s.expanded }))}
            onTest={() => simulateTest(setSlack)}
          >
            <div>
              <label className="block text-sm text-foreground mb-2">Webhook URL</label>
              <input
                type="url"
                value={slack.webhookUrl}
                onChange={(e) => setSlack((s) => ({ ...s, webhookUrl: e.target.value }))}
                placeholder="https://hooks.slack.com/services/…"
                className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Go to your Slack app → Incoming Webhooks → Add new webhook to workspace.
              </p>
            </div>

            <EventToggles
              events={slack.events}
              largeThreshold={slack.largeThreshold}
              onToggle={(key) => toggleEvent(setSlack, key)}
              onThreshold={(v) => setSlack((s) => ({ ...s, largeThreshold: v }))}
            />
          </ChannelCard>
        </div>

        {/* Save */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex gap-3 items-center">
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className={`flex-1 px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${saved ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"}`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Saved!
              </>
            ) : (
              "Save Alert Settings"
            )}
          </motion.button>
          <Link to="/dashboard" className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            Cancel
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function ChannelCard({
  icon: Icon, title, badge, desc,
  enabled, expanded, tested, testing,
  onToggle, onExpand, onTest,
  children,
}: {
  icon: React.ElementType;
  title: string;
  badge: string | null;
  desc: string;
  enabled: boolean;
  expanded: boolean;
  tested: boolean;
  testing: boolean;
  onToggle: () => void;
  onExpand: () => void;
  onTest: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-card border rounded-lg overflow-hidden transition-colors ${enabled ? "border-primary" : "border-border"}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground">{title}</h3>
                {badge && <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{badge}</span>}
                {enabled && tested && (
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Connected
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-primary" : "bg-muted"}`}
          >
            <motion.span
              animate={{ x: enabled ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow block"
            />
          </button>
        </div>

        {enabled && (
          <button
            onClick={onExpand}
            className="flex items-center gap-1 text-sm text-primary hover:opacity-70 transition-opacity"
          >
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
              <ChevronDown className="w-4 h-4" />
            </motion.span>
            {expanded ? "Hide settings" : "Configure"}
          </button>
        )}
      </div>

      <AnimatePresence>
        {enabled && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border bg-muted/20 px-6 py-5 space-y-5">
              {children}

              {/* Test button */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onTest}
                  disabled={testing}
                  className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm disabled:opacity-60"
                >
                  {testing ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="inline-flex">
                      <RefreshCw className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {testing ? "Sending…" : "Send test alert"}
                </motion.button>
                {tested && !testing && (
                  <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Test sent successfully
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EventToggles({
  events, largeThreshold, onToggle, onThreshold,
}: {
  events: Record<string, boolean>;
  largeThreshold: string;
  onToggle: (key: EventKey) => void;
  onThreshold: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-foreground mb-3">Notify me when</label>
      <div className="space-y-2">
        {EVENTS.map(({ key, icon: Icon, label, desc }) => (
          <motion.div
            key={key}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
              events[key] ? "border-primary/40 bg-primary/5" : "border-border"
            }`}
            onClick={() => onToggle(key as EventKey)}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${events[key] ? "bg-primary/10" : "bg-muted"}`}>
              <Icon className={`w-4 h-4 ${events[key] ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${events[key] ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${events[key] ? "bg-primary border-primary" : "border-border"}`}>
              {events[key] && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
          </motion.div>
        ))}
      </div>

      {events["largeDonation"] && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
          <label className="block text-xs text-muted-foreground mb-1">Alert me when a donation exceeds</label>
          <div className="relative w-36">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <input
              type="text"
              value={largeThreshold}
              onChange={(e) => onThreshold(e.target.value.replace(/\D/g, ""))}
              className="w-full pl-7 pr-3 py-2 text-sm bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
