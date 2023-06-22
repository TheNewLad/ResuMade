import { Basics } from "@/types/Resume";

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
}: Basics) => {
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
