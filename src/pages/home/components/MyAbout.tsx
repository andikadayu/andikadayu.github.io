import React, { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from 'firebase/database';
import getConfig from "../../../MyFirebase";

export default function MyAbout() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [address_map, setAddressMap] = useState("");
    const app = initializeApp(getConfig());
    const db = ref(getDatabase(app));

    const getAllData = useCallback(() => {
        ['name', 'email', 'date_of_birth', 'phone', 'address', 'address_map'].forEach((item, index) => {
            get(child(db, `about_page/${item}`)).then(snapshot => {
                if (snapshot.exists()) {
                    switch (index) {
                        case 0:
                            setName(snapshot.val());
                            break;
                        case 1:
                            setEmail(snapshot.val());
                            break;
                        case 2:
                            setDateOfBirth(snapshot.val());
                            break;
                        case 3:
                            setPhone(snapshot.val());
                            break;
                        case 4:
                            setAddress(snapshot.val());
                            break;
                        case 5:
                            setAddressMap(snapshot.val());
                            break;
                        default:
                            break;
                    }
                }
            }).catch(error => {
                console.log(error);
            });

        });
    }, [db]);


    useEffect(() => {
        getAllData();
    }, [getAllData]);


    return (
        <div id="MyAbout">
            <div className="py-20" style={{ background: "white" }}>
                <div className="container mx-auto px-6 flex flex-wrap justify-between">
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/48826191?v=4" alt="Andika Dayu" className="w-80 h-full rounded-xl object-cover" />
                    </div>
                    <div>
                        {/* Create Profile */}
                        <h2 className="text-2xl mb-2 text-blue-500">
                            Full Stack Developers
                        </h2>
                        <h3 className="text-4xl mb-8 text-black font-bold">
                            Andika Dayu
                        </h3>
                        <p className="text-gray-600">
                            Andika Dayu is a full stack developer who is currently working as a software engineer freelancer.
                        </p>

                        {/* Create Table Of Detail as Name,Phone,etc */}
                        <table className="table-auto w-full mt-5 mb-2">
                            <tbody>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Name</td>
                                    <td className="px-4 py-2">{name}</td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Date of Birth</td>
                                    <td className="px-4 py-2">{date_of_birth}</td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Phone / WA</td>
                                    <td className="px-4 py-2"><a href={`https://wa.me/${phone.replace(/[\-\+\s]/g, '')}`} target="_blank" rel="noopener noreferrer">{phone}</a></td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Email</td>
                                    <td className="px-4 py-2">
                                        <a href={'mailto:' + email}>{email}</a>
                                    </td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Address</td>
                                    <td className="px-4 py-2">
                                        <a href={address_map}>
                                            {address}
                                        </a>
                                    </td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Github</td>
                                    <td className="px-4 py-2">
                                        <a href="https://github.com/andikadayu">
                                            <img src="https://img.icons8.com/color/48/000000/github.png" alt="Github" />
                                        </a>
                                    </td>
                                </tr>
                                <tr className="text-gray-600">
                                    <td className="px-4 py-2">Linkedin</td>
                                    <td className="px-4 py-2">
                                        <a href="https://www.linkedin.com/in/muhammad-andika-dayu-anglita-putra-796838142/">
                                            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="Linkedin" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        {/* <button className="bg-blue-500 font-bold rounded-md py-2 px-5 mt-5 shadow-lg uppercase tracking-wider tex">
                            Download CV
                        </button> */}

                    </div>

                </div>
            </div>
        </div >
    );
}
