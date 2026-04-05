import { createContext, useContext, useState, ReactNode } from "react";

export interface CampaignData {
  orgName: string;
  title: string;
  description: string;
  goal: string;
  startDate: string;
  endDate: string;
  slug: string;
  heroImage: string | null;
  logoImage: string | null;
  accentColor: string;
  enableOneTime: boolean;
  enableMonthly: boolean;
  suggestedAmounts: string[];
  launched: boolean;
}

const DEFAULTS: CampaignData = {
  orgName: "",
  title: "",
  description: "",
  goal: "",
  startDate: "",
  endDate: "",
  slug: "",
  heroImage: null,
  logoImage: null,
  accentColor: "#2f6b52",
  enableOneTime: true,
  enableMonthly: true,
  suggestedAmounts: ["25", "50", "100", "250"],
  launched: false,
};

interface AppContextType {
  campaign: CampaignData;
  updateCampaign: (data: Partial<CampaignData>) => void;
  resetCampaign: () => void;
}

const AppContext = createContext<AppContextType>({
  campaign: DEFAULTS,
  updateCampaign: () => {},
  resetCampaign: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [campaign, setCampaign] = useState<CampaignData>(() => {
    try {
      const stored = localStorage.getItem("connext_campaign");
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  const updateCampaign = (data: Partial<CampaignData>) => {
    setCampaign((prev) => {
      const next = { ...prev, ...data };
      try { localStorage.setItem("connext_campaign", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const resetCampaign = () => {
    setCampaign(DEFAULTS);
    try { localStorage.removeItem("connext_campaign"); } catch {}
  };

  return (
    <AppContext.Provider value={{ campaign, updateCampaign, resetCampaign }}>
      {children}
    </AppContext.Provider>
  );
}

export const useCampaign = () => useContext(AppContext);
