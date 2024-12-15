import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { formateDate } from "@/lib/utils";
import { Post } from "@/types";
import UserAvatar from "@/user-avatar";
import { Image } from "lucide-react";
import { Link } from "react-router";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      to={`/${routes.posts.index}/${post.id_post}`}
      className="group relative flex flex-col gap-y-4 justify-between rounded-2xl border border-slate-200/50 bg-background p-2.5 transition-colors duration-200 ease-in-out hover:bg-secondary/70 focus-visible:outline-none"
    >
      <div className="h-56 overflow-hidden rounded-xl">
        {post.image ? (
          <img
            src={post.image}
            alt="Blog Image"
            className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="bg-muted-foreground/15 size-full flex items-center justify-center">
            <Image
              strokeWidth={1.3}
              className="size-12 text-muted-foreground text transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-wrap items-center gap-1">
          {post.categories.slice(0, 2).map((category) => (
            <Badge
              key={category.id_category}
              variant="secondary"
            >
              {category.name}
            </Badge>
          ))}
          {post.categories.length > 2 && <Badge variant="secondary">+1</Badge>}
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
        </div>
        <div className="flex items-center gap-x-2.5 text-sm justify-between  text-primary/60">
          <div className="flex items-center gap-1.5">
            <UserAvatar
              avatar={post.user.avatar}
              firstname={post.user.firstname}
              surname={post.user.surname}
            />
            <span className="font-bh-medium">{post.user.username}</span>
          </div>
          <span>{formateDate(post.created_at.toLocaleString())}</span>
        </div>
      </div>
    </Link>
  );
}
