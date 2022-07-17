import React from "react";
import { getStorage, ref as StoreRef, getDownloadURL } from 'firebase/storage';
import getConfig from "../../../MyFirebase";
import { initializeApp } from "firebase/app";

export default function MyCertificate(params: any) {
    const name = params.name;
    const year = params.year;
    const number = params.number;
    const app = initializeApp(getConfig());
    const storage = getStorage(app);
    const gsReference = StoreRef(storage, 'certificate/' + params.image);
    getDownloadURL(gsReference).then(url => {
        const img = document.getElementById(`img-cert-${number}`);
        img?.setAttribute("src", url);
    }).catch(error => { console.log(error); });

    return (
        <div className="w-auto px-2" key={number}>
            <img className="w-auto h-auto" alt={name} id={`img-cert-${number}`} />

            <div className="text-center">
                <h3 className="text-xl font-bold">
                    {name}
                </h3>
                <p className="text-sm">
                    <span className="font-bold">{year}</span>
                </p>

            </div>
        </div>
    );
}