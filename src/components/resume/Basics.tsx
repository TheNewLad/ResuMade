import { Basics as BasicsType } from "@/types/resume";

export const Basics = ({
  name,
  image,
  label,
  url,
  phone,
  location,
  summary,
  profiles,
  email,
}: BasicsType) => {
  return (
    <section>
      <h1>{name}</h1>
      <p>{image}</p>
      <p>{label}</p>
      <p>{url}</p>
      <p>{phone}</p>
      {/*<p>{location}</p>*/}
      <p>{summary}</p>
      {/*<p>{profiles}</p>*/}
      <p>{email}</p>
    </section>
  );
};
