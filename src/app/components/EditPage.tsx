"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import defaultProfile from "../assets/images/defaultProfile.jpg";
import defaultCover from "../assets/images/defaultCover.png";
import Notification from "./Notofication";

type FormType = {
  name: string;
  username: string;
  email: string;
  tagline: string;
};

const EditPage = ({ loggedUser }: { loggedUser: string }) => {
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormType>({
    name: "",
    username: "",
    email: "",
    tagline: "",
  });
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Handle image changes
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setImage: (value: string) => void,
    setFile: (value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormType
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const updatedFormData = new FormData();
    updatedFormData.append("name", formData.name);
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("tagline", formData.tagline);

    if (profileFile) {
      updatedFormData.append("avatar", profileFile);
    }
    if (coverFile) {
      updatedFormData.append("banner", coverFile);
    }

    try {
      const response = await fetch(`/api/update-profile/${loggedUser}`, {
        method: "POST",
        body: updatedFormData,
      });
      const data = await response.json();
      setMessage(data.message);

      setLoading(false);
    } catch (error) {
      console.error("Internal Server Error", error);
      setError(error.message || "Failed to update profile");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex items-start justify-center flex-col gap-y-8 w-full">
      {error && <Notification message={error} type="error" />}
      {message && <Notification message={message} type="success" />}

      {/* Cover Image */}
      <div className="mb-4 w-full">
        <label className="block font-medium">Cover Image (1911 x 441 px)</label>
        <div className="w-full h-62 bg-zinc-300 rounded-lg mt-2">
          <Image
            src={coverImage || defaultCover}
            alt="Cover Preview"
            height={100}
            width={100}
            className="w-full h-62 object-cover rounded-lg"
          />
        </div>
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          onChange={(e) => handleImageChange(e, setCoverImage, setCoverFile)}
        />
        <button
          onClick={() => coverInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2 cursor-pointer"
          disabled={loading}
        >
          📂 Upload File
        </button>
      </div>

      {/* Profile Image */}
      <div className="mb-4 w-full">
        <label className="block font-medium">Profile Image (1:1)</label>
        <div className="w-20 h-20 bg-zinc-300 rounded-full mt-2">
          <Image
            src={profileImage || defaultProfile}
            alt="Profile Preview"
            height={100}
            width={100}
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
        <input
          type="file"
          ref={profileInputRef}
          className="hidden"
          onChange={(e) =>
            handleImageChange(e, setProfileImage, setProfileFile)
          }
        />
        <button
          onClick={() => profileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2 cursor-pointer"
          disabled={loading}
        >
          📂 Upload File
        </button>
      </div>

      {/* Update Form */}
      <div className="flex flex-col gap-y-4 w-full">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => handleInputChange(e, "username")}
        />
        <input
          type="email"
          className="p-2 border rounded w-full"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter your tagline"
          value={formData.tagline}
          onChange={(e) => handleInputChange(e, "tagline")}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPage;
