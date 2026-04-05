import { useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Check, ChevronRight } from "lucide-react";
import { useCampaign } from "../context/AppContext";

export function DonatePage() {
  const { slug } = useParams<{ slug: string }>();
  const { campaign } = useCampaign();

  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [donated, setDonated] = useState(false);

  const displayTitle = campaign.title || slug || "Support Our Campaign";
  const displayDescription = campaign.description || "Every donation makes a difference.";
  const displayGoal = campaign.goal || "10,000";
  const displayAmounts = campaign.suggestedAmounts.length > 0 ? campaign.suggestedAmounts : ["25", "50", "100", "250"];
  const accentColor = campaign.accentColor || "#2f6b52";

  const handleDonate = () => {
    if (!selectedAmount && !customAmount) return;
    setDonated(true);
  };

  const donateAmount = customAmount || selectedAmount;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-56 overflow-hidden">
        {campaign.heroImage ? (
          <>
            <img
              src={campaign.heroImage}
              alt="Campaign hero"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${accentColor}cc, transparent)` }}
            />
          </>
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: `${accentColor}22` }}>
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${accentColor}cc, transparent)` }}
            />
          </div>
        )}

        {/* Logo overlaid bottom-left */}
        {campaign.logoImage && (
          <div className="absolute bottom-4 left-4">
            <img
              src={campaign.logoImage}
              alt="Organization logo"
              className="w-14 h-14 rounded-lg object-contain bg-white p-1 shadow"
            />
          </div>
        )}

        {/* Title in hero */}
        <div className="absolute bottom-4 right-4 left-20">
          <h1 className="text-2xl text-white font-medium leading-tight">{displayTitle}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Description Card */}
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-foreground leading-relaxed">{displayDescription}</p>
        </div>

        {/* Progress */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">65% raised</span>
            <span className="text-foreground">Goal: ${displayGoal}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{ width: "65%", backgroundColor: accentColor }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            ${(parseFloat(displayGoal.replace(/[^0-9.]/g, "")) * 0.65).toLocaleString(undefined, { maximumFractionDigits: 0 })} raised of ${displayGoal}
          </p>
        </div>

        {/* Donation Form */}
        <AnimatePresence mode="wait">
          {!donated ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Amount Grid */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-foreground mb-3">Choose an amount</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {displayAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className="px-4 py-3 border rounded-lg text-center transition-colors"
                      style={
                        selectedAmount === amount
                          ? { backgroundColor: accentColor, color: "white", borderColor: accentColor }
                          : {}
                      }
                    >
                      <span
                        className={selectedAmount === amount ? "text-white" : "text-foreground"}
                      >
                        ${amount}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, "");
                      setCustomAmount(val);
                      setSelectedAmount("");
                    }}
                    placeholder="Enter custom amount"
                    className="w-full pl-7 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Monthly Toggle */}
              {campaign.enableMonthly && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMonthly}
                      onChange={(e) => setIsMonthly(e.target.checked)}
                      className="w-5 h-5 rounded"
                      style={{ accentColor }}
                    />
                    <div>
                      <div className="text-foreground">Make this a monthly donation</div>
                      <div className="text-sm text-muted-foreground">Support us every month and make a lasting impact</div>
                    </div>
                  </label>
                </div>
              )}

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={!donateAmount}
                className="w-full py-4 text-white rounded-lg flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: accentColor }}
              >
                <Heart className="w-5 h-5" />
                <span>
                  {donateAmount
                    ? `Donate $${donateAmount}${isMonthly ? "/month" : ""}`
                    : "Select an amount"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-lg p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${accentColor}22` }}
              >
                <Check className="w-10 h-10" style={{ color: accentColor }} />
              </motion.div>
              <h2 className="text-2xl text-foreground mb-2">Thank you for your donation!</h2>
              <p className="text-muted-foreground mb-1">
                Your ${donateAmount}{isMonthly ? "/month" : ""} contribution makes a real difference.
              </p>
              <p className="text-sm text-muted-foreground">A receipt has been sent to your email.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground py-4">
          Powered by{" "}
          <span style={{ color: accentColor }} className="font-medium">Connext</span>
        </p>
      </div>
    </div>
  );
}
