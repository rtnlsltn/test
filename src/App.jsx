import { BrowserRouter } from "react-router-dom";

import { About, Contact, Header, Experience, Feedbacks, GravityJarRow, Hero, Navbar, Tech, Works, Services, StarsCanvas, GravityJarCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div>
          <Navbar />
          <Header />
          <Services />
          <StarsCanvas />
        </div>
        <div className='relative z-0 bg-primary'>
          <About />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
          // <Services />
                  // <Contact />
        // <Feedbacks />
        // https://dashboard.emailjs.com/
// https://github.com/adrianhajdin/project_3D_developer_portfolio
