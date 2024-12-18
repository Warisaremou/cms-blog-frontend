import AddComment from "@/components/comments/add-comment";
import CommentsList from "@/components/comments/comment-list";
import PostActionSection from "@/components/sections/post-action-section";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<{
    title: string;
    content: string;
    image: string;
    author?: string;
    created_at?: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${id_post}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post");
        }
        const data = await response.json();
        setPost(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Une erreur inconnue s'est produite");
      }
    };

    fetchPost();
  }, [id_post]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <Button
          onClick={() => navigate(-1)}
          className="mt-4"
        >
          Retour
        </Button>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start h-full">
      {/* Section principale : Détails du post */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <Button
            variant="link"
            className="space-x-2 text-accent-foreground items-center"
            onClick={() => navigate(-1)}
          >
            <MoveLeft
              strokeWidth={1.5}
              className="size-5"
            />
            <span>Retour</span>
          </Button>

          <h1 className="font-bold text-2xl">{post.title || "Titre non disponible"}</h1>

          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto my-4 rounded-lg shadow-md"
            />
          ) : (
            <div className="text-gray-500 italic">Image non disponible</div>
          )}

          <p className="text-lg text-gray-700 my-4">{post.content || "Contenu non disponible."}</p>

          {post.author && post.created_at && (
            <div className="text-sm text-gray-500">
              <p>Par : {post.author}</p>
              <p>Publié le : {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </div>
        <PostActionSection />
      </div>

      {/* Section latérale : Commentaires */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
        {/* Liste des commentaires */}
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-4">Commentaires</h2>
          <CommentsList postId={Number(id_post)} />
        </div>

        {/* Ajouter un commentaire */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Ajouter un commentaire</h2>
          <AddComment
            postId={Number(id_post)}
            onCommentAdded={() => {
              // eslint-disable-next-line no-console
              console.log("Un commentaire a été ajouté.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
