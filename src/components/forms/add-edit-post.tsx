import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/contexts/categories/hook";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { addPostSchema } from "@/lib/validations/post";
import { addPost } from "@/services/posts/hooks";
import { addPostCredentials, Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";

export default function AddEditPostForm({ postData }: { postData?: Post | null }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoadingCategories, categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<addPostCredentials>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      categories: [1],
      title: "",
      image: null,
      content: "",
    },
    mode: "all",
  });

  // Charger les données du post pour modification
  useEffect(() => {
    const fetchPostData = async () => {
      await reset({
        //  title: postData.title,
        //  content: postData.content,
        //  categories: postData.categories,
      });
    };

    fetchPostData();
  }, [reset, postData]);

  const handleAddToSelectedCategories = (id_category: number) => {
    if (selectedCategories.includes(id_category)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== id_category));
    } else {
      setSelectedCategories([...selectedCategories, id_category]);
    }
  };

  const onSubmit = async (payload: addPostCredentials) => {
    if (selectedCategories.length === 0) {
      setError("categories", {
        type: "manual",
        message: "Please select at least one category",
      });
      return;
    }
    setIsLoading(true);
    payload.categories = selectedCategories;

    await addPost(payload)
      .then((response) => {
        toast({
          title: response.message,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate(`/${routes.posts.index}`);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-container !px-0"
    >
      <div className="space-y-3">
        {/* Categories field */}
        <div>
          <div className="form-input">
            <Label htmlFor="categories">Choose categories</Label>
            <div className="flex flex-wrap gap-1">
              {isLoadingCategories ? (
                <span>Loading</span>
              ) : (
                categories.data.map((category) => (
                  <Badge
                    variant="secondary"
                    key={category.id_category}
                    className={cn(
                      "cursor-pointer",
                      selectedCategories.includes(parseInt(category.id_category))
                        ? "bg-primary hover:bg-none! text-white"
                        : "",
                    )}
                    onClick={() => handleAddToSelectedCategories(parseInt(category.id_category))}
                  >
                    {category.name}
                  </Badge>
                ))
              )}
            </div>
          </div>
          {errors.categories && <InputError errorMessage={errors.categories.message} />}
        </div>

        {/* Post Title field */}
        <div>
          <div className="form-input">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post title"
              {...register("title")}
            />
          </div>
          {errors.title && <InputError errorMessage={errors.title.message} />}
        </div>

        {/* Post Image field */}
        <div>
          <div className="form-input">
            <Label htmlFor="title">Post image</Label>
            <div className="rounded-xl border-2 bg-background border-dashed border-input p-8">
              <div className="flex flex-col items-center justify-center gap-3">
                <ImagePlus
                  strokeWidth={1.4}
                  className="size-9 text-slate-400"
                />
                <div className="flex justify-center text-gray-500">
                  <label
                    htmlFor="file-upload"
                    className="text-xs"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="text-primary/60 focus:outline-none cursor-pointer"
                      {...register("image")}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {errors.image && <InputError errorMessage={errors.image.message} />}
        </div>

        {/* Post Content field */}
        <div>
          <div className="form-input">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Post content"
              rows={10}
              {...register("content")}
              className="resize-none"
            />
          </div>
          {errors.content && <InputError errorMessage={errors.content.message} />}
        </div>
      </div>

      <Button
        className="w-fit"
        type="submit"
        size="lg"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Add Post
      </Button>
    </form>
  );
}
