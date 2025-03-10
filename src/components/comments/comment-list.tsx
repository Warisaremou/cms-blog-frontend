import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/hook";
import { useToast } from "@/hooks/use-toast";
import { deleteComment, getComments } from "@/services/comments";
import { CommentData, EditCommentPayload } from "@/types";
import UserAvatar from "@/user-avatar";
import { Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  id_post: string;
  setComment: Dispatch<SetStateAction<EditCommentPayload | null>>;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
};

export default function CommentsList({ id_post, setComment, setIsUpdate }: Props) {
  const [comments, setComments] = useState<CommentData[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { userData } = useAuth();

  const handleDeleteComment = async (id_comment: string) => {
    deleteComment(parseInt(id_comment))
      .then((response) => {
        toast({
          title: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
      });
  };

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
        <div className="flex flex-col gap-1.5">
          {comments.map((comment) => {
            const isCommentOwner = userData.id_user === comment.user.id_user;

            return (
              <div
                key={comment.id_comment}
                className="space-y-1"
              >
                <div className="border border-slate-200/50 bg-background rounded-xl p-2.5 flex items-start gap-2">
                  <UserAvatar
                    avatar={comment.user.avatar}
                    firstname={comment.user.firstname}
                    surname={comment.user.surname}
                    className="size-7 text-xs font-bh-semibold"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="font-bh-medium text-sm">{comment.user.username}</span>
                    <p className="text-xs md:text-sm text-primary/80">{comment.content}</p>
                  </div>
                </div>
                {isCommentOwner && (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-7 border-none rounded-lg"
                      onClick={() => {
                        setComment({ id_comment: comment.id_comment, content: comment.content });
                        setIsUpdate(true);
                      }}
                    >
                      <Pencil
                        strokeWidth={1.8}
                        className="size-4 text-blue-500"
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-7 border-none rounded-lg"
                      onClick={() => handleDeleteComment(comment.id_comment)}
                    >
                      <Trash2
                        strokeWidth={1.8}
                        className="size-4 text-destructive"
                      />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-400	text-center">No Comment added yet</p>
      )}
    </div>
  );
}
