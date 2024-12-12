import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function Home() {
  return (
    <Header
      title="Join Our Community!"
      description="Discover inspiring articles, practical tips, and expert advice. Share your ideas, connect with enthusiasts, and stay updated with our latest posts by subscribing today!"
      className="flex-1"
    >
      <Button
        asChild
        className="border border-muted-foreground/15 max-sm:hidden"
      >
        <Link to={routes.posts.addPost}>Share a Post</Link>
      </Button>
    </Header>
  );
}
