"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${session.user.id}/prompt`);
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      }
    };
    session?.user.id && fetchPrompts();
  }, []);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfimed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfimed) {
      try {
        await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        })
          .then(() => {
            setPrompts(prompts.filter((post) => post._id !== prompt._id));
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
