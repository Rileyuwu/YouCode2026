import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, Copy, Download, ExternalLink, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCampaign } from "../context/AppContext";

export function LaunchSuccess() {
  const navigate = useNavigate();
  const { campaign } = useCampaign();
  const [copied, setCopied] = useState(false);
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

  const donationUrl = `${qrBaseUrl}/donate/${campaign.slug || "your-campaign"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(donationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector("#launch-qr-wrap svg") as SVGElement;
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
          >
            <Check className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl text-foreground mb-2">Your campaign is live!</h1>
          <p className="text-muted-foreground mb-8">Share it with the world</p>

          {/* URL Copy */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2 text-left">Donation URL</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={donationUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <motion.span
                  key={String(copied)}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5 text-foreground" />
                  )}
                </motion.span>
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div id="launch-qr-wrap" className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-xl border border-border">
                <QRCodeSVG
                  value={donationUrl}
                  size={160}
                  fgColor={campaign.accentColor || "#2f6b52"}
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              View your page
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
