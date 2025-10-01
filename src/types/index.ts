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

export interface Certification {
  name: string;
  issuer: string;
  credentialId?: string;
  year: number;
  month: string;
  skills: string[];
}

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  tech: string[];
}

export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  period: string;
  technologies: string[];
}

export interface SideProject {
  name: string;
  url: string;
  status: string;
  commitment: string;
  year: string;
  technologies: string[];
  role: string;
}

export interface BaseTexts {
  [key: string]: string | BaseTexts;
}

export interface MenuTexts {
  cvText: string;
  cvSubtitle: string;
  emailTitle: string;
  emailSubtitle: string;
  linkedinTitle: string;
  linkedinSubtitle: string;
  githubTitle: string;
  githubSubtitle: string;
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
  counterText: string;
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

export interface SideProjectsTexts {
  title: string;
  description: string;
}

export type CustomEventType = "toggleTheme" | "themeChanged";

export interface ThemeChangedDetail {
  isDark: boolean;
}

export interface CustomEventMap {
  toggleTheme: CustomEvent<void>;
  themeChanged: CustomEvent<ThemeChangedDetail>;
}
