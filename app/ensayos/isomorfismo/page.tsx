"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Navigation from "@/components/Navigation";
import MathEquation from "./MathEquation";
import styles from "./page.module.css";
import "katex/dist/katex.min.css";

type SectionId = "i" | "ii" | "iii" | "iv" | "v" | "vi" | "vii" | "viii";

type EssaySection = {
  id: SectionId;
  title: string;
  paragraphs: string[];
};

type FloatingFragment = {
  text: string;
  side: "left" | "right";
  x: string;
  duration: number;
  delay: number;
};

type PhraseConfig = {
  id: string;
  text: string;
};

type FigureMotif = "field" | "nest" | "harmonic" | "orbit" | "fold";

type ExcavationPortrait = {
  id: string;
  section: SectionId;
  name: string;
  digLabel: string;
  finding: string;
  image: string;
  width: number;
  height: number;
};

type ExcavationFigure = {
  id: string;
  section: SectionId;
  src: string;
  alt: string;
  caption: string;
  motif: FigureMotif;
};

type EquationSpec = {
  id: string;
  section: SectionId;
  latex: string;
  caption?: string;
};

const PROEM = [
  "Una mente atravesada por todo.",
  "Campos, ideas, la idea del campo, la idea de la idea, gravedad, teoremas, deuda, tráfico, amor, budismo, una configuración del universo tan compleja que puede preguntarse qué es el universo.",
  "Y a veces, en ciertas mentes sentadas en silencio el tiempo suficiente, aparece una intuición que no debería caber en una parte, somos uno con todo.",
];

const PROEM_QUESTION =
  "¿Cómo puede una excitación local del campo sospechar que es el campo?";

