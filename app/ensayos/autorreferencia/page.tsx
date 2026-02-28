"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Navigation from "@/components/Navigation";
import MathEquation from "./MathEquation";
import styles from "./page.module.css";
import "katex/dist/katex.min.css";

type SectionId =
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii"
  | "viii";

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

type CosmicImage = {
  id: string;
  section: SectionId;
  src: string;
  alt: string;
  caption: string;
};

type EquationSpec = {
  id: string;
  section: SectionId;
  latex: string;
  caption?: string;
};

type ThinkerMotif = "wave" | "atom" | "relativity";

type ThinkerPortrait = {
  id: string;
  section: SectionId;
  name: string;
  context: string;
  image: string;
  motif: ThinkerMotif;
};

const SECTIONS: EssaySection[] = [
  {
    id: "i",
    title: "I. El lenguaje sin cuerpo",
    paragraphs: [
      "Las matemáticas no pesan. No ocupan espacio. No tienen temperatura ni duración ni color. Son entidades sin carne, relaciones puras, estructuras que existen en ningún lugar. Y sin embargo, cuando el universo quiere decirse a sí mismo con precisión, habla en matemáticas. Ahí hay algo que no cierra. Ahí hay pregunta.",
      "En un ensayo anterior llegué a una conclusión que me dio serenidad. Si todo es campo, si las partículas son excitaciones, si lo que llamamos materia es vibración organizada del vacío cuántico, entonces el \"yo\" no es sustancia. Es configuración transitoria. Patrón que emerge y se disuelve. No hay núcleo metafísico escondido detrás del fenómeno. Solo estructura dinámica. Eso bastaba.",
      "Pero quedó una grieta que no cerré. ¿Por qué la estructura es capturable matemáticamente? ¿Por qué abstracciones desarrolladas sin contacto con el mundo físico terminan describiendo el mundo físico con precisión absurda?",
      "Considera π. Un número que emerge de la relación entre circunferencia y diámetro. Geometría pura. Pero π aparece en la identidad de Euler.",
      "Cinco constantes fundamentales. Una ecuación. Euler la llamó la más bella de las matemáticas. Conecta el círculo con el crecimiento exponencial, con los números imaginarios, con la unidad y con la nada. No hay razón obvia para que estén relacionadas. Pero lo están.",
      "Y π aparece en la distribución de probabilidad. En las ecuaciones de Einstein. En la función de onda cuántica. Un círculo no tiene nada que ver con la probabilidad de que una partícula esté en cierto lugar. Y sin embargo, π está ahí.",
      "O φ, la proporción áurea. 1.618... Un número que surge de una relación simple: φ² = φ + 1. Pero φ aparece en la filotaxis de las plantas, en la espiral de las galaxias, en la estructura de los cuasicristales. La naturaleza parece preferir ciertas proporciones. No cualquier número. Estos números.",
      "Eugene Wigner, físico, premio Nobel, escribió en 1960 sobre \"la irrazonable efectividad de las matemáticas\". No es solo que funcionen. Es que no deberían funcionar tan bien. La correspondencia es \"un regalo maravilloso que no entendemos ni merecemos\".",
      "Los números complejos surgieron como truco algebraico para resolver ecuaciones cúbicas. Números \"imaginarios\". Absurdos. Juegos formales. Cuatrocientos años después, la mecánica cuántica no puede formularse sin ellos. La i no es opcional. La función de onda es intrínsecamente compleja. El universo, en su nivel más básico, requiere números que inventamos para resolver puzzles que no tenían nada que ver con física.",
      "La geometría diferencial era ejercicio puro cuando Riemann la desarrolló. Curvaturas de espacios abstractos. Nadie pensaba en aplicaciones. Sesenta años después, Einstein descubre que la gravedad no es fuerza sino curvatura del espacio-tiempo. Necesitaba un lenguaje para describir espacios curvos. El lenguaje ya existía.",
      "Esto se repite. Las matemáticas llegan primero. La física las encuentra después. Como si los matemáticos exploraran un territorio que la naturaleza ya habitaba.",
      "Una interpretación: las matemáticas son el catálogo de todas las estructuras coherentes posibles. El universo físico realiza algunas de ellas. Cuando encontramos correspondencia, no imponemos forma arbitraria. Detectamos coincidencia estructural.",
      "La noción de invarianza es clave. La velocidad de la luz es la misma en todo sistema de referencia. La carga del electrón es la misma en todo lugar del universo. Las leyes de la física son las mismas hoy que hace mil millones de años. Estas constancias no son convenciones. Son señales de que tocamos algo constitutivo.",
      "Pero aquí viene la torsión.",
      "La mente que detecta invariancias es ella misma una configuración del universo. Los campos que describimos con ecuaciones son los mismos campos que constituyen el cerebro que escribe las ecuaciones. No hay un afuera. El sistema está describiéndose a sí mismo.",
      "Y eso es lo que no cerré en el ensayo anterior. Dije que somos campo. Que somos vibración. Que somos estructura. Pero no pregunté qué significa que la estructura se modele a sí misma. Qué pasa cuando el mapa está dentro del territorio. Qué límites aparecen cuando el observador es parte de lo observado.",
    ],
  },
  {
    id: "ii",
    title: "II. El mapa y el territorio",
    paragraphs: [
      "Borges escribió sobre un imperio donde la cartografía alcanzó tal perfección que el mapa llegó a tener el tamaño exacto del territorio. Coincidía punto por punto. Era perfecto. Y por eso era inútil. Las generaciones siguientes lo abandonaron. Solo quedaron ruinas en los desiertos.",
      "El cuento parece sobre la futilidad del exceso. Pero es sobre algo más profundo. Es sobre la imposibilidad lógica de la representación total.",
      "Si el mapa debe representar el territorio completamente, debe incluir todo lo que está en el territorio. Pero el cartógrafo está en el territorio. Y el mapa está en el territorio. Para ser completo, el mapa debe incluir al cartógrafo haciendo el mapa. Y al mapa que incluye al cartógrafo. Y al mapa que incluye al mapa que incluye al cartógrafo.",
      "La regresión no termina. No porque nos falte papel. Porque la operación de clausura genera más sistema. Cada intento de cerrar abre. El borde retrocede.",
      "No es límite técnico. Es geometría.",
      "El proyecto científico es hacer el mapa del universo. La teoría del todo. La ecuación que contenga todas las ecuaciones. Pero el científico está en el universo. El cerebro que formula la teoría está hecho de los mismos campos que la teoría describe. Para que la teoría sea completa, debe incluir al cerebro formulando la teoría.",
      "El mapa de Borges no es metáfora. Es estructura.",
    ],
  },
  {
    id: "iii",
    title: "III. El universo participativo",
    paragraphs: [
      "John Archibald Wheeler fue uno de los físicos más importantes del siglo XX. Trabajó con Bohr. Fue mentor de Feynman. Acuñó \"agujero negro\" y \"agujero de gusano\". No era un místico. Era un físico riguroso.",
      "En sus últimos años propuso algo que suena a metafísica pero que formuló como física: el universo no existe de forma completamente definida hasta que es observado.",
      "La mecánica cuántica dice que los sistemas existen en superposición de estados hasta que una medición los colapsa. Wheeler llevó esto al extremo: si todo es cuántico, la definición del universo requiere observación.",
      "El experimento de elección retardada lo ilustra. Un fotón viaja. Antes de que llegue al detector, decides qué tipo de medición harás. Tu decisión presente determina qué \"hizo\" el fotón en el pasado. No es que cambie el pasado. Es que el pasado no estaba definido hasta que tu medición lo fijó.",
      "Wheeler dibujó un diagrama: un ojo mirando hacia atrás en el tiempo, la línea de visión curvándose hasta que el ojo se ve a sí mismo. El universo observándose para existir.",
      "\"It from bit\", lo llamó. La realidad física emerge de actos de observación. No es que la materia produzca información. Es que la información constituye la materia.",
      "Pero el observador es parte del universo. No hay afuera. El sistema se construye a sí mismo a través de sus propias partes. Se levanta tirando de sus propios cordones.",
    ],
  },
  {
    id: "iv",
    title: "IV. Gödel en el cosmos",
    paragraphs: [
      "En 1931, Kurt Gödel demostró que cualquier sistema formal suficientemente poderoso contiene proposiciones verdaderas que no pueden demostrarse dentro del sistema.",
      "No es que no las hayamos encontrado. No es que necesitemos matemáticos más inteligentes. La estructura del sistema lo impide. Hay verdades que el sistema puede expresar pero no puede probar.",
      "Gödel lo demostró construyendo una proposición que dice: \"esta proposición no es demostrable en este sistema\". Si fuera demostrable, sería falsa, y el sistema sería inconsistente. Si no es demostrable, es verdadera, y el sistema es incompleto. No hay salida.",
      "Alfred Tarski demostró algo análogo para la verdad: ningún lenguaje puede definir completamente su propio predicado de verdad sin caer en paradoja. Para hablar de la verdad de un lenguaje necesitas un metalenguaje. Pero el metalenguaje tiene el mismo problema.",
      "Gödel, Tarski, Heisenberg. Lógica, semántica, física. Distintos dominios, misma estructura: el sistema que intenta capturarse a sí mismo encuentra que la captura genera más sistema.",
      "La clausura no falla. Regresa.",
      "Aplicado al proyecto de conocimiento total: el universo genera configuraciones capaces de modelar el universo. Pero esas configuraciones son parte del universo. Para que el modelo sea completo, debe incluirse a sí mismo modelando.",
      "No hay cierre. Hay bucle.",
    ],
  },
  {
    id: "v",
    title: "V. Bootstrap ontológico",
    paragraphs: [
      "Wheeler sugirió que el universo se \"bootstrapea\". No hay causa primera. No hay fundamento que sostenga todo sin necesitar soporte. El sistema emerge de sí mismo.",
      "Esto viola la intuición causal. Queremos cadenas. Esto causa aquello, que causa lo otro, hasta llegar a algo que no necesita causa. Un primer motor. Un fundamento.",
      "Pero Wheeler apunta a otra posibilidad: la cadena no termina en ancla. Termina en bucle. El efecto participa en su causa. El observador constituye lo observado, pero el observador es producto de lo observado.",
      "Los sistemas autopoiéticos existen. Una célula se produce a sí misma. La vida se sostiene sin necesitar un \"afuera\" que la empuje. No es magia. Es una forma de organización donde el producto es también el productor.",
      "¿Podría el universo entero tener esa estructura? Un sistema que se produce a sí mismo, que se observa a sí mismo, sin exterior, sin fundamento, sin antes.",
      "Buscar el fundamento sería entonces como buscar el borde de una esfera. Puedes caminar para siempre. Nunca llegas. No porque sea infinita. Porque la forma no tiene borde.",
    ],
  },
  {
    id: "vi",
    title: "VI. El yo como ilusión de exterioridad",
    paragraphs: [
      "Si el observador constituye lo observado, y el observador es parte de lo observado, entonces ¿qué es el observador?",
      "Douglas Hofstadter propone que el yo es un bucle extraño. Un patrón que surge cuando un sistema se modela a sí mismo con suficiente resolución. El cerebro construye un modelo del mundo. En algún punto, el modelo incluye al modelador. Ese gesto recursivo genera la ilusión de un \"yo\" que mira desde afuera.",
      "Pero no hay afuera. El yo no es una entidad que observa el sistema. Es el sistema doblándose para verse.",
      "El yo es la ilusión de exterioridad que el sistema necesita para funcionar. Para observar, tiene que haber un \"desde donde\". Pero no lo hay. Entonces el sistema genera la ficción de un punto de vista externo. Esa ficción es el yo.",
      "No eres el observador del universo. Eres el gesto mediante el cual el universo simula tener borde.",
      "El yo no es el fundamento. Es el síntoma de que no hay fundamento. Es la marca de la incompletitud, no su solución.",
    ],
  },
  {
    id: "vii",
    title: "VII. Ruinas del mapa",
    paragraphs: [
      "Volvemos a Borges. El mapa que coincide con el territorio se desintegra. Solo quedan ruinas en los desiertos.",
      "El proyecto de conocimiento total es ese mapa. La teoría del todo. La ecuación maestra. Cada generación avanza. Las teorías se vuelven más precisas, más unificadas.",
      "Pero el cartógrafo sigue adentro. Y mientras más crece el mapa, más crece el problema de incluir al cartógrafo.",
      "Quizás lo que llamamos \"realidad\" no es el territorio. Es el escombro de un mapa que intentó ser total. Fragmentos de ecuaciones. Restos de teorías. Ruinas de un proyecto imposible.",
      "No porque fracasemos. Porque la estructura del proyecto contiene su propia imposibilidad.",
    ],
  },
  {
    id: "viii",
    title: "VIII. Borde sin clausura",
    paragraphs: [
      "No estamos fuera del misterio. Somos su borde.",
      "Pero el borde no puede cerrarse. No por ignorancia. Por geometría.",
      "El sistema que pregunta por su propio fundamento no puede recibir respuesta completa. La pregunta genera más sistema. La respuesta requeriría un punto de vista que no existe. El ojo que quiere verse necesita espejo. Pero el espejo está dentro del ojo.",
      "Wheeler, Gödel, Borges, Hofstadter. Físico, lógico, escritor, científico cognitivo. Distintos lenguajes, misma intuición: el cierre total es ilusión gramatical.",
      "Y sin embargo preguntamos. El sistema que no puede cerrarse insiste en intentar.",
      "Quizás ese gesto es el punto. No la respuesta. El gesto.",
      "El universo no tiene fundamento que podamos alcanzar desde dentro. Tiene bucle. Y el bucle, al girar, genera la ilusión de que hay algo que encontrar.",
      "La búsqueda es el síntoma.",
      "El fundamento es el nombre que le damos al vértigo de no encontrar fondo.",
      "No hay nada detrás.",
      "Solo la forma del buscar.",
      "Solo el mapa desintegrándose.",
      "Solo el ojo, adentro del ojo, intentando verse.",
    ],
  },
];

