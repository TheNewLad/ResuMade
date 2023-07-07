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
    workExperience.push(getWork());
  }
  return workExperience;
};

const getWork = (): WorkType => {
  return {
    name: faker.company.name(),
    position: faker.person.jobTitle(),
    url: faker.internet.url(),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.past().toISOString(),
    highlights: [faker.lorem.sentence()],
  };
};
