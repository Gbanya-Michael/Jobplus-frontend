import React from "react";
import Container from "../components/container/container";
import Cookie from "../components/cookie/cookie";
import Footer from "../components/footer/footer";
import HeroSimple from "../components/hero/hero_simple";
import ResetPassword from "../components/reset_password/ResetPassword";
export default function HomePage() {
  return (
    <>
      <section>
        <HeroSimple title="Reset Password" />
        <Container>
          <ResetPassword />
        </Container>
        <Cookie />
      </section>
      <Footer />
    </>
  );
}
