import Hero from "../components/Hero";
import AIPlayground from "../components/AIPlayground";
import ContinueLearninng from "../components/ContinueLearning";
import PopularCourses from "../components/PopularCourses";



function Home() {

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f4ec] via-[#efeede] to-[#e9e6d8] text-[#111] py-24 px-6">


      <Hero />
      <ContinueLearninng />
      <PopularCourses />
      <AIPlayground />


    </div>
  );
}

export default Home;
