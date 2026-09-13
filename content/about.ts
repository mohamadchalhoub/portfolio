export interface AboutFacts {
  location: string;
  languages: string[];
  activeSince: number;
}

export interface AboutContent {
  heading: string;
  bio: string;
  facts: AboutFacts;
}

export const ABOUT: AboutContent = {
  heading: "About",
  // TODO(Mohamad): replace with your own words. This placeholder is a
  // strictly factual sentence built only from your CV (role, domains,
  // location, years active) — no personality claims or narrative have
  // been invented, but it's a stand-in for your own bio, not final copy.
  bio: "Mohamad Chalhoub is a Beirut-based software engineer and security specialist, building full-stack products since 2017.",
  facts: {
    location: "Beirut, Lebanon",
    languages: ["Arabic (native)", "English", "French (B2)"],
    activeSince: 2017,
  },
};
