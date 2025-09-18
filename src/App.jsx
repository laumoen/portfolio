import React from "react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import HeroText from "./HeroText";
import iconSound from "./assets/sounds/iconSound.mp3";
import paperSound from "./assets/sounds/paperSound.wav";
import emailjs from "emailjs-com";

export const translations = {

  es: {
    welcome: "¡bienvenid@ a mi portfolio! me llamo",
    s: "H",
    kills: "abilidades en programación",
    c: "C",
    ontact: "ontáctame",
    emailPlaceholder: "¿cuál es tu correo?",
    titlePlaceholder: "ponle título al correo",
    messagePlaceholder: "¿de qué quieres hablar?",
    sendButton: "háblame",
    heroStrings: [
      "desarrolladora full-stack",
      "desarrolladora front-end",
      "diseñadora ux/ui en proceso",
      "desarrolladora back-end"
    ],
    soy: "y soy",
    experienceTitle: "proyecto full-stack",
    studiesTitle: "estudios",
    caseStudyTitle: "proyecto ux/ui",
    adaptability: "adaptabilidad",
    calma: "calma",
    brainstorming: "lluvia de ideas",
    conflictManagement: "gestión de conflictos",
    creativity: "creatividad",
    humor: "humor",
    introspection: "introspección",
    multitasking: "multitarea",
    organization: "organización",
    proactivity: "proactividad",
    resourcefulness: "ingeniosidad",
    responsibility: "responsabilidad",
    selfMotivation: "motivación y determinación",
    teamwork: "trabajo en equipo",
    studiesTitle2: "Desarrollo Full-stack",
    studiesDuration: "6 meses, 2025",
    studiesTitle3: "Diseño UX/UI",
    studiesDuration2: "Actualmente",
    experienceDescription: "¡Swipe Stories es el sitio web perfecto para cuando te aburres! Ideal para quienes disfrutan viendo películas y series, y también leyendo libros. Incluye un formulario deslizable que te facilita la vida y te da una respuesta sobre qué hacer según tus respuestas de sí o no.",
    caseStudyTitle2: "Plan de acción",
    caseStudyDescription: "He transformado una página web en una experiencia más clara y atractiva, comenzando con un análisis para identificar puntos débiles. Rediseñé la navegación para simplificar la interacción. El resultado: una interfaz diseñada para disfrutar sin perderse."
  },
  en: {
    welcome: "welcome to my portfolio! my name is",
    s: "P",
    kills: "rogramming skills",
    c: "C",
    ontact: "ontact me",
    emailPlaceholder: "what's your e-mail?",
    titlePlaceholder: "give the e-mail a title",
    messagePlaceholder: "what do you want to talk about?",
    sendButton: "talk to me",
    heroStrings: [
      "full-stack developer",
      "front-end developer",
      "ux/ui designer in progress",
      "back-end developer"
    ],
    soy: "and i'm a",
    experienceTitle: "full-stack project",
    studiesTitle: "studies",
    caseStudyTitle: "ux/ui project",
    adaptability: "adaptability",
    calma: "calmness",
    brainstorming: "brainstorming",
    conflictManagement: "conflict management",
    creativity: "creativity",
    humor: "humor",
    introspection: "introspection",
    multitasking: "multitasking",
    organization: "organization",
    proactivity: "proactivity",
    resourcefulness: "resourcefulness",
    responsibility: "responsibility",
    selfMotivation: "motivation and determination",
    teamwork: "team work",
    experienceDescription: "Swipe Stories is the perfect website to use for when you're bored! For people who enjoy watching movies and tv shows and also reading books, including a swipeable form that makes life easy for you and gives you an answer on what to do based off your yes and no responses.",
    studiesTitle2: "Full-stack Developer",
    studiesDuration: "6 months, 2025",
    studiesTitle3: "UX/UI Designer",
    studiesDuration2: "Currently",
    caseStudyTitle2: "Case Study",
    caseStudyDescription: "I've transformed a website into a clearer and more engaging experience, starting with a usability analysis to identify weak points. I redesigned the navigation for a simplified interaction. The result: an interface designed so that each user enjoys their journey without getting lost along the way."
  },
  ca: {
    welcome: "benvingut/da al meu portfoli! em dic",
    s: "H",
    kills: "abilitats en programació",
    c: "C",
    ontact: "ontacta'm",
    emailPlaceholder: "quin és el teu correu?",
    titlePlaceholder: "posa-li títol al correu",
    messagePlaceholder: "de què vols parlar?",
    sendButton: "parla'm",
    heroStrings: [
      "desenvolupadora full-stack",
      "desenvolupadora front-end",
      "dissenyadora ux/ui en procés",
      "desenvolupadora back-end"
    ],
    soy: "i sóc",
    experienceTitle: "projecte full-stack",
    studiesTitle: "estudis",
    caseStudyTitle: "projecte ux/ui",
    adaptability: "adaptabilitat",
    calma: "serenitat",
    brainstorming: "pluja d'idees",
    conflictManagement: "gestió de conflictes",
    creativity: "creativitat",
    humor: "humor",
    introspection: "introspecció",
    multitasking: "multitasca",
    organization: "organització",
    proactivity: "proactivitat",
    resourcefulness: "enginy",
    responsibility: "responsabilitat",
    selfMotivation: "motivació i determinació",
    teamwork: "treball en equip",
    studiesTitle2: "Desenv. Full-stack",
    studiesDuration: "6 mesos, 2025",
    studiesTitle3: "Disseny UX/UI",
    studiesDuration2: "Actualment",
    experienceDescription: "Swipe Stories és el lloc web perfecte per quan t'avorreixes! Ideal per als qui gaudeixen veient pel·lícules i sèries, i també llegint llibres. Inclou un formulari lliscant que et facilita la vida i et dóna una resposta sobre què fer segons les respostes de si o no.",
    caseStudyTitle2: "Pla d'acció",
    caseStudyDescription: "He transformat una pàgina web en una experiència més clara i atractiva, començant amb una anàlisi per identificar punts febles. Vaig redissenyar la navegació per simplificar la interacció. El resultat: una interfície dissenyada per gaudir sense perdre's."
  }
};

