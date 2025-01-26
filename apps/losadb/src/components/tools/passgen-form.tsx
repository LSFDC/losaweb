"use client";

import { useState } from "react";

import { Input } from "@losaweb/ui/components/input";
import { Button } from "@losaweb/ui/components/button";
import { DecryptPassword, EncryptPassword } from "@/lib/losatools/ioppass";

const EncryptPassForm = () => {
  const [pass, setPass] = useState("");
  const [passEncrypted, setPassEncrypted] = useState("");

  const handleEncrypt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = "";
    if (!pass) {
      setPassEncrypted("");
      setPass("");
      return;
    }
    result = EncryptPassword(pass);
    setPassEncrypted(result);
  };

  const handleReset = () => {
    setPass("");
    setPassEncrypted("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={handleEncrypt}
        onReset={handleReset}
        className="flex flex-col gap-3"
      >
        <Input value={pass} onChange={handleInputChange} />
        {passEncrypted && <Input value={passEncrypted} readOnly />}
        <div className="flex gap-2">
          <Button type="submit">Encrypt</Button>
          <Button type="reset" variant={"destructive"}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

const DecryptPassForm = () => {
  const [passEncrypted, setPassEncrypted] = useState("");
  const [passDecrypted, setpassDecrypted] = useState("");

  const handleDecrypt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = "";
    if (!passEncrypted) {
      setPassEncrypted("");
      setpassDecrypted("");
      return;
    }
    result = DecryptPassword(passEncrypted);
    setpassDecrypted(result);
  };

  const handleReset = () => {
    setpassDecrypted("");
    setPassEncrypted("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassEncrypted(e.target.value);
  };
  return (
    <div>
      <form
        onSubmit={handleDecrypt}
        onReset={handleReset}
        className="flex flex-col gap-3"
      >
        <Input value={passEncrypted} onChange={handleInputChange} />
        {passDecrypted && <Input value={passDecrypted} readOnly />}
        <div className="flex gap-2">
          <Button type="submit">Decrypt</Button>
          <Button type="reset" variant={"destructive"}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export { EncryptPassForm, DecryptPassForm };
