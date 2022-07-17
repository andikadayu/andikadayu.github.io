import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from 'firebase/database';
import MyCertificate from "./MyCertificate";
import getConfig from "../../../MyFirebase";
import { v4 as uuidv4 } from 'uuid';

export default function MyExperiences() {

    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [achievement, setAchievement] = useState([]);
    const [certificate, setCertificate] = useState([]);

    const app = initializeApp(getConfig());
    const db = ref(getDatabase(app));


    const getExperiences = useCallback(() => {
        get(child(db, "job_exp")).then(snapshot => {
            setExperiences(snapshot.val());
        }).catch(error => {
            console.log(error);
        });
    }, [db]);

    const getEducation = useCallback(() => {
        get(child(db, "education")).then(snapshot => {
            setEducation(snapshot.val());
        }).catch(error => {
            console.log(error);
        });
    }, [db]);

    const getAchievement = useCallback(() => {
        get(child(db, "achievement")).then(snapshot => {
            setAchievement(snapshot.val());
        }).catch(error => {
            console.log(error);
        });
    }, [db]);

    const getCertificate = useCallback(() => {
        get(child(db, "certificate")).then(snapshot => {
            setCertificate(snapshot.val());
        }).catch(error => {
            console.log(error);
        });
    }, [db]);

    useEffect(() => {
        getExperiences();
        getEducation();
        getAchievement();
        getCertificate();
    }, [getExperiences, getEducation, getAchievement, getCertificate]);


    return (
        <div key={uuidv4()} className="py-20 rounded-t-3xl rounded-b-3xl" style={{ background: 'linear-gradient(90deg, #FF8D29 0%, #FF8D50 100%)' }}>
            <div className="px-2 flex flex-wrap" >
                <div className="md:w-1/2 bg-transparent">
                    <h2 className="text-2xl font-bold">Education</h2>
                    <hr className="mr-2" />
                    <ol className="mt-2">
                        {education.map(educationLayout)}
                    </ol>
                </div>
                <div className="md:w-1/2 bg-transparent" >
                    <h2 className="text-2xl font-bold">Job Experience</h2>
                    <hr />

                    <ol className="mt-2">
                        {experiences.map(jobExpLayout)}
                    </ol>
                </div>
            </div>

            <div className="px-2 flex flex-wrap" >
                <div className="md:w-1/2 bg-transparent" >
                    <h2 className="text-2xl font-bold">Achievement</h2>
                    <hr className="mr-2" />
                    <ol className="mt-2" type="1">
                        {achievement.map(achievementLayout)}
                    </ol>
                </div>

                <div className="md:w-1/2 bg-transparent" >
                    <h2 className="text-2xl font-bold">Certificate</h2>
                    <hr />

                    {/* Create Slider of Certicate */}
                    <Slider className="mt-2 "
                        dots={true}
                        infinite={false}
                        speed={500}
                        slidesToShow={3}
                        slidesToScroll={1}
                        autoplay={true}
                        autoplaySpeed={3000}
                        arrows={false}
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    initialSlide: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]}
                    >
                        {certificate.map(MyCertificate)}

                    </Slider>
                </div>
            </div>
        </div>
    );
}

function educationLayout(params: any) {
    return (
        <li className="mb-2" key={uuidv4()}>
            <h3 className="text-xl font-bold">
                {params.name}
            </h3>
            <p className="text-sm">
                <span className="font-bold">{params.major}</span>
            </p>
            <p className="text-sm">
                <span className="font-bold">Graduation {params.graduation}</span>
            </p>
        </li>
    );
}

function jobExpLayout(params: any) {
    return (
        <li className="mb-2" key={uuidv4()}>
            <h3 className="text-xl font-bold">
                {params.name}
            </h3>
            <p className="text-sm">
                <span className="font-bold">{params.position}</span>
            </p>
            <p className="text-sm">
                <span className="font-bold">{params.period}</span>
            </p>
        </li>
    )
}

function achievementLayout(params: any) {
    return (
        <li className="mb-2" key={uuidv4()}>
            <span className="font-bold">{params.name}</span>
        </li>
    )
}