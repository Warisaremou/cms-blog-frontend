import CategoriesListSelect from "@/components/categories-list-select";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { addPostSchema } from "@/lib/validations/post";
import { addPost } from "@/services/posts/hooks";
import { addPostCredentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function AddEditPostForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (payload: addPostCredentials) => {
    setIsLoading(true);

    console.log(payload);

    await addPost(payload)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        toast({
          title: response.message,
        });
        navigate(`/${routes.posts.index}`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-container"
    >
      <div className="space-y-3">
        {/* Categories field */}
        <div>
          <div className="form-input">
            <Label htmlFor="categories">Select categories</Label>
            <CategoriesListSelect placeholder="Select categories" />
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
            <div className="rounded-xl border-2 border-dashed border-input p-8">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex justify-center text-gray-500 pb-1">
                  <label
                    htmlFor="file-upload"
                    className="text-[11px] relative cursor-pointer rounded focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-color focus-within:ring-offset-2"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="text-gray-500 focus:ring-0 cursor-pointer"
                      // onChange={(e) => handleFileChange(e)}
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
