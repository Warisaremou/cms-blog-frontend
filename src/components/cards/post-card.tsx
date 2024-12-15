import userImage from "@/assets/images/user-avatar.png";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { formateDate } from "@/lib/utils";
import { Post } from "@/types";
import { Image } from "lucide-react";
import { Link } from "react-router";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      to={`/${routes.posts.index}/${post.id_post}`}
      className="group relative flex flex-col gap-y-4 rounded-2xl border border-slate-200/50 bg-background p-2.5 transition-colors duration-200 ease-in-out hover:bg-secondary/70 focus-visible:outline-none"
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
        <div className="flex items-center gap-1">
          <Badge variant="secondary">Design</Badge>
          <Badge variant="secondary">Health</Badge>
          <Badge variant="secondary">+1</Badge>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
        </div>
        <div className="flex items-center gap-x-2.5 text-sm justify-between font-medium text-primary/60">
          <div className="flex items-center gap-1.5">
            <div className="size-8 overflow-hidden rounded-full bg-accent border">
              <img
                src={userImage}
                alt="user-avatar"
                className="size-full object-cover"
              />
            </div>
            <span>ikk08</span>
          </div>
          <span>{formateDate(post.created_at.toLocaleString())}</span>
        </div>
      </div>
    </Link>
  );
}
