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

type CosmicImage = {
  id: string;
  section: SectionId;
  src: string;
  alt: string;
  caption: string;
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
      "Las matematicas no pesan. No ocupan espacio. No tienen temperatura ni duracion ni color. Son entidades sin carne, relaciones puras, estructuras que existen en ningun lugar. Y sin embargo, cuando el universo quiere decirse a si mismo con precision, habla en matematicas. Ahi hay algo que no cierra. Ahi hay pregunta.",
      "En un ensayo anterior llegue a una conclusion que me dio serenidad. Si todo es campo, si las particulas son excitaciones, si lo que llamamos materia es vibracion organizada del vacio cuantico, entonces el \"yo\" no es sustancia. Es configuracion transitoria. Patron que emerge y se disuelve. No hay nucleo metafisico escondido detras del fenomeno. Solo estructura dinamica. Eso bastaba. Eso era suficiente.",
      "Pero quedo una grieta que no cerre. ?Por que la estructura es capturable matematicamente? ?Por que abstracciones desarrolladas sin contacto con el mundo fisico terminan describiendo el mundo fisico con precision absurda?",
      "Considera pi. Un numero que emerge de la relacion entre circunferencia y diametro. Geometria pura. Pero pi aparece en la ecuacion de Euler, en la distribucion normal de probabilidad, en las ecuaciones de campo de Einstein, en la funcion de onda de la mecanica cuantica, en la formula de Stirling, en la teoria de cuerdas. Un circulo no tiene nada que ver con la probabilidad de que una particula este en cierto lugar. Y sin embargo, pi esta ahi. Como si el numero supiera algo que nosotros no sabemos.",
      "O phi, la proporcion aurea. 1.618... Un numero que surge de una simple relacion recursiva: la razon entre el todo y la parte mayor es igual a la razon entre la parte mayor y la menor. Abstraccion algebraica. Pero phi aparece en la filotaxis de las plantas, en la espiral de las galaxias, en la proporcion de los huesos de la mano, en la estructura de los cuasicristales. La naturaleza parece preferir ciertas proporciones. No cualquier numero. Estos numeros.",
      "O e, la base del logaritmo natural. 2.718... Definido como el limite de (1 + 1/n)^n cuando n tiende a infinito. Abstraccion del calculo. Pero e gobierna el decaimiento radiactivo, el crecimiento poblacional, la distribucion de energia en sistemas termicos, la descarga de un capacitor, la forma de una cuerda colgante. Procesos que no tienen relacion aparente entre si, gobernados por el mismo numero.",
      "Eugene Wigner, fisico, premio Nobel, escribio un ensayo en 1960: \"La irrazonable efectividad de las matematicas en las ciencias naturales\". No es solo que las matematicas funcionen, decia. Es que no deberian funcionar tan bien. La correspondencia es \"un regalo maravilloso que no entendemos ni merecemos\".",
      "Los numeros complejos surgieron en el siglo XVI como truco algebraico para resolver ecuaciones cubicas. Numeros \"imaginarios\", los llamaron. Absurdos. Juegos formales sin referente. Cuatrocientos anos despues, resulta que la mecanica cuantica no puede formularse sin ellos. La funcion de onda es compleja. No como aproximacion. Como estructura fundamental. El universo, en su nivel mas basico, requiere numeros que inventamos para resolver puzzles algebraicos.",
      "La geometria diferencial era ejercicio puro cuando Riemann la desarrollo en el siglo XIX. Curvaturas de espacios abstractos. Nadie pensaba en fisica. Sesenta anos despues, Einstein descubre que la gravedad no es fuerza sino curvatura del espacio-tiempo. Necesitaba un lenguaje para describir espacios curvos. El lenguaje ya existia. Los matematicos lo habian construido sin saber para que servia.",
      "Esto se repite una y otra vez. Las matematicas llegan primero. La fisica las encuentra despues. Como si los matematicos estuvieran explorando un territorio que la naturaleza ya habitaba.",
      "Una interpretacion: las matematicas son el catalogo de todas las estructuras coherentes posibles. Todo lo que no se contradice a si mismo. El universo fisico realiza algunas de esas estructuras. Cuando encontramos correspondencia, no estamos imponiendo forma arbitraria sobre el caos. Estamos detectando coincidencia estructural. El universo tiene la estructura que tiene, y esa estructura es matematicamente expresable porque las matematicas son el lenguaje de toda estructura posible.",
      "La nocion de invarianza es clave. En fisica, buscamos lo que no cambia cuando cambiamos la perspectiva. La velocidad de la luz es la misma en todo sistema de referencia. La carga del electron es la misma en todo lugar del universo. Las leyes de la fisica son las mismas hoy que hace mil millones de anos. Estas invariancias no son convenciones. Son senales de que tocamos algo real. Algo que no depende de nosotros.",
      "Pero aqui viene la torsion. La mente que detecta invariancias es ella misma una configuracion del universo. Los campos que describimos con ecuaciones son los mismos campos que constituyen el cerebro que escribe las ecuaciones. No hay un afuera. El sistema esta describiendose a si mismo.",
      "Y eso, eso es lo que no cerre en el ensayo anterior. Dije que somos campo. Que somos vibracion. Que somos estructura. Pero no pregunte que significa que la estructura se modele a si misma. Que pasa cuando el mapa esta dentro del territorio. Que limites aparecen cuando el observador es parte de lo observado.",
      "Ese es el tema de este ensayo. No que es el universo. Sino que pasa cuando una parte del universo intenta contener el todo.",
    ],
  },
  {
    id: "ii",
    title: "II. El mapa y el territorio",
    paragraphs: [
      "Borges escribio sobre un imperio donde la cartografia alcanzo tal perfeccion que el mapa llego a tener el tamano exacto del territorio. Coincidia punto por punto. Era perfecto. Y por eso era inutil. Las generaciones siguientes lo abandonaron. Se desintegro. Solo quedaron ruinas en los desiertos, habitadas por animales y mendigos.",
      "El cuento parece sobre la futilidad del exceso. Pero es sobre algo mas profundo. Es sobre la imposibilidad logica de la representacion total.",
      "Si el mapa debe representar el territorio completamente, debe incluir todo lo que esta en el territorio. Pero el cartografo esta en el territorio. Y el mapa esta en el territorio. Para ser completo, el mapa debe incluir al cartografo haciendo el mapa. Y al mapa que incluye al cartografo. Y al mapa que incluye al mapa que incluye al cartografo.",
      "La regresion no termina. No porque nos falte papel. Porque la operacion de clausura genera mas sistema. Cada intento de cerrar abre. El borde retrocede.",
      "No es limite tecnico. Es geometria. La estructura del problema impide la estructura de la solucion.",
      "El proyecto cientifico es hacer el mapa del universo. La teoria del todo. La ecuacion que contenga todas las ecuaciones. Pero el cientifico esta en el universo. El cerebro que formula la teoria esta hecho de los mismos campos que la teoria describe. Para que la teoria sea completa, debe incluir al cerebro formulando la teoria. Y eso cambia lo que la teoria debe incluir.",
      "El mapa de Borges no es metafora. Es estructura. Y la estructura dice: la representacion total desde dentro es incoherente.",
    ],
  },
  {
    id: "iii",
    title: "III. El universo participativo",
    paragraphs: [
      "John Archibald Wheeler fue uno de los fisicos mas importantes del siglo XX. Trabajo con Bohr en los fundamentos de la mecanica cuantica. Fue mentor de Feynman. Acuno los terminos \"agujero negro\" y \"agujero de gusano\". Contribuyo a la fision nuclear, a la teoria de la gravedad, a la geometrodinamica. No era un mistico. Era un fisico riguroso, de los duros.",
      "En sus ultimos anos propuso algo que suena a metafisica pero que el formulo como fisica: el universo no existe de forma completamente definida hasta que es observado.",
      "No en sentido vago. En sentido tecnico. La mecanica cuantica dice que los sistemas existen en superposicion de estados hasta que una medicion los colapsa en un estado definido. Wheeler llevo esto al extremo: si todo es cuantico, si no hay un nivel \"clasico\" fundamental, entonces la definicion del universo requiere observacion.",
      "El experimento de eleccion retardada lo ilustra. Un foton viaja. Antes de que llegue al detector, decides que tipo de medicion haras. Tu decision presente parece determinar que \"hizo\" el foton en el pasado. No es que cambie el pasado. Es que el pasado no estaba definido hasta que tu medicion lo fijo.",
      "Wheeler lo extendio cosmologicamente. Observaciones presentes participan en la definicion del universo temprano. No viajan hacia atras en el tiempo. Pero el pasado no tiene propiedades definidas hasta que el presente las ancla. El universo se construye retroactivamente.",
      "Wheeler dibujo un diagrama famoso: un U grande, con un ojo en un extremo mirando hacia el otro extremo. La linea de vision se curva hasta que el ojo se ve a si mismo. El universo observandose para existir.",
      "\"It from bit\", lo llamo. La realidad fisica emerge de actos de observacion, de respuestas a preguntas binarias, de informacion. No es que la materia produzca informacion como subproducto. Es que la informacion constituye la materia. El bit antes que el it.",
      "Pero el observador es parte del universo. No hay un afuera desde donde mirar. El sistema se construye a si mismo a traves de sus propias partes. Se levanta tirando de sus propios cordones.",
      "Esto no es misticismo. Es una posibilidad fisica tomada en serio. Y si es cierta, la idea de un \"estado del universo\" independiente del observador es incoherente. No hay vista desde ningun lugar. Solo vistas desde lugares que son parte de lo visto.",
    ],
  },
  {
    id: "iv",
    title: "IV. Godel en el cosmos",
    paragraphs: [
      "En 1931, Kurt Godel, un logico austriaco de 25 anos, demostro algo que cambio para siempre la filosofia de las matematicas. Cualquier sistema formal suficientemente poderoso para expresar la aritmetica basica contiene proposiciones verdaderas que no pueden demostrarse dentro del sistema.",
      "No es que no las hayamos encontrado todavia. No es que necesitemos matematicos mas inteligentes. Es que la estructura del sistema lo impide. Hay verdades que el sistema puede expresar pero no puede probar. Y si intentas agregar esas verdades como axiomas, surgen nuevas proposiciones indecidibles. La incompletitud no se repara. Es constitutiva.",
      "Godel lo demostro construyendo una proposicion que dice, esencialmente, \"esta proposicion no es demostrable en este sistema\". Si fuera demostrable, seria falsa, y el sistema seria inconsistente. Si no es demostrable, es verdadera, y el sistema es incompleto. No hay salida.",
      "Alfred Tarski demostro algo analogo para la verdad: ningun lenguaje puede definir completamente su propio predicado de verdad sin caer en paradoja. Para hablar de la verdad de un lenguaje necesitas un metalenguaje. Pero el metalenguaje tiene el mismo problema un nivel arriba.",
      "Estos no son puzzles curiosos. Son limites estructurales. El sistema suficientemente complejo para referirse a si mismo encuentra que la autorreferencia genera exceso. Siempre queda resto.",
      "La fisica cuantica sugiere una limitacion analoga. No existe observador completamente externo. La medicion perturba. El instrumento interactua con lo medido. No hay forma de saber el estado del sistema sin cambiar el estado del sistema. El observador esta dentro.",
      "Godel, Tarski, Heisenberg. Logica, semantica, fisica. Distintos dominios, misma estructura: el sistema que intenta capturarse a si mismo encuentra que la captura genera mas sistema. La clausura no falla. Regresa.",
      "Aplicado al proyecto de conocimiento total: el universo genera configuraciones capaces de modelar el universo. Pero esas configuraciones son parte del universo. Para que el modelo sea completo, debe incluirse a si mismo modelando. Y eso cambia lo que debe incluir. Y eso requiere incluirse de nuevo. El mapa que contiene al cartografo que contiene un mapa.",
      "No hay cierre. Hay bucle.",
    ],
  },
  {
    id: "v",
    title: "V. Bootstrap ontologico",
    paragraphs: [
      "Wheeler sugirio que el universo se \"bootstrapea\". No hay causa primera. No hay fundamento que sostenga todo lo demas sin necesitar soporte. El sistema emerge de si mismo. Se autoconstituye.",
      "Esto viola la intuicion causal profundamente. Queremos cadenas. Esto causa aquello, que causa lo otro, hasta llegar a algo que no necesita causa. Un primer motor. Un fundamento. Algo que simplemente es, sin requerir explicacion.",
      "Pero Wheeler apunta a otra posibilidad: la cadena no termina en ancla. Termina en bucle. El efecto participa en su causa. El observador constituye lo observado, pero el observador es producto de lo observado. El sistema se sostiene no porque tenga base sino porque la estructura es circular.",
      "Los sistemas autopoiéticos existen. Una celula se produce a si misma. Una llama se mantiene a si misma. La vida se sostiene sin necesitar un \"afuera\" que la empuje. No es magia. Es una forma de organizacion donde el producto es tambien el productor.",
      "?Podria el universo entero tener esa estructura? ?Un sistema que se produce a si mismo, que se observa a si mismo, que se constituye a si mismo, sin exterior, sin fundamento, sin antes?",
      "Si es asi, la pregunta \"?que causo el universo?\" es malformada. Asume que hay un afuera desde donde vino. Asume que hay un antes. Pero si el universo es autoconstitutivo, no hay afuera. El \"antes\" es parte del sistema, no su origen.",
      "Buscar el fundamento seria entonces como buscar el borde de una esfera caminando por su superficie. Puedes caminar para siempre. Nunca llegas al borde. No porque sea infinita. Porque la forma no tiene borde.",
    ],
  },
  {
    id: "vi",
    title: "VI. El yo como ilusion de exterioridad",
    paragraphs: [
      "Si el observador constituye lo observado, y el observador es parte de lo observado, entonces ?que es el observador?",
      "Douglas Hofstadter, en \"Godel, Escher, Bach\" y \"I Am a Strange Loop\", propone que el yo es un bucle extrano. Un patron que surge cuando un sistema se modela a si mismo con suficiente resolucion. El cerebro construye un modelo del mundo. En algun punto, el modelo incluye al modelador. Ese gesto recursivo genera la ilusion de un \"yo\" que mira desde afuera.",
      "Pero no hay afuera. El yo no es una entidad que observa el sistema. Es el sistema doblandose para verse. La sensacion de ser alguien separado, mirando desde un punto privilegiado, es un artefacto del bucle. Necesario para operar. Pero no real en el sentido que creemos.",
      "El yo es la ilusion de exterioridad que el sistema necesita para funcionar. Para observar, tiene que haber un \"desde donde\". Pero no lo hay. Entonces el sistema genera la ficcion de un punto de vista externo. Esa ficcion es el yo.",
      "No eres el observador del universo. Eres el gesto mediante el cual el universo simula tener borde. La sensacion de ser alguien separado es el truco que permite que la observacion ocurra. Sin esa ilusion, no hay medicion. Sin medicion, no hay definicion.",
      "El yo no es el fundamento. Es el sintoma de que no hay fundamento. Es la marca de la incompletitud, no su solucion.",
      "Esto no es depresivo. Es estructural. El yo sigue funcionando. Sigues experimentando, decidiendo, viviendo. Pero la creencia de que hay un \"tu\" separado del universo mirandolo desde afuera es exactamente eso: una creencia. Una construccion necesaria. Un pliegue que se cree separado del papel.",
    ],
  },
  {
    id: "vii",
    title: "VII. Ruinas del mapa",
    paragraphs: [
      "Volvemos a Borges. El mapa que coincide con el territorio se desintegra. Las generaciones siguientes lo abandonan. Solo quedan ruinas en los desiertos.",
      "El proyecto de conocimiento total es ese mapa. La teoria del todo. La ecuacion maestra. El fundamento ultimo. Cada generacion de cientificos y filosofos trabaja en el. Cada generacion avanza. Las teorias se vuelven mas precisas, mas unificadas, mas elegantes.",
      "Pero el cartografo sigue adentro. Y mientras mas crece el mapa, mas crece el problema de incluir al cartografo. El mapa del siglo XXI es vastamente mas detallado que el del siglo XIX. Pero la paradoja de la autorreferencia no se ha resuelto. Se ha vuelto mas clara.",
      "Quizas lo que llamamos \"realidad\" no es el territorio. Es el escombro de un mapa que intento ser total. Fragmentos de ecuaciones. Restos de teorias. Ruinas de un proyecto imposible que cada generacion hereda y continua, sabiendo o sin saber que la completitud no esta al final del camino.",
      "No porque fracasemos. Porque la estructura del proyecto contiene su propia imposibilidad. El mapa perfecto se autodestruye. No al final del proceso. Desde el principio. La autodestruccion es la forma.",
    ],
  },
  {
    id: "viii",
    title: "VIII. Borde sin clausura",
    paragraphs: [
      "No estamos fuera del misterio. Somos su borde.",
      "Pero el borde no puede cerrarse. No por ignorancia. Por geometria.",
      "El sistema que pregunta por su propio fundamento no puede recibir respuesta completa. La pregunta genera mas sistema. La respuesta requeriria un punto de vista que no existe. El ojo que quiere verse necesita espejo. Pero el espejo esta dentro del ojo.",
      "Wheeler, Godel, Borges, Hofstadter. Fisico, logico, escritor, cientifico cognitivo. Distintos lenguajes, misma intuicion: el cierre total es ilusion gramatical. La forma de la pregunta impide la forma de la respuesta.",
      "Y sin embargo preguntamos. El sistema que no puede cerrarse insiste en intentar. La configuracion de campos que no puede clausurarse genera, una y otra vez, el gesto de buscar clausura.",
      "Quizas ese gesto es el punto. No la respuesta. El gesto.",
      "El universo no tiene fundamento que podamos alcanzar desde dentro. Tiene bucle. Y el bucle, al girar, genera la ilusion de que hay algo que encontrar. La busqueda es el sintoma. El fundamento es el nombre que le damos al vertigo de no encontrar fondo.",
      "No hay nada detras.",
      "Solo la forma del buscar.",
      "Solo el mapa desintegrandose.",
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
    text: "el sistema que intenta capturarse a si mismo encuentra que la captura genera mas sistema",
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
    id: "space-earth",
    section: "iii",
    src: "/images/autorreferencia/space-earth-category.jpg",
    alt: "Vista real de la Tierra desde orbita",
    caption: "tierra desde orbita",
  },
  {
    id: "space-caribbean",
    section: "iii",
    src: "/images/autorreferencia/space-caribbean.jpg",
    alt: "Vista real del Caribe desde la estacion espacial",
    caption: "caribe desde la ISS",
  },
  {
    id: "space-aurora",
    section: "vii",
    src: "/images/autorreferencia/space-aurora.jpg",
    alt: "Aurora real sobre Norteamerica desde orbita",
    caption: "aurora orbital",
  },
  {
    id: "space-antarctica",
    section: "vii",
    src: "/images/autorreferencia/space-antarctica.jpg",
    alt: "Antartida real vista desde orbita",
    caption: "antartida",
  },
  {
    id: "space-africa-night",
    section: "viii",
    src: "/images/autorreferencia/space-africa-night.jpg",
    alt: "Africa nocturna real vista desde orbita",
    caption: "africa nocturna",
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
  const cosmicBySection = useMemo(
    () =>
      COSMIC_IMAGES.reduce<Partial<Record<SectionId, CosmicImage[]>>>((acc, item) => {
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
            const sectionCosmic = cosmicBySection[section.id] ?? [];
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
                          sizes="(max-width: 768px) 100vw, 48vw"
                        />
                        <figcaption className={styles.cosmicCaption}>{image.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </section>
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
