export interface Piece {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  epigraphs: string[];
  content: string;
  pdf: string;
}

export const pieces: Piece[] = [
  {
    slug: "irrelevancia",
    title: "Irrelevancia",
    date: "2025-02-22",
    tags: ["nihilismo", "entropia", "nietzsche"],
    excerpt: "El universo no tiene sentido. Eso es condena.",
    epigraphs: [
      "Si el universo no te debe nada, ¿por qué insistes en cobrarle?",
      "\"Dios ha muerto. Dios sigue muerto. Y nosotros lo hemos matado.\" — Nietzsche",
      "La entropía no negocia. No espera. No perdona.",
      "¿Qué diferencia hay entre un acto heroico y uno absurdo en un universo que no registra ninguno?",
    ],
    content: `El universo no tiene sentido. Eso no es liberación. es condena.

Nietzsche lo supo antes que nadie: el abismo no devuelve la mirada por cortesía, la devuelve porque no tiene otra cosa que hacer. La entropía no es una fuerza destructiva; es la indiferencia hecha ley física. Todo tiende al desorden no porque el caos sea poderoso, sino porque el orden es improbable.

Pensamos que la irrelevancia es un estado que se puede evitar. Que si construimos suficientes monumentos, si escribimos suficientes libros, si amamos con suficiente intensidad, algo quedará. Pero el segundo principio de la termodinámica no hace excepciones con los sentimientos.

La pregunta no es si importamos. La pregunta es qué hacemos con la certeza de que no.

Camus proponía imaginar a Sísifo dichoso. Pero Camus nunca tuvo que enfrentar un timeline infinito donde cada logro es un grano de arena en un desierto que se expande. La roca no solo vuelve a caer. el concepto mismo de "subir" pierde significado cuando no hay cima.

Lo que queda entonces no es heroísmo ni resignación. Es algo más extraño: la práctica de actuar sin fundamento. No porque tenga sentido, sino porque el sentido nunca fue el punto.

La irrelevancia no es el final del pensamiento. Es donde el pensamiento realmente comienza.`,
    pdf: "/pdfs/irrelevancia.pdf",
  },
  {
    slug: "mascara",
    title: "Máscara",
    date: "2025-03-15",
    tags: ["lacan", "foucault", "hipocresia"],
    excerpt:
      "¿Es la máscara lo único que hay, o el deseo de quitárnosla es la más elaborada de las ficciones?",
    epigraphs: [
      "\"El inconsciente está estructurado como un lenguaje.\" — Lacan",
      "¿Quién eres cuando nadie te ve? ¿Y si esa persona también es una máscara?",
      "La autenticidad es el último lujo del performer consumado.",
      "Foucault: el poder no reprime, produce. Produce sujetos que creen ser libres.",
    ],
    content: `¿Es la máscara lo único que hay, o el deseo de quitárnosla es la más elaborada de las ficciones?

Lacan lo articuló con precisión quirúrgica: el sujeto no está detrás de la máscara. El sujeto es el movimiento mismo de ponérsela y quitársela. No hay rostro original debajo. hay capas, y cada capa es tan "auténtica" como la siguiente.

Foucault añadiría que la máscara no es elección personal sino tecnología de poder. No elegimos qué máscara ponernos; el dispositivo social ya la ha moldeado antes de que tengamos edad para preguntar quiénes somos. La confesión. ese gesto supuestamente liberador de "mostrarse tal cual uno es". es otra máscara, quizás la más sofisticada.

La hipocresía, entonces, no es el problema. El problema es creer que existe su opuesto.

Cuando alguien dice "yo soy así, sin filtros", está ejecutando la performance más elaborada de todas: la de la transparencia. Y esa performance requiere más esfuerzo, más cálculo, más artificio que cualquier mentira convencional.

¿Qué queda? Quizás lo más honesto sea reconocer que la máscara no se quita. Se cambia. Y en ese cambio constante. en esa danza entre versiones de uno mismo. hay algo que se parece peligrosamente a la verdad.

No la verdad como correspondencia con un hecho. La verdad como proceso. Como movimiento perpetuo entre lo que mostramos y lo que ocultamos, sabiendo que ambos gestos son igualmente constructivos, igualmente ficticios, igualmente necesarios.`,
    pdf: "/pdfs/mascara.pdf",
  },
  {
    slug: "fluctuacion",
    title: "Fluctuación",
    date: "2025-04-01",
    tags: ["fisica-cuantica", "budismo", "campos"],
    excerpt: "La ola, tan ingenua, queriendo saberse distinta al mar.",
    epigraphs: [
      "\"La forma es vacío, el vacío es forma.\" — Sutra del Corazón",
      "El vacío cuántico contiene más energía que toda la materia visible del universo.",
      "¿Eres la ola o eres el mar pretendiendo que olvidó?",
      "Nagarjuna: todo lo que surge dependientemente es vacío. Todo lo que es vacío surge dependientemente.",
    ],
    content: `La ola, tan ingenua, queriendo saberse distinta al mar.

En teoría cuántica de campos, el vacío no está vacío. Fluctúa. Partículas virtuales aparecen y desaparecen en escalas de tiempo tan breves que desafían la medición pero no la realidad. El vacío es el estado de mínima energía, y aun así está lleno de actividad.

Los budistas llegaron a la misma conclusión hace veinticinco siglos, con otro vocabulario: śūnyatā, vacuidad. No la nada como ausencia, sino la nada como potencialidad infinita. Todo surge dependientemente, nada existe por sí mismo, y sin embargo. y esto es lo crucial. todo aparece.

La fluctuación cuántica y el surgimiento dependiente no son metáforas una de la otra. Son descripciones complementarias del mismo fenómeno: la realidad no tiene sustancia fija. Es proceso puro.

Nosotros, como la ola, insistimos en la separación. Dibujamos bordes donde no los hay. Nombramos las cosas para fijarlas, y confundimos el nombre con la cosa. Pero el campo no conoce bordes. La función de onda no colapsa en una partícula porque la partícula sea "real". colapsa porque nosotros necesitamos que lo sea.

Nagarjuna escribió: "No hay diferencia alguna entre samsara y nirvana." El físico diría: no hay diferencia alguna entre la partícula y el campo. Son la misma cosa vista desde escalas diferentes.

La fluctuación no es anomalía. Es la naturaleza fundamental de lo que hay. Y lo que hay no es cosa. es verbo.`,
    pdf: "/pdfs/fluctuacion.pdf",
  },
  {
    slug: "topologia-del-deseo",
    title: "Topología del Deseo",
    date: "2025-05-10",
    tags: ["lacan", "topologia", "deseo", "psicoanalisis"],
    excerpt:
      "El deseo no tiene objeto. Tiene estructura. Y esa estructura es topológica.",
    epigraphs: [
      "El nudo borromeo: tres que son uno. Corta uno, pierdes todo.",
      "\"No hay relación sexual.\" — Lacan. No hay relación que no esté mediada por lo simbólico.",
      "¿Deseas lo que deseas, o deseas el deseo del otro?",
      "La banda de Möbius no tiene interior. Tampoco tú.",
    ],
    content: `El deseo no tiene objeto. Tiene estructura. Y esa estructura es topológica.

Lacan tomó prestada la banda de Möbius para ilustrar algo que el lenguaje ordinario no puede capturar: la continuidad entre el adentro y el afuera del sujeto. No hay interior psíquico separado del exterior social. Hay una superficie única que se tuerce sobre sí misma, creando la ilusión de dos lados donde solo hay uno.

El deseo circula por esa superficie. No va de un punto A a un punto B. No busca satisfacción. busca perpetuarse. Cada objeto que creemos desear es un señuelo, un punto de capitoné que fija momentáneamente el deslizamiento interminable del significante.

La topología no es metáfora en Lacan. Es matema. Es el intento de formalizar lo que resiste a la formalización: que el sujeto no está ni adentro ni afuera de su deseo, sino en el pliegue mismo.

El nudo borromeo. tres anillos que se sostienen mutuamente sin que ningún par esté enlazado. es la estructura mínima del sujeto: Real, Simbólico, Imaginario. Corta uno y los tres se sueltan. No hay jerarquía. No hay fundamento. Hay nudo.

¿Y qué hace el análisis? No desata el nudo. Lo recorre. Traza sus bordes. Encuentra los puntos donde el sujeto se atasca, donde la superficie se pliega sobre sí misma generando síntoma. El síntoma no es error. es solución topológica a un problema estructural.

El deseo, entonces, no se interpreta. Se cartografía.`,
    pdf: "/pdfs/topologia-del-deseo.pdf",
  },
];

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return pieces.map((p) => p.slug);
}
