import { getEventBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";

import BackButton from "@/components/back";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  console.log("evet", event);
  return {
    title: event.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  console.log(event);
  return (
    <Section>
      <Container>
        <BackButton />
        {event?.end_date}
        <h1 className="pt-12">{event.title}</h1>
        {event.categories.map((cat: any) => (
          <div key={cat.id}>{cat.name}</div>
        ))}
        {event.organizer.map((org: any) => (
          <div key={org.id}>
            ss{org.email}
            {org.organizer}
          </div>
        ))}

        {event.venue.venue}
        {event.venue.address}
      </Container>
    </Section>
  );
}
