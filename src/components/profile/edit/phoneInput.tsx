import { ChangeEvent, SetStateAction, useState } from "react";

import z from "zod";

const PhoneSchema = z.string().length(9);

export default function ProfileNumber({
  userNumber,
  setUserInfo,
  setErrorForm,
}: {
  userNumber: string;
  setUserInfo: React.Dispatch<SetStateAction<any>>;
  setErrorForm: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [phoneErrorCss, setPhoneErrorCss] = useState<boolean>(false);

  const valdiatePhone = (value: string) => {
    if (value.trim().length === 0) {
      setPhoneErrorCss(false);
    } else {
      try {
        PhoneSchema.parse(value);
        setErrorForm(false);
        setPhoneErrorCss(false);
      } catch (error) {
        setErrorForm(true);
        setPhoneErrorCss(true);
      }
    }
  };
  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    if (phoneErrorCss) setPhoneErrorCss(false);
    const input = e.target.value;
    if (/^[1-9]{0,9}$/.test(input)) {
      setUserInfo((prev: any) => {
        return { ...prev, number: input };
      });
      valdiatePhone(input);
    }
  };
  return (
    <div className="flex flex-col gap-2 flex-1 w-full">
      <label htmlFor="phone" className="text-sm font-semibold text-white/80">
        Phone Number
      </label>
      <div className="relative">
        <input
          autoComplete="on"
          name={userNumber}
          id="phone"
          value={userNumber}
          onChange={handleChangePhone}
          type="text"
          className={`w-full h-11 text-white rounded-xl focus:outline-none px-4 pl-16 bg-white/5 transition-all duration-300 ${
            phoneErrorCss
              ? "border-2 border-amber-500/50 bg-amber-500/5"
              : "border border-white/10 focus:border-white/30 focus:bg-white/10"
          }`}
          placeholder="123456789"
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-white/60 font-medium text-sm">
          +212
        </div>
      </div>
      {phoneErrorCss && (
        <p className="text-xs text-amber-400">Phone must be 9 digits</p>
      )}
    </div>
  );
}
