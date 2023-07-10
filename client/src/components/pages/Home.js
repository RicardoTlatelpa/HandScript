import React from 'react';
import '../../App.css';
import NewSection from '../newSection';
import Cards from '../Cards';
import Footer from '../Footer';

function Home () {
    return (
        <>
            <NewSection />
            <Cards />
            <Footer />
        </>
    );
}

export default Home;