const FLOATING_FRAGMENTS: FloatingFragment[] = [
  { text: "ψ(x) = ∫ e^(ipx/ℏ) φ(p) dp", side: "left", x: "max(1rem, calc(50% - 560px))", duration: 22, delay: 0 },
  {
    text: "if (observer === observed) { return undefined; }",
    side: "right",
    x: "min(calc(100% - 7rem), calc(50% + 430px))",
    duration: 20,
    delay: 2,
  },
  { text: "e^(iπ) + 1 = 0", side: "left", x: "max(1rem, calc(50% - 620px))", duration: 19, delay: 4 },
  { text: "iℏ ∂ψ/∂t = Ĥψ", side: "right", x: "min(calc(100% - 8rem), calc(50% + 500px))", duration: 23, delay: 5.5 },
  { text: "∂μψ̄γμψ", side: "left", x: "max(1rem, calc(50% - 500px))", duration: 17, delay: 7 },
  { text: "[x, p] = iℏ", side: "right", x: "min(calc(100% - 6rem), calc(50% + 420px))", duration: 16, delay: 9 },
  { text: "∫𝒟x e^{iS[x]/ℏ}", side: "left", x: "max(1rem, calc(50% - 580px))", duration: 24, delay: 11 },
];

const HIDDEN_PHRASES: PhraseConfig[] = [
  {
    id: "iv-phrase-1",
    text: "el sistema que intenta capturarse a sí mismo encuentra que la captura genera más sistema",
  },
  {
    id: "iv-phrase-2",
    text: "Siempre queda resto",
  },
  {
    id: "iv-phrase-3",
    text: "La clausura no falla. Regresa.",
  },
];

