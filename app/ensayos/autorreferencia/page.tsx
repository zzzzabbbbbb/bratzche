"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Navigation from "@/components/Navigation";
import styles from "./page.module.css";

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
    title: "I. La efectividad irrazonable",
    paragraphs: [
      "La física moderna no usa matemáticas. Depende de ellas. Y no de las matemáticas que se inventaron para describir el mundo, sino de desarrollos abstractos que no tenían intención empírica.",
      "Los números complejos surgieron como curiosidad algebraica. Terminaron siendo el lenguaje de la mecánica cuántica. La geometría diferencial era ejercicio puro. Se convirtió en la arquitectura de la relatividad general. Una y otra vez, estructuras formales desarrolladas sin contacto con la física terminan siendo exactamente lo que la física necesita.",
      "Eugene Wigner lo llamó \"la efectividad irrazonable de las matemáticas\". No es solo que funcionen. Es que no deberían funcionar tan bien.",
      "Una interpretación: las matemáticas son el repertorio de todas las estructuras coherentes posibles. El universo físico realiza algunas de ellas. Cuando detectamos correspondencia, no imponemos forma arbitraria. Identificamos coincidencia estructural.",
      "La noción de invarianza es clave. En física, una cantidad invariante bajo transformaciones señala algo constitutivo, no descriptivo. La velocidad de la luz no depende del sistema de referencia. Esa independencia indica que estamos tocando estructura real, no proyectando convención.",
      "No se trata de afirmar que el universo \"es\" matemáticas. Se trata de reconocer que su coherencia es capturable matemáticamente. Y eso, por sí solo, ya es extraño.",
    ],
  },
  {
    id: "ii",
    title: "II. El mapa y el territorio",
    paragraphs: [
      "Borges escribió sobre un imperio que desarrolló la cartografía hasta tal punto que el mapa alcanzó el tamaño del territorio. Coincidía punto por punto. Era perfecto. Y por eso era inútil. Las generaciones siguientes lo abandonaron. Se desintegró. Solo quedaron ruinas en los desiertos.",
      "El cuento es sobre la ciencia. Sobre cualquier proyecto de representación total.",
      "Queremos el mapa completo del universo. La teoría del todo. La ecuación que contenga todas las ecuaciones. Pero hay un problema que Borges no explicita: el cartógrafo está en el territorio.",
      "Si el mapa debe ser completo, debe incluir al cartógrafo. Y al cartógrafo haciendo el mapa. Y al mapa que incluye al cartógrafo haciendo el mapa. Regresión infinita. El mapa perfecto no es difícil. Es incoherente.",
      "No es límite técnico. Es geometría. El sistema que intenta contenerse a sí mismo encuentra que la operación de clausura genera más sistema. No hay borde. El borde retrocede.",
    ],
  },
  {
    id: "iii",
    title: "III. El universo participativo",
    paragraphs: [
      "John Archibald Wheeler fue uno de los físicos más importantes del siglo XX. Trabajó con Bohr, fue mentor de Feynman, acuñó los términos \"agujero negro\" y \"agujero de gusano\". En sus últimos años propuso algo más radical que cualquier ecuación.",
      "El universo, dijo Wheeler, no existe de forma definida hasta que es observado.",
      "No en sentido místico. En sentido físico. El experimento de elección retardada lo sugiere: decisiones tomadas ahora determinan lo que \"ocurrió\" antes. Un fotón emitido hace miles de millones de años no tiene trayectoria definida hasta que una medición presente la fija. El pasado no está ahí esperando ser descubierto. Se constituye retroactivamente.",
      "Wheeler lo llamó \"it from bit\". La realidad física emerge de actos de observación. No es que la materia produzca información. Es que la información constituye la materia. El universo no es una máquina que existe y luego es observada. Es un proceso que se define en el observar.",
      "Pero el observador es parte del universo. No hay afuera. No hay plataforma externa desde la cual mirar. El sistema se construye a sí mismo a través de sus propias partes. Se levanta tirando de sus propios cordones.",
      "Wheeler dibujó un diagrama: un ojo mirando hacia atrás en el tiempo, y la línea de visión curvándose hasta llegar al propio ojo. El universo observándose a sí mismo para existir.",
    ],
  },
  {
    id: "iv",
    title: "IV. Gödel en el cosmos",
    paragraphs: [
      "Kurt Gödel demostró en 1931 que cualquier sistema formal suficientemente poderoso contiene proposiciones verdaderas que no pueden demostrarse dentro del sistema. No por falta de ingenio. Por estructura. El sistema que intenta capturarse a sí mismo genera enunciados que lo exceden.",
      "Alfred Tarski demostró algo análogo para la verdad: ningún lenguaje puede definir completamente su propio concepto de verdad sin caer en paradoja. La verdad del sistema requiere un metalenguaje. Pero el metalenguaje genera el mismo problema un nivel arriba.",
      "La física cuántica sugiere una limitación paralela: no existe observador completamente externo cuando el observador forma parte del sistema observado. La medición perturba. El instrumento interactúa. No hay mirada inocente.",
      "No son analogías superficiales. Son convergencias estructurales. Gödel, Tarski, Wheeler, Bohr. Distintos campos, mismo límite: el sistema suficientemente complejo para modelarse a sí mismo encuentra que el modelado genera exceso. Siempre queda resto.",
      "Aplicado aquí: el universo genera configuraciones capaces de modelar el universo. Esas configuraciones son parte del universo. Para que el modelo sea completo, debe incluirse a sí mismo modelando. Pero incluirse cambia lo que se modela. El mapa que contiene al cartógrafo contiene un mapa que contiene al cartógrafo que contiene un mapa.",
      "La clausura no falla. Regresa.",
    ],
  },
  {
    id: "v",
    title: "V. Bootstrap ontológico",
    paragraphs: [
      "Wheeler sugirió que el universo se \"bootstrapea\". No hay causa primera. No hay fundamento que sostenga todo lo demás. El sistema emerge de sí mismo. Se autoconstituye.",
      "Esto es perturbador porque viola la intuición causal. Queremos cadenas: esto causa aquello, que causa lo otro, hasta llegar a algo que no necesita causa. Un fundamento. Un primer motor. Dios, o las leyes físicas, o las matemáticas, o lo que sea que no requiera explicación ulterior.",
      "Pero Wheeler apunta a otra posibilidad: no hay fondo. La cadena no termina en un ancla. Termina en un bucle. El efecto participa en su propia causa. El observador constituye lo observado, pero el observador es parte de lo observado. El sistema se sostiene a sí mismo no porque tenga base, sino porque la estructura es circular.",
      "Esto no es misticismo. Es una posibilidad lógica. Los sistemas autopoiéticos existen. La vida se sostiene a sí misma sin necesitar un \"afuera\" que la mantenga. La pregunta es si el universo entero podría tener esa estructura.",
      "Y si la tiene, entonces la búsqueda de fundamento es como buscar el borde de una esfera. Puedes caminar para siempre. Nunca llegas.",
    ],
  },
  {
    id: "vi",
    title: "VI. El yo como ilusión de exterioridad",
    paragraphs: [
      "Aquí es donde la cosa se vuelve personal.",
      "Si el observador constituye lo observado, y el observador es parte de lo observado, entonces ¿qué es el observador?",
      "Una posibilidad: el \"yo\" es la ilusión de exterioridad que el sistema necesita para operar. Para observar, tiene que haber un \"desde donde\". Pero no lo hay. Entonces el sistema genera la ficción de un punto de vista externo. Esa ficción es el yo.",
      "No eres una entidad que mira el universo. Eres el gesto mediante el cual el universo simula tener borde. La sensación de ser alguien separado, mirando desde afuera, es el truco que permite que la observación ocurra. Sin esa ilusión, no hay medición. Sin medición, no hay definición. Sin definición, no hay universo.",
      "El yo no es el fundamento. Es el síntoma de que no hay fundamento. Es la marca de la incompletitud, no su solución.",
      "Hofstadter lo llamó \"bucle extraño\". Un patrón que se modela a sí mismo con suficiente resolución para generar la ilusión de un observador. Pero el patrón no está fuera del sistema. Es el sistema doblándose. Y la doblez no puede ver que es doblez porque verse requeriría otra doblez.",
    ],
  },
  {
    id: "vii",
    title: "VII. Ruinas del mapa",
    paragraphs: [
      "Volvamos a Borges. El mapa que coincide con el territorio se desintegra. Las generaciones siguientes lo abandonan. Solo quedan ruinas en los desiertos.",
      "El proyecto de conocimiento total es ese mapa. La teoría del todo. La ecuación final. El fundamento último. Cada generación de físicos trabaja en él. Cada generación avanza. Pero el mapa crece y el cartógrafo sigue adentro. Y mientras más crece el mapa, más crece el problema de incluir al cartógrafo.",
      "Quizás lo que llamamos \"realidad\" no es el territorio. Es el escombro de un mapa que intentó ser total. Fragmentos de ecuaciones. Restos de preguntas. Ruinas de un proyecto imposible.",
      "No porque fracasamos. Porque la estructura del proyecto contiene su propia imposibilidad.",
      "El mapa perfecto se autodestruye. No al final del proceso. Desde el principio. La autodestrucción no es accidente. Es forma.",
    ],
  },
  {
    id: "viii",
    title: "VIII. Borde sin clausura",
    paragraphs: [
      "No estamos fuera del misterio. Somos su borde.",
      "Pero el borde no puede cerrarse. No por ignorancia. Por geometría.",
      "El sistema que pregunta por su propio fundamento no puede recibir respuesta completa. La pregunta genera más sistema. La respuesta requeriría un punto de vista que no existe. El ojo que quiere verse necesita espejo. Pero el espejo está dentro del ojo.",
      "Wheeler, Gödel, Borges. Físico, lógico, escritor. Distintos lenguajes, misma intuición: el cierre total es ilusión gramatical. La forma de la pregunta impide la forma de la respuesta.",
      "Y sin embargo preguntamos. Eso es lo más extraño. El sistema que no puede cerrarse insiste en intentar. La configuración de campos que no puede clausurarse genera, una y otra vez, el gesto de buscar clausura.",
      "Quizás ese gesto es el punto. No la respuesta. El gesto.",
      "El universo no tiene fundamento. Tiene bucle. Y el bucle, al girar, genera la ilusión de que hay algo que buscar. La búsqueda es el síntoma. El fundamento es el nombre que le damos al vértigo de no encontrar fondo.",
      "No hay nada detrás.",
      "Solo la forma del buscar.",
      "Solo el mapa desintegrándose.",
      "Solo el ojo, adentro del ojo, intentando verse.",
    ],
  },
];

