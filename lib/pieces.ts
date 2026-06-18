export interface Reference {
  author: string;
  title: string;
  year?: string;
  source?: string;
  url?: string;
}

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
  references?: Reference[];
}

export const pieces: Piece[] = [
  {
    slug: "fluctuacion",
    title: "Fluctuación",
    date: "2025-04-01",
    tags: ["fisica", "fisica-cuantica", "budismo", "campos"],
    excerpt: "La ola, tan ingenua, queriendo saberse distinta al mar.",
    epigraphs: [
      "\"La forma es vacío, el vacío es forma.\" — Sutra del Corazón",
      "El vacío cuántico contiene más energía que toda la materia visible del universo.",
      "¿Eres la ola o eres el mar fingiendo que olvidó?",
      "Nagarjuna: todo lo que surge dependientemente es vacío, todo lo que es vacío surge dependientemente.",
    ],
    content: `La ola, tan ingenua, queriendo saberse distinta al mar.

En teoría cuántica de campos el vacío no está vacío, fluctúa, partículas virtuales que aparecen y desaparecen en escalas de tiempo tan breves que desafían la medición pero no la realidad, y aun siendo el estado de mínima energía está lleno de actividad.

Los budistas llegaron a lo mismo hace veinticinco siglos con otro vocabulario, śūnyatā, vacuidad, que no es la nada como ausencia sino la nada como potencialidad infinita, porque todo surge dependientemente y nada existe por sí mismo y sin embargo, y esto es lo crucial, todo aparece.

La fluctuación cuántica y el surgimiento dependiente no son metáforas una de la otra, comparten la forma, una realidad sin sustancia fija que es proceso puro y nada más.

Nosotros, como la ola, insistimos en la separación, dibujamos bordes donde no los hay y nombramos las cosas para fijarlas y terminamos confundiendo el nombre con la cosa, pero el campo no conoce bordes, y la función de onda no colapsa en una partícula porque la partícula sea real sino que colapsa en nuestros registros porque medir es obligar al campo a responder en sustantivo.

Nagarjuna escribió que no hay diferencia alguna entre samsara y nirvana, y el físico diría que no hay diferencia alguna entre la partícula y el campo, la misma cosa vista con distinta resolución.

La fluctuación no es anomalía, es la naturaleza de lo que hay, y lo que hay no es cosa, es verbo.`,
    pdf: "/pdfs/fluctuacion-rev.pdf",
  },
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
    tags: ["fisica-cuantica", "ontologia", "decoherencia", "entrelazamiento"],
    excerpt:
      "La superposición no es metáfora: es lo real antes del recorte de la medición.",
    epigraphs: [
      "La función de onda no describe un objeto, organiza un campo de posibilidad.",
      "La decoherencia no crea lo clásico, clausura accesos a la interferencia.",
      "El ser no antecede a la relación, emerge en ella.",
      "Cada medición gana localidad y pierde totalidad.",
    ],
    content: `La superposición no es una metáfora, y no es un déficit de información para mentes perezosas. Es la propiedad de los sistemas cuánticos antes de que una interacción física los aprisione, o al menos así la leo, porque ya elegir esa palabra, propiedad, es tomar partido en una pelea interpretativa que la física no ha cerrado. Un sistema cuántico no está en varios estados como un turista indeciso ocupando lugares uno tras otro. Es una combinación coherente de todos ellos a la vez, las posibilidades sumándose en la función de onda, esa partitura que guarda la amplitud de cada azar. Y esa función no es una representación parcial de lo real, es lo real mismo, intacto, antes de que el colapso lo recorte.

Donde la mecánica clásica descansa en la certeza de una trayectoria, lo cuántico se mueve en la ambigüedad fértil de la densidad de probabilidad. Donde el sentido común exige un estado definido, hay un vector en un espacio de Hilbert, sin coordenadas precisas, sin contorno fijo, sin un tiempo que lo apure. La partícula no posee propiedades intrínsecas hasta que un observable la mide, y no es que estén ocultas esperando ser descubiertas, es que todavía no han acontecido.

Esta condición no local, no definida, no observada, se sostiene mientras el sistema logre aislarse del entorno macroscópico. Pero nada se aísla del mundo por mucho tiempo. Ahí entra la decoherencia, el proceso por el cual el entorno, fotones, átomos, el murmullo térmico del universo, destruye la coherencia entre los estados superpuestos y suprime la interferencia. Lo que emerge entonces es comportamiento clásico, no por una transición ontológica, no porque algo en la partícula cambie de naturaleza, sino por la pérdida de posibilidad interferencial. El sistema no deja de ser cuántico. El mundo, en su torpeza de escala, lo trata como si lo fuera.

Este paso de la coherencia al colapso no necesita un observador consciente, ningún ojo que juzgue. Basta la intrusión del entorno físico para descomponer la fase cuántica e interrumpir la simultaneidad. La medición no es un acto de voluntad, es una ruptura del aislamiento, y en ese instante uno de los estados posibles, entre todos los que latían, se actualiza. Los demás no se desvanecen metafísicamente, se vuelven inaccesibles, que no es lo mismo.

De ahí que algunos, los de la interpretación de los muchos mundos de Everett, propongan que todos los términos de la superposición siguen existiendo en ramas paralelas. La función de onda nunca colapsa, solo se bifurca, como un río que se obstina en seguir todos sus cauces. Desde ahí el colapso es una ilusión ligada a nuestra posición estrecha como subsistema, no hay elección absoluta, hay apenas interferencia descartada. No suscribo esa lectura ni la descarto, la traigo porque muestra hasta dónde llega el desacuerdo, no es que falten datos, es que los mismos datos admiten mundos distintos.

Pero incluso sin las hipótesis multiversales, la física contemporánea obliga a repensar la ontología. El ser, esa vieja palabra tan manoseada, no se deja concebir como una entidad estática, un mueble en la sala del cosmos, sino como resultado de interacciones. El sistema no tiene identidad antes de la relación. No hay sustancia previa al vínculo. La existencia, en este plano, es fenómeno emergente, contextual, relacional, sin centro, sin esencia inmutable, sin estabilidad de fondo, solo correlaciones, dependencias.

El entrelazamiento es la prueba. Cuando dos sistemas interactúan ya no pueden describirse por separado, su función de onda se vuelve una sola, y la información sobre el todo no vive en las partes sino en la relación. El estado de uno depende del estado del otro aunque ya no haya nada causal uniéndolos. Esa dependencia no local no transmite señales, no manda nada de aquí para allá, expresa una simetría en la estructura misma de la posibilidad.

La física cuántica, entonces, no es una ciencia de partículas, no es un inventario de bolitas. Es una teoría de configuraciones. No describe cosas, describe relaciones. No apunta al qué, apunta al cómo. Cada evento es una interrupción del espacio de posibilidades, cada medición una pérdida de información global y una ganancia de información local, cada colapso una decisión del mundo físico por una entre infinitas trayectorias virtuales.

Habitar esa estructura es aceptar que lo real no es lo dado sino lo activado, que no hay ser sin medición ni medición sin corte, que toda existencia es un recorte de un espacio mayor de latencias, y que cada forma que nombramos es el residuo de una ruptura en la coherencia.

También en los sistemas se acumulan frecuencias no resueltas. Trayectorias que no fueron escogidas y sin embargo insisten, como fantasmas de lo que pudo ser, vibraciones de lo que no ocurrió, registradas en el pliegue estadístico del fondo. Ninguna posibilidad colapsa sin dejar un eco.

Hay amplitudes que no se cancelan y persisten. Hay decisiones que no se toman y quedan suspendidas. Hay estados que se repiten sin haberse producido, como un bucle.

Y en ese murmullo de probabilidades no colapsadas, por ahí donde aún no hay figura ni acto, algo se inclina sin tocar el suelo.

Una simetría se rompe, pero no cae.

El experimento continúa sin saber que ha empezado. La partícula se acerca al umbral y espera.

Una pausa que no termina, no porque sea larga, sino porque aún no ha empezado su conteo.

Un intervalo lleno de nombres que no, y una vibración leve, no de la materia tosca sino de la pregunta.

Alguien extiende la mano. No para aferrar. Para comprobar si hay borde.

No hay.

Solo más campo. Más posibilidad. Más de eso que no se ve, que no se palpa, pero interfiere.

La luz sin fuente. El colapso que no ocurre. La palabra, casi. El estado, todavía.

Una partícula, sí, esa. La que está por ser medida. Pero no ahora. No todavía.

Eso también es tiempo.

Y tal vez, sin saberlo, eso también sea ser.`,
    image: "/images/pieces/el-ser-no-es-predicado.svg",
  },
  {
    slug: "caos-y-estrella-danzante",
    title: "Hay que tener un caos dentro de sí para dar a luz a una estrella danzante",
    date: "2026-02-26",
    tags: ["nietzsche", "caos", "transformacion"],
    excerpt:
      "El caos no era el enemigo: era el suelo fértil para volver a nacer.",
    epigraphs: [
      "\"Hay que tener un caos dentro de sí para dar a luz a una estrella danzante.\" — Nietzsche",
    ],
    content: `Esto es una nota rápida, y no porque no lo sienta hondo sino porque lo necesitaba decir hoy, ahora, antes de que se me pase. A veces uno carga algo adentro y sabe que si no lo escribe se le enreda y se pierde, así que lo saco aunque salga mal.

No sé bien por dónde empezar la verdad, porque hay cosas que no se dejan ordenar en palabras fáciles. Lo que estoy viviendo ahorita es raro, raro en el mejor sentido, como esos momentos en que te das cuenta de que algo cambió y ni siquiera viste cuándo se sembró la semilla, ya estaba ahí y no lo notaste.

Hace muy poco yo estaba en un lugar oscuro, un lugar que parecía no tener puertas, me despertaba sintiendo que el tiempo era una carga, que existir era nada más un ciclo de ansiedad y cansancio, me había perdido y lo peor no era estar perdido, era que ya ni buscaba el camino de vuelta porque había olvidado cómo se hacía.

Recuerdo una noche, de las más silenciosas, cuando volví de la playa, el lugar que según todos debía calmarme y no me calmó nada, al revés. Me sentía roto, invisible, el cuerpo me temblaba porque ya no tenía en las venas eso que por un tiempo creí que me sostenía.

Y fue ahí, solo en mi cuarto, que rogué, no sé a quién, no sé si a Dios o a algo o al eco de mi propia voz, rogué que me dejaran salir, que me dieran una oportunidad, y no pedía riqueza ni fama ni éxito ni nada de eso, pedía aire, pedía un día sin hundirme, uno solo.

Y de algún modo esa súplica no cayó en el vacío, porque unas semanas después el mundo que yo creía cerrado se abrió, sin fanfarria, sin promesas, se abrió de a poco, como se abre un respiro.

Ahora respiro distinto, miro distinto, me despierto y hay un orden nuevo en las cosas, no porque el mundo haya cambiado sino porque algo en mí se reacomodó, y trabajo con personas que admiro, gente que brilla por lo que es, y cada día me enseñan algo sin proponérselo.

Pero lo más raro es estar arriba después de haber vivido tanto tiempo en el fondo, porque el vértigo no se fue del todo, uno se acostumbra a la lucha, al peso, y cuando el peso se va resulta que la ligereza también asusta, nadie te avisa eso, que volver a estar bien da un poco de miedo.

Y lo digo desde la humildad, no hay un solo día en que no me sorprenda de lo que estoy viviendo, de lo que estoy construyendo, de lo que estoy siendo, no era el plan, no era nada de lo que imaginé, y sin embargo aquí está, pasando.

Lo que más me conmueve no son los logros, es haberme demostrado que podía resistir, que podía volver a creer, que podía empezar a cuidarme, así de simple y así de difícil.

Aquí estoy, con cero respuestas, sin certezas de nada, pero con gratitud y con ganas de seguir, y con la conciencia de que este momento es frágil y es hermoso y que las dos cosas van juntas, siempre van juntas.

Hoy entiendo esa frase como no la entendía antes, hay que tener un caos dentro de sí para dar a luz a una estrella danzante, y el caos no era el enemigo, el caos fue el suelo, fue lo que me obligó a buscar, a moverme, a intentar, y no lo agradezco, no se agradece un fondo así, pero sin él no habría tenido de dónde empujar.

Hoy fue un salto, invisible para el mundo pero gigantesco para mí, porque solo yo sé lo que costaron estos años, solo yo sé cuántos amaneceres fueron castigo, cuántas noches enteras pasé deseando apagarme. Y por eso este momento me sabe como me sabe, porque nadie más estuvo adentro de mi cuerpo temblando, nadie más cargó mi miedo ni mi cansancio, y hoy todo eso por fin sirvió de algo.

No es un punto final, es un paso más, un intento de dejar registro, de soltar esto por si alguien lo lee y le sirve para acordarse de que también se puede salir.

Así que gracias, de verdad, por leerme y por acompañarme y por estar, y ya, no tengo más que decir, solo que hoy estoy feliz y quería que quedara escrito antes de que se me olvide cómo se siente.`,
    image: "/images/pieces/caos-estrella-danzante.svg",
  },
];

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return pieces.map((p) => p.slug);
}
