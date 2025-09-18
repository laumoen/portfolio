import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { translations } from "./App";

export default function HeroText({ lang }) {

    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        const options = {
            strings: translations[lang].heroStrings,
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1000,
            startDelay: 500,
            loop: true,
            cursorChar: "|",
            fadeOut: true,
            fadeOutDelay: 500
        };

        typed.current = new Typed(el.current, options);

        return () => {
            typed.current.destroy();
        };
    }, [lang]);

    return (
        <div className="d-flex role">
            <p className="soy"> {translations[lang].soy} </p>
            <p>
                <span ref={el} />
            </p>
        </div>
    );
}