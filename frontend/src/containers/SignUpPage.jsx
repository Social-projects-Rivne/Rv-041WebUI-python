import React from "react";
import SignUpForm from "../components/SignUp/SignUpForm";
import PageContainer from "./PageContainer";

const SignUpPage = () => {
  return (
    <PageContainer fullHeight width="small">
      <SignUpForm />
    </PageContainer>
  );
};

export default SignUpPage;
