import { faker } from "@faker-js/faker";
import { EducationType, ResumeType, WorkType } from "@/types/resume";

export const getResume = (): ResumeType => {
  // faker.seed(1);

  return {
    basics: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      url: faker.internet.domainName(),
      phone: faker.phone.number("(###) ###-####"),
      summary: faker.lorem.paragraph(5),
      location: {
        city: faker.location.city(),
        region: faker.location.state(),
      },
    },
    work: getWorkExperience(),
    education: getEducation(),
  };
};

const getWorkExperience = (): WorkType[] => {
  const workExperience: WorkType[] = [];
  for (let i = 0; i < 3; i++) {
    workExperience.push(getWork(i === 0));
  }
  return workExperience;
};

const getWork = (present: boolean = false): WorkType => {
  const endDate = present
    ? "Present"
    : faker.date.past().toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

  return {
    name: faker.company.name(),
    position: faker.person.jobTitle(),
    url: faker.internet.url(),
    startDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    endDate,
    highlights: Array.from({ length: 3 }, () =>
      faker.lorem.paragraph({ min: 1, max: 3 })
    ),
  };
};

const getEducation = (): EducationType[] => [
  {
    institution: `${faker.location.city()} University`,
    area: "Computer Science",
    studyType: "M.S.",
    startDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    endDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
  },
  {
    institution: `${faker.location.city()} University`,
    area: "Computer Science",
    studyType: "B.S.",
    startDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    endDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
  },
];

const getEducationItem = (): EducationType => {
  return {
    institution: "University",
    area: "Computer Science",
    studyType: "Bachelor",
    startDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
    endDate: faker.date.past().toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
  };
};
