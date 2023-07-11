import React from 'react';
import '../../App.css';
import Footer from '../Footer';

function About() {
    return (
      <>
    <div className='about'>
      <ul>
      <h1>WHAT IS HANDSCRIPT?
      </h1>
      <p>
        Handscript is an app that let's you create your own font!
      </p> 
      <p>
      <img src="images/tablet2.jpg" alt="tablet" class="center" style={{width: '1000px', height: '470px',}}/>
      </p>
      </ul>

    </div>
    <Footer />
    </>
    );
  }

export default About;