const SECTIONS: EssaySection[] = [
  {
    id: "i",
    title: "I. Las dos excavaciones que todos conocen",
    paragraphs: [
      "La física tardó siglos. Newton pensaba en partículas, bolitas duras moviéndose en el vacío, chocando, transfiriendo momento, el universo como mesa de billar. Luego un encuadernador sin formación matemática miró limaduras de hierro ordenarse alrededor de un imán y vio líneas, tensiones en el espacio supuestamente vacío. Faraday no podía escribir una sola ecuación, vio los campos antes de que existiera el lenguaje para escribirlos, y Maxwell tradujo esa visión décadas después. Guarda ese dato, pienso volver a él. La mecánica cuántica disolvió la bolita en función de onda, probabilidad untada en el espacio, y la teoría cuántica de campos dio el paso final, no hay partículas y campos, hay solamente campos, lo que llamamos electrón es el campo de electrones vibrando de cierta manera en cierta región, una nota sostenida en un instrumento que llena el universo.",
      "Y hace dos mil quinientos años un hombre se sentó bajo una higuera en Uruvela, al norte de India, sin ecuaciones, sin aceleradores, con una mente y la decisión de mirarla hasta el fondo. Encontró anatta, no hay esencia fija que seas tú, buscas al que experimenta dentro de la experiencia y no aparece, solo hay experiencia. Encontró pratītyasamutpāda, nada existe por sí mismo, todo surge condicionado por todo lo demás. Siete siglos después Nagarjuna llevó esto a su forma extrema, sunyata, las cosas están vacías de esencia propia, sin núcleo, pura relación.",
      "Los espejos son conocidos y uno me sigue pareciendo extraordinario. La QFT dice que el vacío no está vacío, hierve de fluctuaciones, pon dos placas de metal lo suficientemente cerca y la nada las empuja una contra la otra, se llama efecto Casimir, se ha medido en laboratorio. El budismo dice que sunyata no es la nada sino plenitud de interdependencia. Una vacuidad que empuja placas, una vacuidad que sostiene mundos.",
      "Hasta aquí, lo confieso, no he dicho nada nuevo.",
    ],
  },
  {
    id: "ii",
    title: "II. Donde el ensayo suele morir",
    paragraphs: [
      "Hay un género entero construido sobre lo que acabo de hacer. El Tao de la física, sanación cuántica, abundancia cuántica, tomar dos cosas prestigiosas, ponerlas frente a frente, decir miren cómo riman, y cobrar.",
      "El problema de ese género no es el entusiasmo, es la geometría. Con dos puntos siempre puedes trazar una línea. Cualquiera puede, entre cualquier par de cosas, eso es lo que hace una línea, pasar por dos puntos. La rima entre física y budismo, sola, no demuestra nada, igual podría rimar el budismo con la termodinámica o la QFT con el tarot si uno aprieta lo suficiente.",
      "Yo no quiero trazar una línea. Quiero saber si hay un patrón, y para un patrón necesito más puntos, excavaciones independientes, en terrenos que no compartan ni método ni época ni intención, hechas por gente que no se leyó entre sí y que no buscaba lo mismo.",
      "Los hay. Eso es lo que me inquieta.",
    ],
  },
  {
    id: "iii",
    title: "III. Tercera excavación, los números",
    paragraphs: [
      "En 1965 un filósofo de Princeton llamado Paul Benacerraf publicó un artículo cuyo título ya es una tesis, What Numbers Could Not Be, lo que los números no pudieron ser.",
      "El argumento es de una sencillez brutal. La matemática moderna construye los números a partir de conjuntos, y hay más de una manera de hacerlo. Puedes construir el tres como el conjunto que contiene al cero, al uno y al dos, o puedes construirlo como una caja dentro de una caja dentro de una caja. Las dos construcciones producen toda la aritmética sin fallar en nada, y son incompatibles entre sí, en una el uno pertenece al tres y en la otra no. Entonces, ¿cuál es el verdadero tres?",
      "Ninguno, responde Benacerraf, porque la pregunta está mal hecha. El tres no es un objeto. Es una posición en una estructura. Lo que importa del tres no es lo que es sino dónde está, después del dos, antes del cuatro, suma de uno y dos, primo, impar. Fuera de esa red de relaciones el tres no es nada, no hay tres que rescatar de la red, la red es todo lo que hay.",
      "Anatta para los números. Demostrado en Princeton, con lógica de primer orden, sin un solo pétalo de loto.",
    ],
  },
  {
    id: "iv",
    title: "IV. Cuarta excavación, el sonido",
    paragraphs: [
      "Aquí hablo de lo que conozco de primera mano, pasé años estudiando esto y todavía me parece el ejemplo más limpio de todos.",
      "Una onda senoidal pura no tiene timbre. No suena a nada, no suena a violín ni a voz ni a cuerda, suena a laboratorio. El timbre, eso que hace que una trompeta sea una trompeta, no vive en ninguna frecuencia individual, vive en la relación entre los parciales, en cómo se reparte la energía del segundo armónico al décimo, en cómo atacan y decaen unos respecto de otros. Quita la relación y el timbre desaparece sin que ninguna parte haya desaparecido.",
      "Con la altura pasa lo mismo y es peor. El la de 440 hertz no es nada por sí mismo, una convención de afinadores que además ha cambiado de siglo en siglo. Lo real es el intervalo, la razón entre frecuencias, dos a uno la octava, tres a dos la quinta. Una melodía transportada a otra tonalidad no conserva ni una sola de sus frecuencias y sigue siendo la misma melodía, porque la melodía nunca estuvo en las frecuencias, estuvo en las relaciones entre ellas. La consonancia misma es estructura de interferencia, ondas que coinciden o chocan.",
      "Y el oído, esto es lo que más me asombra, el oído sabe todo esto sin saberlo. La membrana basilar descompone la presión que llega en sus componentes de frecuencia, hace análisis espectral en tiempo real, en carne, sin matemáticas. Como Faraday mirando limaduras. Te dije que iba a volver a él. Conocimiento estructural antes del formalismo, otra vez.",
      "Una nota está vacía de esencia propia. Lo digo técnicamente, no poéticamente, aunque suene a las dos cosas.",
    ],
  },
  {
    id: "v",
    title: "V. Quinta excavación, la mente",
    paragraphs: [
      "Y la mente, que parecía el último refugio de la sustancia, el lugar donde al menos uno podía decir aquí estoy yo.",
      "Francisco Varela era un biólogo chileno, alumno de Maturana, con quien inventó el concepto de autopoiesis, y era también budista practicante, de los serios, cofundó con el Dalai Lama el instituto Mind and Life. En 1991 publicó con Evan Thompson y Eleanor Rosch un libro que hizo con rigor lo que el género Capra hizo con prisa, The Embodied Mind, y la tesis central es que la ciencia cognitiva, buscando al yo dentro del cerebro con la misma seriedad con que el meditador lo busca dentro de la experiencia, encontró lo mismo. Procesos sin centro. Módulos sin testigo. Narración sin narrador. No hay un lugar en el cerebro donde las cosas se junten para ser vistas por alguien, no hay teatro ni espectador, hay coordinación distribuida que se cuenta a sí misma el cuento de un protagonista.",
      "Varela no dijo que la neurociencia confirmara al Buda. Dijo algo más fino, que ambas son investigaciones de la experiencia y que llegaron, por caminos sin contacto, a la misma ausencia.",
      "Podría seguir. Saussure encontró lo mismo en el lenguaje medio siglo antes que nadie, en la lengua solo hay diferencias sin términos positivos, una palabra está hecha de aquello de lo que se distingue. Las redes lo encuentran en los nodos, la ecología en las especies. Pero creo que el patrón ya se ve.",
    ],
  },
  {
    id: "vi",
    title: "VI. El lecho de roca",
    paragraphs: [
      "Cinco excavaciones. Materia, experiencia contemplativa, número, sonido, mente. Métodos que no se conocen, épocas que no se tocan, intenciones casi opuestas, una calcula, otra libera, otra demuestra, otra mezcla discos, otra modela cerebros. Y todas, al llegar lo suficientemente abajo, golpean el mismo lecho de roca.",
      "No hay sustancia. Hay estructura. La cosa se disuelve y queda la relación.",
      "Hay filósofos que mordieron esa bala hasta el fondo. Ladyman y Ross publicaron en 2007 un libro de metafísica analítica cuyo título es una orden de desalojo, Every Thing Must Go, toda cosa debe irse. La posición se llama realismo estructural óntico y su motivación es precisamente la QFT, intercambia dos electrones y el universo no se entera, no porque no podamos distinguirlos sino porque no hay nada que distinguir, las partículas cuánticas carecen de individualidad, así que la metafísica seria, dicen, debería abandonar los objetos de una vez. La realidad es estructura. Relaciones hasta abajo.",
      "La objeción clásica contra esa posición llega sola, ¿relaciones entre qué? ¿Cómo puede haber relación sin cosas que se relacionen? Parece devastadora y tiene dieciocho siglos de retraso. Nagarjuna trabajó exactamente esa regresión en el Mūlamadhyamakakārikā y su respuesta es la más radical disponible, relación hasta el fondo, sin fondo, y por si alguien quisiera convertir la vacuidad en la nueva sustancia, en el suelo firme de reemplazo, la vacuidad también está vacía. Sunyata de sunyata. La doctrina se aplica a sí misma y no colapsa, y quien convierte la vacuidad en una posición que sostener, advirtió, no ha entendido nada.",
      "Una doctrina que se traga a sí misma sin desaparecer. Recuerda ese gesto, porque el ensayo va a necesitarlo.",
    ],
  },
  {
    id: "vii",
    title: "VII. La sospecha del instrumento",
    paragraphs: [
      "Queda una salida y me la tomo en serio, porque sin ella esto sería propaganda.",
      "Tal vez el patrón no está en el mundo sino en el ojo. El cerebro que medita es el cerebro que hace matemáticas es el cerebro que mezcla un disco es el cerebro que escribe lagrangianos. Toda excavación encuentra lo mismo porque toda pala es la misma pala. Quizá la ausencia de sustancia no es la forma del mundo sino la forma de nuestra cognición, el formato en que este animal procesa cualquier cosa que procese, y las cinco excavaciones no son cinco testigos independientes sino cinco fotografías tomadas con la misma cámara descompuesta. Kant sonríe desde Königsberg.",
      "Es la objeción más fuerte que conozco y mira lo que necesita para formularse. Necesita un adentro y un afuera, la estructura de la cognición por un lado y la estructura del mundo por el otro, dos territorios separados, mente aquí, mundo allá, cada uno con su naturaleza propia e independiente. Es decir, necesita exactamente la metafísica de sustancias que cada una de las cinco excavaciones desmanteló. La objeción solo se sostiene en pie si ya está en el suelo.",
      "El deflacionador se deflaciona. Como la vacuidad de Nagarjuna, pero al revés, sin elegancia, por accidente.",
    ],
  },
  {
    id: "viii",
    title: "VIII.",
    paragraphs: [
      "Y sin embargo tampoco puedo quedarme con la victoria, y este es el golpe que no esperaba encontrar cuando empecé a escribir.",
      "Gödel demostró que un sistema suficientemente rico para describirse a sí mismo no puede demostrar su propia consistencia desde adentro. Para cerrar la pregunta haría falta salir. La pregunta de si la estructura está en el mundo o en el ojo solo podría responderse desde un punto exterior al sistema que pregunta, y no hay exterior, el que pregunta es una de las excavaciones, el instrumento es una configuración del campo que examina, este ensayo es el campo describiéndose otra vez, sin más autoridad que las anteriores.",
      "Indecidible. No como derrota sino como resultado.",
      "El campo se dobla.",
      "Encuentra estructura en todo lo que mira.",
      "No puede decidir si la encuentra o la pone.",
      "El teorema de Princeton, el silencio bajo la higuera, el tres que no existe solo, la nota que no es nada sola, el yo que no aparece.",
      "Todo dice lo mismo.",
      "Nadie puede decir qué.",
      "El campo vuelve a doblarse.",
    ],
  },
];

