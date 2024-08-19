"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

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

  const handleEdit = () => {};

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div>
      <Profile
        name='My'
        desc="Welcome to your profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDeleteh}
      />
    </div>
  );
};

export default MyProfile;
