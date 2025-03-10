import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth/hook";
import { useToast } from "@/hooks/use-toast";
import { deleteComment, getComments } from "@/services/comments";
import { CommentData, EditCommentPayload } from "@/types";
import UserAvatar from "@/user-avatar";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
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
                  {isCommentOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          className="border-none rounded-lg"
                          onClick={() => {
                            setComment({ id_comment: comment.id_comment, content: comment.content });
                            setIsUpdate(true);
                          }}
                        >
                          <Ellipsis className="size-4 text-primary/70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-52 flex flex-col gap-1"
                        align="end"
                        forceMount
                      >
                        <Button
                          variant="ghost"
                          className="gap-2 w-full justify-start text-xs text-primary/70"
                          onClick={() => {
                            setComment({ id_comment: comment.id_comment, content: comment.content });
                            setIsUpdate(true);
                          }}
                        >
                          <PencilLine
                            strokeWidth={1.8}
                            className="size-4 text-blue-500"
                          />
                          Edit Comment
                        </Button>
                        <Button
                          variant="destructive"
                          className="gap-2 w-full justify-start bg-background text-xs"
                          onClick={() => handleDeleteComment(comment.id_comment)}
                        >
                          <Trash2
                            strokeWidth={1.8}
                            className="size-4 text-destructive"
                          />
                          Delete Comment
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
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