const FLOATING_FRAGMENTS: FloatingFragment[] = [
  { text: "⟨0|Ĥ|0⟩ ≠ 0", side: "left", x: "max(1rem, calc(50% - 560px))", duration: 22, delay: 0 },
  {
    text: "estructura(x) = relacion(estructura, x)",
    side: "right",
    x: "min(calc(100% - 7rem), calc(50% + 430px))",
    duration: 20,
    delay: 2,
  },
  { text: "F/A = −π²ℏc / 240d⁴", side: "left", x: "max(1rem, calc(50% - 620px))", duration: 19, delay: 4 },
  { text: "3 := {0,1,2} · 3 := {{{∅}}}", side: "right", x: "min(calc(100% - 8rem), calc(50% + 500px))", duration: 23, delay: 5.5 },
  { text: "anattā · śūnyatā", side: "left", x: "max(1rem, calc(50% - 500px))", duration: 17, delay: 7 },
  { text: "2:1 la octava · 3:2 la quinta", side: "right", x: "min(calc(100% - 6rem), calc(50% + 420px))", duration: 16, delay: 9 },
  { text: "while(buscando){ yo = buscar(yo) }", side: "left", x: "max(1rem, calc(50% - 580px))", duration: 24, delay: 11 },
];

const HIDDEN_PHRASES: PhraseConfig[] = [
  {
    id: "v-phrase-1",
    text: "Procesos sin centro. Módulos sin testigo. Narración sin narrador.",
  },
  {
    id: "v-phrase-2",
    text: "no hay teatro ni espectador",
  },
  {
    id: "v-phrase-3",
    text: "llegaron, por caminos sin contacto, a la misma ausencia",
  },
];

const EXCAVATION_PORTRAITS: ExcavationPortrait[] = [
  {
    id: "faraday",
    section: "i",
    name: "Michael Faraday",
    digLabel: "excavación 01 · terreno: materia",
    finding: "hallazgo: el campo, antes del lenguaje",
    image: "/images/isomorfismo/faraday.jpg",
    width: 600,
    height: 827,
  },
  {
    id: "buda",
    section: "i",
    name: "Buda",
    digLabel: "excavación 02 · terreno: experiencia",
    finding: "hallazgo: anatta, solo hay experiencia",
    image: "/images/isomorfismo/budaa.jpeg",
    width: 736,
    height: 1041,
  },
  {
    id: "varela",
    section: "v",
    name: "Francisco Varela",
    digLabel: "excavación 05 · terreno: mente",
    finding: "hallazgo: narración sin narrador",
    image: "/images/isomorfismo/profile_image_francisco_varela.jpg",
    width: 500,
    height: 313,
  },
  {
    id: "nagarjuna",
    section: "vi",
    name: "Nagarjuna",
    digLabel: "lecho de roca · sin estrato",
    finding: "hallazgo: la vacuidad también está vacía",
    image: "/images/isomorfismo/Nagarjuna_with_84_mahasiddha_cropped.jpg",
    width: 686,
    height: 857,
  },
];

const EXCAVATION_FIGURES: ExcavationFigure[] = [
  {
    id: "fig-campo",
    section: "i",
    src: "/images/isomorfismo/fig-campo.svg",
    alt: "El campo y la excitación: una onda local sobre líneas de campo",
    caption: "primera excavación · el campo",
    motif: "field",
  },
  {
    id: "fig-numeros",
    section: "iii",
    src: "/images/isomorfismo/fig-numeros.svg",
    alt: "Dos construcciones incompatibles del número tres",
    caption: "tercera excavación · el número",
    motif: "nest",
  },
  {
    id: "fig-sonido",
    section: "iv",
    src: "/images/isomorfismo/fig-sonido.svg",
    alt: "Serie armónica: misma forma, otras frecuencias",
    caption: "cuarta excavación · el sonido",
    motif: "harmonic",
  },
  {
    id: "fig-mente",
    section: "v",
    src: "/images/isomorfismo/fig-mente.svg",
    alt: "Narración sin narrador: procesos coordinados sin centro",
    caption: "quinta excavación · la mente",
    motif: "orbit",
  },
  {
    id: "fig-pliegue",
    section: "viii",
    src: "/images/isomorfismo/fig-pliegue.svg",
    alt: "El campo se dobla: el que pregunta dentro de lo preguntado",
    caption: "el pliegue · indecidible desde adentro",
    motif: "fold",
  },
];

const EQUATION_SPECS: EquationSpec[] = [
  {
    id: "eq-casimir",
    section: "i",
    latex: "\\frac{F}{A} = -\\frac{\\pi^{2}\\hbar c}{240\\, d^{4}}",
    caption: "efecto Casimir: la nada empuja",
  },
  {
    id: "eq-vacuum",
    section: "i",
    latex: "\\langle 0 | \\hat{H} | 0 \\rangle \\neq 0",
    caption: "el vacío no está vacío",
  },
  {
    id: "eq-benacerraf",
    section: "iii",
    latex: "3 = \\{0,1,2\\} \\;\\neq\\; \\{\\{\\{\\emptyset\\}\\}\\} = 3",
    caption: "benacerraf, 1965: ninguno es el tres",
  },
  {
    id: "eq-intervals",
    section: "iv",
    latex: "\\frac{f_2}{f_1} = \\frac{2}{1} \\;\\text{(octava)} \\qquad \\frac{f_2}{f_1} = \\frac{3}{2} \\;\\text{(quinta)}",
    caption: "lo real es la razón, no la frecuencia",
  },
  {
    id: "eq-godel",
    section: "viii",
    latex: "S \\nvdash \\mathrm{Con}(S)",
    caption: "ningún sistema demuestra su consistencia desde adentro",
  },
];

const FRACTAL_KEYWORDS = new Set([
  "estructura",
  "relacion",
  "relaciones",
  "sustancia",
  "vacuidad",
]);

const CHAR_REPLACEMENTS: Record<string, string> = {
  a: "∂",
  e: "3",
  o: "∅",
  s: "5",
  i: "1",
  m: "rn",
  u: "v",
};

