import { useState } from "react";

type AddCommentProps = {
  postId: number; // ID du post auquel on ajoute un commentaire
  onCommentAdded: () => void; // Callback pour rafraîchir la liste des commentaires
};

export default function AddComment({ postId, onCommentAdded }: AddCommentProps) {
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      // Appel API pour ajouter le commentaire
      await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
      });
      setComment(""); // Réinitialise le champ
      onCommentAdded(); // Rafraîchit les commentaires
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="add-comment">
      <textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleAddComment}
        disabled={!comment.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add Comment
      </button>
    </div>
  );
}
