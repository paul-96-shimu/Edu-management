import React from 'react';
import Banner from './Home/Banner';

import ClientLogosMarque from '../ServicesSection/ClientLogosMarque';


import PartnerSection from './Home/PartnerSection';
import EduServices from '../ServicesSection/EduServices';
import ApproveClass from './Home/ApproveClass';

import FeedbackSlider from './Home/FeedbackSlider';
import StatisticsSection from './Home/StatisticsSection';
import InspireTeachers from './Home/InspireTeachers';
import UpcomingEvents from './Home/UpComingEvents';

const Home = () => {


    return (
        <div>

            <Banner></Banner>
            <StatisticsSection></StatisticsSection>
            <InspireTeachers></InspireTeachers>
            <PartnerSection></PartnerSection>
            <EduServices></EduServices>
            <ClientLogosMarque></ClientLogosMarque>
            <ApproveClass></ApproveClass>
            <FeedbackSlider></FeedbackSlider>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;