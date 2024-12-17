import ProfileForm from "@/components/forms/profile-form";

export default function Profile() {
  return (
    <div className="flex flex-col gap-5 px-2 md:px-8 max-w-2xl w-full mx-auto board-content">
      <h1 className="text-2xl font-bh-bold">Profile</h1>
      <ProfileForm />
    </div>
  );
}
