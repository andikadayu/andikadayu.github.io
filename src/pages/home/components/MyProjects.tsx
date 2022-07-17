import React, { useState, useEffect, useCallback } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import getConfig from "../../../MyFirebase";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref as StoreRef, getDownloadURL } from "firebase/storage";

export default function MyProjects() {

    const [projects, setProjects] = useState([]);
    const app = initializeApp(getConfig());
    const db = ref(getDatabase(app));

    const getProject = useCallback(() => {
        get(child(db, 'project')).then(snapshot => {
            if (snapshot.exists()) {
                setProjects(snapshot.val());
            }
        }).catch(error => {
            console.log(error);
        })
    }, [db]);

    useEffect(() => {
        getProject();
    }, [getProject]);


    return (
        <div className="py-16" style={{ background: "white" }}>
            <div className="text-center">
                <h2 className="text-2xl mb-2 text-black">
                    My Projects
                </h2>
                <h4 className="text-l text-gray-500">
                    Here are some of my projects
                </h4>
            </div>
            <section className="pt-8 px-4">
                <div className="flex flex-wrap -mx-4">
                    {projects.map(ProjectLayout)}
                </div>
            </section>
        </div>
    );
}

function ProjectLayout(props: any) {

    const id = uuidv4();
    const storage = getStorage(initializeApp(getConfig()));
    const gsReference = StoreRef(storage, 'project/' + props.image);
    getDownloadURL(gsReference).then(url => {
        const img = document.getElementById(`img-project-${id}`);
        img?.setAttribute("src", url);
    }).catch(error => { console.log(error); });

    return (
        <div className="md:w-1/3 px-4 mb-8 group relative">
            <img className="rounded shadow-md group-hover:blur-lg" id={`img-project-${id}`} alt={props.name} />
            <div className="group-hover:block hidden absolute top-2">
                <h3 className="text-xl mb-2 text-black font-semibold text-center">
                    {props.name}
                </h3>
                <p className="text-black text-sm w-full px-2 font-semibold break-words">
                    {props.description}
                </p>
                <div className="px-2 mt-1">
                    {props.language.map((item: any, index: any) => {
                        return (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-sm font-semibold text-gray-700 mr-2">{item}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}