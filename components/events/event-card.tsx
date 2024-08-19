import Image from "next/image";
import Link from "next/link";

import { Event } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

export default async function EventCard({ event }: { event: Event }) {
  const date = new Date(event.start_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all"
      )}
    >
      <div className="flex flex-col gap-4">
        <div
          dangerouslySetInnerHTML={{ __html: event.title }}
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
      </div>
      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          {event.categories.map((cat: any) => (
            <div key={cat.id}>{cat.name}</div>
          ))}
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