const FLOATING_FRAGMENTS: FloatingFragment[] = [
  { text: "ψ(x) = ∫ e^(ipx/ℏ) φ(p) dp", side: "left", x: "max(1rem, calc(50% - 560px))", duration: 34, delay: 0 },
  {
    text: "if (observer === observed) { return undefined; }",
    side: "right",
    x: "min(calc(100% - 7rem), calc(50% + 430px))",
    duration: 30,
    delay: 2,
  },
  { text: "map.contains(mapmaker) // loop", side: "left", x: "max(1rem, calc(50% - 620px))", duration: 29, delay: 4 },
  { text: "while(true) { seek(foundation); }", side: "right", x: "min(calc(100% - 8rem), calc(50% + 500px))", duration: 31, delay: 5.5 },
  { text: "∂μψ̄γμψ", side: "left", x: "max(1rem, calc(50% - 500px))", duration: 27, delay: 7 },
  { text: "NULL", side: "right", x: "min(calc(100% - 6rem), calc(50% + 420px))", duration: 24, delay: 9 },
  { text: "// TODO: find ground", side: "left", x: "max(1rem, calc(50% - 580px))", duration: 33, delay: 11 },
];

const HIDDEN_PHRASES: PhraseConfig[] = [
  {
    id: "iv-phrase-1",
    text: "El sistema que intenta capturarse a sí mismo genera enunciados que lo exceden",
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
  const duplicateThreshold = 0.08 * strength;
  const glitchThreshold = 0.2 * strength;
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

  const [sectionProgress, setSectionProgress] =
    useState<Record<SectionId, number>>(initialProgress);
  const [showIIIHeader, setShowIIIHeader] = useState(false);
  const [revealedPhrases, setRevealedPhrases] = useState<string[]>([]);
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
      return Math.max(0, Math.min(1, (raw + 0.1) / 0.52));
    },
    [sectionProgress]
  );

  const writeProgressForHeader = useCallback(
    (id: SectionId) => {
      const raw = sectionProgress[id];
      return Math.max(0, Math.min(1, (raw + 0.16) / 0.42));
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
      const phraseMap: Record<number, PhraseConfig> = {
        0: HIDDEN_PHRASES[0],
        3: HIDDEN_PHRASES[1],
        5: HIDDEN_PHRASES[2],
      };
      const phrase = phraseMap[paragraphIndex];
      if (!phrase) return renderTokens("iv", text, paragraphIndex);

      const phraseText = phrase.text;
      const alternative = phraseText === "Siempre queda resto" ? "Siempre queda resto." : phraseText;
      const resolved = text.includes(phraseText) ? phraseText : alternative;
      const split = text.indexOf(resolved);
      if (split < 0) return renderTokens("iv", text, paragraphIndex);

      const before = text.slice(0, split);
      const after = text.slice(split + resolved.length);
      const phraseWriteProgress = writeProgressForSection("iv");
      const phraseRevealIndex = (paragraphIndex + 1) / 6;
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
          {SECTIONS.map((section) => {
            const thinker = thinkerBySection[section.id];
            return (
              <section
                key={section.id}
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
              </section>
            );
          })}

          <figure className={styles.cosmicCard}>
            <Image
              src="/images/autorreferencia/galaxy.svg"
              alt="Galaxia monocromatica en expansion"
              className={styles.cosmicImage}
              width={1600}
              height={900}
              loading="lazy"
            />
            <figcaption className={styles.cosmicCaption}>
              onda, atomo, relatividad
            </figcaption>
          </figure>

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
