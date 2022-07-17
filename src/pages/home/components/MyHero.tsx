import React from "react";
import hero from "../../../hero.svg";

export default function MyHero() {
    return (
        <div className="py-20 rounded-b-3xl" style={{ background: 'linear-gradient(90deg, #FF8D29 0%, #FF8D50 100%)' }}>
            <div className="px-6 flex flex-wrap justify-between" >
                <div className="my-auto rounded-full">
                    <h2 className="text-2xl mb-2 text-black">
                        Full Stack Developers
                    </h2>
                    <h3 className="text-4xl mb-8 text-white font-bold">
                        Andika Dayu
                    </h3>

                    <a href="#about" className="bg-white font-bold rounded-md py-2 px-5 shadow-lg uppercase tracking-wider tex">
                        More About Me
                    </a>
                </div>
                <div className="bg-transparent" >
                    <img src={hero} alt="Hero Image" className="w-full h-80" />
                </div>

            </div>
        </div>
    );
}