const FULL_ESSAY = SECTIONS.map((section) => `${section.title} ${section.paragraphs.join(" ")}`).join(" ");

const INTRO_META = {
  date: "2026-06-09",
  title: "isomorfismo",
  tags: ["fisica-cuantica", "budismo", "estructura", "godel"],
} as const;

const initialProgress: Record<SectionId, number> = {
  i: 0,
  ii: 0,
  iii: 0,
  iv: 0,
  v: 0,
  vi: 0,
  vii: 0,
  viii: 0,
};

const normalizeToken = (token: string) =>
  token
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}]/gu, "")
    .toLowerCase();

const seeded = (input: number) => {
  const value = Math.sin(input * 91.173 + 17.71) * 43758.5453;
  return value - Math.floor(value);
};

const mutateToken = (token: string, strength: number, seedBase: number) => {
  if (!token.trim() || strength <= 0) {
    return { text: token, glitched: false, doubled: false, offsetX: 0, offsetY: 0 };
  }
  const noise = seeded(seedBase);
  const doubleThreshold = 0.05 * strength;
  const glitchThreshold = 0.15 * strength;
  let next = token;
  let glitched = false;
  let doubled = false;
  if (noise < doubleThreshold) {
    // la misma cámara dispara dos veces: doble exposición
    doubled = true;
    glitched = true;
  } else if (noise < glitchThreshold) {
    next = token
      .split("")
      .map((char, index) => {
        const charNoise = seeded(seedBase + index + 1);
        const replacement = CHAR_REPLACEMENTS[char.toLowerCase()];
        return charNoise > 0.62 && replacement ? replacement : char;
      })
      .join("");
    glitched = next !== token;
  }
  const offsetX = (noise - 0.5) * strength * 6;
  const offsetY = (seeded(seedBase + 99) - 0.5) * strength * 3;
  return { text: next, glitched, doubled, offsetX, offsetY };
};

function FractalEssay({ depth }: { depth: number }) {
  if (depth > 2) return null;
  return (
    <div className={styles.fractalLayer}>
      <p className={styles.fractalTitle}>isomorfismo</p>
      <p className={styles.fractalText}>{FULL_ESSAY}</p>
      <FractalEssay depth={depth + 1} />
    </div>
  );
}

