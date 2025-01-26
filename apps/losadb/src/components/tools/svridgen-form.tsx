"use client";

import { useState } from "react";

import {
  ConvertServerIDToAddress,
  ConvertToGameServerID,
} from "@/lib/losatools/svridgen";
import { Input } from "@losaweb/ui/components/input";
import { Button } from "@losaweb/ui/components/button";

const EncryptSvridForm = () => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState<number>(14009);
  const [result, setResult] = useState("");

  const handleInputIP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  };
  const handleInputPort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPort(e.target.valueAsNumber);
  };
  const handleEncrypt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = "";
    if (!ip || !port) {
      setIp("");
      setPort(14009);
      setResult("");
      return;
    }
    result = ConvertToGameServerID(ip, port).toString();
    setResult(result);
  };

  const handleReset = () => {
    setIp("");
    setPort(14009);
    setResult("");
  };

  return (
    <div>
      <form
        onSubmit={handleEncrypt}
        onReset={handleReset}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-4">
          <Input value={ip} onChange={handleInputIP} placeholder="IP Address" />
          <Input
            value={port}
            type="number"
            placeholder="Port"
            onChange={handleInputPort}
          />
        </div>
        {result && <Input value={result} readOnly />}

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

const DecrryptSvridForm = () => {
  const [encryted, setEncryted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEncryted(e.target.value);
  };

  const handleDecrypt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!encryted) {
      setEncryted("");
      setDecrypted("");
      return;
    }

    const { ip, port } = ConvertServerIDToAddress(BigInt(encryted));
    setDecrypted(`${ip}:${port}`);
  };

  const handleReset = () => {
    setEncryted("");
    setDecrypted("");
  };

  return (
    <div>
      <form
        onSubmit={handleDecrypt}
        onReset={handleReset}
        className="flex flex-col gap-3"
      >
        <Input value={encryted} onChange={handleInputChange} />
        {decrypted && <Input value={decrypted} readOnly />}
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

export { EncryptSvridForm, DecrryptSvridForm };
