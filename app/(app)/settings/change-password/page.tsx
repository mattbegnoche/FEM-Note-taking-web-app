"use client";

import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function PasswordField({
  id,
  label,
  helperText,
  minLength,
}: {
  id: string;
  label: string;
  helperText?: string;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          minLength={minLength}
          className="h-11 pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
          <span className="sr-only">
            {visible ? "Hide password" : "Show password"}
          </span>
        </button>
      </div>
      {helperText && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Info className="size-4" />
          {helperText}
        </div>
      )}
    </Field>
  );
}

export default function ChangePasswordPage() {
  return (
    <div className="col-span-9 flex flex-col gap-6 p-6">
      <h1 className="text-xl font-bold text-foreground">Change Password</h1>

      <PasswordField id="old-password" label="Old Password" />
      <PasswordField
        id="new-password"
        label="New Password"
        helperText="At least 8 characters"
        minLength={8}
      />
      <PasswordField id="confirm-password" label="Confirm New Password" />

      <Button type="submit" className="w-fit">
        Save Password
      </Button>
    </div>
  );
}
