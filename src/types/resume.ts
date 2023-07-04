// export type ProfileType = {
//   network: string;
//   username: string;
//   url: string;
// };

export type LocationType = {
  // address: string;
  // postalCode: string;
  city: string;
  // countryCode: string;
  region: string;
};

export type BasicsType = {
  name: string;
  // label?: string;
  // image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: LocationType;
  // profiles?: Profile[];
};

export type WorkType = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

export type VolunteerType = {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

export type EducationType = {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

export type AwardType = {
  title: string;
  date: string;
  awarder: string;
  summary: string;
};

export type CertificateType = {
  name: string;
  date: string;
  issuer: string;
  url: string;
};

export type PublicationType = {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
};

export type SkillType = {
  name: string;
  level: string;
  keywords: string[];
};

export type LanguageType = {
  language: string;
  fluency: string;
};

export type InterestType = {
  name: string;
  keywords: string[];
};

export type ReferenceType = {
  name: string;
  reference: string;
};

export type ProjectType = {
  name: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  url: string;
};

export type ResumeType = {
  basics: BasicsType;
  // work?: Work[];
  // volunteer?: Volunteer[];
  // education?: Education[];
  // awards?: Award[];
  // certificates?: Certificate[];
  // publications?: Publication[];
  // skills?: Skill[];
  // languages?: Language[];
  // interests?: Interest[];
  // references?: Reference[];
  // projects?: Project[];
};
