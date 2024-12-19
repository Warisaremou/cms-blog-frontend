import { getComments } from "@/services/comments";
import { CommentData } from "@/types";
import { useEffect, useState } from "react";

export default function CommentsList({ id_post }: { id_post: string | undefined }) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    if (id_post) {
      getComments(parseInt(id_post))
        .then((response) => {
          console.log(response);
          setComments(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
              className="border border-slate-200/50 bg-background rounded-lg p-2.5"
            >
              <p className="text-sm">{comment.content}</p>
              {/* <p>
                <strong>{comment.author}</strong>: {comment.content}
              </p> */}
              {/* <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400	text-center">No Comment added yet</p>
      )}
    </div>
  );
}
