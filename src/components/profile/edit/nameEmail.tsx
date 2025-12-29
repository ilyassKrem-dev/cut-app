import { Input } from "@/components/ui/input";
import { ChangeEvent, SetStateAction, useState } from "react";
import z from "zod";

interface Props {
  userName: string;
  userEmail: string;
  setUserInfo: React.Dispatch<SetStateAction<any>>;
  setErrorForm: React.Dispatch<SetStateAction<boolean>>;
}

const EmailSchema = z.string().email().min(1);
const NameSchema = z.string().min(4).max(15);

export default function ProfileEditNameEmail({
  userName,
  userEmail,
  setUserInfo,
  setErrorForm,
}: Props) {
  const [emailErrorCss, setEmailErrorCss] = useState<boolean>(false);
  const [nameErrorCss, setNameErrorCss] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (emailError) setEmailError("");
    setUserInfo((prev: any) => {
      return { ...prev, email: e.target.value };
    });
    validateEmail(e.target.value);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (nameErrorCss) setNameErrorCss(false);
    setUserInfo((prev: any) => {
      return { ...prev, name: e.target.value };
    });
    valdiateName(e.target.value);
  };

  const valdiateName = (value: string) => {
    if (value.trim().length === 0) {
      setNameErrorCss(false);
    } else {
      try {
        NameSchema.parse(value);
        setErrorForm(false);
        setNameErrorCss(false);
      } catch (error) {
        setErrorForm(true);
        setNameErrorCss(true);
      }
    }
  };

  const validateEmail = (value: string) => {
    if (value.trim().length === 0) {
      setEmailErrorCss(false);
    } else {
      try {
        EmailSchema.parse(value);
        setErrorForm(false);
        setEmailErrorCss(false);
      } catch (error) {
        setErrorForm(true);
        setEmailErrorCss(true);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-white/80">
          Full Name
        </label>
        <Input
          id="name"
          name={userName}
          value={userName}
          onChange={handleChangeName}
          type="text"
          autoComplete="off"
          placeholder="John Doe"
          className={`bg-white/5 text-white placeholder-white/40 focus-visible:ring-0 focus-visible:bg-white/10 border rounded-xl px-4 py-3 transition-all duration-300 ${
            nameErrorCss
              ? "border-amber-500/50 bg-amber-500/5"
              : "border-white/10 focus-visible:border-white/30"
          }`}
        />
        {nameErrorCss && (
          <p className="text-xs text-amber-400">Name must be 4-15 characters</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-white/80">
          Email Address
        </label>
        <Input
          id="email"
          name={userEmail}
          value={userEmail}
          onChange={handleChangeEmail}
          type="email"
          autoComplete="off"
          placeholder="you@example.com"
          className={`bg-white/5 text-white placeholder-white/40 focus-visible:ring-0 focus-visible:bg-white/10 border rounded-xl px-4 py-3 transition-all duration-300 ${
            emailErrorCss
              ? "border-amber-500/50 bg-amber-500/5"
              : "border-white/10 focus-visible:border-white/30"
          }`}
        />
        {emailErrorCss && (
          <p className="text-xs text-amber-400">Please enter a valid email</p>
        )}
      </div>
    </>
  );
}
