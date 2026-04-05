import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Onboarding } from "./pages/Onboarding";
import { CampaignBuilder } from "./pages/CampaignBuilder";
import { MatchingResults } from "./pages/MatchingResults";
import { DonationPortal } from "./pages/DonationPortal";
import { Dashboard } from "./pages/Dashboard";
import { TrustSafety } from "./pages/TrustSafety";
import { VolunteerSignup } from "./pages/VolunteerSignup";
import { VolunteerOpportunities } from "./pages/VolunteerOpportunities";
import { VolunteerDashboard } from "./pages/VolunteerDashboard";
import { FirmSignup } from "./pages/FirmSignup";
import { FirmOpportunities } from "./pages/FirmOpportunities";
import { FirmDashboard } from "./pages/FirmDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  // Nonprofit routes
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/campaign/new",
    Component: CampaignBuilder,
  },
  {
    path: "/campaign/matches",
    Component: MatchingResults,
  },
  {
    path: "/donation-setup",
    Component: DonationPortal,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/trust-safety",
    Component: TrustSafety,
  },
  // Volunteer routes
  {
    path: "/volunteer/signup",
    Component: VolunteerSignup,
  },
  {
    path: "/volunteer/opportunities",
    Component: VolunteerOpportunities,
  },
  {
    path: "/volunteer/dashboard",
    Component: VolunteerDashboard,
  },
  // Firm routes
  {
    path: "/firm/signup",
    Component: FirmSignup,
  },
  {
    path: "/firm/opportunities",
    Component: FirmOpportunities,
  },
  {
    path: "/firm/dashboard",
    Component: FirmDashboard,
  },
]);
