import { useToast } from "@/hooks/use-toast";
import { getComments } from "@/services/comments";
import { CommentData } from "@/types";
import UserAvatar from "@/user-avatar";
import { useEffect, useState } from "react";

export default function CommentsList({ id_post }: { id_post: string | undefined }) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchComments = async () => {
    setIsLoading(true);
    if (id_post) {
      getComments(parseInt(id_post))
        .then((response) => {
          setComments(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: error.response.data.message ?? error.message,
          });
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <div
              key={comment.id_comment}
              className="border border-slate-200/50 bg-background rounded-xl p-2.5 flex items-start gap-2"
            >
              <UserAvatar
                avatar={comment.user.avatar}
                firstname={comment.user.firstname}
                surname={comment.user.surname}
                className="size-7 text-xs font-bh-semibold"
              />
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-bh-medium text-sm">{comment.user.username}</span>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400	text-center">No Comment added yet</p>
      )}
    </div>
  );
}
