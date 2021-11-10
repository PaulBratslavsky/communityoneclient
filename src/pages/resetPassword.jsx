import React from "react";
import ResetPasswordForm from "../componets/ResetPasswordForm/resetPasswordForm";
import { useParams } from "react-router";

export default function ResetPassword() {
  const { code } = useParams();
  return (
    <div className="login-page d-flex justify-content-center align-items-center bg-primary text-dark">
      <ResetPasswordForm code={code} />
    </div>
  );
}
