// // src/components/comments/CommentsSection.tsx
// import { useToast } from "@/hooks/use-toast";
// import { addComment, getComments } from "@/services/posts/hooks";
// import { Comment } from "@/types";
// import { useEffect, useState } from "react";

// type CommentsSectionProps = {
//   postId: number;
// };

// export default function CommentsSection({ postId }: CommentsSectionProps) {
//   const { toast } = useToast();
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // Récupérer les commentaires pour un post
//   useEffect(() => {
//     getComments(postId)
//       .then((data) => setComments(data))
//       .catch((error) => {
//         toast({
//           variant: "destructive",
//           title: error.response?.data?.message || error.message,
//         });
//       })
//       .finally(() => setIsLoading(false));
//   }, [postId]);

//   // Ajouter un commentaire
//   function handleAddComment() {
//     if (!newComment.trim()) return;

//     addComment(postId, { author: "Anonymous", content: newComment })
//       .then((comment) => {
//         setComments((prev) => [...prev, comment]);
//         setNewComment("");
//       })
//       .catch((error) =>
//         toast({
//           variant: "destructive",
//           title: error.response?.data?.message || error.message,
//         }),
//       );
//   }

//   return (
//     <div className="comments-section">
//       <h3>Comments</h3>
//       {isLoading ? (
//         <p>Loading comments...</p>
//       ) : (
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment.id}>
//               <p>
//                 <strong>{comment.author}</strong>: {comment.content}
//               </p>
//               <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="add-comment">
//         <textarea
//           placeholder="Write a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           onClick={handleAddComment}
//           disabled={!newComment.trim()}
//         >
//           Add Comment
//         </button>
//       </div>
//     </div>
//   );
// }
