import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { cn, formateDate } from "@/lib/utils";
import { deletePost } from "@/services/posts";
import { Post } from "@/types";
import UserAvatar from "@/user-avatar";
import { Image, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

type Props = {
  post: Post;
  withAction?: boolean;
};

export default function PostCard({ post, withAction = false }: Props) {
  const { toast } = useToast();
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const navigate = useNavigate();

  const handlePostDelete = (id_post: string) => {
    setIsDeletingPost(true);
    deletePost(parseInt(id_post))
      .then((response) => {
        toast({
          title: response.message,
        });
        setIsDeletingPost(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsDeletingPost(false);
      });
  };

  return (
    <Link
      aria-disabled={isDeletingPost}
      to={`/${routes.posts.index}/${post.id_post}`}
      className={cn(
        "group relative flex flex-col gap-y-4 rounded-2xl border border-slate-200/50 bg-background p-2.5 transition-colors duration-200 ease-in-out hover:bg-secondary/70 focus-visible:outline-none",
        isDeletingPost && "opacity-50 pointer-events-none cursor-not-allowed",
      )}
    >
      <div className="h-56 overflow-hidden rounded-xl">
        {post.image != "null" ? (
          <img
            src={post.image}
            alt="Blog Image"
            className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="bg-muted-foreground/15 size-full flex items-center justify-center">
            <Image
              strokeWidth={1.3}
              className="size-12 text-muted-foreground transition-transform duration-700 ease-in-out group-hover:scale-110"
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
          <span className="text-sm">{formateDate(post.created_at.toLocaleString())}</span>
        </div>
      </div>

      {/* Actions */}
      {withAction && (
        <div className="absolute p-2.5 hidden group-hover:grid inset-0 bg-primary/25 rounded-2xl grid-cols-2 items-end gap-2 transition-all ease-in-out">
          <Button
            variant="secondary"
            className="hover:bg-secondary"
            disabled={isDeletingPost}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/posts/${post.id_post}/edit`);
            }}
          >
            Update
          </Button>
          <Button
            variant="destructive"
            className="bg-destructive text-background hover:bg-destructive"
            disabled={isDeletingPost}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePostDelete(post.id_post);
            }}
          >
            {isDeletingPost && (
              <Loader2
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </div>
      )}
    </Link>
  );
}