const COSMIC_IMAGES: CosmicImage[] = [
  {
    id: "galaxy-field",
    section: "iii",
    src: "/images/autorreferencia/galaxy-field.svg",
    alt: "Diagrama técnico de campo galáctico",
    caption: "campo galáctico",
  },
  {
    id: "wave-packet",
    section: "iii",
    src: "/images/autorreferencia/wave-packet.svg",
    alt: "Representación técnica de paquete de ondas",
    caption: "paquete de ondas",
  },
  {
    id: "quantum-fluctuations",
    section: "vii",
    src: "/Quantum_Fluctuations.gif",
    alt: "Fluctuaciones cuánticas en vacío",
    caption: "quantum fluctuations",
  },
  {
    id: "quantum-field",
    section: "vii",
    src: "/images/autorreferencia/quantum-field.svg",
    alt: "Campo cuántico y líneas de interferencia",
    caption: "campo cuántico",
  },
  {
    id: "interference-grid",
    section: "viii",
    src: "/images/autorreferencia/interference-grid.svg",
    alt: "Malla de interferencia relativista",
    caption: "interferencia",
  },
];

const EQUATION_SPECS: EquationSpec[] = [
  { id: "eq-euler", section: "i", latex: "e^{i\\pi} + 1 = 0", caption: "identidad de Euler" },
  { id: "eq-schrodinger", section: "i", latex: "i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi", caption: "ecuación de Schrödinger" },
  { id: "eq-golden", section: "i", latex: "\\phi = \\frac{1 + \\sqrt{5}}{2} = 1.618\\ldots", caption: "proporción áurea" },
];

