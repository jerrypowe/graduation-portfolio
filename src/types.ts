export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
  paperColor?: 'yellow' | 'white' | 'blue' | 'pink';
  tapeColor?: 'yellow' | 'red' | 'blue' | 'dark';
  rotation?: string;
}

export interface SkillCategory {
  title: string;
  badge: string;
  skills: {
    name: string;
    icon?: string;
    note?: string;
    tag?: string;
  }[];
}

export interface GraduateProfile {
  name: string;
  handwrittenName: string;
  role: string;
  university: string;
  universityShort: string;
  address: string;
  degree: string;
  gradYear: string;
  date: string;
  time: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  bioShort: string;
  bioLong: string[];
  goals: string[];
  interests: string[];
}
