export type SupportedLanguage = "es" | "en" | "pt";

// Technology types
export interface Technology {
  name: string;
  category: string;
  years: string;
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
}

export interface TechStackTexts {
  title: string;
  clickHint: string;
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
