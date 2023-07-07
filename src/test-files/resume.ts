import { faker } from "@faker-js/faker";
import { ResumeType, WorkType } from "@/types/resume";

export const getResume = (): ResumeType => {
  faker.seed(1);
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
    highlights: [faker.lorem.sentence()],
  };
};
