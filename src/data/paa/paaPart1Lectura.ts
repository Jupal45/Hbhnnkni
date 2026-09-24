import { Question } from '../../types';

export const paaPart1Questions: Question[] = [
  // Lectura 1: Oficina médica y Guillermo (1-11)
  {
    id: 'paa_p1_q1',
    part: 1,
    partName: 'Lectura',
    number: 1,
    instructions: 'Los ejercicios del 1 al 11 se basan en la lectura sobre lo que acontece en una oficina médica.',
    passage: {
      title: 'Oficina médica y Guillermo',
      text: `Fue ternura a primera vista. Llegó de la mano de su padre, hurgó en el nuevo espacio intentando hacer un reconocimiento hasta que se dio cuenta de que era un espacio pequeño. Había bebido de la mañana su mejor parte y se le escapaban rayitos de sol por los ojos. Parecía perderse entre las partículas de aire, como hilvanando ficciones en un mundo alterno.
—Iiiiiiii —era su única palabra, su única oración.
La repetía una y otra vez con distintos tonos, como si el cambio de tonos diera sentidos distintos a esa vocal.
Y Guillermo se convirtió en el explorador de aquella mañana de verano. Su mano, a veces, sin querer, tomaba la mía como buscando afianzarse en un puente de amor inadvertido. Al mismo tiempo, alzaba un vuelo particular... escapando, lejos, muy lejos, de aquella extraña y fría oficina. Su turno no llegaba y al parecer tardaría mucho más. Mientras el padre completaba unos formularios que exigía el protocolo de la oficina, Guillermo caminaba; daba vueltas; se ponía en cuclillas; empezaba a contar los sueños que llevaba entre sus dedos, dedos que se transformaban en alas de duende; luego, daba con las manos tres golpes en el piso y seguía volando.
—Iiiiiiiiiiiiii —subía el tono de su melodía.
Buscaba su “juguete” para decirle a su padre que se quería ir. “Caminar” —decía la máquina, pero su padre no escuchaba, seguía llenando hojas y hojas detallando los pormenores de su historial. Creo que buscaba aliento entre el papel y la tinta, antes de seguir imponiendo amor a su hijo nacido para despertar mariposas.
—Iiiiiiiiiiiii —argüía con carácter. Y cuando la puerta se abría, se escapaba para ir o para volver a cualquier parte, con su mirada llena de luz.
Yo estaba esperando también a que llamaran a mi hija. Habíamos ido allí buscándole solución a un problema raro.
Guillermo tropezaba una y otra vez con nuestras piernas y retomaba su vuelo, perdido en el tiempo y en el espacio. Al ritmo de esta danza regresaba con sus alitas de duende a decirle a su padre iiiiiiiiiiiii. Era evidente que quería irse. Quise abrazarlo, pero no me atreví. En un mundo en el que se intenta resguardar a los niños de la maldad cotidiana, no lo consideré apropiado.
Uuufff, hice un esfuerzo para contener las ganas, aunque lo abracé con el pensamiento, dirigida por su zigzagueante y profunda mirada, buscando conectar con su frecuencia, con su hermosa vibración. Los niños que esperaban su turno miraban a Guillermo asustados. Y sí, no había duda, Guillermo era especial. Por eso, quizá sin conocerlo me inspiró tanta ternura.
La oficina fue vaciándose. Mi hija ya estaba dentro con la doctora. Entonces el iiiiiii iiiii iiiii de Guillermo se intensificó, no quería seguir esperando en ese lugar. Vi como sus manos se bamboleaban en el aire intentando capturar sus sueños. Guillermo escapaba impetuosamente de la obligación de estar presente, daba tres golpes en el suelo, como agitando mariposas, le nacían alas entre los dedos y transformaba aquella oficina en un solemne y misterioso mariposario.`
    },
    prompt: 'En la lectura, la palabra “hurgó” (línea 2) se puede sustituir por',
    options: [
      { key: 'A', text: 'persiguió.' },
      { key: 'B', text: 'buscó.' },
      { key: 'C', text: 'tocó.' },
      { key: 'D', text: 'escondió.' },
    ],
    correctAnswer: 'B',
    explanation: 'En el contexto de explorar un nuevo espacio («hurgó en el nuevo espacio intentando hacer un reconocimiento»), «hurgó» equivale a «buscó» o indagó visual y físicamente.',
  },
  {
    id: 'paa_p1_q2',
    part: 1,
    partName: 'Lectura',
    number: 2,
    prompt: 'Según la lectura, la palabra “raro” (línea 36) se refiere a',
    options: [
      { key: 'A', text: 'especial.' },
      { key: 'B', text: 'difícil.' },
      { key: 'C', text: 'extraño.' },
      { key: 'D', text: 'escaso.' },
    ],
    correctAnswer: 'C',
    explanation: 'En «buscándole solución a un problema raro», «raro» denota algo poco común o extraño en el contexto clínico.',
  },
  {
    id: 'paa_p1_q3',
    part: 1,
    partName: 'Lectura',
    number: 3,
    prompt: 'Según la lectura, la palabra “bamboleaban” (línea 54) se refiere a',
    options: [
      { key: 'A', text: 'trasladarse.' },
      { key: 'B', text: 'moverse.' },
      { key: 'C', text: 'detenerse.' },
      { key: 'D', text: 'inclinarse.' },
    ],
    correctAnswer: 'B',
    explanation: 'Bambolear describe el movimiento oscilante o vaivén de las manos en el aire.',
  },
  {
    id: 'paa_p1_q4',
    part: 1,
    partName: 'Lectura',
    number: 4,
    prompt: '¿Cuál de las siguientes opciones resume MEJOR la lectura?',
    options: [
      { key: 'A', text: 'El niño que cazaba mariposas' },
      { key: 'B', text: 'El comportamiento de un niño diferente' },
      { key: 'C', text: 'Las fantasías de Guillermo' },
      { key: 'D', text: 'La aburrida espera en una oficina médica' },
    ],
    correctAnswer: 'B',
    explanation: 'La narración gira en torno a cómo actúa, se expresa y se percibe a Guillermo, un niño con una condición especial y una forma distinta de interactuar con el entorno.',
  },
  {
    id: 'paa_p1_q5',
    part: 1,
    partName: 'Lectura',
    number: 5,
    prompt: 'Según la lectura, se puede INFERIR que la máquina que usaba Guillermo era un',
    options: [
      { key: 'A', text: 'juguete de la oficina con el que se entretenía mientras esperaba.' },
      { key: 'B', text: 'instrumento electrónico que utilizaba el padre para su trabajo.' },
      { key: 'C', text: 'procesador de palabras con el que jugaba todos los días.' },
      { key: 'D', text: 'aparato que le permitía comunicarse porque no podía hablar.' },
    ],
    correctAnswer: 'D',
    explanation: 'El texto indica que Guillermo solo repetía la vocal «Iiiiii» y que buscaba su máquina para decir «Caminar» a su padre; es un comunicador aumentativo o adaptativo.',
  },
  {
    id: 'paa_p1_q6',
    part: 1,
    partName: 'Lectura',
    number: 6,
    prompt: 'De la lectura se puede INFERIR que Guillermo era un niño que',
    options: [
      { key: 'A', text: 'se movía continuamente en su mundo imaginario.' },
      { key: 'B', text: 'tenía dificultad para comunicarse con sus hermanos.' },
      { key: 'C', text: 'todos los días jugaba con un amigo inventado.' },
      { key: 'D', text: 'sufría alucinaciones debido a los medicamentos.' },
    ],
    correctAnswer: 'A',
    explanation: 'El texto describe que caminaba, daba vueltas, alzaba un vuelo particular y sus dedos se transformaban en alas de duende.',
  },
  {
    id: 'paa_p1_q7',
    part: 1,
    partName: 'Lectura',
    number: 7,
    prompt: '¿Qué opción evidencia MEJOR la respuesta del ejercicio anterior?',
    options: [
      { key: 'A', text: 'Líneas 4-5 (“Había bebido... los ojos”)' },
      { key: 'B', text: 'Línea 8 (“Iiiiii... su única oración”)' },
      { key: 'C', text: 'Líneas 19-23 (“Guillermo... volando”)' },
      { key: 'D', text: 'Líneas 26-28 (“su padre... historial”)' },
    ],
    correctAnswer: 'C',
    explanation: 'Las líneas 19 a 23 detallan directamente cómo caminaba, contaba sueños que se transformaban en alas de duende y seguía volando.',
  },
  {
    id: 'paa_p1_q8',
    part: 1,
    partName: 'Lectura',
    number: 8,
    prompt: 'En la lectura, la expresión “se le escapaban rayitos de sol por los ojos” (línea 5) es un ejemplo de',
    options: [
      { key: 'A', text: 'hipérbole.' },
      { key: 'B', text: 'personificación.' },
      { key: 'C', text: 'metáfora.' },
      { key: 'D', text: 'onomatopeya.' },
    ],
    correctAnswer: 'C',
    explanation: 'Es una metáfora poética que describe el brillo, luminosidad y pureza en la mirada del infante.',
  },
  {
    id: 'paa_p1_q9',
    part: 1,
    partName: 'Lectura',
    number: 9,
    prompt: 'En la lectura, la expresión “nacido para despertar mariposas” (línea 30) se refiere a que Guillermo',
    options: [
      { key: 'A', text: 'tiene una sensibilidad especial con los animales.' },
      { key: 'B', text: 'posee una delicadeza y fragilidad especiales.' },
      { key: 'C', text: 'pasa inadvertido por su carácter tímido.' },
      { key: 'D', text: 'es un niño con atributos diferentes a los demás.' },
    ],
    correctAnswer: 'D',
    explanation: 'Se refiere a su condición única, especial y mágica, con atributos sensibles y diferentes al resto.',
  },
  {
    id: 'paa_p1_q10',
    part: 1,
    partName: 'Lectura',
    number: 10,
    prompt: 'Según la lectura, Guillermo repite el sonido porque',
    options: [
      { key: 'A', text: 'quiere marcharse de la oficina.' },
      { key: 'B', text: 'le teme a la mujer que lo observa.' },
      { key: 'C', text: 'está enojado con su padre.' },
      { key: 'D', text: 'pretende asustar a los otros niños.' },
    ],
    correctAnswer: 'A',
    explanation: 'El texto indica claramente: «Era evidente que quería irse» y buscaba su juguete para decir «Caminar».',
  },
  {
    id: 'paa_p1_q11',
    part: 1,
    partName: 'Lectura',
    number: 11,
    prompt: 'La mujer que observa al niño siente tanta ternura por él que quiere',
    options: [
      { key: 'A', text: 'conocerlo.' },
      { key: 'B', text: 'abrazarlo.' },
      { key: 'C', text: 'besarlo.' },
      { key: 'D', text: 'protegerlo.' },
    ],
    correctAnswer: 'B',
    explanation: 'La narradora confiesa expresamente: «Quise abrazarlo, pero no me atreví... Uuufff, hice un esfuerzo para contener las ganas».',
  },

  // Lectura 2: Moluscos terrestres y recuperación forestal (12-18)
  {
    id: 'paa_p1_q12',
    part: 1,
    partName: 'Lectura',
    number: 12,
    instructions: 'Los ejercicios del 12 al 18 se basan en la lectura sobre la relación entre los moluscos terrestres y la recuperación forestal.',
    passage: {
      title: 'Moluscos terrestres y recuperación forestal',
      text: `Un equipo de investigadores estudió los cambios en la composición de los animales después de un incendio y concluyó que la fauna malacológica es buena indicadora de la recuperación forestal.
Los investigadores realizaron un muestreo en los límites de un incendio ocurrido en la periferia de un parque natural. Su objetivo era comprobar si los moluscos terrestres recolonizaban las zonas quemadas o creaban refugios donde vivían los sobrevivientes.
“El fuego forestal cambia radicalmente las condiciones del hábitat para los moluscos terrestres, como la estructura de la vegetación y la cantidad de humus, lo cual afecta significativamente la composición de esta comunidad animal”, señaló Xavier Santos.
Según el equipo, los moluscos terrestres son buenos indicadores del proceso de recuperación de la fauna en bosques afectados por incendios porque son especies muy sensibles a las condiciones del suelo y la estructura vegetal. Los científicos encontraron que había grandes diferencias entre las estaciones de control y las zonas quemadas en las 25 especies de moluscos terrestres identificados.
En las zonas quemadas se observó una ausencia significativa de numerosas especies características del bosque y un incremento de especies propias de los ambientes más secos. Los biólogos demostraron así los efectos negativos de un incendio forestal sobre la riqueza de moluscos.
(1) malacológica: Parte de la zoología que trata sobre los moluscos.
(2) humus: Capa superficial del suelo, constituida por la descomposición de materiales animales y vegetales.`
    },
    prompt: 'La expresión “fauna malacológica” (línea 3) se refiere a',
    options: [
      { key: 'A', text: 'los animales que habitan en el bosque.' },
      { key: 'B', text: 'los moluscos tanto de tierra como de agua.' },
      { key: 'C', text: 'los moluscos terrestres afectados por el fuego.' },
      { key: 'D', text: 'las especies adaptadas a ambientes secos.' },
    ],
    correctAnswer: 'B',
    explanation: 'La malacología es la rama zoológica dedicada al estudio de los moluscos en su sentido biológico general.',
  },
  {
    id: 'paa_p1_q13',
    part: 1,
    partName: 'Lectura',
    number: 13,
    prompt: 'La palabra “periferia” (línea 6) significa',
    options: [
      { key: 'A', text: 'límite natural.' },
      { key: 'B', text: 'zona más externa.' },
      { key: 'C', text: 'área apartada.' },
      { key: 'D', text: 'parte más vulnerable.' },
    ],
    correctAnswer: 'B',
    explanation: 'Periferia hace referencia al contorno, orilla o zona exterior y limítrofe de un territorio.',
  },
  {
    id: 'paa_p1_q14',
    part: 1,
    partName: 'Lectura',
    number: 14,
    prompt: 'La expresión “estaciones de control” (línea 20) se refiere a',
    options: [
      { key: 'A', text: 'lugares donde los científicos estudiaron la recuperación forestal.' },
      { key: 'B', text: 'áreas del bosque donde las autoridades lograron controlar el incendio.' },
      { key: 'C', text: 'puestos de observación del comportamiento de los moluscos terrestres.' },
      { key: 'D', text: 'zonas boscosas donde se encuentran la flora y la fauna en su hábitat.' },
    ],
    correctAnswer: 'C',
    explanation: 'En el método experimental de campo, las estaciones de control son puntos de muestreo y observación donde se monitorea y compara a las especies en condiciones no alteradas frente a las afectadas.',
  },
  {
    id: 'paa_p1_q15',
    part: 1,
    partName: 'Lectura',
    number: 15,
    prompt: 'En la lectura, la palabra “riqueza” (línea 27) significa',
    options: [
      { key: 'A', text: 'abundancia.' },
      { key: 'B', text: 'diversidad.' },
      { key: 'C', text: 'cantidad.' },
      { key: 'D', text: 'opulencia.' },
    ],
    correctAnswer: 'B',
    explanation: 'En ecología y biodiversidad, «riqueza de especies» denota la variedad o diversidad taxonómica de un ecosistema.',
  },
  {
    id: 'paa_p1_q16',
    part: 1,
    partName: 'Lectura',
    number: 16,
    prompt: 'Según la lectura, ¿qué les sucede a los moluscos en las zonas quemadas después de un incendio forestal?',
    options: [
      { key: 'A', text: 'Desaparecen porque cambia la composición del hábitat.' },
      { key: 'B', text: 'Modifican su composición y recolonizan las zonas quemadas.' },
      { key: 'C', text: 'Al alterarse el hábitat, solo sobreviven los de ambiente seco.' },
      { key: 'D', text: 'Se reproducen contribuyendo así a la recuperación forestal.' },
    ],
    correctAnswer: 'C',
    explanation: 'El texto señala que hay una ausencia de especies del bosque húmedo y un incremento de especies adaptadas a ambientes secos.',
  },
  {
    id: 'paa_p1_q17',
    part: 1,
    partName: 'Lectura',
    number: 17,
    prompt: 'De la lectura se INFIERE que cuanto',
    options: [
      { key: 'A', text: 'mayor sea el daño causado por un incendio forestal, menos moluscos terrestres habrá en el bosque.' },
      { key: 'B', text: 'menos moluscos terrestres haya en el bosque, mayor será el incremento de especies de animales propias de ambientes secos.' },
      { key: 'C', text: 'más diversidad de moluscos terrestres haya en el bosque, más saludable será la vida de los animales que viven en él.' },
      { key: 'D', text: 'más cantidad de moluscos terrestres haya en el bosque, más alimento habrá para los animales que viven en él.' },
    ],
    correctAnswer: 'B',
    explanation: 'La pérdida de fauna malacológica del bosque coincide directamente con la proliferación de especies oportunistas de hábitats áridos o secos.',
  },
  {
    id: 'paa_p1_q18',
    part: 1,
    partName: 'Lectura',
    number: 18,
    prompt: '¿Qué opción evidencia MEJOR la respuesta del ejercicio anterior?',
    options: [
      { key: 'A', text: 'Líneas 10-14 (“El fuego forestal... comunidad animal”)' },
      { key: 'B', text: 'Líneas 15-19 (“Según el equipo... vegetal”)' },
      { key: 'C', text: 'Líneas 23-26 (“En las zonas quemadas... más secos”)' },
      { key: 'D', text: 'Líneas 26-28 (“Los biólogos... de moluscos”)' },
    ],
    correctAnswer: 'C',
    explanation: 'En las líneas 23 a 26 se documenta textualmente la ausencia de especies boscosas y el incremento de especies de ambientes más secos.',
  },

  // Lectura 3: Contaminación acústica y diagrama (19-25)
  {
    id: 'paa_p1_q19',
    part: 1,
    partName: 'Lectura',
    number: 19,
    instructions: 'Los ejercicios del 19 al 25 se basan en la lectura sobre la contaminación acústica y su gráfica adjunta.',
    passage: {
      title: 'La contaminación acústica urbana',
      text: `La mayoría de las personas que viven en grandes ciudades considera que la contaminación acústica es un factor medioambiental que influye significativamente en su calidad de vida. La contaminación acústica urbana, o ruido ambiental, es la indeseable consecuencia directa de las actividades que se desarrollan en las grandes ciudades.
Técnicamente, el ruido es un tipo de energía secundaria de los procesos o actividades, que se propaga por el ambiente desde el foco productor hasta el receptor. La expresión contaminación acústica hace referencia al sonido molesto, o ruido, que puede producir efectos nocivos en las personas. Estos efectos pueden ser fisiológicos, como pérdida de audición, y sicológicos, como una irritabilidad exagerada.
La contaminación acústica altera las distintas actividades humanas: por un lado, entorpece la comunicación oral, que es la base de la convivencia; por el otro, perturba el sueño y el descanso, lo que impide la concentración y el aprendizaje, y crea estados de cansancio y tensión que pueden dar lugar a enfermedades de tipo nervioso y cardiovascular.
Desde la antigüedad, existe documentación sobre las molestias ocasionadas por los ruidos en las ciudades. Sin embargo, el problema de la contaminación acústica urbana surge realmente a partir de la Revolución Industrial, con el desarrollo de nuevos medios de transporte y el crecimiento de las ciudades. Las causas fundamentales son, entre otras, el aumento espectacular del número de automóviles y el hecho de que las ciudades no habían sido inicialmente planificadas para el tráfico vehicular.
Además de estas fuentes de ruido, hay otras en nuestras ciudades que contribuyen a generar la contaminación acústica urbana. Entre ellas, la actividad industrial, la construcción de obras públicas y privadas, los servicios de limpieza y de recogido de basuras, las sirenas y alarmas, y las actividades lúdicas y recreativas.

[Diagrama adjunto: Fuentes principales de los niveles de ruido urbano: Vehículos turísticos 44%, Motocicletas 14%, Vehículos pesados 12%, Otras causas 11%, Peatones 6%, Sirenas y bocinas 5%, Ventilación y aire acondicionado 3%, Obras urbanas 3%, Recogida de basuras 2%].`
    },
    prompt: 'Según la lectura, la contaminación acústica es un problema que',
    options: [
      { key: 'A', text: 'afecta principalmente a los habitantes de las grandes ciudades.' },
      { key: 'B', text: 'se debe a la densidad poblacional de las grandes ciudades.' },
      { key: 'C', text: 'afecta por igual a las personas de todas las edades.' },
      { key: 'D', text: 'se agrava por al crecimiento desmedido de las ciudades.' },
    ],
    correctAnswer: 'A',
    explanation: 'El primer párrafo destaca que la contaminación acústica urbana influye marcadamente en quienes viven en las grandes metrópolis.',
  },
  {
    id: 'paa_p1_q20',
    part: 1,
    partName: 'Lectura',
    number: 20,
    prompt: 'En la lectura, la palabra “nocivos” (línea 12) significa',
    options: [
      { key: 'A', text: 'desconocidos.' },
      { key: 'B', text: 'dañinos.' },
      { key: 'C', text: 'peligrosos.' },
      { key: 'D', text: 'potenciales.' },
    ],
    correctAnswer: 'B',
    explanation: 'Nocivo es sinónimo exacto de dañino, perjudicial o lesivo para la salud.',
  },
  {
    id: 'paa_p1_q21',
    part: 1,
    partName: 'Lectura',
    number: 21,
    prompt: 'En la lectura, la frase “actividades lúdicas” (línea 37) se refiere a',
    options: [
      { key: 'A', text: 'ceremonias religiosas.' },
      { key: 'B', text: 'juegos y espectáculos.' },
      { key: 'C', text: 'actos oficiales o académicos.' },
      { key: 'D', text: 'competencias deportivas.' },
    ],
    correctAnswer: 'B',
    explanation: 'Lo lúdico está ligado a la diversión, el juego, el ocio y el entretenimiento.',
  },
  {
    id: 'paa_p1_q22',
    part: 1,
    partName: 'Lectura',
    number: 22,
    prompt: 'Seleccione la opción que resume MEJOR el propósito de la lectura.',
    options: [
      { key: 'A', text: 'Definir el concepto de contaminación acústica' },
      { key: 'B', text: 'Identificar algunos efectos nocivos' },
      { key: 'C', text: 'Describir la situación actual en varias ciudades' },
      { key: 'D', text: 'Buscar soluciones viables al problema' },
    ],
    correctAnswer: 'A',
    explanation: 'El texto expone conceptualmente qué es el ruido, cómo se define técnicamente la contaminación acústica, sus fuentes históricas y su impacto.',
  },
  {
    id: 'paa_p1_q23',
    part: 1,
    partName: 'Lectura',
    number: 23,
    prompt: 'Del diagrama que acompaña la lectura se desprende que',
    options: [
      { key: 'A', text: 'las actividades industriales causan una décima parte de la contaminación acústica.' },
      { key: 'B', text: 'se desconocen las causas del 40% de la contaminación acústica.' },
      { key: 'C', text: 'el porcentaje mayor de la contaminación acústica se debe a los vehículos de motor.' },
      { key: 'D', text: 'la actividad humana provoca el 6% de la contaminación acústica.' },
    ],
    correctAnswer: 'C',
    explanation: 'Los vehículos de motor (turísticos 44% + motocicletas 14% + pesados 12% = 70%) constituyen con creces la mayor porción del gráfico.',
  },
  {
    id: 'paa_p1_q24',
    part: 1,
    partName: 'Lectura',
    number: 24,
    prompt: 'Según el diagrama, ¿qué porcentaje de contaminación acústica se debe, directa o indirectamente, a los vehículos de motor?',
    options: [
      { key: 'A', text: '44%' },
      { key: 'B', text: '56%' },
      { key: 'C', text: '70%' },
      { key: 'D', text: '75%' },
    ],
    correctAnswer: 'D',
    explanation: 'Sumando vehículos turísticos (44%), motocicletas (14%), vehículos pesados (12%) y sirenas/bocinas de vehículos (5%), totaliza exactamente 75%.',
  },
  {
    id: 'paa_p1_q25',
    part: 1,
    partName: 'Lectura',
    number: 25,
    prompt: 'En la lectura predominan los discursos',
    options: [
      { key: 'A', text: 'expositivo y argumentativo.' },
      { key: 'B', text: 'descriptivo y narrativo.' },
      { key: 'C', text: 'argumentativo y descriptivo.' },
      { key: 'D', text: 'narrativo y expositivo.' },
    ],
    correctAnswer: 'A',
    explanation: 'Presenta datos e información técnica (expositivo) fundamentando los efectos sobre la convivencia y el bienestar (argumentativo).',
  },

  // Lectura 4: Poema del amor pasajero (26-32)
  {
    id: 'paa_p1_q26',
    part: 1,
    partName: 'Lectura',
    number: 26,
    instructions: 'Los ejercicios del 26 al 32 se basan en el siguiente texto poético sobre la vida y el amor.',
    passage: {
      title: 'El amor pasajero y el otoño de la vida',
      text: `Cuando mi pensamiento va hacia ti, se perfuma;
tu mirar es tan dulce, que se torna profundo.
Bajo tus pies desnudos aún hay blancor de espuma,
y en tus labios compendias la alegría del mundo.

El amor pasajero tiene el encanto breve,
y ofrece un igual término para el gozo y la pena.
Hace una hora que un nombre grabé sobre la nieve;
hace un minuto dije mi amor sobre la arena.

Las hojas amarillas caen en la alameda,
en donde vagan tantas parejas amorosas.
Y en la copa de otoño un vago vino queda
en que han de deshojarse, primavera, tus rosas.`
    },
    prompt: 'En el texto, la expresión “Cuando mi pensamiento va hacia ti, se perfuma;” (verso 1) es un ejemplo de',
    options: [
      { key: 'A', text: 'símil.' },
      { key: 'B', text: 'hipérbole.' },
      { key: 'C', text: 'personificación.' },
      { key: 'D', text: 'metáfora.' },
    ],
    correctAnswer: 'C',
    explanation: 'Se atribuye al concepto abstracto del pensamiento una cualidad sensorial propia de las flores o entidades físicas (perfumarse).',
  },
  {
    id: 'paa_p1_q27',
    part: 1,
    partName: 'Lectura',
    number: 27,
    prompt: 'En el texto, la expresión “se torna” (verso 2) significa',
    options: [
      { key: 'A', text: 'se siente.' },
      { key: 'B', text: 'se da la vuelta.' },
      { key: 'C', text: 'se gira.' },
      { key: 'D', text: 'se vuelve.' },
    ],
    correctAnswer: 'D',
    explanation: '«Tornarse» significa transformarse o volverse de cierta manera («se vuelve profundo»).',
  },
  {
    id: 'paa_p1_q28',
    part: 1,
    partName: 'Lectura',
    number: 28,
    prompt: 'Según el texto, la expresión “tu mirar es tan dulce, que se torna profundo” (verso 2) se conoce como',
    options: [
      { key: 'A', text: 'sinestesia.' },
      { key: 'B', text: 'personificación.' },
      { key: 'C', text: 'símil.' },
      { key: 'D', text: 'hipérbole.' },
    ],
    correctAnswer: 'A',
    explanation: 'Asocia el sentido de la vista («tu mirar») con el del gusto («dulce»), lo cual constituye una sinestesia.',
  },
  {
    id: 'paa_p1_q29',
    part: 1,
    partName: 'Lectura',
    number: 29,
    prompt: 'En el texto, la expresión “compendias” (verso 4) significa',
    options: [
      { key: 'A', text: 'comprendes.' },
      { key: 'B', text: 'guardas.' },
      { key: 'C', text: 'resumes.' },
      { key: 'D', text: 'encierras.' },
    ],
    correctAnswer: 'C',
    explanation: 'Compendiar es sintetizar o resumir en breve espacio o expresión.',
  },
  {
    id: 'paa_p1_q30',
    part: 1,
    partName: 'Lectura',
    number: 30,
    prompt: 'El tema principal del texto es',
    options: [
      { key: 'A', text: 'la tristeza ante la llegada del otoño.' },
      { key: 'B', text: 'lo efímero del amor y de la vida.' },
      { key: 'C', text: 'la belleza eterna de la primavera.' },
      { key: 'D', text: 'el amor fuente de tristeza y alegría.' },
    ],
    correctAnswer: 'B',
    explanation: 'El poema resalta la brevedad del amor pasajero grabado en la nieve y la arena, y el paso irremediable del tiempo.',
  },
  {
    id: 'paa_p1_q31',
    part: 1,
    partName: 'Lectura',
    number: 31,
    prompt: '¿Cuál opción evidencia MEJOR la respuesta del ejercicio anterior?',
    options: [
      { key: 'A', text: 'Versos 1-2 (“Cuando mi pensamiento... se torna profundo”)' },
      { key: 'B', text: 'Versos 3-4 (“Bajo tus pies... del mundo”)' },
      { key: 'C', text: 'Versos 5-8 (“El amor pasajero... sobre la arena”)' },
      { key: 'D', text: 'Versos 9-12 (“Las hojas amarillas... tus rosas”)' },
    ],
    correctAnswer: 'C',
    explanation: 'Los versos 5 al 8 explicitan «El amor pasajero tiene el encanto breve... sobre la nieve... sobre la arena».',
  },
  {
    id: 'paa_p1_q32',
    part: 1,
    partName: 'Lectura',
    number: 32,
    prompt: '¿De qué está compuesto el texto?',
    options: [
      { key: 'A', text: 'Versos y estrofas' },
      { key: 'B', text: 'Líneas y versos' },
      { key: 'C', text: 'Párrafos y líneas' },
      { key: 'D', text: 'Estrofas y párrafos' },
    ],
    correctAnswer: 'A',
    explanation: 'Es una composición lírica estructurada formalmente en versos agrupados en estrofas.',
  },

  // Lectura 5: Lecturas A y B sobre Matemáticas y Arte (33-45)
  {
    id: 'paa_p1_q33',
    part: 1,
    partName: 'Lectura',
    number: 33,
    instructions: 'Los ejercicios del 33 al 45 se basan en las dos lecturas comparativas (Lectura A y Lectura B) sobre las matemáticas y las artes.',
    passage: {
      title: 'Matemáticas y Artes: Belleza, Neurociencia y Creación',
      text: `Lectura A:
Durante siglos se ha debatido sobre el lugar que ocupan las matemáticas con respecto a las artes y las ciencias. Para los antiguos griegos, las artes y las matemáticas estaban estrechamente unidas. Siglos después, Galileo Galilei afirmaba que el libro de la naturaleza está escrito en símbolos matemáticos. Y es que, en el Renacimiento, las matemáticas eran el principal fundamento del ideal de belleza plasmada en el arte. Un gran artista de este periodo, Giotto, logró la perfección artística a partir de postulados matemáticos.
Hoy en día, este debate sigue vivo. Hay matemáticos que sostienen que las matemáticas por su precisión y exactitud solo pertenecen al ámbito de las ciencias. Otros, sin embargo, las consideran mucho más que una ciencia, pues, aunque vinculadas al origen y desarrollo del pensamiento científico, están presentes en todas las creaciones artísticas.
Así lo sostiene el matemático y profesor honorario de la Universidad de Edimburgo Michael Atiyah, quien explica que, en la dicotomía tradicional entre ciencias y artes, hay que situar las matemáticas entre ambas, ya que tienen en común la necesidad humana de dar sentido al universo. Según él, es la arquitectura la disciplina que mejor puede compararse con las matemáticas, pues en ella se manifiesta la belleza en todos sus niveles y funciones.
Por otro lado, el también matemático Pablo Amster argumenta que las matemáticas tienen más de arte que de ciencia, pues es el proceso creativo, es decir, el arte, fundamental en la construcción de distintos universos matemáticos. Afirma que la matemática es una parte importante porque está en la estructura del pensamiento humano y del lenguaje. Cita como ejemplo a Mozart quien manejaba inconscientemente conceptos matemáticos muy abstractos. Al estudiar su obra se descubre la relación que guarda con las matemáticas, como el número Pi, las homotecias y la combinatoria. En definitiva, cuando se comprenden bien las matemáticas, según Rusell, no solamente se puede acceder a la verdad, sino también a la belleza suprema.

Lectura B:
Siempre ha resultado difícil definir la belleza, pero, desde la época de Platón, la dotamos de una cualidad especial, casi externa a la de los individuos que la experimentan. Sin embargo, ese placer que experimentamos al contemplar la belleza es puramente psicológico. La variedad de objetos, personas o situaciones que encontramos bellos es muy amplia. Incluso, en determinados contextos podemos considerar bellas situaciones tristes o dolorosas; pues no siempre la belleza está ligada a la felicidad o a la alegría.
Quizás no pueda parecer bella una partida de ajedrez o una ecuación matemática. Para los que estamos inmersos en el mundo de las matemáticas, encontramos unas ecuaciones más bellas que otras. Algún físico famoso se dejó llevar por consideraciones estéticas para lograr expresar una teoría con fórmulas matemáticas.
Semir Zeki y sus colaboradores, de University College en Londres, se propusieron medir la percepción de la belleza mediante un sistema de resonancia magnética nuclear funcional. Al parecer, la actividad cerebral de un matemático mientras contempla fórmulas y ecuaciones es muy similar a la de cualquier persona ante la obra de un gran pintor o de quien escucha una pieza musical.
Estos investigadores sometieron a 16 matemáticos a una prueba para calificar la belleza de 60 ecuaciones matemáticas. Repitieron esta prueba dos semanas después con un sistema de resonancia magnética nuclear funcional para registrar la actividad cerebral. Así pudieron comprobar que cuanto más bella les resultaba una ecuación matemática a los participantes, más activo estaba el campo A1 de la corteza orbitofrontal media, región cerebral asociada con las emociones. En estudios previos, ya se había demostrado que el campo A1 está relacionado con las respuestas emocionales a la belleza visual o auditiva.`
    },
    prompt: 'En la lectura A, la palabra “fundamento” (línea 7) significa',
    options: [
      { key: 'A', text: 'base.' },
      { key: 'B', text: 'apoyo.' },
      { key: 'C', text: 'teoría.' },
      { key: 'D', text: 'explicación.' },
    ],
    correctAnswer: 'A',
    explanation: 'En el contexto del Renacimiento, las matemáticas eran la base angular sobre la que se cimentaba el ideal de proporción y belleza.',
  },
  {
    id: 'paa_p1_q34',
    part: 1,
    partName: 'Lectura',
    number: 34,
    prompt: 'En la lectura A, la palabra “sostiene” (línea 18) se refiere a',
    options: [
      { key: 'A', text: 'apoyar.' },
      { key: 'B', text: 'tolerar.' },
      { key: 'C', text: 'probar.' },
      { key: 'D', text: 'defender.' },
    ],
    correctAnswer: 'D',
    explanation: 'Sostener una tesis o argumento equivale a defender una postura académica o intelectual.',
  },
  {
    id: 'paa_p1_q35',
    part: 1,
    partName: 'Lectura',
    number: 35,
    prompt: 'De la lectura A se INFIERE que las matemáticas',
    options: [
      { key: 'A', text: 'están relacionadas con la creación musical.' },
      { key: 'B', text: 'están presentes en las ciencias y en las artes.' },
      { key: 'C', text: 'se manifiestan especialmente en la arquitectura.' },
      { key: 'D', text: 'permiten el estudio exacto de la naturaleza.' },
    ],
    correctAnswer: 'B',
    explanation: 'La lectura A fundamenta que las matemáticas trascienden la ciencia tradicional y se articulan de modo inseparable con las artes.',
  },
  {
    id: 'paa_p1_q36',
    part: 1,
    partName: 'Lectura',
    number: 36,
    prompt: '¿Qué opción evidencia MEJOR la respuesta del ejercicio anterior?',
    options: [
      { key: 'A', text: 'Líneas 4-6 (“Siglos después... matemáticos”)' },
      { key: 'B', text: 'Líneas 23-26 (“Según él... funciones”)' },
      { key: 'C', text: 'Líneas 33-38 (“Cita... probabilidades”)' },
      { key: 'D', text: 'Líneas 39-41 (“En definitiva... belleza suprema”)' },
    ],
    correctAnswer: 'D',
    explanation: 'El cierre de Russell resume que comprendiendo las matemáticas se accede tanto a la verdad científica como a la belleza estética suprema.',
  },
  {
    id: 'paa_p1_q37',
    part: 1,
    partName: 'Lectura',
    number: 37,
    prompt: '¿Cuál de las siguientes opciones resume MEJOR la lectura A?',
    options: [
      { key: 'A', text: 'La idea griega de belleza' },
      { key: 'B', text: 'Las matemáticas en el Renacimiento' },
      { key: 'C', text: 'La relación entre las matemáticas y las artes' },
      { key: 'D', text: 'El sentido del universo' },
    ],
    correctAnswer: 'C',
    explanation: 'Todo el ensayo explora el debate histórico y contemporáneo sobre el puente entre la matemática y las distintas manifestaciones del arte.',
  },
  {
    id: 'paa_p1_q38',
    part: 1,
    partName: 'Lectura',
    number: 38,
    prompt: '¿Cuál de las opciones NO aparece en la lectura B?',
    options: [
      { key: 'A', text: 'Se puede apreciar la belleza tanto en situaciones tristes como alegres.' },
      { key: 'B', text: 'Es imposible medir la percepción de la belleza porque es subjetiva.' },
      { key: 'C', text: 'Para los matemáticos las fórmulas y ecuaciones presentan distinta belleza.' },
      { key: 'D', text: 'Contemplar un objeto bello activa el campo A1 de la corteza orbitofrontal media.' },
    ],
    correctAnswer: 'B',
    explanation: 'La opción B contradice la lectura: Semir Zeki sí demostró que es posible medir la respuesta biológica cerebral a la belleza con resonancia magnética funcional.',
  },
  {
    id: 'paa_p1_q39',
    part: 1,
    partName: 'Lectura',
    number: 39,
    prompt: 'Según la lectura B, el placer que experimentamos al contemplar la belleza es',
    options: [
      { key: 'A', text: 'físico.' },
      { key: 'B', text: 'estético.' },
      { key: 'C', text: 'psicológico.' },
      { key: 'D', text: 'visual.' },
    ],
    correctAnswer: 'C',
    explanation: 'El texto afirma expresamente: «ese placer que experimentamos al contemplar la belleza es puramente psicológico».',
  },
  {
    id: 'paa_p1_q40',
    part: 1,
    partName: 'Lectura',
    number: 40,
    prompt: 'Según la lectura B, se puede INFERIR que la percepción de la belleza es',
    options: [
      { key: 'A', text: 'social.' },
      { key: 'B', text: 'científica.' },
      { key: 'C', text: 'subjetiva.' },
      { key: 'D', text: 'objetiva.' },
    ],
    correctAnswer: 'C',
    explanation: 'Depende de la experiencia interna del individuo y de cómo cada mente o cerebro procesa y califica las fórmulas o estímulos.',
  },
  {
    id: 'paa_p1_q41',
    part: 1,
    partName: 'Lectura',
    number: 41,
    prompt: 'En la lectura B, la palabra “dotamos” (línea 43) significa',
    options: [
      { key: 'A', text: 'destacar.' },
      { key: 'B', text: 'interpretar.' },
      { key: 'C', text: 'atribuir.' },
      { key: 'D', text: 'privar.' },
    ],
    correctAnswer: 'C',
    explanation: 'Dotar a algo de una cualidad significa concedérsela, adjudicársela o atribuírsela.',
  },
  {
    id: 'paa_p1_q42',
    part: 1,
    partName: 'Lectura',
    number: 42,
    prompt: 'En la lectura B, ¿cuál de las siguientes opciones NO tiene el mismo significado que el de la palabra “ligada” (línea 51)?',
    options: [
      { key: 'A', text: 'Unida' },
      { key: 'B', text: 'Vinculada' },
      { key: 'C', text: 'Relegada' },
      { key: 'D', text: 'Asociada' },
    ],
    correctAnswer: 'C',
    explanation: '«Relegada» significa apartada o pospuesta, lo cual es opuesto o ajeno a «ligada» (unida, vinculada, asociada).',
  },
  {
    id: 'paa_p1_q43',
    part: 1,
    partName: 'Lectura',
    number: 43,
    prompt: 'De las lecturas A y B se INFIERE que la',
    options: [
      { key: 'A', text: 'arquitectura combina el arte y las matemáticas.' },
      { key: 'B', text: 'belleza es un concepto aplicable a las matemáticas.' },
      { key: 'C', text: 'resonancia magnética sirve para medir la emoción ante la belleza.' },
      { key: 'D', text: 'relación entre una obra de arte y una ecuación matemática es imposible.' },
    ],
    correctAnswer: 'B',
    explanation: 'Ambos autores coinciden en que la belleza es una dimensión plenamente real y experimentable en el razonamiento matemático.',
  },
  {
    id: 'paa_p1_q44',
    part: 1,
    partName: 'Lectura',
    number: 44,
    prompt: 'En las lecturas A y B, se expresa que las matemáticas',
    options: [
      { key: 'A', text: 'están entre las ciencias y las artes.' },
      { key: 'B', text: 'se caracterizan por su precisión y exactitud.' },
      { key: 'C', text: 'determinan la belleza del mundo físico.' },
      { key: 'D', text: 'son la base de la arquitectura moderna.' },
    ],
    correctAnswer: 'A',
    explanation: 'Ambos textos abordan la naturaleza híbrida de la matemática como disciplina que comparte rigor científico con expresión y emoción artística.',
  },
  {
    id: 'paa_p1_q45',
    part: 1,
    partName: 'Lectura',
    number: 45,
    prompt: 'En las lecturas A y B, se recoge la opinión de',
    options: [
      { key: 'A', text: 'científicos.' },
      { key: 'B', text: 'psicólogos.' },
      { key: 'C', text: 'matemáticos.' },
      { key: 'D', text: 'filósofos.' },
    ],
    correctAnswer: 'C',
    explanation: 'Se citan directamente las vivencias y juicios de matemáticos como Atiyah, Amster y el grupo de matemáticos evaluados por neuroimagen.',
  },
];
