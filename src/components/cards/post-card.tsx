import postImage from "@/assets/images/blog-image.avif";
import userImage from "@/assets/images/user-avatar.png";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function PostCard() {
  return (
    <Link
      to={`${routes.posts.index}/123`}
      className="group relative flex flex-col gap-y-4 rounded-2xl border border-slate-200/50 bg-background p-2.5 transition-colors duration-200 ease-in-out hover:bg-secondary/70 focus-visible:outline-none"
    >
      <div className="h-56 overflow-hidden rounded-xl">
        <img
          src={postImage}
          alt="Blog Image"
          className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-4">
          <div className="flex gap-1">
            <Badge variant="secondary">Design</Badge>
            <Badge variant="secondary">Productivity</Badge>
            <Badge variant="secondary">+1</Badge>
          </div>
          <span className="text-sm font-medium text-foreground/80">3 min read</span>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-semibold">Grid system for better design user interface</h3>
          <p className="text-sm text-foreground/80">
            A grid system is a design tool used to arrange content on a webpage.
          </p>
        </div>
        <div className="flex items-center gap-x-2.5 text-sm font-medium text-primary/60">
          <div className="flex items-center gap-1.5">
            <div className="size-8 overflow-hidden rounded-full bg-slate-300">
              <img
                src={userImage}
                alt="user-avatar"
                className="size-full object-cover"
              />
            </div>
            <span>ikk08</span>
          </div>
          <div className="size-1.5 rounded-full bg-primary/30" />
          <span>19 Jun, 2024</span>
        </div>
      </div>
    </Link>
  );
}
