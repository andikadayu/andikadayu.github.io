import React from "react";

export default function MyFooter() {
    return (
        <div id="MyFooter">
            <div className="py-4 rounded-t-3xl" style={{ background: 'linear-gradient(90deg, #FF8D29 0%, #FF8D50 100%)' }}>
                <div className="container mx-auto px-6 flex flex-wrap justify-between">
                    <div>
                        <p className="text-white text-center text-sm">
                            © 2022. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <p className="text-white text-center text-sm">
                            Made with{" "}
                            <span role="img" aria-label="heart">
                                ❤️
                            </span>{" "}
                            by{" "}
                            <a
                                href="https://github.com/andikadayu" target="_blank" rel="noopener noreferrer"
                                className="text-white"
                            >
                                Andika Dayu
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}