export default function IsomorfismoPage() {
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});
  const phraseRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const holdTimerRef = useRef<number | null>(null);
  const visualSectionRef = useRef<HTMLElement | null>(null);

  const [sectionProgress, setSectionProgress] =
    useState<Record<SectionId, number>>(initialProgress);
  const [revealedPhrases, setRevealedPhrases] = useState<string[]>([]);
  const [visualVisible, setVisualVisible] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [fractalPopup, setFractalPopup] = useState<{
    x: number;
    y: number;
    word: string;
  } | null>(null);

  const suspicionIntensity = sectionProgress.vii;
  const portraitsBySection = useMemo(
    () =>
      EXCAVATION_PORTRAITS.reduce<Partial<Record<SectionId, ExcavationPortrait[]>>>(
        (acc, portrait) => {
          const current = acc[portrait.section] ?? [];
          acc[portrait.section] = [...current, portrait];
          return acc;
        },
        {}
      ),
    []
  );
  const figuresBySection = useMemo(
    () =>
      EXCAVATION_FIGURES.reduce<Partial<Record<SectionId, ExcavationFigure[]>>>(
        (acc, item) => {
          const current = acc[item.section] ?? [];
          acc[item.section] = [...current, item];
          return acc;
        },
        {}
      ),
    []
  );
  const equationsBySection = useMemo(
    () =>
      EQUATION_SPECS.reduce<Partial<Record<SectionId, EquationSpec[]>>>((acc, item) => {
        const current = acc[item.section] ?? [];
        acc[item.section] = [...current, item];
        return acc;
      }, {}),
    []
  );

  const setSectionRef = useCallback((id: SectionId) => {
    return (element: HTMLElement | null) => {
      sectionRefs.current[id] = element;
    };
  }, []);

  const setPhraseRef = useCallback((id: string) => {
    return (element: HTMLSpanElement | null) => {
      phraseRefs.current[id] = element;
    };
  }, []);

  const openFractalFromRect = useCallback((rect: DOMRect, word: string) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const x = Math.max(24, Math.min(viewportWidth - 24, rect.left + rect.width / 2));
    const belowY = rect.bottom + 12;
    const y = Math.max(24, Math.min(viewportHeight - 220, belowY));
    setFractalPopup({ word, x, y });
  }, []);

  const revealPhrase = useCallback((id: string) => {
    setRevealedPhrases((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const revealByProximity = useCallback(
    (clientX: number, clientY: number) => {
      Object.entries(phraseRefs.current).forEach(([id, element]) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        if (Math.hypot(centerX - clientX, centerY - clientY) < 165) {
          revealPhrase(id);
        }
      });
    },
    [revealPhrase]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-phrase-id");
            if (id) revealPhrase(id);
          }
        });
      },
      { threshold: 0.35 }
    );

    Object.values(phraseRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [revealPhrase]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const updateViewportMode = () => setIsCompactViewport(mediaQuery.matches);
    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);
    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  useEffect(() => {
    const node = visualSectionRef.current;
    if (!node || visualVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisualVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visualVisible]);

  useEffect(() => {
    let frame = 0;

    const getProgress = (id: SectionId) => {
      const node = sectionRefs.current[id];
      if (!node) return 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const covered = window.innerHeight - rect.top;
      return Math.max(0, Math.min(1, covered / total));
    };

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setSectionProgress((prev) => {
          const next: Record<SectionId, number> = {
            i: getProgress("i"),
            ii: getProgress("ii"),
            iii: getProgress("iii"),
            iv: getProgress("iv"),
            v: getProgress("v"),
            vi: getProgress("vi"),
            vii: getProgress("vii"),
            viii: getProgress("viii"),
          };
          const changed = (Object.keys(next) as SectionId[]).some(
            (key) => Math.abs(prev[key] - next[key]) > 0.02
          );
          return changed ? next : prev;
        });

        frame = 0;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const clearHold = useCallback(() => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const startFractalHold = useCallback(
    (
      event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
      word: string
    ) => {
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      clearHold();
      holdTimerRef.current = window.setTimeout(() => {
        openFractalFromRect(rect, word);
      }, 1500);
    },
    [clearHold, openFractalFromRect]
  );

  const hideFractal = useCallback(() => {
    clearHold();
    setFractalPopup(null);
  }, [clearHold]);

  const openFractalAtTarget = useCallback(
    (
      event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
      word: string
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      openFractalFromRect(rect, word);
    },
    [openFractalFromRect]
  );

  const corruptionForSection = useCallback(
    (id: SectionId) => {
      if (id === "vii") return 0.2 + sectionProgress.vii * 0.6;
      if (id === "viii") return 0.06 + sectionProgress.viii * 0.18;
      return 0;
    },
    [sectionProgress.vii, sectionProgress.viii]
  );

  const writeProgressForSection = useCallback(
    (id: SectionId) => {
      const raw = sectionProgress[id];
      return Math.max(0, Math.min(1, (raw + 0.2) / 0.48));
    },
    [sectionProgress]
  );

  const writeProgressForHeader = useCallback(
    (id: SectionId) => {
      const raw = sectionProgress[id];
      return Math.max(0, Math.min(1, (raw + 0.16) / 0.36));
    },
    [sectionProgress]
  );

  const renderTokens = useCallback(
    (sectionId: SectionId, text: string, paragraphIndex: number) => {
      const strength = corruptionForSection(sectionId);
      const writeProgress = writeProgressForSection(sectionId);
      const tokens = text.split(/(\s+)/);
      const totalWords = tokens.reduce(
        (count, token) => (token.trim() ? count + 1 : count),
        0
      );
      let seenWords = 0;

      return tokens.map((token, tokenIndex) => {
        if (!token) return null;
        if (!token.trim()) {
          return (
            <span
              key={`${sectionId}-${paragraphIndex}-${tokenIndex}-space`}
              className={styles.wordSpace}
            >
              {token}
            </span>
          );
        }

        seenWords += 1;
        const revealIndex = totalWords > 0 ? seenWords / totalWords : 1;
        const isWritten = writeProgress >= revealIndex;
        const normalized = normalizeToken(token);
        const mutation = mutateToken(
          token,
          strength,
          tokenIndex + paragraphIndex * 101 + sectionId.charCodeAt(0)
        );
        const classNames = [styles.word];
        classNames.push(isWritten ? styles.wordWritten : styles.wordPending);
        if (mutation.glitched) classNames.push(styles.wordCorrupted);
        if (mutation.doubled) classNames.push(styles.wordDoubled);

        if (sectionId === "vi" && FRACTAL_KEYWORDS.has(normalized)) {
          classNames.push(styles.wordFractal);
          return (
            <span
              key={`${sectionId}-${paragraphIndex}-${tokenIndex}`}
              className={classNames.join(" ")}
              data-word={mutation.text}
              style={{
                transform: mutation.glitched
                  ? `translate(${mutation.offsetX}px, ${mutation.offsetY}px)`
                  : undefined,
              }}
              onMouseEnter={(event) => startFractalHold(event, token)}
              onMouseLeave={clearHold}
              onMouseUp={clearHold}
              onClick={(event) => openFractalAtTarget(event, token)}
              onTouchStart={(event) => startFractalHold(event, token)}
              onTouchEnd={(event) => {
                clearHold();
                openFractalAtTarget(event, token);
              }}
            >
              {mutation.text}
            </span>
          );
        }

        return (
          <span
            key={`${sectionId}-${paragraphIndex}-${tokenIndex}`}
            className={classNames.join(" ")}
            data-word={mutation.text}
            style={{
              transform: mutation.glitched
                ? `translate(${mutation.offsetX}px, ${mutation.offsetY}px)`
                : undefined,
            }}
          >
            {mutation.text}
          </span>
        );
      });
    },
    [
      clearHold,
      corruptionForSection,
      openFractalAtTarget,
      startFractalHold,
      writeProgressForSection,
    ]
  );

  const renderHiddenPhrases = useCallback(
    (text: string, paragraphIndex: number) => {
      const phrase = HIDDEN_PHRASES.find((candidate) =>
        text.toLowerCase().includes(candidate.text.toLowerCase())
      );
      if (!phrase) return renderTokens("v", text, paragraphIndex);

      const split = text.toLowerCase().indexOf(phrase.text.toLowerCase());
      const resolved = text.slice(split, split + phrase.text.length);
      const before = text.slice(0, split);
      const after = text.slice(split + resolved.length);
      const phraseWriteProgress = writeProgressForSection("v");
      const phraseRevealIndex = (paragraphIndex + 1) / Math.max(1, SECTIONS[4].paragraphs.length);
      const isWritten = phraseWriteProgress >= phraseRevealIndex;
      return (
        <>
          {renderTokens("v", before, paragraphIndex)}
          <span
            ref={setPhraseRef(phrase.id)}
            data-phrase-id={phrase.id}
            className={`${styles.hiddenPhrase} ${
              isWritten ? styles.wordWritten : styles.wordPending
            } ${
              revealedPhrases.includes(phrase.id) ? styles.hiddenPhraseVisible : ""
            }`}
          >
            {resolved}
          </span>
          {renderTokens("v", after, paragraphIndex)}
        </>
      );
    },
    [renderTokens, revealedPhrases, setPhraseRef, writeProgressForSection]
  );

  const renderFoldingParagraph = useCallback(
    (text: string) => {
      const active = sectionProgress.viii > 0.55;
      return text.split(/(\s+)/).map((token, index) => {
        if (!token.trim()) {
          return <span key={`space-${index}`}>{token}</span>;
        }
        const randomX = Math.round((seeded(index + 31) - 0.5) * 120);
        const randomY = Math.round((seeded(index + 57) - 0.5) * 180);
        const randomFold = Math.round(40 + seeded(index + 79) * 120);
        return (
          <span
            key={`fold-${index}`}
            className={`${styles.word} ${active ? styles.wordFolding : ""}`}
            style={
              {
                "--dx": `${randomX}px`,
                "--dy": `${randomY}px`,
                "--fold": `${randomFold}deg`,
                "--delay": `${index * 0.05}s`,
              } as CSSProperties
            }
          >
            {token}
          </span>
        );
      });
    },
    [sectionProgress.viii]
  );

  const renderHeader = useCallback(
    (section: EssaySection): ReactNode => {
      const titleWords = section.title.split(" ");
      const totalGlyphs = titleWords.reduce((sum, word) => sum + word.length, 0);
      const writeProgress = writeProgressForHeader(section.id);
      const glyphs = (
        keyPrefix: string,
        extraClass?: string,
        styleForIndex?: (index: number) => CSSProperties
      ) => {
        let seenGlyphs = 0;
        return titleWords.flatMap((word, wordIndex) => {
          const charNodes = word.split("").map((char, charIndex) => {
            seenGlyphs += 1;
            const globalIndex = seenGlyphs - 1;
            const revealIndex = totalGlyphs > 0 ? seenGlyphs / totalGlyphs : 1;
            const isWritten = writeProgress >= revealIndex;
            const classes = [styles.headerGlyph];
            classes.push(isWritten ? styles.headerGlyphWritten : styles.headerGlyphPending);
            if (extraClass) classes.push(extraClass);
            return (
              <span
                key={`${keyPrefix}-char-${wordIndex}-${charIndex}`}
                className={classes.join(" ")}
                style={styleForIndex?.(globalIndex)}
              >
                {char}
              </span>
            );
          });

          const nodes: ReactNode[] = [
            <span key={`${keyPrefix}-word-${wordIndex}`} className={styles.headerWord}>
              {charNodes}
            </span>,
          ];

          if (wordIndex < titleWords.length - 1) {
            nodes.push(
              <span key={`${keyPrefix}-space-${wordIndex}`} className={styles.headerSpace}>
                {" "}
              </span>
            );
          }

          return nodes;
        });
      };

      // I — el campo: cada letra ondula como una excitación local
      if (section.id === "i") {
        return (
          <h2 className={`${styles.header} ${styles.headerField}`}>
            {glyphs(`${section.id}-field`, styles.letterField, (index) => {
              return { "--index": index } as CSSProperties;
            })}
          </h2>
        );
      }

      // II — dos puntos, una línea: el título es tachado por la línea que cualquiera puede trazar
      if (section.id === "ii") {
        return (
          <h2 className={`${styles.header} ${styles.headerStrike}`}>
            <span className={styles.strikeInner}>
              {glyphs(`${section.id}-strike`)}
              <span aria-hidden className={styles.strikeLine} />
              <span aria-hidden className={`${styles.strikePoint} ${styles.strikePointA}`} />
              <span aria-hidden className={`${styles.strikePoint} ${styles.strikePointB}`} />
            </span>
          </h2>
        );
      }

      // III — caja dentro de caja: contorno con el título anidado dentro de sí mismo
      if (section.id === "iii") {
        return (
          <h2
            className={`${styles.header} ${styles.headerNest}`}
            data-title={section.title}
          >
            {glyphs(`${section.id}-nest`)}
            <span aria-hidden className={styles.nestEcho}>
              {section.title}
            </span>
            <span aria-hidden className={`${styles.nestEcho} ${styles.nestEchoDeep}`}>
              {section.title}
            </span>
          </h2>
        );
      }

      // IV — la serie armónica: cada letra vibra a f, 2f o 3f
      if (section.id === "iv") {
        return (
          <h2 className={`${styles.header} ${styles.headerHarmonic}`}>
            {glyphs(`${section.id}-harmonic`, styles.letterHarmonic, (index) => {
              return {
                "--harmonic": (index % 3) + 1,
                "--index": index,
              } as CSSProperties;
            })}
          </h2>
        );
      }

      // V — narración sin narrador: las letras cercanas al centro se ausentan
      if (section.id === "v") {
        const center = (totalGlyphs - 1) / 2;
        return (
          <h2 className={`${styles.header} ${styles.headerVoidCenter}`}>
            {glyphs(`${section.id}-void`, styles.letterVoid, (index) => {
              const dist = Math.abs(index - center) / Math.max(1, center);
              const dip = Math.max(0, 1 - dist) * 0.92;
              return {
                "--dip": dip,
                "--index": index,
              } as CSSProperties;
            })}
          </h2>
        );
      }

      // VI — el lecho de roca: el título se asienta, las letras convergen
      if (section.id === "vi") {
        return (
          <h2 className={`${styles.header} ${styles.headerBedrock}`}>
            {glyphs(`${section.id}-bedrock`)}
          </h2>
        );
      }

      // VII — la misma cámara descompuesta: doble exposición que intenta separarse
      if (section.id === "vii") {
        return (
          <h2
            className={`${styles.header} ${styles.headerDouble}`}
            data-title={section.title}
          >
            {glyphs(`${section.id}-double`)}
          </h2>
        );
      }

      // VIII — el campo se dobla: el numeral se pliega sobre sí mismo
      return (
        <h2 className={`${styles.header} ${styles.headerFoldTitle}`}>
          <span className={styles.foldPivot}>{glyphs(`${section.id}-fold`)}</span>
        </h2>
      );
    },
    [writeProgressForHeader]
  );

  const digProgressForSection = useCallback(
    (id: SectionId) => {
      if (isCompactViewport) return 1;
      const raw = sectionProgress[id];
      return Math.max(0, Math.min(1, (raw - 0.02) / 0.3));
    },
    [isCompactViewport, sectionProgress]
  );

  const renderFigureFx = useCallback((motif: FigureMotif) => {
    if (motif === "field") {
      return (
        <div className={styles.figureFx} aria-hidden>
          <span className={styles.fieldLine} />
          <span className={`${styles.fieldLine} ${styles.fieldLineAlt}`} />
        </div>
      );
    }

    if (motif === "nest") {
      return (
        <div className={styles.figureFx} aria-hidden>
          <span className={styles.nestBox} />
          <span className={`${styles.nestBox} ${styles.nestBoxInner}`} />
          <span className={`${styles.nestBox} ${styles.nestBoxCore}`} />
        </div>
      );
    }

    if (motif === "harmonic") {
      return (
        <div className={styles.figureFx} aria-hidden>
          <span className={styles.harmonicBar} style={{ "--harmonic": 1 } as CSSProperties} />
          <span className={styles.harmonicBar} style={{ "--harmonic": 2 } as CSSProperties} />
          <span className={styles.harmonicBar} style={{ "--harmonic": 3 } as CSSProperties} />
        </div>
      );
    }

    if (motif === "orbit") {
      return (
        <div className={styles.figureFx} aria-hidden>
          <span className={styles.orbitRing} />
          <span className={`${styles.orbitRing} ${styles.orbitRingAlt}`} />
        </div>
      );
    }

    return (
      <div className={styles.figureFx} aria-hidden>
        <span className={styles.foldGrid} />
        <span className={`${styles.foldGrid} ${styles.foldGridAlt}`} />
      </div>
    );
  }, []);

  const renderVisualInterlude = useCallback(() => {
    const noiseFragments = [
      { text: "⟨0|Ĥ|0⟩ ≠ 0", x: "6%", y: "8%", rot: "-4deg", opacity: 0.16 },
      { text: "every thing must go", x: "72%", y: "12%", rot: "3deg", opacity: 0.14 },
      { text: "śūnyatā(śūnyatā)", x: "64%", y: "42%", rot: "-2deg", opacity: 0.18 },
      { text: "while(excavas){ roca }", x: "14%", y: "66%", rot: "5deg", opacity: 0.12 },
      { text: "no hay cosa. hay red.", x: "80%", y: "74%", rot: "-5deg", opacity: 0.11 },
      { text: "f : A → B", x: "28%", y: "88%", rot: "2deg", opacity: 0.13 },
    ] as const;

    return (
      <section
        ref={visualSectionRef}
        className={`${styles.visualSection} ${
          visualVisible ? styles.visualSectionVisible : ""
        }`}
        aria-label="Sección visual: El lecho de roca"
      >
        <div className={styles.visualEquationLayer} aria-hidden>
          <MathEquation latex={"\\frac{F}{A} = -\\frac{\\pi^{2}\\hbar c}{240 d^{4}}"} className={styles.visualEquationOne} />
          <MathEquation latex={"3 = \\{0,1,2\\} \\neq \\{\\{\\{\\emptyset\\}\\}\\}"} className={styles.visualEquationTwo} />
          <MathEquation latex={"S \\nvdash \\mathrm{Con}(S)"} className={styles.visualEquationThree} />
        </div>
        <div className={styles.visualNoise} aria-hidden>
          {noiseFragments.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              className={styles.noiseFragment}
              style={
                {
                  "--x": item.x,
                  "--y": item.y,
                  "--rot": item.rot,
                  "--opacity": item.opacity,
                } as CSSProperties
              }
            >
              {item.text}
            </span>
          ))}
        </div>

        <div className={styles.visualScaffold}>
          <div className={styles.dropCapsBlock}>
            <p className={styles.dropCapLine}>
              <span className={styles.dropCap}>C</span>INCO EXCAVACIONES INDEPENDIENTES.
              MATERIA, EXPERIENCIA CONTEMPLATIVA, NÚMERO, SONIDO, MENTE. MÉTODOS QUE NO
              SE CONOCEN. ÉPOCAS QUE NO SE TOCAN.
            </p>
            <p className={styles.dropCapLine}>
              <span className={styles.dropCap}>U</span>NA CALCULA. OTRA LIBERA. OTRA
              DEMUESTRA. OTRA MEZCLA DISCOS. OTRA MODELA CEREBROS. Y TODAS, AL LLEGAR LO
              SUFICIENTEMENTE ABAJO, GOLPEAN LO MISMO.
            </p>
            <p className={styles.dropCapLine}>
              <span className={styles.dropCap}>N</span>O HAY SUSTANCIA. HAY ESTRUCTURA. LA
              COSA SE DISUELVE Y QUEDA LA RELACIÓN.
            </p>
          </div>

          <header className={styles.visualHeader}>
            <h3 className={styles.visualTitle}>EL LECHO DE ROCA</h3>
            <p className={styles.visualSubtitle}>NO HAY COSA. HAY RED.</p>
          </header>

          <p className={styles.visualParagraph}>
            LA OBJECIÓN LLEGA SOLA: ¿RELACIONES ENTRE QUÉ? PARECE DEVASTADORA Y TIENE
            DIECIOCHO SIGLOS DE RETRASO. NAGARJUNA RESPONDIÓ: RELACIÓN HASTA EL FONDO,
            SIN FONDO. Y POR SI ALGUIEN QUISIERA CONVERTIR LA VACUIDAD EN LA NUEVA
            SUSTANCIA, LA VACUIDAD TAMBIÉN ESTÁ VACÍA. LA DOCTRINA SE APLICA A SÍ MISMA
            Y NO COLAPSA.
          </p>

          <div className={styles.structureCard}>
            <p className={styles.structureLabel}>
              Realismo estructural óntico — Ladyman &amp; Ross, 2007
            </p>
            <MathEquation
              latex={"\\Psi(e_1, e_2) \\;=\\; -\\,\\Psi(e_2, e_1) \\quad\\Rightarrow\\quad e_1 \\equiv e_2"}
              display
            />
            <ul className={styles.visualBullets}>
              <li>INTERCAMBIA DOS ELECTRONES Y EL UNIVERSO NO SE ENTERA.</li>
              <li>NO ES QUE NO PODAMOS DISTINGUIRLOS: NO HAY NADA QUE DISTINGUIR.</li>
              <li>LAS PARTÍCULAS CUÁNTICAS CARECEN DE INDIVIDUALIDAD.</li>
              <li>LA METAFÍSICA SERIA DEBERÍA ABANDONAR LOS OBJETOS DE UNA VEZ.</li>
            </ul>
          </div>

          <div className={styles.benacerrafFloat}>
            <p className={styles.benacerrafLead}>
              <span className={styles.benacerrafBig}>3</span> : una posición, no un objeto
            </p>
            <p className={styles.benacerrafLine}>
              <span className={styles.logicSymbol}>3</span> = {"{0, 1, 2}"}{" "}
              <span className={styles.logicSymbol}>·</span> 3 = {"{{{∅}}}"}
            </p>
            <p className={styles.benacerrafLine}>
              dos construcciones <span className={styles.logicSymbol}>≠</span> entre sí{" "}
              <span className={styles.logicSymbol}>→</span> ninguno es el verdadero tres
            </p>
            <p className={styles.benacerrafLine}>
              la red es todo lo que hay <span className={styles.logicSymbol}>∎</span>
            </p>
          </div>

          <figure className={styles.isomorphFloat}>
            <Image
              src="/images/pieces/isomorfismo.svg"
              alt="Cinco excavaciones proyectadas sobre la misma estructura"
              width={1600}
              height={900}
              className={styles.isomorphImage}
              unoptimized
            />
            <figcaption className={styles.diagramCaptionNeon}>
              LA MISMA ESTRUCTURA · CINCO TERRENOS
            </figcaption>
          </figure>

          <p className={styles.visualQuote}>relación hasta el fondo</p>

          <svg viewBox="0 0 340 92" className={styles.arrowDoodle} role="img">
            <title>Curva que vuelve a sí misma</title>
            <path d="M18 22 C 8 68, 108 82, 322 38" />
            <path d="M310 30 L332 36 L314 48" />
          </svg>

          <pre className={`${styles.codeFloat} ${styles.codeFloatA}`} aria-hidden>
            {`function vacuidad(x) {\n  return vacuidad(vacuidad);\n  // sunyata de sunyata: no colapsa\n}`}
          </pre>
          <pre className={`${styles.codeFloat} ${styles.codeFloatB}`} aria-hidden>
            {`mientras (excavas) {\n  encuentras(relaciones);\n  // fondo no encontrado\n}`}
          </pre>
        </div>
      </section>
    );
  }, [visualVisible]);

  const pageStyle = useMemo(
    () =>
      ({
        "--deco-opacity": `${0.16 + suspicionIntensity * 0.1}`,
        "--deco-speed": `${1 + suspicionIntensity * 0.85}`,
      } as CSSProperties),
    [suspicionIntensity]
  );

  return (
    <>
      <Navigation />
      <main
        className={styles.page}
        style={pageStyle}
        onClick={hideFractal}
        onMouseMove={(event) => revealByProximity(event.clientX, event.clientY)}
        onTouchMove={(event) => {
          if (!event.touches.length) return;
          revealByProximity(event.touches[0].clientX, event.touches[0].clientY);
        }}
      >
        <div className={styles.floatingLayer} aria-hidden>
          {FLOATING_FRAGMENTS.map((fragment, index) => (
            <span
              key={`${fragment.text}-${index}`}
              className={`${styles.floatingItem} ${
                fragment.side === "left" ? styles.floatingLeft : styles.floatingRight
              }`}
              style={
                {
                  left: fragment.x,
                  "--duration": `${fragment.duration / (1 + suspicionIntensity * 0.55)}s`,
                  "--delay": `${fragment.delay}s`,
                } as CSSProperties
              }
            >
              {fragment.text}
            </span>
          ))}
        </div>

        <article className={styles.content}>
          <header className={styles.introHeader}>
            <p className={styles.introDate}>{INTRO_META.date}</p>
            <h1 className={styles.introTitle}>{INTRO_META.title}</h1>
            <div className={styles.introTags} aria-label="Tags de Isomorfismo">
              {INTRO_META.tags.map((tag) => (
                <span key={tag} className={styles.introTag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className={styles.proem}>
            {PROEM.map((line, index) => (
              <p
                key={`proem-${index}`}
                className={index === 0 ? styles.proemLead : styles.proemLine}
              >
                {line}
              </p>
            ))}
            <p className={styles.proemQuestion}>{PROEM_QUESTION}</p>
          </div>

          {SECTIONS.map((section) => {
            const sectionPortraits = portraitsBySection[section.id] ?? [];
            const sectionFigures = figuresBySection[section.id] ?? [];
            const sectionEquations = equationsBySection[section.id] ?? [];
            return (
              <Fragment key={section.id}>
                <section
                  ref={setSectionRef(section.id)}
                  className={styles.section}
                >
                  {sectionPortraits.length > 0 && (
                    <div
                      className={`${styles.digGallery} ${
                        sectionPortraits.length > 1 ? styles.digGalleryDouble : ""
                      }`}
                    >
                      {sectionPortraits.map((portrait) => {
                        const dig = digProgressForSection(portrait.section);
                        return (
                          <figure
                            key={portrait.id}
                            className={styles.digCard}
                            style={{ "--dig": dig } as CSSProperties}
                          >
                            <div className={styles.digMedia}>
                              <Image
                                src={portrait.image}
                                alt={`Retrato de ${portrait.name}`}
                                className={styles.digImage}
                                width={portrait.width}
                                height={portrait.height}
                                loading="lazy"
                              />
                              <span aria-hidden className={styles.digSoil} />
                              <span aria-hidden className={styles.digFrontier} />
                            </div>
                            <figcaption className={styles.digCaption}>
                              <span className={styles.digLabel}>{portrait.digLabel}</span>
                              <span className={styles.digFinding}>{portrait.finding}</span>
                              <span className={styles.digMeta}>
                                <span className={styles.digName}>{portrait.name}</span>
                                <span className={styles.digDepth}>
                                  {dig >= 1 ? "expuesto" : `prof. ${Math.round(dig * 100)}%`}
                                </span>
                              </span>
                            </figcaption>
                          </figure>
                        );
                      })}
                    </div>
                  )}

                  {renderHeader(section)}

                  <div className={styles.paragraphs}>
                    {section.paragraphs.map((paragraph, paragraphIndex) => {
                      const isLastFoldingParagraph =
                        section.id === "viii" && paragraphIndex === section.paragraphs.length - 1;
                      const isStaticSection = section.id === "i" || section.id === "ii";
                      const isShortLine =
                        section.id === "viii" && paragraph.length < 120 && !isLastFoldingParagraph;

                      return (
                        <p
                          key={`${section.id}-${paragraphIndex}`}
                          className={isShortLine ? styles.foldLine : undefined}
                        >
                          {isStaticSection || isCompactViewport
                            ? paragraph
                            : section.id === "v"
                            ? renderHiddenPhrases(paragraph, paragraphIndex)
                            : isLastFoldingParagraph
                            ? renderFoldingParagraph(paragraph)
                            : renderTokens(section.id, paragraph, paragraphIndex)}
                        </p>
                      );
                    })}
                  </div>

                  {sectionEquations.length > 0 && (
                    <div className={styles.equationStack}>
                      {sectionEquations.map((equation) => (
                        <div key={equation.id} className={styles.equationCard}>
                          <MathEquation latex={equation.latex} display />
                          {equation.caption && (
                            <span className={styles.equationCaption}>{equation.caption}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionFigures.length > 0 && (
                    <div className={styles.figureGallery}>
                      {sectionFigures.map((figure) => (
                        <figure key={figure.id} className={styles.figureCard}>
                          <div className={styles.figureMedia}>
                            <Image
                              src={figure.src}
                              alt={figure.alt}
                              className={styles.figureImage}
                              width={1600}
                              height={900}
                              loading="lazy"
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 680px"
                            />
                            {renderFigureFx(figure.motif)}
                          </div>
                          <figcaption className={styles.figureCaption}>
                            {figure.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </section>

                {section.id === "vi" && renderVisualInterlude()}
              </Fragment>
            );
          })}

          <div className={styles.aftermath} />

          <nav
            className="mt-24 pt-8 border-t border-gris-oscuro flex justify-between items-start"
            aria-label="Navegación entre piezas"
          >
            <Link
              href="/ensayos/autorreferencia"
              className="group text-left max-w-[45%]"
            >
              <span className="text-[0.55rem] tracking-wide text-gris block mb-2">
                anterior
              </span>
              <span className="text-lg font-bold text-gris group-hover:text-neon transition-colors duration-300">
                autorreferencia
              </span>
            </Link>
            <div />
          </nav>

          <footer className={styles.siteFooter}>
            <span className={styles.siteBrand}>bratzche journal</span>
          </footer>
        </article>

        {fractalPopup && (
          <div
            className={styles.fractalOverlay}
            style={{ left: fractalPopup.x, top: fractalPopup.y }}
            aria-live="polite"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.fractalWord}>{fractalPopup.word}</div>
            <FractalEssay depth={0} />
          </div>
        )}
      </main>
    </>
  );
}