const THINKER_PORTRAITS: ThinkerPortrait[] = [
  {
    id: "borges",
    section: "ii",
    name: "Jorge Luis Borges",
    context: "cartografia y ruina",
    image: "/images/autorreferencia/borges.jpg",
    motif: "wave",
  },
  {
    id: "wheeler",
    section: "iii",
    name: "John A. Wheeler",
    context: "it from bit",
    image: "/images/autorreferencia/wheeler.jpg",
    motif: "atom",
  },
  {
    id: "godel",
    section: "iv",
    name: "Kurt Gödel",
    context: "incompletitud",
    image: "/images/autorreferencia/godel.jpg",
    motif: "relativity",
  },
];

const FRACTAL_KEYWORDS = new Set(["mapa", "observador", "bucle", "sistema", "fundamento"]);

const CHAR_REPLACEMENTS: Record<string, string> = {
  a: "4",
  e: "3",
  i: "1",
  o: "0",
  s: "5",
  m: "rn",
  u: "v",
};

const FULL_ESSAY = SECTIONS.map((section) => `${section.title} ${section.paragraphs.join(" ")}`).join(" ");

const INTRO_META = {
  date: "2026-02-28",
  title: "autorreferencia",
  tags: ["fisica", "matematicas"],
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
    return { text: token, glitched: false, offsetX: 0, offsetY: 0 };
  }
  const noise = seeded(seedBase);
  const duplicateThreshold = 0.03 * strength;
  const glitchThreshold = 0.14 * strength;
  let next = token;
  let glitched = false;
  if (noise < duplicateThreshold) {
    next = `${token} ${token}`;
    glitched = true;
  } else if (noise < glitchThreshold) {
    next = token
      .split("")
      .map((char, index) => {
        const charNoise = seeded(seedBase + index + 1);
        const replacement = CHAR_REPLACEMENTS[char.toLowerCase()];
        return charNoise > 0.6 && replacement ? replacement : char;
      })
      .join("");
    glitched = next !== token;
  }
  const offsetX = (noise - 0.5) * strength * 6;
  const offsetY = (seeded(seedBase + 99) - 0.5) * strength * 3;
  return { text: next, glitched, offsetX, offsetY };
};

