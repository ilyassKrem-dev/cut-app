"use client";

import Image from "next/image";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import ProfileEditNameEmail from "./nameEmail";
import ProfileNumber from "./phoneInput";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";

import { isBase64Image } from "@/lib/utils";
import LoadingAnimation from "@/assets/other/spinner";
import { updateUser } from "@/lib/actions/user.action";

import EmailVerification from "../../shared/emailVerification";
interface UserProps {
  id: string;
  name: string;
  email: string;
  number: string;
  image: string;
}
interface UserInfo {
  name: string;
  email: string;
  number: string;
  image: {
    file: File[];
    url: string;
  };
}
export default function ProfileEdit({
  userDetails,
}: {
  userDetails: UserProps;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: userDetails.name,
    email: userDetails.email,
    number: userDetails.number,
    image: {
      file: [],
      url: userDetails.image,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { startUpload } = useUploadThing("media");
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const { toast } = useToast();
  const checkChange =
    userDetails.image == userInfo.image.url &&
    userDetails.name == userInfo.name &&
    userDetails.email == userInfo.email &&
    userDetails.number == userInfo.number;
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUserInfo((prev) => {
        return {
          ...prev,
          image: { ...prev.image, file: Array.from(e.target.files as any) },
        };
      });
      if (!file.type.includes("image")) return;
      fileReader.onload = (e) => {
        const img = e.target?.result?.toString() as string;
        setUserInfo((prev) => {
          return { ...prev, image: { ...prev.image, url: img } };
        });
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (checkChange || errorForm || loading) return;
    if (userDetails.email !== userInfo.email) {
      setShow(true);
      setLoading(false);
      return;
    }
    let imgeUrl = "";
    let oldImage = userDetails.image;

    const blob = isBase64Image(userInfo.image.url);
    if (blob) {
      const imgFile = await startUpload(userInfo.image.file);
      if (imgFile && imgFile[0].url) {
        imgeUrl = imgFile[0].url;
      }
    }

    try {
      const res = await updateUser({
        userId: userDetails.id,
        name: userInfo.name,
        email: userInfo.email,
        image: imgeUrl,
        number: userInfo.number,
      });
      if (res) {
        toast({
          title: "Updated",
          description: `Your info has been updated`,
        });
        window.location.href = "/profile";
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error.message}`,
      });
    }
  };
  useEffect(() => {
    function hideOverlay(e: any) {
      const overlay = document.querySelector(".verify-tab");
      if (overlay && !overlay.contains(e.target)) {
        setShow(false);
      }
    }
    document.body.addEventListener("click", hideOverlay);

    return () => document.body.removeEventListener("click", hideOverlay);
  }, []);
  return (
    <div className="relative min-h-screen md:py-20 py-20 px-4 flex items-center justify-center">
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-white to-blue-400 bg-clip-text text-transparent mb-3">
            Edit Profile
          </h1>
          <p className="text-white/60">Update your personal information</p>
        </div>

        {/* Main Form Card */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Avatar Upload Section */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-[160px] h-[160px] bg-black rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src={userInfo.image.url || "/profile.jpg"}
                  alt={`${userInfo.name} image` || "profile image"}
                  priority
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="image"
                className="absolute inset-0 rounded-full flex flex-col items-center justify-center text-base bg-black/40 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              >
                <FaCloudDownloadAlt className="text-3xl text-white mb-2" />
                <span className="text-sm font-semibold text-white">Upload</span>
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                name="image"
                id="image"
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="md:col-span-2">
              <ProfileEditNameEmail
                userEmail={userInfo.email}
                userName={userInfo.name}
                setUserInfo={setUserInfo}
                setErrorForm={setErrorForm}
              />
            </div>
            <div className="md:col-span-2">
              <ProfileNumber
                setUserInfo={setUserInfo}
                userNumber={userInfo.number}
                setErrorForm={setErrorForm}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href={"/profile"}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center"
            >
              Cancel
            </Link>
            <button
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={checkChange || errorForm || loading}
            >
              {loading ? (
                <>
                  <LoadingAnimation />
                </>
              ) : (
                <>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Email Verification Modal */}
      {show && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center bg-black/80 backdrop-blur-sm z-50 items-end md:items-center p-4 animate-in fade-in">
          <div className="bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:w-[500px] pt-6 md:pt-8 verify-tab animate-in slide-in-from-bottom">
            <EmailVerification
              email={userDetails.email}
              setShow={setShow}
              userInfo={userInfo}
              userDetails={userDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}
