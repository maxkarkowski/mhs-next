import { getEventBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  const openGraph = {
    type: "website",
    url: `${process.env.FE_URL}/events/${event.slug}`,
    title: event.title,
    description: event.excerpt
      ? event.excerpt.replace(/(<([^>]+)>)/gi, "")
      : undefined,
    siteName: event.title,
    images: [
      {
        url: event.image ? event.image.url : "",
      },
    ],
  };
  return {
    title: event.title,
    openGraph: openGraph,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  console.log("EVENT", event);
  return (
    <Section>
      <Container>
        <BackButton />
        {event.image && (
          <div className="relative block h-[220px] w-full">
            <Image
              src={event.image.url}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {event?.end_date}
        <h1 className="pt-12">{event.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
        {event.categories.map((cat: any) => (
          <div key={cat.id}>{cat.name}</div>
        ))}
        {event.organizer.map((org: any) => (
          <div key={org.id}>
            {org.email}
            {org.organizer}
          </div>
        ))}

        {event.venue.venue}
        {event.venue.address}
      </Container>
    </Section>
  );
}
