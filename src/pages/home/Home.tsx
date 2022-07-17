import React from 'react';
import MyFooter from '../MyFooter';
import MyNavbar from '../MyNavbar';
import MyAbout from './components/MyAbout';
import MyContact from './components/MyContact';
import MyExperiences from './components/MyExperiences';
import MyHero from './components/MyHero';
import MyProjects from './components/MyProjects';
import MySkills from './components/MySkills';

class Home extends React.Component {
    render() {
        return (
            <>
                <MyNavbar />
                <div id='home'>
                    <MyHero />
                </div>
                <div id='about'>
                    <MyAbout />
                </div>
                <div id='skills'>
                    <MySkills />
                </div>
                <div id="projects">
                    <MyProjects />
                </div>
                <div id="experiences">
                    <MyExperiences />
                </div>
                <div id="contact">
                    <MyContact />
                </div>
                <MyFooter />
            </>
        );
    }
}

export default Home;