import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { set, ref, getDatabase } from 'firebase/database';
import getConfig from '../../../MyFirebase';
import { v4 } from 'uuid';

export default function MyContact() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const app = initializeApp(getConfig());

    const db = getDatabase(app);

    const onChangeInput = (e: any) => {
        switch (e.target.name) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'message':
                setMessage(e.target.value);
                break;
            default:
                break;
        }
    }

    const addToDatabase = (e: any) => {
        e.preventDefault();

        set(ref(db, 'contact_us/' + v4()), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }).then(() => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
            alert('Message sent successfully');
            window.location.reload();
        }).catch(error => {
            console.log(error);
            alert('Error sending message');
        });
    }


    return (
        <div id="MyContact">
            <div className="py-4" style={{ background: 'white' }}>
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <h2 className="text-2xl mb-2 text-black">
                            Contact Me
                        </h2>
                        <h4 className="text-l text-gray-500">
                            Feel free to contact me if you have any questions.
                        </h4>
                    </div>

                    <div className="contact-form flex flex-wrap">
                        <div className="md:w-1/2 bg-transparent pr-2">
                            <form className="w-full flex flex-wrap" onSubmit={addToDatabase}>
                                <div className="w-full md:w-1/2 mb-6 pr-2 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        First Name
                                    </label>
                                    <input name={'firstName'} onChange={onChangeInput} value={firstName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Jane" required={true} />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Last Name
                                    </label>
                                    <input name={'lastName'} onChange={onChangeInput} value={lastName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required={true} />
                                </div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="
                                    " required={true} value={email} name={'email'} onChange={onChangeInput} />
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Message
                                </label>
                                <textarea name={'message'} onChange={onChangeInput} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows={10} id="grid-password" placeholder="" required={true}>{message}</textarea>
                                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value='Send' />

                            </form>
                        </div>
                        <div className="md:w-1/2 bg-transparent">
                            <div className="flex flex-wrap mx-3 mb-6">
                                {/* Create Embed Maps and Social Media */}
                                <div className="w-full mb-6 pr-2 md:mb-0">
                                    {/* embed maps */}

                                    <iframe
                                        title="google-maps"
                                        src="https://maps.google.com/maps?q=Jl.%20Raya%20Dawuhan,%20Tegalgondo,%20Kec.%20Karang%20Ploso,%20Malang,%20Jawa%20Timur%2065152&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        width="100%"
                                        height="410"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                    ></iframe>

                                </div>


                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div >
    );
}