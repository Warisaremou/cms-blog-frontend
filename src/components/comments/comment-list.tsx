import { getComments } from "@/services/comments";
import { CommentData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CommentsList() {
  const { id_post } = useParams();
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
    <div className="comments-list">
      <h3>Comments</h3>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id_comment}
              className="border-b py-2"
            >
              <p>{comment.content}</p>
              {/* <p>
                <strong>{comment.author}</strong>: {comment.content}
              </p> */}
              {/* <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}
