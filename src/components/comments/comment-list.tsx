import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/hook";
import { useToast } from "@/hooks/use-toast";
import { deleteComment, getComments } from "@/services/comments";
import { CommentData } from "@/types";
import UserAvatar from "@/user-avatar";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CommentsList({ id_post }: { id_post: string | undefined }) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isDeletingComment, setIsDeletingComment] = useState(true);
  const { toast } = useToast();
  const { userData } = useAuth();

  const handleDeleteComment = async (id_comment: string) => {
    // console.log(id_comment);
    // setIsDeletingComment(true);
    deleteComment(parseInt(id_comment))
      .then((response) => {
        toast({
          title: response.message,
        });
        // setIsDeletingComment(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        // setIsDeletingComment(false);
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
          {comments.map((comment) => (
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
              {userData.id_user == comment.user.id_user && (
                <div className="flex justify-end gap-2">
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
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400	text-center">No Comment added yet</p>
      )}
    </div>
  );
}
