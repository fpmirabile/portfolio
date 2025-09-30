export type SupportedLanguage = "es" | "en" | "pt";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Technology {
  name: string;
  category: string;
  years: string;
  description?: string;
  level?: SkillLevel;
  projects?: string[];
}

// Certification types
export interface Certification {
  name: string;
  issuer: string;
  type: string;
  year: string;
}

// Journey types
export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  tech: string[];
}

// Component Props types
export interface BaseTexts {
  [key: string]: string | BaseTexts;
}

export interface MenuTexts {
  cvText: string;
  themeText: string;
  themes: {
    light: string;
    dark: string;
  };
}

export interface HeroTexts {
  roleText: string;
  descriptionText: string;
  downloadCVText: string;
  contactText: string;
  yearsExpText: string;
  countriesText: string;
}

export interface EducationTexts {
  educationTitle: string;
  educationDesc: string;
  academicTitle: string;
  certificationsTitle: string;
  degree: {
    type: string;
    name: string;
    institution: string;
    location: string;
    graduationDate: string;
  };
}

export interface TechStackTexts {
  title: string;
  clickHint: string;
  overlay: {
    levelLabel: string;
    descriptionLabel: string;
    projectsLabel: string;
    closeButton: string;
    yearsText: string;
  };
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
    expert: string;
  };
}

export interface JourneyTexts {
  title: string;
  description: string;
}

// Event types
export type CustomEventType =
  | "downloadCV"
  | "toggleTheme"
  | "themeChanged"
  | "toggleLanguage";

export interface ThemeChangedDetail {
  isDark: boolean;
}

export interface CustomEventMap {
  downloadCV: CustomEvent<void>;
  toggleTheme: CustomEvent<void>;
  themeChanged: CustomEvent<ThemeChangedDetail>;
  toggleLanguage: CustomEvent<void>;
}
