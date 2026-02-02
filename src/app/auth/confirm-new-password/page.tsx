import { Suspense } from "react";
import { ConfirmNewPasswordForm } from "./confirm-new-password-form";

export default function ConfirmNewPassword() {
  return (
    <div className="w-full h-full min-h-dvh flex items-center justify-center sm:p-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <ConfirmNewPasswordForm />
      </Suspense>
    </div>
  );
}
