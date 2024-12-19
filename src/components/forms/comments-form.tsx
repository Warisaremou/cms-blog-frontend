import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; // Schéma de validation Zod
import { commentSchema } from "@/lib/validations/comment";
import { addComment } from "@/services/comments";
import { Comment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
// import { addComment } from "@/services/comments";

export default function CommentForm() {
  const { toast } = useToast();
  const { id_post } = useParams();
  // const { CommentData } = addComment();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      id_post: 0,
      content: "",
    },
    mode: "all",
  });

  useEffect(() => {
    const fecthData = async () => {
      reset({
        id_post: parseInt(id_post!),
      });
    };
    fecthData();
  }, [reset]);

  const onSubmit = async (data: Comment) => {
    setIsLoading(true);
    await addComment(data)
      .then((response) => {
        toast({
          title: response.message,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="space-y-5">
      {/* User avatar
        <AvatarUpload userData={userData} /> */}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container !px-0"
      >
        <div className="space-y-3">
          {/* Content field */}
          <div>
            <div className="form-input">
              <Textarea
                id="content"
                placeholder="Add your comment"
                rows={4}
                {...register("content")}
                className="resize-none"
              />
            </div>
            {errors.content && <InputError errorMessage={errors.content.message} />}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader2
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Comment
        </Button>
      </form>
    </div>
  );
}
