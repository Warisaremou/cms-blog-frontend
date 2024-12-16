import PostActionSection from "@/components/sections/post-action-section";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();
  const navigate = useNavigate();

  return (
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
        <span>Go Back</span>
      </Button>

      <h1 className="font-bh-semibold">Post {id_post}</h1>

      {/* Post Action */}
      <PostActionSection />
    </div>
  );
}
