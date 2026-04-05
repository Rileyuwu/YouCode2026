import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Users, TrendingUp, CheckCircle, ArrowRight, Building2 } from "lucide-react";
import logo from "../../assets/623260c091783b7a7f316dbc6399aa584ae1e3a2.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollFadeUp, StaggerContainer, HoverCard, fadeUp } from "../components/animations";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <ImageWithFallback src={logo} alt="Connext" className="w-14 h-14" />
              <span className="text-lg text-foreground">Connext</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <Link to="/onboarding" className="text-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/onboarding"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            {["Turn", "community", "support", "into"].map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            {["sustained", "impact"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.32 + i * 0.1 }}
                className="inline-block mr-[0.3em] text-primary"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground max-w-5xl mx-auto mb-8 whitespace-nowrap"
          >
            Connecting nonprofits, volunteers, and professional partners to create meaningful change across British Columbia.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            {[
              { to: "/onboarding", icon: Heart, label: "Start a Campaign" },
              { to: "/volunteer/signup", icon: Users, label: "Find Volunteer Opportunities" },
              { to: "/firm/signup", icon: Building2, label: "Join as Partner Firm" },
            ].map(({ to, icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 + i * 0.12 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={to}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp className="text-center mb-12">
            <p className="text-3xl sm:text-4xl text-primary mb-3 font-bold">What is "Connext"?</p>
            <h2 className="text-lg sm:text-xl text-foreground mb-4 whitespace-nowrap">
              You have community support. But turning it into action is hard.
            </h2>
            <p className="text-lg text-muted-foreground">
              Many nonprofits already have public goodwill around them, but they lack the infrastructure to convert that goodwill into donations, donor relationships, and sustained support.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl text-center text-foreground mb-12">
              How It Works
            </h2>
          </ScrollFadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Campaign", desc: "Tell us your goals, budget, and what kind of support you need in just a few minutes." },
              { step: "2", title: "Get Matched with Support", desc: "We connect you with volunteers, student groups, or vetted outreach partners." },
              { step: "3", title: "Launch and Track Results", desc: "Accept donations, manage volunteers, and see your impact grow in real-time.", accent: true },
            ].map(({ step, title, desc, accent }) => (
              <motion.div key={step} variants={fadeUp} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`w-12 h-12 ${accent ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span>{step}</span>
                </motion.div>
                <h3 className="text-xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl text-center text-foreground mb-12">
              Built for Small Nonprofits
            </h2>
          </ScrollFadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { Icon: Users, title: "Simple and Easy to Use", desc: "No technical expertise needed. Set up campaigns and accept donations in minutes, not days." },
              { Icon: Heart, title: "Built with Care", desc: "Designed specifically for community organizations with limited time and resources." },
              { Icon: TrendingUp, title: "Turn Support into Sustainability", desc: "Enable monthly giving and build lasting relationships with your donors." },
              { Icon: CheckCircle, title: "Trusted and Transparent", desc: "All partners are vetted. You stay in control. Your data stays secure." },
            ].map(({ Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <HoverCard className="bg-card p-6 rounded-lg border border-border h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="inline-block mb-4"
                  >
                    <Icon className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-xl text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </HoverCard>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl text-center text-foreground mb-12">
              Trusted by Nonprofits Across BC
            </h2>
          </ScrollFadeUp>
          <StaggerContainer fast className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "This platform helped us launch our first fundraising campaign in under an hour. The monthly giving feature has been a game-changer.", name: "Sarah Chen", org: "Vancouver Youth Services" },
              { quote: "Finally, a tool that understands small nonprofits. The volunteer matching saved us weeks of coordination.", name: "Marcus Thompson", org: "Island Community Food Bank" },
              { quote: "Simple, trustworthy, and exactly what we needed. We've seen a 40% increase in recurring donors.", name: "Priya Sharma", org: "Fraser Valley Seniors Support" },
            ].map(({ quote, name, org }) => (
              <motion.div key={name} variants={fadeUp}>
                <HoverCard className="bg-card p-6 rounded-lg border border-border h-full">
                  <p className="text-muted-foreground mb-4">"{quote}"</p>
                  <div>
                    <p className="text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{org}</p>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-6">
              Accessible, Secure, and Easy to Use
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We prioritize accessibility, multilingual support, and data security. Your nonprofit deserves technology that works for everyone.
            </p>
          </ScrollFadeUp>
          <StaggerContainer fast className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["WCAG 2.1 Compliant", "Multilingual Support", "Secure Payments", "Mobile Optimized"].map((label) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ scale: 1.06 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{label}</span>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Launch your first campaign in minutes. No credit card required.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="inline-block"
            >
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Your Campaign
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: "Product", links: ["Features", "Pricing", "Case Studies"] },
              { title: "Resources", links: ["Help Center", "Guides", "Webinars"] },
              { title: "Company", links: ["About", "Contact", "Partners"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-foreground mb-3">{title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors hover:translate-x-0.5 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ImageWithFallback src={logo} alt="Connext" className="w-12 h-12" />
              <span>Connext</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Connext. Empowering nonprofits across BC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
