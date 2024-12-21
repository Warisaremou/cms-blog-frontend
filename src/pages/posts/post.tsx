import CommentsList from "@/components/comments/comment-list";
import CommentForm from "@/components/forms/comments-form";
import { PostDataLoader } from "@/components/loaders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formateDate } from "@/lib/utils";
import { getPost } from "@/services/posts";
import { Post as PostType } from "@/types";
import UserAvatar from "@/user-avatar";
import { Image, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      getPost(id_post!)
        .then((response) => {
          setPost(response);
        })
        .catch((error) => {
          setError(error.response.data.message ?? error.message);
        });
    };

    fetchPost();
  }, [id_post]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  if (!post) {
    return <PostDataLoader />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:items-start board-content">
      {/* Section principale : Détails du post */}
      <div className="flex-1 bg-background flex flex-col gap-3 items-start">
        <Button
          variant="link"
          className="space-x-2 p-0 text-accent-foreground items-center"
          onClick={() => navigate(-1)}
        >
          <MoveLeft
            strokeWidth={1.5}
            className="size-5"
          />
          <span>Retour</span>
        </Button>

        <div className="space-y-4 w-full">
          <h1 className="font-bh-bold text-xl md:text-2xl">{post.title}</h1>
          <div className="h-auto overflow-hidden rounded-xl w-full">
            {post.image != "null" ? (
              <img
                src={post.image}
                alt="Blog Image"
                className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            ) : (
              <div className="bg-muted-foreground/15 flex items-center justify-center h-64 md:h-96 w-full">
                <Image
                  strokeWidth={1.3}
                  className="size-12 text-muted-foreground transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>
            )}
          </div>

          <p className="text-xs md:text-sm lg:text-base font-bh-medium text-primary/60">{post.content}</p>

          {post.user && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <UserAvatar
                  avatar={post.user.avatar}
                  firstname={post.user.firstname}
                  surname={post.user.surname}
                />
                <span className="text-sm font-bh-medium">{post.user.username}</span>
              </div>
              <span className="text-sm font-bh-medium text-primary/50">
                Published on: {formateDate(post.created_at.toLocaleString())}
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1">
            {post.categories.map((category) => (
              <Badge
                key={category.id_category}
                variant="secondary"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Section latérale : Commentaires */}
      <div className="bg-background border border-accent w-full lg:w-1/3 p-4 rounded-lg flex flex-col gap-5">
        {/* Liste des commentaires */}
        <h2 className="font-bold text-xl">Comments</h2>
        <CommentsList id_post={id_post} />
        <CommentForm />
      </div>
    </div>
  );
}
