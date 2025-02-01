import {
  DecrryptSvridForm,
  EncryptSvridForm,
} from "@/components/tools/svridgen-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";

export default function ServeridgenPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Encryptor */}
      <Card>
        <CardHeader>
          <CardTitle>Encryption</CardTitle>
          <CardDescription>Encrypting Server IP and Port.</CardDescription>
        </CardHeader>
        <CardContent>
          <EncryptSvridForm />
        </CardContent>
      </Card>

      {/* Decryptor */}
      <Card>
        <CardHeader>
          <CardTitle>Decryption</CardTitle>
          <CardDescription>Decrypting encrypted ServerID.</CardDescription>
        </CardHeader>
        <CardContent>
          <DecrryptSvridForm />
        </CardContent>
      </Card>
    </div>
  );
}
