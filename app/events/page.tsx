import { getAllEvents } from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container } from "@/components/craft";
import PostCard from "@/components/posts/post-card";
import EventCard from "@/components/events/event-card";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { author, tag, category, page: pageParam } = searchParams;
  const events = await getAllEvents({ author, tag, category });
  console.log("events", events[0]);
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const eventsPerPage = 9;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginatedEvents = events.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  return (
    <Section>
      <Container>
        <h1>Events</h1>

        {paginatedEvents.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 z-0">
            {paginatedEvents.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
            <p>No Results Found</p>
          </div>
        )}

        <div className="mt-8 not-prose">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={page === 1 ? "pointer-events-none text-muted" : ""}
                  href={`/events?page=${Math.max(page - 1, 1)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/events?page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page === totalPages ? "pointer-events-none text-muted" : ""
                  }
                  href={`/events?page=${Math.min(page + 1, totalPages)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </Section>
  );
}
