import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/hook";
import { JoinUsIcon } from "@/icons";
import { routes } from "@/lib/routes";
import { useNavigate } from "react-router";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="board-content flex-1 flex flex-col justify-center">
      <Header
        title="Join Our Community!"
        description="Discover inspiring articles, practical tips, and expert advice. Share your ideas, connect with enthusiasts, and stay updated with our latest posts by subscribing today!"
      >
        <Button
          className="border gap-1.5 border-muted-foreground/15 max-sm:hidden"
          onClick={() => navigate(`/${isAuthenticated ? `posts/${routes.posts.addPost}` : routes.auth.login}`)}
        >
          <JoinUsIcon />
          Share a Post
        </Button>
      </Header>
    </div>
  );
}
