export interface Piece {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  epigraphs: string[];
  content: string;
  pdf?: string;
  image?: string;
}

export const pieces: Piece[] = [
  {
    slug: "irrelevancia",
    title: "Irrelevancia",
    date: "2025-02-22",
    tags: ["fisica", "nihilismo", "entropia", "nietzsche"],
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
    tags: ["fisica", "fisica-cuantica", "budismo", "campos"],
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
  {
    slug: "el-ser-no-es-predicado",
    title: "El ser no es predicado",
    date: "2026-02-26",
    tags: ["fisica", "fisica-cuantica", "ontologia", "decoherencia", "entrelazamiento"],
    excerpt:
      "La superposición no es metáfora: es lo real antes del recorte de la medición.",
    epigraphs: [
      "La función de onda no describe un objeto: organiza un campo de posibilidad.",
      "La decoherencia no crea lo clásico; clausura accesos a la interferencia.",
      "El ser no antecede a la relación: emerge en ella.",
      "Cada medición gana localidad y pierde totalidad.",
    ],
    content: `La superposición, créeme, no es una metáfora. No un déficit de información para mentes perezosas. En la mecánica cuántica, es la propiedad ontológica de los sistemas antes de que la vulgaridad de una interacción física los aprisione. Un sistema cuántico, entiéndelo bien, no "está en varios estados" como si fuera un turista indeciso en una estación, ocupando lugares una tras otra. No. Es una combinación coherente de todos ellos, simultáneamente, más un vals de posibilidades danzando en la función de onda, esa partitura compleja que encierra la amplitud de cada azar. Esa función, ese arabesco matemático, no es una representación parcial de lo real; es lo real mismo, intacto, antes de que el puñetero colapso lo estropee todo.

Donde la mecánica clásica se regodea en la certidumbre de una trayectoria, lo cuántico se desliza en la ambigüedad fértil de la densidad de probabilidad. Y donde el sentido común exige un estado definido, aquí tenemos un vector en un espacio de Hilbert, sin coordenadas precisas, sin contorno fijo, sin un tiempo que lo apresure. La partícula no posee propiedades intrínsecas, no, no hasta que un observable se atreva a medirla. No está oculta esperando ser descubierta, simplemente, aún no ha acontecido.

Esta condición no-local, no-definida, no-observada, se mantiene mientras el sistema, como un amante furtivo, logre aislarse del entorno macroscópico. Pero, ¿quién puede aislarse del mundo real? Aquí entra en escena la decoherencia cuántica: ese sutil proceso por el cual el entorno, fotones, átomos, los murmullos térmicos del universo, cual soplos indiscretos, destruye la coherencia entre los estados superpuestos, suprimiendo la hermosa interferencia. Lo que emerge entonces es un comportamiento clásico no por una transición ontológica, no porque el alma de la partícula cambie, sino por la pérdida de posibilidad interferencial. El sistema no deja de ser cuántico, pero el mundo, en su torpeza, lo interpreta como si no lo fuera.

Este salto de la coherencia al colapso no requiere un observador consciente, no un ojo que juzgue. Basta la intrusión del entorno físico para descomponer la fase cuántica, interrumpiendo la gloriosa simultaneidad. La medición no es un acto voluntario, no una elección de la voluntad; es, por el contrario, una ruptura del aislamiento. En ese instante, uno de los estados posibles, entre todos los que latían en la sombra, se actualiza. Los demás, los desheredados, no se desvanecen metafísicamente; simplemente, se vuelven inaccesibles.

De ahí que algunos, como los que se aferran a la interpretación de los muchos mundos (Everett), propongan que todos los términos de la superposición siguen existiendo en ramas paralelas del universo. La función de onda nunca colapsa, no, solo se bifurca, como un río que se obstina en seguir todos sus cauces posibles. Desde esa perspectiva, el colapso no es más que una ilusión ligada a nuestra posición estrecha como subsistema. No hay elección absoluta. Hay, apenas, interferencia descartada.

Pero incluso sin las hipótesis multiversales, la física contemporánea nos exige repensar la ontología. El ser, esa vieja palabra tan manoseada, no puede concebirse como una entidad estática, un mueble en la sala del cosmos, sino como el resultado de interacciones. El sistema no tiene identidad antes de la relación. No hay sustancia previa al vínculo. La existencia misma, en este plano que pisamos, es un fenómeno emergente, contextual, relacional. No hay centro, no hay esencia inmutable, no hay estabilidad granítica, sino estructuras de correlación, danzas de dependencias.

El entrelazamiento cuántico es la prueba de esta visión: cuando dos sistemas se tocan, ya no pueden ser descritos como independientes. Su función de onda se vuelve una sola. La información sobre el todo no se distribuye en las partes, sino en la relación. El estado de uno depende del estado del otro, incluso si ya no están unidos causalmente. Esta dependencia no-local no implica transmisión de señales: implica una simetría profunda en la estructura de la posibilidad.

La física cuántica, entonces, no es una ciencia de partículas, no es un inventario de bolitas diminutas. Es una teoría de configuraciones. No describe cosas, sino relaciones. No se orienta hacia el "qué", sino hacia el "cómo". Cada evento es una interrupción del espacio de posibilidades. Cada acto de medición es una pérdida de información global y una ganancia de información local. Cada colapso es una decisión del mundo físico por una entre infinitas trayectorias virtuales.

Habitar esa estructura implica aceptar que lo real no es lo dado, lo obvio, sino lo activado. Que no existe el ser sin la observación, ni hay observación sin corte. Que toda existencia es un recorte de un espacio mayor de latencias. Y que cada configuración actual, cada forma que nombramos, es el residuo de una ruptura en la coherencia.

También en los sistemas se acumulan frecuencias no resueltas. Trayectorias que no fueron escogidas, pero que insisten, como fantasmas de lo que pudo ser. Vibraciones de lo que no ocurrió, registradas en el pliegue estadístico del fondo. Ninguna posibilidad colapsa sin dejar un eco.

Hay amplitudes que no se cancelan, que persisten en el éter. Hay decisiones que no se toman, que quedan suspendidas. Hay estados que se repiten sin haberse producido, como un bucle.

Y en ese murmullo de probabilidades no colapsadas, por allí donde aún no hay figura ni acto, sí, algo se inclina sin tocar el suelo.

Una simetría se rompe, pero no cae.

El experimento continúa sin saber que ha empezado. La partícula se aproxima al umbral y espera.

Una pausa que no termina, no porque sea larga, sino porque aún no ha empezado su conteo.

Un intervalo lleno de nombres no, y una vibración leve, no de la materia tosca, sino de la pregunta.

Alguien extiende la mano. No para aferrar. Para comprobar si hay borde.

Pero no hay.

Solo más campo.
Más posibilidad.
Más de eso que no se ve, que no se palpa, pero interfiere.

La luz sin fuente.
El colapso que no ocurre.
La palabra, casi.
El estado, todavía.

Una partícula, sí, esa.
Esa que está por ser medida.
Pero no ahora.
No todavía.

Eso también es tiempo.
Y tal vez, sin saberlo,
eso también sea ser.`,
    image: "/images/pieces/el-ser-no-es-predicado.svg",
  },
  {
    slug: "caos-y-estrella-danzante",
    title: "Hay que tener un caos dentro de si para dar a luz a una estrella danzante",
    date: "2026-02-26",
    tags: ["filosofia", "nietzsche", "caos", "transformacion", "existencia"],
    excerpt:
      "El caos no era el enemigo: era el suelo fértil para volver a nacer.",
    epigraphs: [
      "\"Hay que tener un caos dentro de si para dar a luz a una estrella danzante.\" — Nietzsche",
      "No es punto final: es registro de una salida.",
      "Lo que llega después del fondo solo uno sabe cuánto vale.",
      "La gratitud también es una forma de estructura.",
    ],
    content: `Hay que tener un caos dentro de sí para dar a luz a una estrella danzante.

Esto es una nota rápida. No tanto porque no lo sienta profundo, sino porque lo necesitaba decir ahora. Porque a veces uno carga algo adentro y sabe que si no lo escribe, si no lo saca, se le enreda por dentro y se pierde la claridad.

No sé bien por dónde empezar. Tal vez porque hay cosas que aunque uno quiera no se ordenan en palabras fáciles. Lo que estoy viviendo ahora es extraño en el mejor sentido: extraño como esos momentos en los que te das cuenta de que algo cambió y ni siquiera viste cuándo se sembró la semilla.

Hace muy poco yo estaba en un lugar oscuro. Un lugar que parecía no tener puertas. Me despertaba sintiendo que el tiempo era una carga, que la existencia era un ciclo de ansiedad y cansancio. Me había perdido, y ni siquiera buscaba el camino de vuelta porque había olvidado cómo se hacía.

Recuerdo una noche, una de las más silenciosas, cuando regresé de la playa. Un lugar que según todos debía calmarme. Pero no fue así. Me sentía roto. Invisible. El cuerpo temblaba porque ya no tenía en las venas eso que por un tiempo creí que me sostenía.

Y fue entonces, solo en mi cuarto, que rogué. No sé a quién. No sé si a Dios, si a algo, si al eco de mi propia voz. Rogué que por favor me dejaran salir. Que me dejaran una oportunidad. No pedía riqueza ni fama ni éxito. Pedía aire. Pedía un día sin hundirme.

Y de algún modo esa súplica no fue en vano. Unas semanas después, el mundo que yo creía cerrado se abrió. No con fanfarria. No con promesas. Se abrió de a poco, como un respiro, como el primer rayo que entra en una habitación cerrada.

Ahora respiro distinto. Miro distinto. Me despierto y hay un orden nuevo en las cosas. No porque el mundo haya cambiado, sino porque algo en mí se reacomodó. Trabajo con personas que admiro profundamente, gente que brilla por lo que es, y cada día me enseñan algo sin proponérselo.

Pero lo más raro es estar arriba después de haber vivido tanto tiempo en el fondo. Es como si el vértigo no se hubiera ido del todo. Uno se acostumbra a la lucha, al peso. Y cuando el peso se va, la ligereza también asusta.

Lo digo desde la humildad: no hay un solo día en que no me sorprenda de lo que estoy viviendo. De lo que estoy construyendo. De lo que estoy siendo. No era el plan. No era lo que imaginé. Y sin embargo, aquí está.

Lo que más me conmueve no son los logros. Es haberme demostrado que podía resistir. Que podía volver a creer. Que podía empezar a cuidar de mí, como quien cuida una planta que creía marchita.

Aquí estoy, con cero respuestas. No con certezas. Pero con gratitud. Y con ganas de seguir. Y con la conciencia de que este momento es frágil y hermoso.

Hoy más que nunca entiendo esa frase: hay que tener un caos dentro de sí para dar a luz a una estrella danzante. Porque el caos no era el enemigo. El caos fue el suelo fértil. Fue lo que me obligó a buscar, a moverme, a intentar.

Hoy fue salto. Uno invisible para el mundo, pero gigantesco para mí. Solo yo sé lo que costaron estos años. Solo yo sé cuántos amaneceres fueron castigo. Solo yo sé cuántas noches enteras deseando apagarme.

Y por eso este momento me sabe como me sabe. Porque nadie más estuvo en mi cuerpo temblando, nadie más cargó mi miedo ni mi cansancio. Y hoy todo eso sirvió.

No es un punto final. Es un paso más. Un intento de dejar registro. De compartir lo que quizá alguien necesite leer para recordar que también se puede.

Gracias por leerme.
Gracias por acompañarme.
Gracias por estar.

Estoy feliz.`,
  },
];

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return pieces.map((p) => p.slug);
}
