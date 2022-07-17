import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import getConfig from '../../../MyFirebase';
import { v4 as uuidv4 } from 'uuid';

export default function MySkills() {
    const [skills, setSkills] = useState([]);
    const app = initializeApp(getConfig());
    const db = ref(getDatabase(app));

    const sliderSetting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        className: 'w-full mt-5 container',
        responsive: [
            {
                breakpoint: 2560,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false,
                },
            },
        ]
    };

    const getAllData = useCallback(() => {
        get(child(db, `skills`)).then(snapshot => {
            if (snapshot.exists()) {
                setSkills(snapshot.val());
            }
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }, [db]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <div className="py-14 mx-0 w-full rounded-b-3xl rounded-t-3xl" style={{ background: 'linear-gradient(90deg, #FF8D29 0%, #FF8D50 100%)' }}>
            <h2 className="text-2xl mb-4 ml-3 text-black font-bold">
                Programming Skills & Other Skills
            </h2>
            <Slider {...sliderSetting}>
                {skills.map(SliderItem)}
            </Slider>
        </div>
    );
}

function SliderItem(props: any) {
    return (
        <div className="slider-item" key={uuidv4()}>
            <div>
                <img src={props.image} alt={props.name} className="w-28 h-28 mx-auto" />
                <p className="text-black text-xl text-center">{props.name}</p>
            </div>
        </div>
    )
}