export default function App() {

  const [lang, setLang] = useState("en");

  const [hovered, setHovered] = useState("");
  const [hovered2, setHovered2] = useState("");
  const [hovered3, setHovered3] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    message: "",
  });

  const audioRef = useRef(null);
  const paperRef = useRef(null);

  useEffect(() => {
    // Selecciona tanto .icon como .soft
    const elements = document.querySelectorAll(".icon, .soft");

    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((err) => {
            console.log("El navegador ha bloqueado la reproducción automática:", err);
          });
      }
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", playSound);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", playSound);
      });
    };
  }, []);

  useEffect(() => {
    const idiomas = document.querySelectorAll(".idioma");

    const playPaper = () => {
      if (paperRef.current) {
        paperRef.current.currentTime = 0;
        paperRef.current
          .play()
          .catch((err) => {
            console.log("El navegador ha bloqueado la reproducción automática:", err);
          });
      }
    };

    idiomas.forEach((idioma) => idioma.addEventListener("mouseenter", playPaper));
    return () => idiomas.forEach((idioma) => idioma.removeEventListener("mouseenter", playPaper));
  }, []);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => {
      new window.bootstrap.Tooltip(el);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_jizstod",
      "template_jqmftjh",
      {
        from_email: formData.email,
        subject: formData.title,
        message: formData.message,
      },
      "3Jb7DaQmJYwn7bh0x"
    )
      .then(
        (result) => {
          alert("✅");
          setFormData({ email: "", title: "", message: "" });
        },
        (error) => {
          alert("❌");
        }
      );
  };

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    if (scrollPercent < 0.20) {
      document.body.style.backgroundColor = "var(--lightBrown)";
    } else if (scrollPercent < 0.66) {
      document.body.style.backgroundColor = "var(--darkBrown)";
    } else if (scrollPercent < 0.80) {
      document.body.style.backgroundColor = "var(--lightBrown)";
    } else {
      document.body.style.backgroundColor = "var(--darkBrown)";
    }
  });

  return (

    <div className="container">

      <div className="whitestar0"><img src="src/assets/img/whitestar.webp" alt="white star" /></div>
      <div className="whitestar1"><img src="src/assets/img/whitestar.webp" alt="white star" /></div>
      <div className="whitestar2"><img src="src/assets/img/whitestar.webp" alt="white star" /></div>
      <div className="whitestar3"><img src="src/assets/img/whitestar.webp" alt="white star" /></div>
      <div className="whitestar4"><img src="src/assets/img/whitestar.webp" alt="white star" /></div>

      <div className="click">{hovered2}<br /></div>

      <audio ref={audioRef} src={iconSound}></audio>
      <audio ref={paperRef} src={paperSound}></audio>

      <div className="header">
        <img src="src/assets/img/lanyard.png" className="lanyard" alt="" />
        <div className="title"> {translations[lang].welcome} </div>
        <div className="name">
          <div className="ele"> L </div>
          <div className="aura"> aura </div>
          <div className="eme"> M </div>
          <div className="ontes"> ontes </div>
          <div className="ee"> E </div>
          <div className="nrique"> nrique </div>
        </div>
        <div className="role"> <HeroText lang={lang} /> </div>
      </div>

      <div className="content">
        <div className="skills">
          <div className="hache"> {translations[lang].s} </div>
          <div className="abilidades"> {translations[lang].kills} </div>
        </div>
        <div className="iconames"> {hovered} <br /> </div>
        <div className="icons">
          <div className="icons1">
            <img className="icon html5" src="src/assets/img/html5.png" alt="html5" onMouseEnter={() => setHovered("HTML5")} onMouseLeave={() => setHovered("")} />
            <img className="icon css3" src="src/assets/img/css3.png" alt="css3" onMouseEnter={() => setHovered("CSS3")} onMouseLeave={() => setHovered("")} />
            <img className="icon js" src="src/assets/img/javascript.png" alt="java script" onMouseEnter={() => setHovered("JAVA SCRIPT")} onMouseLeave={() => setHovered("")} />
            <img className="icon bs" src="src/assets/img/bootstrap.png" alt="bootstrap" onMouseEnter={() => setHovered("BOOTSTRAP")} onMouseLeave={() => setHovered("")} />
            <img className="icon py" src="src/assets/img/python.png" alt="python" onMouseEnter={() => setHovered("PYTHON")} onMouseLeave={() => setHovered("")} />
            <img className="icon node" src="src/assets/img/node.png" alt="node.js" onMouseEnter={() => setHovered("NODE.JS")} onMouseLeave={() => setHovered("")} />
            <img className="icon jsx" src="src/assets/img/react.png" alt="react" onMouseEnter={() => setHovered("REACT")} onMouseLeave={() => setHovered("")} />
          </div>
          <div className="icons2">
            <img className="icon vite" src="src/assets/img/vite.png" alt="vite" onMouseEnter={() => setHovered("VITE")} onMouseLeave={() => setHovered("")} />
            <img className="icon ts" src="src/assets/img/typescript.png" alt="type script" onMouseEnter={() => setHovered("TYPE SCRIPT")} onMouseLeave={() => setHovered("")} />
            <img className="icon jq" src="src/assets/img/jquery.png" alt="jquery" onMouseEnter={() => setHovered("JQUERY")} onMouseLeave={() => setHovered("")} />
            <img className="icon sql" src="src/assets/img/sql.png" alt="my sql" onMouseEnter={() => setHovered("MY SQL")} onMouseLeave={() => setHovered("")} />
            <img className="icon vsc" src="src/assets/img/vsc.png" alt="visual studio code" onMouseEnter={() => setHovered("VISUAL STUDIO CODE")} onMouseLeave={() => setHovered("")} />
            <img className="icon gh" src="src/assets/img/github.png" alt="github" onMouseEnter={() => setHovered("GITHUB")} onMouseLeave={() => setHovered("")} />
            <img className="icon figma" src="src/assets/img/figma.png" alt="figma" onMouseEnter={() => setHovered("FIGMA")} onMouseLeave={() => setHovered("")} />
          </div>
        </div>
        <div className="softskills">
          <div className="eseee">S</div>
          <div className="oftskills">oft skills</div>
        </div>
        <div className="softNames"> {hovered3} <br /> </div>
        <div className="softskills0">
          <div className="softskills1">
            <img className="soft" src="src/assets/img/adaptability.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].adaptability)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/brainstorming.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].brainstorming)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/conflict-management.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].conflictManagement)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/creativity.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].creativity)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/humor.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].humor)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/introspection.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].introspection)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/multitasking.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].multitasking)} onMouseLeave={() => setHovered3("")} />
          </div>
          <div className="softskills2">
            <img className="soft" src="src/assets/img/organization.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].organization)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/resourcefulness.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].resourcefulness)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/responsibility.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].responsibility)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/self-motivation.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].selfMotivation)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/teamwork.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].teamwork)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/calma.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].calma)} onMouseLeave={() => setHovered3("")} />
            <img className="soft" src="src/assets/img/proactivity.png" alt="soft skill" onMouseEnter={() => setHovered3(translations[lang].proactivity)} onMouseLeave={() => setHovered3("")} />
          </div>
        </div>
        <div className="language">
          <img className="idioma español" src="src/assets/img/castellano.png" alt="español" onClick={() => setLang("es")} onMouseEnter={() => setHovered2("haz click y tradúceme al español")} onMouseLeave={() => setHovered2("")} />
          <img className="idioma ingles" src="src/assets/img/english.png" alt="ingés" onClick={() => setLang("en")} onMouseEnter={() => setHovered2("click me and translate me to english")} onMouseLeave={() => setHovered2("")} />
          <img className="idioma catalan" src="src/assets/img/catala.png" alt="catalán" onClick={() => setLang("ca")} onMouseEnter={() => setHovered2("fes clic i tradueix-me al català")} onMouseLeave={() => setHovered2("")} />
        </div>
        <div className="cv">
          <div className="experience rounded-5">
            <div className="experienceTitle">{translations[lang].experienceTitle}</div>
            <div className="experienceName"> Swipe Stories </div>
            <div className="experiencedescription"> {translations[lang].experienceDescription} </div>
            <div id="experience">
            <a href="https://github.com/laumoen/swipe-stories" target="_blank"><ion-icon name="log-out-outline"></ion-icon></a>
            </div>
          </div>
          <div className="studies rounded-5">
            <div className="studiesTitle">{translations[lang].studiesTitle}</div>
            <div className="studiesName"> {translations[lang].studiesTitle2} </div>
            <div>4Geeks Academy España</div>
            <div> {translations[lang].studiesDuration} </div>
            <div className="studiesName"> {translations[lang].studiesTitle3} </div>
            <div>Fundae</div>
            <div> {translations[lang].studiesDuration2} </div>
          </div>
          <div className="caseStudy rounded-5">
            <div className="caseStudyTitle">{translations[lang].caseStudyTitle}</div>
            <div className="caseStudyName"> {translations[lang].caseStudyTitle2} </div>
            <div className="caseStudyDescription"> {translations[lang].caseStudyDescription} </div>
            <div id="caseStudy">
            <a href="/"><ion-icon name="log-out-outline"></ion-icon></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="contact">
          <div className="ce"> {translations[lang].c} </div>
          <div className="ontact"> {translations[lang].ontact} </div>
        </div>
        <form onSubmit={sendEmail}>
          <div className="emailnameandsubject">
            <input type="email" name="email" placeholder={translations[lang].emailPlaceholder} className="input input1 rounded-start-5" value={formData.email} onChange={handleChange} required />
            <input type="text" name="title" placeholder={translations[lang].titlePlaceholder} className="input input2 rounded-end-5" value={formData.title} onChange={handleChange} required />
          </div>
          <textarea name="message" placeholder={translations[lang].messagePlaceholder} className="input input3 rounded-5" value={formData.message} onChange={handleChange} required />
          <button type="submit" className="sendButton rounded-5"> {translations[lang].sendButton} </button>
        </form>
        <div className="telephoneandsocials">
          <div><a href="https://github.com/laumoen" target="_blank" className="github"><ion-icon name="logo-github"></ion-icon></a></div>
          <div><a href="tel:667327086" className="telefono" id="telefono"><ion-icon name="call-outline" data-bs-toggle="tooltip" title="+34 667 327 086"></ion-icon></a></div>
          <div><a href="https://www.linkedin.com/in/laumoen/" target="_blank" className="linkedin"><ion-icon name="logo-linkedin"></ion-icon></a></div>
          <div><a href="src/assets/img/Laura-Montes-CV.pdf" download className="curriculum"> <ion-icon name="document-attach-outline" data-bs-toggle="tooltip" title="CV"></ion-icon></a></div>
        </div>
      </div>
    </div>
  );
}