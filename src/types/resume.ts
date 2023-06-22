export type Profile = {
  network: string;
  username: string;
  url: string;
};

export type Location = {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};

export type Basics = {
  name?: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
};

export type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

export type Volunteer = {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

export type Award = {
  title: string;
  date: string;
  awarder: string;
  summary: string;
};

export type Certificate = {
  name: string;
  date: string;
  issuer: string;
  url: string;
};

export type Publication = {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
};

export type Skill = {
  name: string;
  level: string;
  keywords: string[];
};

export type Language = {
  language: string;
  fluency: string;
};

export type Interest = {
  name: string;
  keywords: string[];
};

export type Reference = {
  name: string;
  reference: string;
};

export type Project = {
  name: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  url: string;
};

export type Resume = {
  basics?: Basics;
  work?: Work[];
  volunteer?: Volunteer[];
  education?: Education[];
  awards?: Award[];
  certificates?: Certificate[];
  publications?: Publication[];
  skills?: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
  projects?: Project[];
};
