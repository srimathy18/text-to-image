import React from 'react';
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonials from '../components/Testimonials';
import GenerateBtn from '../components/GenerateBtn';

function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white">
    
      <Header />
      <main className="flex-1">
        <Steps />
        <Description />
        <Testimonials />
      </main>
      <GenerateBtn />
    </div>
  );
}

export default Home;