const reflectionGlitch = (value: string) => {
  let changed = false;
  const output = value
    .split("")
    .map((char, index) => {
      const replacement = CHAR_REPLACEMENTS[char.toLowerCase()];
      if (replacement && index % 7 === 0) {
        changed = true;
        return replacement;
      }
      return char;
    })
    .join("");
  return changed ? output : value;
};

function FractalEssay({ depth }: { depth: number }) {
  if (depth > 2) return null;
  return (
    <div className={styles.fractalLayer}>
      <p className={styles.fractalTitle}>autorreferencia</p>
      <p className={styles.fractalText}>{FULL_ESSAY}</p>
      <FractalEssay depth={depth + 1} />
    </div>
  );
}

export default function AutorreferenciaPage() {
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});
  const phraseRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const holdTimerRef = useRef<number | null>(null);
  const visualSectionRef = useRef<HTMLElement | null>(null);

  const [sectionProgress, setSectionProgress] =
    useState<Record<SectionId, number>>(initialProgress);
  const [showIIIHeader, setShowIIIHeader] = useState(false);
  const [revealedPhrases, setRevealedPhrases] = useState<string[]>([]);
  const [visualVisible, setVisualVisible] = useState(false);
  const [fractalPopup, setFractalPopup] = useState<{
    x: number;
    y: number;
    word: string;
  } | null>(null);

  const ruinIntensity = sectionProgress.vii;
  const thinkerBySection = useMemo(
    () =>
      THINKER_PORTRAITS.reduce<Partial<Record<SectionId, ThinkerPortrait>>>(
        (acc, thinker) => {
          acc[thinker.section] = thinker;
          return acc;
        },
        {}
      ),
    []
  );
  const cosmicBySection = useMemo(
    () =>
      COSMIC_IMAGES.reduce<Partial<Record<SectionId, CosmicImage[]>>>((acc, item) => {
        const current = acc[item.section] ?? [];
        acc[item.section] = [...current, item];
        return acc;
      }, {}),
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
            (key) => Math.abs(prev[key] - next[key]) > 0.005
          );
          return changed ? next : prev;
        });

        if (!showIIIHeader && getProgress("iii") > 0.08) {
          setShowIIIHeader(true);
        }

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
  }, [showIIIHeader]);

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
      if (id === "vi") return 0.06 + sectionProgress.vi * 0.25;
      if (id === "vii") return 0.24 + sectionProgress.vii * 0.55;
      if (id === "viii") return 0.08 + sectionProgress.viii * 0.16;
      return 0;
    },
    [sectionProgress.vi, sectionProgress.vii, sectionProgress.viii]
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

        if (sectionId === "ii" && normalized === "mapa") {
          classNames.push(styles.wordMapa);
        }

        if (sectionId === "v" && FRACTAL_KEYWORDS.has(normalized)) {
          classNames.push(styles.wordFractal);
          return (
            <span
              key={`${sectionId}-${paragraphIndex}-${tokenIndex}`}
              className={classNames.join(" ")}
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
      const phrase = HIDDEN_PHRASES.find((candidate) => {
        const lower = text.toLowerCase();
        const target = candidate.text.toLowerCase();
        if (lower.includes(target)) return true;
        return candidate.text === "Siempre queda resto" && lower.includes("siempre queda resto.");
      });
      if (!phrase) return renderTokens("iv", text, paragraphIndex);

      const phraseText = phrase.text;
      const alternative = phraseText === "Siempre queda resto" ? "Siempre queda resto." : phraseText;
      const resolved = text.toLowerCase().includes(phraseText.toLowerCase())
        ? text.slice(
            text.toLowerCase().indexOf(phraseText.toLowerCase()),
            text.toLowerCase().indexOf(phraseText.toLowerCase()) + phraseText.length
          )
        : alternative;
      const split = text.toLowerCase().indexOf(resolved.toLowerCase());
      if (split < 0) return renderTokens("iv", text, paragraphIndex);

      const before = text.slice(0, split);
      const after = text.slice(split + resolved.length);
      const phraseWriteProgress = writeProgressForSection("iv");
      const phraseRevealIndex = (paragraphIndex + 1) / Math.max(1, SECTIONS[3].paragraphs.length);
      const isWritten = phraseWriteProgress >= phraseRevealIndex;
      return (
        <>
          {renderTokens("iv", before, paragraphIndex)}
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
          {renderTokens("iv", after, paragraphIndex)}
        </>
      );
    },
    [renderTokens, revealedPhrases, setPhraseRef, writeProgressForSection]
  );

  const renderDissolvingParagraph = useCallback(
    (text: string) => {
      const active = sectionProgress.viii > 0.55;
      return text.split(/(\s+)/).map((token, index) => {
        if (!token.trim()) {
          return <span key={`space-${index}`}>{token}</span>;
        }
        const randomX = Math.round((seeded(index + 31) - 0.5) * 140);
        const randomY = Math.round((seeded(index + 57) - 0.5) * 220);
        const randomRotate = Math.round((seeded(index + 79) - 0.5) * 40);
        return (
          <span
            key={`dissolve-${index}`}
            className={`${styles.word} ${active ? styles.wordDissolving : ""}`}
            style={
              {
                "--dx": `${randomX}px`,
                "--dy": `${randomY}px`,
                "--rot": `${randomRotate}deg`,
                "--delay": `${index * 0.04}s`,
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
      const titleChars = section.title.split("");
      const writeProgress = writeProgressForHeader(section.id);
      const glyphs = (
        keyPrefix: string,
        extraClass?: string,
        styleForIndex?: (index: number) => CSSProperties
      ) =>
        titleChars.map((char, index) => {
          if (char === " ") {
            return (
              <span key={`${keyPrefix}-space-${index}`} className={styles.headerSpace}>
                {" "}
              </span>
            );
          }
          const revealIndex = titleChars.length > 0 ? (index + 1) / titleChars.length : 1;
          const isWritten = writeProgress >= revealIndex;
          const classes = [styles.headerGlyph];
          classes.push(isWritten ? styles.headerGlyphWritten : styles.headerGlyphPending);
          if (extraClass) classes.push(extraClass);
          return (
            <span
              key={`${keyPrefix}-char-${index}`}
              className={classes.join(" ")}
              style={styleForIndex?.(index)}
            >
              {char}
            </span>
          );
        });

      if (section.id === "iv") {
        return (
          <h2 className={`${styles.header} ${styles.headerMarquee}`}>
            <span className={styles.marqueeTrack}>
              <span>{glyphs(`${section.id}-m1`)}</span>
              <span>{glyphs(`${section.id}-m2`)}</span>
            </span>
          </h2>
        );
      }

      if (section.id === "vi") {
        const reflected = reflectionGlitch(section.title);
        return (
          <h2 className={`${styles.header} ${styles.headerReflect}`}>
            <span>{glyphs(`${section.id}-main`)}</span>
            <span aria-hidden className={styles.headerReflection}>
              {reflected}
            </span>
          </h2>
        );
      }

      if (section.id === "vii") {
        return (
          <h2 className={`${styles.header} ${styles.headerDrift}`}>
            {glyphs(`${section.id}-drift`, styles.letterDrift, (index) => {
              return { "--index": index } as CSSProperties;
            })}
          </h2>
        );
      }

      if (section.id === "viii") {
        return (
          <h2 className={`${styles.header} ${styles.headerFlicker}`}>
            {glyphs(`${section.id}-flicker`, styles.letterFlicker, (index) => {
              return {
                "--delay": `${seeded(index + 111) * 1.7}s`,
              } as CSSProperties;
            })}
          </h2>
        );
      }

      const variant = {
        i: styles.headerShimmer,
        ii: styles.headerMap,
        iii: `${styles.headerAppear} ${showIIIHeader ? styles.headerAppearVisible : ""}`,
        v: styles.headerStretch,
      }[section.id];

      return (
        <h2
          className={`${styles.header} ${variant ?? ""}`}
          data-title={section.title}
        >
          {glyphs(`${section.id}-default`)}
        </h2>
      );
    },
    [showIIIHeader, writeProgressForHeader]
  );

  const renderThinkerFx = useCallback((motif: ThinkerMotif) => {
    if (motif === "wave") {
      return (
        <div className={styles.thinkerFx} aria-hidden>
          <span className={styles.waveLine} />
          <span className={`${styles.waveLine} ${styles.waveLineAlt}`} />
        </div>
      );
    }

    if (motif === "atom") {
      return (
        <div className={styles.thinkerFx} aria-hidden>
          <span className={styles.atomCore} />
          <span className={`${styles.atomOrbit} ${styles.atomOrbitOne}`} />
          <span className={`${styles.atomOrbit} ${styles.atomOrbitTwo}`} />
          <span className={`${styles.atomOrbit} ${styles.atomOrbitThree}`} />
        </div>
      );
    }

    return (
      <div className={styles.thinkerFx} aria-hidden>
        <span className={styles.relativityGrid} />
        <span className={`${styles.relativityGrid} ${styles.relativityGridAlt}`} />
      </div>
    );
  }, []);

  const renderVisualInterlude = useCallback(() => {
    const noiseFragments = [
      { text: "∂μψ̄γμψ", x: "6%", y: "8%", rot: "-4deg", opacity: 0.16 },
      { text: "map.contains(mapmaker)", x: "72%", y: "12%", rot: "3deg", opacity: 0.14 },
      { text: "⊢ G → ¬G", x: "64%", y: "42%", rot: "-2deg", opacity: 0.18 },
      { text: "while(seeking){...}", x: "14%", y: "66%", rot: "5deg", opacity: 0.12 },
      { text: "no hay cierre", x: "80%", y: "74%", rot: "-5deg", opacity: 0.11 },
      { text: "∫𝒟x e^{iS[x]/ℏ}", x: "28%", y: "88%", rot: "2deg", opacity: 0.13 },
    ] as const;

    return (
      <section
        ref={visualSectionRef}
        className={`${styles.visualSection} ${
          visualVisible ? styles.visualSectionVisible : ""
        }`}
        aria-label="Sección visual: El bucle"
      >
        <div className={styles.visualEquationLayer} aria-hidden>
          <MathEquation latex="e^{i\\pi} + 1 = 0" className={styles.visualEquationOne} />
          <MathEquation latex="i\\hbar\\,\\partial_t\\psi = \\hat{H}\\psi" className={styles.visualEquationTwo} />
          <MathEquation latex="\\forall S\\ (S \\supseteq \\mathbb{N})\\ \\Rightarrow\\ \\exists G_S" className={styles.visualEquationThree} />
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
              <span className={styles.dropCap}>S</span>I EL UNIVERSO SE OBSERVA A SÍ MISMO PARA
              EXISTIR, ENTONCES NO HAY OBSERVADOR EXTERNO. NO HAY PUNTO DE VISTA
              PRIVILEGIADO. NO HAY AFUERA DESDE DONDE MIRAR.
            </p>
            <p className={styles.dropCapLine}>
              <span className={styles.dropCap}>E</span>L CARTÓGRAFO ESTÁ DENTRO DEL MAPA. EL OJO
              ESTÁ DENTRO DEL OJO. LA ECUACIÓN QUE DESCRIBE EL UNIVERSO ESTÁ
              ESCRITA POR UNA CONFIGURACIÓN DEL UNIVERSO.
            </p>
            <p className={styles.dropCapLine}>
              <span className={styles.dropCap}>N</span>O ES UN PROBLEMA TÉCNICO. ES GEOMETRÍA. LA
              FORMA DEL SISTEMA IMPIDE LA FORMA DE LA CLAUSURA.
            </p>
          </div>

          <header className={styles.visualHeader}>
            <h3 className={styles.visualTitle}>EL BUCLE</h3>
            <p className={styles.visualSubtitle}>NO CLAUSURA. REGRESA.</p>
          </header>

          <p className={styles.visualParagraph}>
            EL MAPA QUE INTENTA CONTENER AL CARTÓGRAFO CONTIENE UN MAPA QUE INTENTA
            CONTENER AL CARTÓGRAFO QUE CONTIENE UN MAPA. LA REGRESIÓN NO ES ERROR.
            ES ESTRUCTURA. GÖDEL LO DEMOSTRÓ PARA LA LÓGICA. TARSKI PARA EL
            LENGUAJE. WHEELER PARA EL COSMOS. EL SISTEMA SUFICIENTEMENTE COMPLEJO
            PARA REFERIRSE A SÍ MISMO ENCUENTRA QUE LA REFERENCIA GENERA EXCESO.
            SIEMPRE QUEDA RESTO.
          </p>

          <div className={styles.lagrangianCard}>
            <p className={styles.lagrangianLabel}>
              Lagrangiano del modelo de campos autorreferenciales
            </p>
            <MathEquation
              latex={"\\mathcal{L}=\\bar{\\psi}(i\\gamma^\\mu D_\\mu-m)\\psi-\\frac{1}{4}F_{\\mu\\nu}F^{\\mu\\nu}+\\sum_i y_i\\bar{\\psi}_i\\phi\\psi_i-V(\\phi)"}
              display
            />
            <ul className={styles.visualBullets}>
              <li>EL OBSERVADOR SE MODELA DENTRO DEL SISTEMA OBSERVADO.</li>
              <li>LA REFERENCIA A SÍ MISMO AGREGA NUEVO NIVEL EN CADA CIERRE.</li>
              <li>SI G ES DEMOSTRABLE, EL SISTEMA COLAPSA EN INCONSISTENCIA.</li>
              <li>SI G NO ES DEMOSTRABLE, EL SISTEMA PERMANECE INCOMPLETO.</li>
            </ul>
          </div>

          <figure className={styles.wheelerFloat}>
            <svg viewBox="0 0 320 220" className={styles.wheelerSvg} role="img">
              <title>Diagrama de Wheeler</title>
              <path d="M32 34 V166 Q32 208 76 208 H246 Q288 208 288 166 V34" />
              <circle cx="288" cy="34" r="20" />
              <circle cx="288" cy="34" r="7" />
              <path d="M48 186 Q174 70 270 46" />
            </svg>
            <figcaption className={styles.diagramCaptionNeon}>
              DIAGRAMA PARTICIPATIVO DE WHEELER
            </figcaption>
          </figure>

          <div className={styles.godelFloat}>
            <p className={styles.godelLead}>
              <span className={styles.godelBig}>G</span> : &quot;Esta proposicion no es demostrable&quot;
            </p>
            <p className={styles.godelLine}>
              <span className={styles.logicSymbol}>⊢</span> G{" "}
              <span className={styles.logicSymbol}>→</span>{" "}
              <span className={styles.logicSymbol}>¬</span>G{" "}
              <span className={styles.logicSymbol}>→</span> inconsistencia
            </p>
            <p className={styles.godelLine}>
              <span className={styles.logicSymbol}>⊬</span> G{" "}
              <span className={styles.logicSymbol}>→</span> G es verdadera{" "}
              <span className={styles.logicSymbol}>→</span> incompletitud
            </p>
          </div>

          <figure className={styles.quantumFloat}>
            <Image
              src="/Quantum_Fluctuations.gif"
              alt="Fluctuaciones cuánticas"
              width={720}
              height={480}
              className={styles.quantumGif}
              unoptimized
            />
            <figcaption className={styles.diagramCaption}>quantum fluctuations</figcaption>
          </figure>

          <p className={styles.visualQuote}>all we&apos;re made of</p>

          <svg viewBox="0 0 340 92" className={styles.arrowDoodle} role="img">
            <title>Curva de retorno</title>
            <path d="M18 22 C 8 68, 108 82, 322 38" />
            <path d="M310 30 L332 36 L314 48" />
          </svg>

          <pre className={`${styles.codeFloat} ${styles.codeFloatA}`} aria-hidden>
            {`function model(universe) {\n  return universe.includes(model(universe));\n  // infinite recursion\n}`}
          </pre>
          <pre className={`${styles.codeFloat} ${styles.codeFloatB}`} aria-hidden>
            {`while(seeking) {\n  foundation = seek(foundation);\n  // foundation not found\n}`}
          </pre>
        </div>
      </section>
    );
  }, [visualVisible]);

  const pageStyle = useMemo(
    () =>
      ({
        "--deco-opacity": `${0.16 + ruinIntensity * 0.1}`,
        "--deco-speed": `${1 + ruinIntensity * 0.85}`,
      } as CSSProperties),
    [ruinIntensity]
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
                  "--duration": `${fragment.duration / (1 + ruinIntensity * 0.55)}s`,
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
            <div className={styles.introTags} aria-label="Tags de Autorreferencia">
              {INTRO_META.tags.map((tag) => (
                <span key={tag} className={styles.introTag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {SECTIONS.map((section) => {
            const thinker = thinkerBySection[section.id];
            const sectionCosmic = cosmicBySection[section.id] ?? [];
            const sectionEquations = equationsBySection[section.id] ?? [];
            return (
              <Fragment key={section.id}>
                <section
                  ref={setSectionRef(section.id)}
                  className={styles.section}
                >
                  {thinker && (
                    <figure className={styles.thinkerCard}>
                      <div className={styles.thinkerMedia}>
                        <Image
                          src={thinker.image}
                          alt={`Retrato en blanco y negro de ${thinker.name}`}
                          className={styles.thinkerImage}
                          width={1200}
                          height={1600}
                          loading="lazy"
                        />
                        {renderThinkerFx(thinker.motif)}
                      </div>
                      <figcaption className={styles.thinkerCaption}>
                        <span className={styles.thinkerName}>{thinker.name}</span>
                        <span className={styles.thinkerContext}>{thinker.context}</span>
                      </figcaption>
                    </figure>
                  )}

                  {renderHeader(section)}

                  <div className={styles.paragraphs}>
                    {section.paragraphs.map((paragraph, paragraphIndex) => {
                      const isLastDissolvingParagraph =
                        section.id === "viii" && paragraphIndex === section.paragraphs.length - 1;

                      return (
                        <p key={`${section.id}-${paragraphIndex}`}>
                          {section.id === "iv"
                            ? renderHiddenPhrases(paragraph, paragraphIndex)
                            : isLastDissolvingParagraph
                            ? renderDissolvingParagraph(paragraph)
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

                  {sectionCosmic.length > 0 && (
                    <div className={styles.cosmicGallery}>
                      {sectionCosmic.map((image) => (
                        <figure key={image.id} className={styles.cosmicCard}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            className={styles.cosmicImage}
                            width={1200}
                            height={800}
                            loading="lazy"
                            unoptimized={image.src.endsWith(".gif")}
                            sizes="(max-width: 768px) 100vw, 48vw"
                          />
                          <figcaption className={styles.cosmicCaption}>{image.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </section>

                {section.id === "v" && renderVisualInterlude()}
              </Fragment>
            );
          })}

          <div className={styles.aftermath} />

          <div className={styles.pdfCtaWrap}>
            <Link
              href="/pdfs/autorreferencia.pdf"
              target="_blank"
              rel="noreferrer"
              download
              className={styles.pdfCta}
            >
              descargar pdf
            </Link>
          </div>

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
