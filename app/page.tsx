import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import ComoFunciona from "@/components/ComoFunciona";
import PorQue from "@/components/PorQue";
import Control from "@/components/Control";
import ParaQuien from "@/components/ParaQuien";
import Precio from "@/components/Precio";
import FAQ from "@/components/FAQ";
import EmpresaFundadora from "@/components/EmpresaFundadora";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <PorQue />
        <Control />
        <ParaQuien />
        <Precio />
        <FAQ />
        <EmpresaFundadora />
      </main>
      <Footer />
    </>
  );
}
