import Image from "next/image";
import { User, Building2 } from "lucide-react";

// Shared by ArticleByline, GuestArticleFrame's author box, and
// /authors/[slug] — one place for the photo-vs-placeholder logic so all
// three stay visually consistent. image_url can be null (MoneyAid's
// contract: "no photo yet") — renders a generic person/building icon
// instead of leaving an empty slot.
export default function AuthorAvatar({ author, size = 44, className = "" }) {
  const isOrganization = author.author_type === "organization";
  const shapeClass = isOrganization ? "rounded-md" : "rounded-full";
  const Icon = isOrganization ? Building2 : User;

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center ${shapeClass} ${className}`}
      style={{ width: size, height: size }}
    >
      {author.image_url ? (
        <Image src={author.image_url} alt={author.name} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <Icon className="text-slate-400" style={{ width: size * 0.5, height: size * 0.5 }} />
      )}
    </div>
  );
}
