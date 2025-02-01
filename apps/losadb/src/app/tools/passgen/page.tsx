import {
  DecryptPassForm,
  EncryptPassForm,
} from "@/components/tools/passgen-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";

export default function PassgenPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Encryptor */}
      <Card>
        <CardHeader>
          <CardTitle>Encryption</CardTitle>
          <CardDescription>Encrypting IOP Password.</CardDescription>
        </CardHeader>
        <CardContent>
          <EncryptPassForm />
        </CardContent>
      </Card>

      {/* Decryptor */}
      <Card>
        <CardHeader>
          <CardTitle>Decryption</CardTitle>
          <CardDescription>Decrypting encrypted IOP Password.</CardDescription>
        </CardHeader>
        <CardContent>
          <DecryptPassForm />
        </CardContent>
      </Card>
    </div>
  );
}
