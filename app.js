// ==========================================================================
// PRAGA EN FAMILIA - LOGIC & OFFLINE DATA STORE
// ==========================================================================

const STORAGE_KEY = 'praga_familia_data_v6';

// Initial default data tailored for a family trip to Prague (25 Nov - 29 Nov 2026)
const defaultData = {
  trip: {
    title: 'Viaje a Praga con la Familia',
    dates: '25 Nov - 29 Nov 2026',
    organizer: {
      name: 'Ana Cristina Menjíbar',
      role: 'Organizadora de Viajes',
      phone: '+420 776 815 651',
      email: 'amenjibar@gmail.com'
    },
    hotel: {
      name: 'Large Historic Home by Charles Bridge & Parking',
      address: 'Vítězná 18, 118 00 Malá Strana, Praga, República Checa',
      phone: '+420 776 815 651',
      email: 'amenjibar@gmail.com',
      bookingRef: 'Booking: MQJZJj',
      bookingUrl: 'https://www.booking.com/Share-MQJZJj',
      price: '1.273,70 €',
      features: 'Apartamento entero (110 m²), 3 habitaciones, 2 baños',
      checkIn: 'Miércoles 25 de noviembre 2026',
      checkOut: 'Domingo 29 de noviembre 2026',
      notes: 'Casa histórica señorial en Malá Strana, a 12 min a pie del Puente de Carlos y a 1,6 km del Reloj Astronómico. Vistas al jardín, wifi gratis en todo el alojamiento y parking privado. Parada de tranvía en la puerta (L22 directa al Castillo).'
    },
    insurance: {
      provider: 'Heymondo (Viaje Tranquilidad)',
      underwriter: 'IMA Ibérica Asistencia',
      policyNo: '2605917',
      emergencyPhone: '+34 913 536 323',
      emergencyPhoneLink: 'tel:+34913536323',
      insuredCount: 7,
      dates: '25/11/2026 - 29/11/2026',
      destination: 'República Checa',
      policyHolder: 'Ana Cristina Mengíbar García (DNI: 08969596X)',
      totalCost: '133,70 €',
      airHelpPlusUrl: 'https://funnel.airhelp.com/claims/new/trip-details?lang=es&referrer=&partner=heymondo',
      coverages: [
        { label: 'Gastos Médicos por Enfermedad o Accidente', amount: 'Hasta 500.000 €' },
        { label: 'Repatriación y Traslado Sanitario', amount: 'Incluido 100%' },
        { label: 'Robo y Daños Materiales a Equipajes', amount: 'Hasta 2.000 €' },
        { label: 'Equipamiento Electrónico (Móviles/Cámaras)', amount: 'Hasta 1.000 €' },
        { label: 'Demora de Entrega de Equipaje (+10h)', amount: 'Hasta 200 €' },
        { label: 'Urgencias Odontológicas', amount: 'Hasta 150 €' },
        { label: 'Desplazamiento / Estancia Familiar en Hospital', amount: 'Hasta 1.200 € (80 €/día)' },
        { label: 'Convalecencia en Hotel por Enfermedad', amount: 'Hasta 1.200 € (80 €/día)' },
        { label: 'Interrupción de Viaje ya iniciado', amount: 'Hasta 1.500 €' },
        { label: 'Demora en Salida de Transporte', amount: 'Hasta 200 € (50 € / 6h)' },
        { label: 'Responsabilidad Civil Privada', amount: 'Hasta 60.000 €' },
        { label: 'Defensa Jurídica Penal en el Extranjero', amount: 'Hasta 3.000 €' },
        { label: 'Servicio AirHelp Plus (Reclamación de Vuelos)', amount: 'Indemnización de hasta 600 € por pasajero' }
      ]
    },
    passengers: [
      { name: 'Francisco José Cerrudo Menjíbar', dni: '53561599G', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Aroa Rodríguez González', dni: '53518788L', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Francisco José Cerrudo Alonso', dni: '08967327H', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Ana Cristina Mengíbar García', dni: '08969596X', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Álvaro Cerrudo Menjíbar', dni: '53561600M', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Lorena Abarca Subirón', dni: '18172581M', type: 'Adulto', baggage: '20 kg Facturado' },
      { name: 'Lizara Cerrudo Abarca', dni: '61751331B', type: 'Bebé', baggage: 'Bebé (2 piezas gratis: carrito + elevador)' }
    ],
    flights: {
      airline: 'Ryanair',
      bookingRef: 'B5Y4FQ',
      bookingEmail: 'fjcerrudo@gmail.com',
      outbound: {
        flightNo: 'FR2766',
        origCode: 'MAD',
        origName: 'Madrid (Barajas T1)',
        destCode: 'PRG',
        destName: 'Praga (Václav Havel T2)',
        date: 'Miércoles, 25 Nov',
        depTime: '17:35',
        arrTime: '20:25',
        duration: '2h 50m',
        seats: 'Asignación gratuita en check-in',
        terminal: 'T1 (Madrid) → T2 (Praga)',
        baggage: '6 x 20 kg facturados + 2 piezas bebé gratis'
      },
      inbound: {
        flightNo: 'FR3613',
        origCode: 'PRG',
        origName: 'Praga (Václav Havel T2)',
        destCode: 'MAD',
        destName: 'Madrid (Barajas T1)',
        date: 'Domingo, 29 Nov',
        depTime: '15:05',
        arrTime: '18:10',
        duration: '3h 05m',
        seats: 'Asignación gratuita en check-in',
        terminal: 'T2 (Praga) → T1 (Madrid)',
        baggage: '6 x 20 kg facturados + 2 piezas bebé gratis'
      },
      transfer: 'Monovolumen grande privado reservado para los 7: recogida en el aeropuerto de Praga el 25 Nov a la llegada del avión (20:25 hrs) hasta Vítězná 18, y recogida en el apartamento el 29 Nov a las 12:00 hrs hacia el aeropuerto. En Madrid: traslado en Uber (salida ~15:00 hacia Barajas T1).'
    },
    restaurants: [
      {
        id: 'r1',
        name: 'Lokál Dlouhááá',
        day: 'Jueves 26 Nov',
        time: '14:00 hrs',
        meal: 'Almuerzo / Comida',
        address: 'Dlouhá 33, 110 00 Staré Město, Chequia',
        mapsQuery: 'Lokal Dlouhaaa Prague',
        desc: 'Mítica cervecería y restaurante checo en la Ciudad Vieja (a 9 min de la Plaza Vieja). Cocina casera tradicional con ingredientes frescos de granjas locales y cerveza Pilsner Urquell de tanque recién tirada. Famoso por su goulash con knedlíky y queso frito.'
      },
      {
        id: 'r2',
        name: 'U Glaubiců',
        day: 'Viernes 27 Nov',
        time: '14:00 hrs',
        meal: 'Almuerzo / Comida',
        address: 'Malostranské nám. 266/5, Malá Strana, 118 00 Praha 1',
        mapsQuery: 'U Glaubicu Prague',
        desc: 'Histórica cervecería y restaurante en plena plaza de Malá Strana, con más de 700 años de tradición en bodegas y bóvedas góticas del siglo XVI. Platos checos contundentes a precios populares inmejorables en pleno casco monumental.'
      },
      {
        id: 'r3',
        name: 'Pork\'s Vodičkova',
        day: 'Sábado 28 Nov',
        time: '13:45 hrs',
        meal: 'Almuerzo / Comida',
        address: 'Vodičkova 17, 110 00 Nové Město, Czechia',
        mapsQuery: 'Porks Vodickova Prague',
        desc: 'Célebre en toda la ciudad por preparar el codillo asado de cerdo más crujiente y tierno de Praga. Ubicado junto a la Plaza de Wenceslao, con ambiente dinámico, alegre y perfecto para familias.'
      },
      {
        id: 'r4',
        name: 'U Tří jelínků',
        day: 'Sábado 28 Nov',
        time: '20:30 hrs',
        meal: 'Cena de Despedida',
        address: 'Nerudova 206/4, Hlavní město Praha 118 00, CZ',
        mapsQuery: 'U Tri jelinku Prague',
        desc: 'Restaurante con gran encanto ("Los Tres Ciervos") en la pintoresca calle Nerudova en Malá Strana. Ambiente acogedor con techos de madera y chimenea. Broche de oro gastronómico muy cerca de nuestro apartamento.'
      }
    ],
    tours: [
      {
        id: 't1',
        name: 'Torre Klementinum & Biblioteca Barroca',
        day: 'Jueves 26 Nov',
        time: '11:00 hrs',
        duration: '45 minutos',
        address: 'Mariánské nám. 5, 110 00 Staré Město',
        mapsQuery: 'Klementinum Prague',
        desc: 'Visita guiada en inglés que incluye la deslumbrante Biblioteca Barroca con sus globos terráqueos históricos, el Salón Meridiano y la subida a la Torre Astronómica con vistas 360° de Praga.',
        notes: 'Entrada reservada para las 11:00 hrs. Llegar 15 min antes a la taquilla.'
      },
      {
        id: 't2',
        name: 'Castillo de Praga (Catedral de San Vito, San Jorge y Callejón del Oro)',
        day: 'Viernes 27 Nov (Válida 27 y 28 Nov)',
        time: '09:00 - 15:00 hrs',
        duration: 'Visita a nuestro propio ritmo',
        address: 'Hradčany, 119 08 Praha 1',
        mapsQuery: 'Prague Castle',
        desc: 'Circuito completo por el interior de la colosal Catedral de San Vito, la románica Basílica de San Jorge y las casitas de colores del Callejón del Oro con armaduras medievales.',
        notes: 'Entradas reservadas con validez de 2 días. Audioguías descargadas previamente en los móviles.'
      },
      {
        id: 't3',
        name: 'Paseo en Barco por el Río Moldava (Iluminación & Encendido Navideño)',
        day: 'Sábado 28 Nov',
        time: '17:00 hrs',
        duration: '50-60 minutos',
        address: 'Muelle del Río Moldava (cerca del Puente de Carlos)',
        mapsQuery: 'Prague River Cruise Pier',
        desc: 'Recorrido en barco climatizado por el Moldava para disfrutar de la ciudad iluminada coincidiendo con la fiesta de inauguración oficial del encendido navideño de Praga.',
        notes: 'Entradas reservadas a las 17:00 hrs. Embarque cubierto y cómodo para toda la familia y niños.'
      }
    ],
    transfers: [
      {
        id: 'tr1',
        title: 'Traslado Aeropuerto PRG → Apartamento (Vítězná 18)',
        type: 'Monovolumen grande privado (7 plazas + maletas)',
        date: 'Miércoles, 25 Nov 2026',
        time: '20:25 hrs (a la llegada del vuelo)',
        origin: 'Aeropuerto Václav Havel (T2)',
        destination: 'Vítězná 18, 118 00 Malá Strana, Praga',
        desc: 'Chofer privado esperándonos a la salida del vuelo FR2766 tras aterrizar a las 20:25 hrs para llevarnos directos al apartamento sin escaleras ni transbordos de transporte público.'
      },
      {
        id: 'tr2',
        title: 'Traslado Apartamento (Vítězná 18) → Aeropuerto PRG',
        type: 'Monovolumen grande privado (7 plazas + maletas)',
        date: 'Domingo, 29 Nov 2026',
        time: '12:00 hrs (recogida en la puerta)',
        origin: 'Vítězná 18, 118 00 Malá Strana, Praga',
        destination: 'Aeropuerto Václav Havel (T2)',
        desc: 'Recogida con tiempo holgado para llegar al aeropuerto sobre las 12:45 hrs y facturar las 6 maletas con calma para el vuelo de las 15:05 hrs.'
      },
      {
        id: 'tr3',
        title: 'Traslados en Madrid (Casa ↔ Aeropuerto Barajas T1)',
        type: 'Uber / Vehículo espacioso',
        date: '25 Nov (Ida) & 29 Nov (Vuelta)',
        time: 'Ida: 15:00 hrs | Vuelta: 18:45 hrs',
        origin: 'Domicilio familiar en Madrid',
        destination: 'Aeropuerto Adolfo Suárez Madrid-Barajas T1',
        desc: 'Contratación de Uber para trasladarnos cómodamente desde casa al aeropuerto en Madrid (salida ~15:00 hrs para vuelo de las 17:35) y de vuelta a la llegada.'
      }
    ],
    exchangeRate: 25.20
  },
  currentDay: 1,
  itinerary: [
    // ========================================================================
    // DÍA 1: Miércoles 25 de noviembre - Llegada & Acomodación
    // ========================================================================
    {
      id: 'd1-1',
      day: 1,
      time: '17:35',
      title: 'Vuelo de Ida: Madrid (MAD) → Praga (PRG)',
      czechName: 'Letiště Václava Havla Praha',
      desc: 'Salida en vuelo directo de Ryanair FR2766 desde la Terminal 1 de Madrid Barajas a las 17:35 hrs. Llegada prevista a la Terminal 2 de Praga Václav Havel a las 20:25 hrs.',
      familyTip: 'Tener a mano las tarjetas de embarque en la app. Los carritos de bebé se entregan en la propia puerta del avión al embarcar.',
      coords: '50.1008,14.2600',
      mapsQuery: 'Vaclav Havel Airport Prague',
      completed: false
    },
    {
      id: 'd1-2',
      day: 1,
      time: '20:55',
      title: '🚐 Traslado en Monovolumen Grande al Apartamento',
      czechName: 'Transfer z letiště do Malé Strany',
      desc: 'Monovolumen grande privado reservado esperándonos a la salida de la terminal (tras aterrizar a las 20:25 hrs) para llevarnos directos y cómodos con los 7 viajeros, maletas y carrito hasta nuestro apartamento en Vítězná 18.',
      familyTip: 'Traslado directo sin transbordos de metro ni maletas a cuestas, ideal tras el viaje en avión con el bebé.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },
    {
      id: 'd1-3',
      day: 1,
      time: '21:35',
      title: 'Llegada y Check-in en el Apartamento',
      czechName: 'Large Historic Home by Charles Bridge & Parking',
      desc: 'Instalación en la casa histórica de 110 m² (3 habitaciones, 2 baños). Reparto de dormitorios, acomodación y descanso inicial.',
      familyTip: 'Conectar todos los móviles al wifi gratuito del alojamiento para descargar mapas offline y audioguías.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },
    {
      id: 'd1-4',
      day: 1,
      time: '22:00',
      title: 'Compra en Mini Market local',
      czechName: 'Nákup potravin (Mini Market)',
      desc: 'Paseo corto (a 9 minutos a pie del apartamento) para comprar provisiones de desayunos, leche, agua, fruta y cena relajada en el apartamento.',
      familyTip: 'El apartamento dispone de cocina completa, perfecta para preparar desayunos calientes para todos antes de salir cada mañana.',
      coords: '50.0816,14.4045',
      mapsQuery: 'Mini market Vitezna Mala Strana Prague',
      completed: false
    },

    // ========================================================================
    // DÍA 2: Jueves 26 de noviembre - Klementinum, Ciudad Vieja, Lokál & Barrio Judío
    // ========================================================================
    {
      id: 'd2-1',
      day: 2,
      time: '09:30',
      title: 'Paseo matutino cruzando el Puente de Carlos',
      czechName: 'Karlův most',
      desc: 'Desayunamos en el apartamento y salimos andando hacia el histórico Puente de Carlos (a 13 min a pie). Lo cruzamos con calma sobre el río Moldava hacia la Ciudad Vieja.',
      familyTip: 'A primera hora de la mañana el puente tiene menos afluencia, ideal para fotos familiares con las 30 estatuas y vistas al castillo.',
      coords: '50.0865,14.4114',
      mapsQuery: 'Charles Bridge Prague',
      completed: false
    },
    {
      id: 'd2-2',
      day: 2,
      time: '11:00',
      title: '🎟️ Visita Guiada Reservada: Torre Klementinum',
      czechName: 'Klementinum & Barokní knihovna',
      desc: '¡Entrada reservada a las 11:00 hrs! Visita guiada en inglés (~45 min) por una de las bibliotecas más bellas del planeta. Incluye la deslumbrante Biblioteca Barroca con sus globos terráqueos históricos, el Salón Meridiano y la Torre Astronómica con panorámica de 360°.',
      familyTip: 'Llegar 15 minutos antes a la taquilla de Klementinum. La torre tiene tramo de escaleras históricas de madera al final.',
      coords: '50.0866,14.4160',
      mapsQuery: 'Klementinum Prague',
      completed: false
    },
    {
      id: 'd2-3',
      day: 2,
      time: '12:15',
      title: 'Paseo por Calle Karlova y Calle Celetná a la Torre de la Pólvora',
      czechName: 'Karlova ulice & Prašná brána',
      desc: 'Paseo por la Calle Karlova, una de las más antiguas de Praga, y la Calle Celetná (antiguo Camino Real flanqueado por casas señoriales) hasta la monumental Torre gótica de la Pólvora.',
      familyTip: 'Recorrido peatonal muy agradable. En los pasajes hay tiendas de juguetes y figuras checas tradicionales.',
      coords: '50.0872,14.4278',
      mapsQuery: 'Powder Tower Prague',
      completed: false
    },
    {
      id: 'd2-4',
      day: 2,
      time: '13:15',
      title: 'Plaza de la Ciudad Vieja y Souvenirs de Cristal y Madera',
      czechName: 'Staroměstské náměstí & Pražský orloj',
      desc: 'Paseo por la Plaza de la Ciudad Vieja y sus callejuelas medievales, repletas de tiendas de souvenirs con las famosas marionetas de madera artesanales y el célebre cristal de Bohemia.',
      familyTip: 'A los niños les fascina ver las marionetas con hilos expuestas en los escaparates.',
      coords: '50.0870,14.4208',
      mapsQuery: 'Old Town Square Prague',
      completed: false
    },
    {
      id: 'd2-5',
      day: 2,
      time: '14:00',
      title: '🍽️ Comida Reservada: Restaurante Lokál Dlouhááá',
      czechName: 'Restaurace Lokál Dlouhááá',
      desc: '¡Mesa reservada a las 14:00 hrs! Ubicado en Dlouhá 33 (a solo 9 min a pie desde la Plaza Vieja). Cervecería y restaurante icónico de auténtica cocina casera checa fresca (goulash con knedlíky, queso frito smažený sýr y la mejor cerveza Pilsner recién tirada).',
      familyTip: 'Local amplio, dinámico y muy acogedor con familias. La comida se sirve con rapidez y la calidad es excepcional.',
      coords: '50.0906,14.4258',
      mapsQuery: 'Lokal Dlouhaaa Prague',
      completed: false
    },
    {
      id: 'd2-6',
      day: 2,
      time: '15:45',
      title: 'Mercado Navideño en la Plaza de la República',
      czechName: 'Náměstí Republiky & Vánoční trhy',
      desc: 'A solo 7 minutos caminando desde el restaurante. Primer contacto con los mágicos mercadillos de Navidad checos: casetas de madera, adornos artesanales, dulces trdelník y ambiente festivo.',
      familyTip: 'Justo al lado está el centro comercial Palladium por si alguien necesita baños cómodos con cambiador o algo de abrigo.',
      coords: '50.0886,14.4293',
      mapsQuery: 'Namesti Republiky Prague',
      completed: false
    },
    {
      id: 'd2-7',
      day: 2,
      time: '16:30',
      title: 'Barrio Judío (Josefov) y Sinagogas Históricas',
      czechName: 'Židovské město Josefov',
      desc: 'A 15 minutos a pie desde Plaza de la República. Paseo tranquilo por las calles del barrio judío descubriendo sus seis sinagogas, en especial la Sinagoga Vieja-Nueva (siglo XIII) y la Sinagoga Española, con decoración dorada inspirada en la Alhambra.',
      familyTip: 'Zona peatonal llana y muy tranquila para pasear cómodamente con el carrito de bebé al caer la tarde.',
      coords: '50.0903,14.4194',
      mapsQuery: 'Spanish Synagogue Prague',
      completed: false
    },
    {
      id: 'd2-8',
      day: 2,
      time: '18:30',
      title: 'Regreso a Malá Strana y Cena relajada',
      czechName: 'Návrat na Malou Stranu',
      desc: 'Paseo de vuelta cruzando el río Moldava hacia Malá Strana (~20 min a pie). Cena en los alrededores de nuestro barrio o cena tranquila en el apartamento para descansar tras un día lleno de visitas.',
      familyTip: 'Cruzad por el puente Mánesův para contemplar el Castillo de Praga y el Puente de Carlos iluminados de noche.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },

    // ========================================================================
    // DÍA 3: Viernes 27 de noviembre - Castillo de Praga, U Glaubiců & Malá Strana
    // ========================================================================
    {
      id: 'd3-1',
      day: 3,
      time: '09:30',
      title: 'Subida al Castillo de Praga (Tranvía 22 o a pie)',
      czechName: 'Cesta na Pražský hrad (Tramvaj 22)',
      desc: 'Salida hacia la colina del Castillo. Dos alternativas: caminar 2 minutos hasta la parada de Malostranské náměstí / Újezd y tomar el tranvía 22 directo hasta la parada Pražský hrad (opción muy cómoda para evitar la cuesta con el carro de bebé), o subir caminando por la histórica calle Nerudova (25 min de subida adoquinada).',
      familyTip: '¡Con el carrito de bebé, tomad el tranvía 22! Os deja en llano justo en la puerta norte del castillo, haciendo toda la visita en suave bajada.',
      coords: '50.0924,14.3989',
      mapsQuery: 'Prazsky hrad tram stop Prague',
      completed: false
    },
    {
      id: 'd3-2',
      day: 3,
      time: '10:00',
      title: '🎟️ Visita Reservada: Castillo de Praga, San Vito y Callejón del Oro',
      czechName: 'Pražský hrad, Katedrála sv. Víta & Zlatá ulička',
      desc: '¡Entradas reservadas (válidas para 27 y 28 nov de 9:00 a 15:00 hrs) y audioguías descargadas en los móviles! Visita al complejo monumental más grande del mundo: la colosal Catedral de San Vito y sus vidrieras de Mucha, las casitas de cuento del Callejón del Oro y la Basílica románica de San Jorge.',
      familyTip: 'El Callejón del Oro fascina a los pequeños con sus diminutas armaduras medievales y la casita de Franz Kafka (nº 22).',
      coords: '50.0909,14.4005',
      mapsQuery: 'Prague Castle',
      completed: false
    },
    {
      id: 'd3-3',
      day: 3,
      time: '14:00',
      title: '🍽️ Comida Reservada: Restaurante U Glaubiců',
      czechName: 'Restaurace U Glaubiců',
      desc: '¡Mesa reservada a las 14:00 hrs! Bajamos hacia la Plaza de Malá Strana (Malostranské náměstí 266/5). Histórica cervecería y restaurante fundado en el siglo XVI con más de 700 años de historia y bóvedas góticas. Famoso por su auténtica comida checa y precios populares.',
      familyTip: 'Ambiente muy espacioso en las salas abovedadas, ideal para reponer fuerzas en familia con los niños.',
      coords: '50.0883,14.4042',
      mapsQuery: 'U Glaubicu Prague',
      completed: false
    },
    {
      id: 'd3-4',
      day: 3,
      time: '15:45',
      title: 'Paseo por Malá Strana, Calle Nerudova y San Nicolás',
      czechName: 'Malostranské náměstí & Kostel sv. Mikuláše',
      desc: 'Exploración de Malá Strana: la Plaza Pequeña presidida por la majestuosa Iglesia barroca de San Nicolás y la Columna de la Peste, y la famosa Calle Nerudova con sus casas históricas decoradas con antiguos emblemas (como la casa nº 47 de Jan Neruda).',
      familyTip: 'Jugar con los niños a buscar los emblemas en las fachadas: Los Dos Soles, El León Rojo, El Cisne Blanco...',
      coords: '50.0881,14.4024',
      mapsQuery: 'St Nicholas Church Mala Strana Prague',
      completed: false
    },
    {
      id: 'd3-5',
      day: 3,
      time: '17:15',
      title: 'Muro de John Lennon y paseo por la Isla de Kampa',
      czechName: 'Lennonova zeď & Ostrov Kampa',
      desc: 'Paseo por el colorido y fotogénico Muro de John Lennon, lleno de grafitis y símbolos de paz, seguido de un relajante paseo por el parque de la Isla de Kampa, bordeando el canal Čertovka (la Pequeña Venecia de Praga).',
      familyTip: 'La Isla de Kampa es llana, peatonal y tiene zonas de césped y bancos muy tranquilos junto al agua para que los niños jueguen.',
      coords: '50.0862,14.4069',
      mapsQuery: 'Lennon Wall Prague',
      completed: false
    },

    // ========================================================================
    // DÍA 4: Sábado 28 de noviembre - Ciudad Nueva, Pork's, Barco & U Tří jelínků
    // ========================================================================
    {
      id: 'd4-1',
      day: 4,
      time: '10:00',
      title: 'Ciudad Nueva: La Casa Danzante (Ginger & Fred)',
      czechName: 'Tančící dům (Nové Město)',
      desc: 'Comenzamos el día en la Ciudad Nueva bordeando el río Moldava para admirar el célebre edificio vanguardista diseñado por Frank Gehry y Vlado Milunić que simula una pareja en pleno baile.',
      familyTip: '¡Momento foto divertida! Colocarse desde la acera de enfrente simulando empujar o sostener la fachada inclinada.',
      coords: '50.0754,14.4141',
      mapsQuery: 'Dancing House Prague',
      completed: false
    },
    {
      id: 'd4-2',
      day: 4,
      time: '11:15',
      title: 'Cabeza Giratoria de Franz Kafka',
      czechName: 'Hlava Franze Kafky',
      desc: 'Sorprendente escultura cinética gigante de David Černý compuesta por 42 placas de acero inoxidable que rotan de forma hipnótica y continua sobre sí mismas.',
      familyTip: 'A los niños les hipnotiza ver girar las capas del rostro y buscar su propio reflejo metálico.',
      coords: '50.0815,14.4206',
      mapsQuery: 'Franz Kafka Statue Charvatova Prague',
      completed: false
    },
    {
      id: 'd4-3',
      day: 4,
      time: '12:00',
      title: 'Plaza de Wenceslao, Museo Nacional y Mercado Navideño',
      czechName: 'Václavské náměstí & Národní muzeum',
      desc: 'Paseo por el corazón comercial e histórico de Praga: la gran avenida de Wenceslao presidida por la estatua ecuestre y el imponente Museo Nacional neorrenacentista, ambientada con mercadillo navideño.',
      familyTip: 'Ambiente navideño animado. Muy cerca está la juguetería Hamleys con carrusel si se quiere hacer una parada sorpresa para los peques.',
      coords: '50.0813,14.4277',
      mapsQuery: 'Wenceslas Square Prague',
      completed: false
    },
    {
      id: 'd4-4',
      day: 4,
      time: '13:45',
      title: '🍽️ Comida Reservada: Restaurante Pork\'s Vodičkova',
      czechName: 'Restaurace Pork\'s Vodičkova',
      desc: '¡Mesa reservada a las 13:45 hrs! Situado en Vodičkova 17 (a dos pasos de la Plaza de Wenceslao). Local moderno y aclamado, famoso en toda Praga por servir el mejor codillo de cerdo asado super crujiente por fuera y tierno por dentro, además de excelentes opciones checas.',
      familyTip: 'El codillo es enorme, ideal para pedir al centro y compartir entre varios con mostaza y rábano picante.',
      coords: '50.0799,14.4239',
      mapsQuery: 'Porks Vodickova Prague',
      completed: false
    },
    {
      id: 'd4-5',
      day: 4,
      time: '17:00',
      title: '🎟️ Paseo en Barco Reservado por el Río Moldava (Iluminación Navideña)',
      czechName: 'Plavba lodí po Vltavě (Slavnostní osvětlení)',
      desc: '¡Entradas reservadas a las 17:00 hrs! Travesía en barco cubierta y climatizada por el río Moldava. Hoy es el gran día de la inauguración oficial del encendido navideño de Praga, por lo que contemplaremos los puentes y monumentos iluminados reflejándose en las aguas del río.',
      familyTip: 'Barco cerrado y con calefacción. Plan super relajante para descansar los pies tras caminar, tomar un chocolate caliente a bordo y disfrutar de las vistas.',
      coords: '50.0883,14.4137',
      mapsQuery: 'Prague River Cruise Pier',
      completed: false
    },
    {
      id: 'd4-6',
      day: 4,
      time: '18:30',
      title: 'Encendido del Gran Árbol de Navidad en la Plaza Vieja',
      czechName: 'Rozsvícení vánočního stromu na Staroměstském náměstí',
      desc: 'Paseo hasta la Plaza de la Ciudad Vieja para admirar el gigantesco árbol de Navidad de Praga recién iluminado con miles de luces y música, junto a los puestos de artesanía y repostería.',
      familyTip: 'Es uno de los momentos más mágicos del viaje. Mantened a los niños bien cerquita o en el carro por las aglomeraciones festivas.',
      coords: '50.0870,14.4208',
      mapsQuery: 'Old Town Square Christmas Tree Prague',
      completed: false
    },
    {
      id: 'd4-7',
      day: 4,
      time: '20:30',
      title: '🍽️ Cena Reservada: Restaurante U Tří jelínků',
      czechName: 'Restaurace U Tří jelínků',
      desc: '¡Mesa reservada a las 20:30 hrs! Ubicado en la calle Nerudova 206/4, en Malá Strana. Acogedor y elegante restaurante tradicional de comida checa e internacional ("Los Tres Ciervos") en un edificio histórico con techos de madera y chimenea. Broche de oro para el último sábado.',
      familyTip: 'A pocos minutos a pie de nuestro apartamento en Malá Strana, por lo que tras cenar estaremos al lado de casa para que los niños duerman tranquilamente.',
      coords: '50.0886,14.4007',
      mapsQuery: 'U Tri jelinku Prague',
      completed: false
    },

    // ========================================================================
    // DÍA 5: Domingo 29 de noviembre - Despedida, Traslado & Vuelo a Madrid
    // ========================================================================
    {
      id: 'd5-1',
      day: 5,
      time: '09:30',
      title: 'Desayuno familiar y preparación de equipaje',
      czechName: 'Poslední snídaně a balení',
      desc: 'Desayunamos con tranquilidad en nuestro amplio apartamento de Vítězná 18, empaquetamos maletas y dejamos todo listo para el check-out.',
      familyTip: 'Repasar el checklist de la maleta en la app para asegurarse de no olvidar cargadores, peluches infantiles ni documentos.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },
    {
      id: 'd5-2',
      day: 5,
      time: '11:00',
      title: 'Último paseo y despedida de Malá Strana',
      czechName: 'Rozloučení s Malou Stranou',
      desc: 'Último paseo corto por los alrededores de Malá Strana o un café tranquilo junto al apartamento antes de la llegada del vehículo de recogida.',
      familyTip: 'Aprovechar para comprar los últimos recuerdos o snacks ligeros para el vuelo.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },
    {
      id: 'd5-3',
      day: 5,
      time: '12:00',
      title: '🚐 Recogida en Monovolumen Grande hacia el Aeropuerto',
      czechName: 'Transfer na letiště Václava Havla',
      desc: 'El monovolumen grande privado nos recoge en la puerta de Vítězná 18 a las 12:00 en punto para trasladar a los 7 viajeros y el equipaje cómodamente al aeropuerto Václav Havel (T2).',
      familyTip: 'Llegada prevista al aeropuerto sobre las 12:45 hrs, con 2h 20m de antelación holgada para facturar las 6 maletas y pasar el control de seguridad con el bebé sin prisas.',
      coords: '50.0816,14.4061',
      mapsQuery: 'Vítězná 18 Malá Strana Prague',
      completed: false
    },
    {
      id: 'd5-4',
      day: 5,
      time: '15:05',
      title: 'Vuelo de Regreso: Praga (PRG) → Madrid (MAD)',
      czechName: 'Let Ryanair FR3613 do Madridu',
      desc: 'Vuelo Ryanair FR3613 desde la Terminal 2 de Praga Václav Havel a las 15:05 hrs. Llegada prevista a Madrid Barajas T1 a las 18:10 hrs.',
      familyTip: 'Tener a mano juguetes y snacks para el entretenimiento de los pequeños durante las 3 horas de vuelo.',
      coords: '50.1008,14.2600',
      mapsQuery: 'Vaclav Havel Airport Prague',
      completed: false
    },
    {
      id: 'd5-5',
      day: 5,
      time: '18:45',
      title: 'Llegada a Madrid y Regreso a Casa en Uber',
      czechName: 'Přílet do Madridu a odvoz domů',
      desc: 'Recogida de equipajes facturados y traslado en Uber contratado desde la T1 de Barajas de vuelta a casa. ¡Fin de un viaje familiar inolvidable!',
      familyTip: 'Disfrutar recordando las mejores fotos y momentos vividos juntos en Praga.',
      coords: '40.4983,-3.5676',
      mapsQuery: 'Madrid Barajas Airport Terminal 1',
      completed: false
    }
  ],
  places: [
    // Restaurantes
    {
      name: 'Lokál Dlouhááá',
      cz: 'Lokál Dlouhááá',
      category: 'restaurant',
      tags: ['🍽️ Restaurante', 'Comida Tradicional', 'Pilsner Urquell'],
      desc: 'Famosa cervecería y restaurante checo en la Ciudad Vieja. Cocina casera con ingredientes frescos y cerveza de tanque recién tirada.',
      familyTip: 'Local amplio y muy tolerante con carritos y niños. Servicio muy rápido.',
      coords: '50.0906,14.4258',
      mapsQuery: 'Lokal Dlouhaaa'
    },
    {
      name: 'U Glaubiců',
      cz: 'Restaurace U Glaubiců',
      category: 'restaurant',
      tags: ['🍽️ Restaurante', 'Histórico', 'Malá Strana'],
      desc: 'Cervecería histórica en Malá Strana con más de 700 años de historia en bodegas abovedadas góticas. Precios populares.',
      familyTip: 'Salones espaciosos bajo tierra ideales para comer tranquilos tras visitar el castillo.',
      coords: '50.0883,14.4042',
      mapsQuery: 'U Glaubicu'
    },
    {
      name: 'Pork\'s Vodičkova',
      cz: 'Pork\'s Vodičkova',
      category: 'restaurant',
      tags: ['🍽️ Restaurante', 'Codillo Asado', 'Nové Město'],
      desc: 'Aclamado en toda Praga por su insuperable codillo de cerdo asado super crujiente y tierno. Muy cerca de Wenceslao.',
      familyTip: 'El codillo es enorme, idóneo para compartir al centro de la mesa con los niños.',
      coords: '50.0799,14.4239',
      mapsQuery: 'Porks Vodickova'
    },
    {
      name: 'U Tří jelínků',
      cz: 'U Tří jelínků (Los Tres Ciervos)',
      category: 'restaurant',
      tags: ['🍽️ Restaurante', 'Cena Especial', 'Malá Strana'],
      desc: 'Restaurante tradicional con encanto en la calle Nerudova con techos de madera y chimenea. A pasos de nuestro apartamento.',
      familyTip: 'Perfecto para una cena relajada al lado de casa la última noche.',
      coords: '50.0886,14.4007',
      mapsQuery: 'U Tri jelinku'
    },

    // Monumentos & Visitas
    {
      name: 'Torre Klementinum y Biblioteca Barroca',
      cz: 'Klementinum',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Visita Guiada', 'Vistas 360°'],
      desc: 'Una de las bibliotecas más impresionantes del mundo, Salón Meridiano y Torre Astronómica.',
      familyTip: 'Entrada reservada para el Jueves 26 a las 11:00 hrs.',
      coords: '50.0866,14.4160',
      mapsQuery: 'Klementinum'
    },
    {
      name: 'Puente de Carlos',
      cz: 'Karlův most',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Vistas', 'Paseo'],
      desc: 'El icono de Praga. Construido en 1357, flanqueado por 30 estatuas barrocas sobre el Moldava.',
      familyTip: 'Id temprano por la mañana o al atardecer para fotos familiares despejadas.',
      coords: '50.0865,14.4114',
      mapsQuery: 'Charles Bridge'
    },
    {
      name: 'Castillo de Praga y San Vito',
      cz: 'Pražský hrad',
      category: 'castle',
      tags: ['⭐ Imprescindible', '🏰 Castillo'],
      desc: 'El mayor complejo palaciego medieval del mundo. La Catedral de San Vito corta la respiración.',
      familyTip: 'Subir en el tranvía 22 directo a la parada Pražský hrad para evitar la cuesta con el carro de bebé.',
      coords: '50.0909,14.4005',
      mapsQuery: 'Prague Castle'
    },
    {
      name: 'Callejón del Oro',
      cz: 'Zlatá ulička',
      category: 'castle',
      tags: ['🏰 Castillo', 'Cuento', 'Niños'],
      desc: 'Calle diminuta empotrada en las murallas del castillo con casas de colores y armaduras medievales.',
      familyTip: 'A los pequeños les fascina ver las armaduras y las casitas diminutas de artesanos.',
      coords: '50.0919,14.4039',
      mapsQuery: 'Golden Lane Prague Castle'
    },
    {
      name: 'Reloj Astronómico y Plaza Vieja',
      cz: 'Staroměstský orloj',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Niños'],
      desc: 'Reloj astronómico medieval del año 1410 con desfile de apóstoles en cada hora.',
      familyTip: 'A los niños les encanta ver al esqueleto tocar la campana y cantar el gallo.',
      coords: '50.0870,14.4208',
      mapsQuery: 'Prague Astronomical Clock'
    },
    {
      name: 'Barrio Judío (Josefov) & Sinagoga Española',
      cz: 'Židovské město Josefov',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Historia', 'Paseo'],
      desc: 'Recorrido histórico por las seis sinagogas judías, destacando la Sinagoga Española inspirada en la Alhambra.',
      familyTip: 'Zona peatonal llana y muy tranquila para pasear cómodamente con el carro.',
      coords: '50.0903,14.4194',
      mapsQuery: 'Spanish Synagogue Prague'
    },
    {
      name: 'Paseo en Barco por el Río Moldava',
      cz: 'Plavba lodí po Vltavě',
      category: 'views',
      tags: ['🚢 Barco', 'Luces de Navidad', '👶 Ideal Niños'],
      desc: 'Travesía fluvial cubierta y climatizada viendo los puentes y monumentos iluminados.',
      familyTip: 'Entradas reservadas el Sábado 28 a las 17:00 hrs para ver el encendido navideño.',
      coords: '50.0883,14.4137',
      mapsQuery: 'Prague River Cruise Pier'
    },
    {
      name: 'La Casa Danzante (Ginger & Fred)',
      cz: 'Tančící dům',
      category: 'views',
      tags: ['Arquitectura', 'Río'],
      desc: 'Edificio vanguardista de Frank Gehry junto al río Moldava que simula una pareja bailando.',
      familyTip: 'Haceros una foto familiar haciendo poses divertidas como si empujarais la fachada.',
      coords: '50.0754,14.4141',
      mapsQuery: 'Dancing House'
    },
    {
      name: 'Cabeza Giratoria de Franz Kafka',
      cz: 'Hlava Franze Kafky',
      category: 'monument',
      tags: ['👶 Ideal Niños', 'Escultura', 'Arte'],
      desc: 'Escultura cinética monumental de David Černý con 42 bloques de espejo que rotan sin parar.',
      familyTip: 'A los niños les hipnotiza ver recomponerse las facciones del rostro.',
      coords: '50.0815,14.4206',
      mapsQuery: 'Franz Kafka Statue Charvatova Prague'
    },
    {
      name: 'Plaza de Wenceslao y Museo Nacional',
      cz: 'Václavské náměstí',
      category: 'monument',
      tags: ['Mercadillo Navideño', 'Historia'],
      desc: 'Gran avenida histórica con la estatua de San Wenceslao, el Museo Nacional y mercadillo navideño.',
      familyTip: 'Ambiente navideño con casetas de madera y luces.',
      coords: '50.0813,14.4277',
      mapsQuery: 'Wenceslas Square Prague'
    },
    {
      name: 'Muro de John Lennon',
      cz: 'Lennonova zeď',
      category: 'monument',
      tags: ['Música', 'Fotos', 'Arte'],
      desc: 'Símbolo de libertad y paz decorado con grafitis, letras de The Beatles y arte urbano.',
      familyTip: 'En el pequeño puente contiguo suele haber patos en el canal del molino.',
      coords: '50.0862,14.4069',
      mapsQuery: 'Lennon Wall'
    },
    {
      name: 'Isla de Kampa',
      cz: 'Ostrov Kampa',
      category: 'views',
      tags: ['Parque', 'Paseo', '👶 Ideal Niños'],
      desc: 'Isla fluvial con parques verdes, vistas al Puente de Carlos y el canal Čertovka.',
      familyTip: 'Zona llana y muy segura para que los niños caminen a sus anchas.',
      coords: '50.0862,14.4080',
      mapsQuery: 'Kampa Island Prague'
    },
    {
      name: 'Torre de la Pólvora y Calle Celetná',
      cz: 'Prašná brána',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Historia'],
      desc: 'Imponente puerta gótica medieval del siglo XV que marcaba el inicio del Camino Real.',
      familyTip: 'Al lado está la preciosa Casa Municipal y la entrada al casco histórico.',
      coords: '50.0872,14.4278',
      mapsQuery: 'Powder Tower Prague'
    }
  ],
  checklist: [
    { id: 'c1', cat: 'Documentos', text: 'DNI / Pasaportes de toda la familia en vigor (6 adultos + 1 bebé)', checked: true },
    { id: 'c-ins', cat: 'Documentos', text: 'Póliza Seguro Heymondo nº 2605917 descargada (asistencia 500.000€)', checked: true },
    { id: 'c-app', cat: 'Documentos', text: 'App Heymondo instalada (chat médico 24h y llamada por internet)', checked: false },
    { id: 'c2', cat: 'Documentos', text: 'Tarjeta Sanitaria Europea (TSE) de cada miembro de la familia', checked: true },
    { id: 'c3', cat: 'Documentos', text: 'Tarjetas bancarias sin comisión (Revolut, N26 o similares)', checked: true },
    { id: 'c4', cat: 'Documentos', text: 'Tarjetas de embarque Ryanair descargadas offline (Ida FR2766 / Vuelta FR3613 - Localizador: B5Y4FQ)', checked: false },
    { id: 'c5', cat: 'Documentos', text: 'Reserva del Apartamento guardada (Large Historic Home - Vítězná 18)', checked: true },
    { id: 'c6', cat: 'Documentos', text: 'Entradas Torre Klementinum descargadas (Jueves 26 a las 11:00 hrs)', checked: false },
    { id: 'c7', cat: 'Documentos', text: 'Entradas Castillo de Praga (San Vito, Callejón del Oro, San Jorge) listas', checked: false },
    { id: 'c8', cat: 'Documentos', text: 'Audioguías del Castillo descargadas en los teléfonos móviles', checked: false },
    { id: 'c9', cat: 'Documentos', text: 'Entradas Paseo en Barco Navideño descargadas (Sábado 28 a las 17:00 hrs)', checked: false },
    { id: 'c10', cat: 'Documentos', text: 'Confirmación de traslado en Monovolumen grande para los 7 viajeros', checked: true },
    { id: 'c11', cat: 'Salud', text: 'Botiquín infantil (Apiretal / Dalsy / Termómetro para Lizara)', checked: false },
    { id: 'c12', cat: 'Salud', text: 'Tiritas para rozaduras de caminar y apósitos para ampollas', checked: false },
    { id: 'c13', cat: 'Salud', text: 'Toallitas húmedas y gel hidroalcohólico', checked: false },
    { id: 'c14', cat: 'Ropa', text: 'Calzado cómodo y con suela aislante para los adoquines fríos de Praga', checked: false },
    { id: 'c15', cat: 'Ropa', text: 'Ropa térmica de abrigo (camisetas térmicas, forros polares, abrigos)', checked: false },
    { id: 'c16', cat: 'Ropa', text: 'Guantes, gorros de lana y bufandas para todos', checked: false },
    { id: 'c17', cat: 'Tecnología', text: 'Baterías externas (Powerbanks) cargadas para aguantar todo el día', checked: false },
    { id: 'c18', cat: 'Tecnología', text: 'Cables cargadores para todos los teléfonos móviles', checked: false },
    { id: 'c-aur', cat: 'Tecnología', text: 'Auriculares para los móviles (para escuchar las audioguías del Castillo de Praga)', checked: false },
    { id: 'c19', cat: 'Tecnología', text: 'Descargar mapa offline de Praga en Google Maps', checked: false },
    { id: 'c20', cat: 'Especial Niños', text: 'Carrito de paseo plegable para Lizara (embarque gratuito en Ryanair)', checked: false },
    { id: 'c21', cat: 'Especial Niños', text: 'Saco térmico de abrigo o manta para el carrito de bebé', checked: false },
    { id: 'c22', cat: 'Especial Niños', text: 'Biberones, chupetes y comida / leche para el viaje', checked: false },
    { id: 'c23', cat: 'Especial Niños', text: 'Snacks y galletitas para las excursiones a pie', checked: false }
  ],
  phrases: [
    { cz: 'Ahoj', phonetic: 'a-hoy', es: 'Hola / Adiós (informal, con niños)' },
    { cz: 'Dobrý den', phonetic: 'doh-bree den', es: 'Buenos días / Hola (formal en tiendas/restaurantes)' },
    { cz: 'Děkuji', phonetic: 'dyeh-koo-yee', es: 'Muchas gracias' },
    { cz: 'Prosím', phonetic: 'pro-seem', es: 'Por favor / De nada / Adelante' },
    { cz: 'Kde je toaleta?', phonetic: 'gdeh yeh toa-le-ta?', es: '¿Dónde está el baño?' },
    { cz: 'Kolik to stojí?', phonetic: 'ko-lik to stoy-ee?', es: '¿Cuánto cuesta?' },
    { cz: 'Účet, prosím', phonetic: 'oo-chet pro-seem', es: 'La cuenta, por favor' },
    { cz: 'Jedno pivo / Vodu', phonetic: 'yed-no pee-vo / vo-doo', es: 'Una cerveza / Agua' },
    { cz: 'Zmrzlina', phonetic: 'zmr-zlee-na', es: 'Helado (¡palabra favorita infantil!)' }
  ]
};

// State handling
let appState = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultData, ...parsed };
    } catch (e) {
      console.warn('Error loading state, using defaults', e);
    }
  }

  // Smooth migration from v1/v2/v3/v4/v5 preserving checked items
  const prevSaved = localStorage.getItem('praga_familia_data_v5') || localStorage.getItem('praga_familia_data_v4') || localStorage.getItem('praga_familia_data_v3') || localStorage.getItem('praga_familia_data_v2') || localStorage.getItem('praga_familia_data_v1');
  if (prevSaved) {
    try {
      const oldParsed = JSON.parse(prevSaved);
      const initial = JSON.parse(JSON.stringify(defaultData));
      if (oldParsed.checklist && Array.isArray(oldParsed.checklist)) {
        oldParsed.checklist.forEach(oldItem => {
          if (oldItem.id && oldItem.id.startsWith('task-')) {
            initial.checklist.push(oldItem);
          } else {
            const match = initial.checklist.find(c => c.id === oldItem.id);
            if (match) match.checked = oldItem.checked;
          }
        });
      }
      return initial;
    } catch (e) {}
  }

  return JSON.parse(JSON.stringify(defaultData));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initItinerary();
  initPlaces();
  initGuide();
  initBookings();
  initChecklist();
  initPwaInstall();
});

// ==========================================================================
// NAVIGATION (BOTTOM BAR & TABS)
// ==========================================================================
function initNavigation() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  const tabs = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Handle URL hash if present
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`tab-${hash}`)) {
    switchTab(hash);
  }
}

function switchTab(tabId) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  const tabs = document.querySelectorAll('.tab-content');

  navItems.forEach(nav => {
    if (nav.getAttribute('data-tab') === tabId) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });

  tabs.forEach(tab => {
    if (tab.id === `tab-${tabId}`) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  window.location.hash = tabId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 1. ITINERARIO TAB
// ==========================================================================
function initItinerary() {
  const dayPills = document.querySelectorAll('.day-pill');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const day = parseInt(pill.getAttribute('data-day'));
      dayPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.currentDay = day;
      renderItinerary();
    });
  });

  renderItinerary();

  // Add activity button & modal
  const btnAdd = document.getElementById('btn-add-activity');
  const modal = document.getElementById('modal-add-activity');
  const form = document.getElementById('form-add-activity');
  const cancelBtn = document.getElementById('btn-cancel-activity');

  if (btnAdd && modal) {
    btnAdd.addEventListener('click', () => {
      document.getElementById('activity-day-input').value = appState.currentDay;
      modal.showModal();
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.close());
  }

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const time = document.getElementById('act-time').value;
      const title = document.getElementById('act-title').value;
      const desc = document.getElementById('act-desc').value;
      const tip = document.getElementById('act-tip').value;

      const newAct = {
        id: 'custom-' + Date.now(),
        day: appState.currentDay,
        time: time || '12:00',
        title: title,
        czechName: '',
        desc: desc || '',
        familyTip: tip || '',
        coords: '',
        mapsQuery: encodeURIComponent(title + ' Prague'),
        completed: false
      };

      appState.itinerary.push(newAct);
      // Sort by time
      appState.itinerary.sort((a, b) => a.time.localeCompare(b.time));
      saveState();
      renderItinerary();
      modal.close();
      form.reset();
      showToast('¡Nueva actividad guardada!');
    });
  }
}

function renderItinerary() {
  const timelineEl = document.getElementById('timeline-list');
  const daySummaryTitle = document.getElementById('day-summary-title');
  const daySummaryDesc = document.getElementById('day-summary-desc');
  const dayProgressBadge = document.getElementById('day-progress-badge');

  if (!timelineEl) return;

  const day = appState.currentDay;
  const dayActivities = appState.itinerary.filter(act => act.day === day);

  // Day Summaries
  const summaries = {
    1: { title: 'Día 1: Llegada, Apartamento & Supermercado (25 Nov)', desc: 'Vuelo directo desde Madrid, traslado privado en monovolumen a Malá Strana, check-in en el apartamento y compra de provisiones en el Mini Market.' },
    2: { title: 'Día 2: Klementinum, Ciudad Vieja, Lokál & Barrio Judío (26 Nov)', desc: 'Puente de Carlos, visita a la Biblioteca Barroca, Torre de la Pólvora, comida en Lokál Dlouhááá, mercadillo navideño y sinagogas.' },
    3: { title: 'Día 3: Castillo de Praga, U Glaubiců & Malá Strana (27 Nov)', desc: 'Subida en Tranvía 22, San Vito y Callejón del Oro con audioguías, comida en U Glaubiců, calle Nerudova, Muro Lennon y Kampa.' },
    4: { title: 'Día 4: Ciudad Nueva, Pork\'s, Crucero Navideño & U Tří jelínků (28 Nov)', desc: 'Casa Danzante, Cabeza de Kafka, Plaza Wenceslao, codillo en Pork\'s, barco iluminado y encendido del Árbol de Navidad.' },
    5: { title: 'Día 5: Despedida, Traslado en Monovolumen & Vuelo de Vuelta (29 Nov)', desc: 'Último desayuno, recogida privada en monovolumen a las 12:00 hacia el aeropuerto de Praga y vuelo FR3613 de vuelta a Madrid.' }
  };

  if (summaries[day]) {
    daySummaryTitle.textContent = summaries[day].title;
    daySummaryDesc.textContent = summaries[day].desc;
  }

  // Calculate completed stats
  const completedCount = dayActivities.filter(a => a.completed).length;
  dayProgressBadge.textContent = `${completedCount} de ${dayActivities.length} hechas`;

  if (dayActivities.length === 0) {
    timelineEl.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        <p>No hay paradas añadidas para este día aún.</p>
      </div>`;
    return;
  }

  timelineEl.innerHTML = dayActivities.map(act => {
    const isCompleted = act.completed ? 'completed' : '';
    const mapsLink = act.mapsQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.mapsQuery)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.title + ' Praga')}`;

    return `
      <article class="activity-card ${isCompleted}" data-id="${act.id}">
        <div class="activity-top">
          <span class="activity-time-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${act.time}
          </span>
          <button class="activity-check-btn" onclick="toggleActivity('${act.id}')" title="Marcar como visitado" aria-label="Marcar como visitado">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>

        <h4 class="activity-title">${act.title}</h4>
        ${act.czechName ? `<div class="activity-czech-name">${act.czechName}</div>` : ''}
        <p class="activity-desc">${act.desc}</p>

        ${act.familyTip ? `
          <div class="family-tip">
            <span>💡</span>
            <div><strong>Consejo familiar:</strong> ${act.familyTip}</div>
          </div>
        ` : ''}

        <div class="activity-actions">
          <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-sm-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Abrir en Maps
          </a>
          <button class="btn-sm" onclick="shareActivity('${act.title}', '${act.desc}', '${mapsLink}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Compartir
          </button>
          ${act.id.startsWith('custom-') ? `
            <button class="btn-sm" onclick="deleteActivity('${act.id}')" style="color: #f87171;">
              Eliminar
            </button>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

window.toggleActivity = function(id) {
  const item = appState.itinerary.find(a => a.id === id);
  if (item) {
    item.completed = !item.completed;
    saveState();
    renderItinerary();
    if (item.completed) {
      showToast('¡Parada marcada como visitada! 🏰');
    }
  }
};

window.deleteActivity = function(id) {
  if (confirm('¿Eliminar esta actividad del itinerario?')) {
    appState.itinerary = appState.itinerary.filter(a => a.id !== id);
    saveState();
    renderItinerary();
    showToast('Actividad eliminada');
  }
};

window.shareActivity = function(title, desc, link) {
  if (navigator.share) {
    navigator.share({
      title: 'Praga en Familia: ' + title,
      text: `${title} - ${desc}`,
      url: link
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${title} - ${desc} ${link}`);
    showToast('¡Enlace copiado al portapapeles!');
  }
};

// ==========================================================================
// 2. LUGARES TAB
// ==========================================================================
let currentPlaceCategory = 'all';
let placeSearchQuery = '';

function initPlaces() {
  const chips = document.querySelectorAll('.filter-chips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentPlaceCategory = chip.getAttribute('data-cat');
      renderPlaces();
    });
  });

  const searchInput = document.getElementById('search-places-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      placeSearchQuery = e.target.value.toLowerCase().trim();
      renderPlaces();
    });
  }

  renderPlaces();
}

function renderPlaces() {
  const container = document.getElementById('places-grid');
  if (!container) return;

  let filtered = appState.places;

  if (currentPlaceCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentPlaceCategory);
  }

  if (placeSearchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(placeSearchQuery) ||
      (p.cz && p.cz.toLowerCase().includes(placeSearchQuery)) ||
      p.desc.toLowerCase().includes(placeSearchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No se encontraron lugares que coincidan.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(place => {
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery + ' Prague')}`;

    return `
      <article class="place-card">
        <div class="place-badge-row">
          ${place.tags.map(tag => {
            let cls = 'tag-badge';
            if (tag.includes('Imprescindible')) cls += ' tag-highlight';
            else if (tag.includes('Niños')) cls += ' tag-kids';
            else if (tag.includes('Miradores') || tag.includes('Vistas')) cls += ' tag-view';
            else if (tag.includes('Restaurante')) cls += ' tag-resto';
            return `<span class="${cls}">${tag}</span>`;
          }).join('')}
        </div>

        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff;">${place.name}</h4>
          ${place.cz ? `<span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">${place.cz}</span>` : ''}
        </div>

        <p style="font-size: 0.88rem; color: #cbd5e1;">${place.desc}</p>

        ${place.familyTip ? `
          <div class="family-tip">
            <span>👨‍👩‍👧‍👦</span>
            <div><strong>Tip familiar:</strong> ${place.familyTip}</div>
          </div>
        ` : ''}

        <div style="display: flex; gap: 8px; margin-top: 4px;">
          <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-sm-primary" style="flex: 1; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Ver en Google Maps
          </a>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 3. GUÍA & CONVERSOR TAB
// ==========================================================================
function initGuide() {
  const czkInput = document.getElementById('conv-czk');
  const eurInput = document.getElementById('conv-eur');
  const rateDisplay = document.getElementById('conv-rate-display');
  const btnEditRate = document.getElementById('btn-edit-rate');

  let rate = appState.trip.exchangeRate || 25.20;

  function updateRateDisplay() {
    if (rateDisplay) {
      rateDisplay.textContent = `1 EUR ≈ ${rate.toFixed(2)} CZK`;
    }
  }

  updateRateDisplay();

  if (czkInput && eurInput) {
    czkInput.addEventListener('input', () => {
      const val = parseFloat(czkInput.value);
      if (!isNaN(val) && val >= 0) {
        eurInput.value = (val / rate).toFixed(2);
      } else {
        eurInput.value = '';
      }
    });

    eurInput.addEventListener('input', () => {
      const val = parseFloat(eurInput.value);
      if (!isNaN(val) && val >= 0) {
        czkInput.value = Math.round(val * rate);
      } else {
        czkInput.value = '';
      }
    });

    // Initial calculation
    czkInput.value = '100';
    eurInput.value = (100 / rate).toFixed(2);
  }

  window.setQuickConv = function(czkAmount) {
    if (czkInput && eurInput) {
      czkInput.value = czkAmount;
      eurInput.value = (czkAmount / rate).toFixed(2);
    }
  };

  if (btnEditRate) {
    btnEditRate.addEventListener('click', () => {
      const newRate = prompt('Introduce el tipo de cambio (ej. 25.20 CZK por 1 EUR):', rate);
      if (newRate && !isNaN(parseFloat(newRate)) && parseFloat(newRate) > 0) {
        rate = parseFloat(newRate);
        appState.trip.exchangeRate = rate;
        saveState();
        updateRateDisplay();
        if (czkInput && czkInput.value) {
          eurInput.value = (parseFloat(czkInput.value) / rate).toFixed(2);
        }
        showToast('Tipo de cambio actualizado');
      }
    });
  }

  renderPhrases();
}

function renderPhrases() {
  const container = document.getElementById('phrases-list');
  if (!container) return;

  container.innerHTML = appState.phrases.map(p => {
    return `
      <div class="phrase-item">
        <div class="phrase-texts">
          <div class="phrase-cz">${p.cz}</div>
          <div class="phrase-phonetic">[${p.phonetic}]</div>
          <div class="phrase-es">${p.es}</div>
        </div>
        <button class="phrase-speak-btn" onclick="speakText('${p.cz}')" title="Escuchar pronunciación" aria-label="Escuchar pronunciación">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        </button>
      </div>
    `;
  }).join('');
}

window.speakText = function(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } else {
    showToast('Síntesis de voz no disponible en este dispositivo');
  }
};

// ==========================================================================
// INDEXEDDB FOR OFFLINE BOARDING PASSES (IMAGES & PDFS)
// ==========================================================================
const IDB_NAME = 'PragaFamiliaPassesDB';
const IDB_VERSION = 1;
const IDB_STORE = 'boarding_passes';

function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbSavePass(pass) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    store.put(pass);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbGetAllPasses() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function dbDeletePass(id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ==========================================================================
// 4. RESERVAS & DOCUMENTOS TAB
// ==========================================================================
function initBookings() {
  renderBookings();
  renderBoardingPasses();

  // Hotel Modal
  const btnEditHotel = document.getElementById('btn-edit-hotel');
  const modalHotel = document.getElementById('modal-edit-hotel');
  const formHotel = document.getElementById('form-edit-hotel');
  const cancelHotelBtn = document.getElementById('btn-cancel-hotel');

  if (btnEditHotel && modalHotel) {
    btnEditHotel.addEventListener('click', () => {
      document.getElementById('edit-hotel-name').value = appState.trip.hotel.name;
      document.getElementById('edit-hotel-address').value = appState.trip.hotel.address;
      document.getElementById('edit-hotel-phone').value = appState.trip.hotel.phone;
      document.getElementById('edit-hotel-ref').value = appState.trip.hotel.bookingRef;
      document.getElementById('edit-hotel-notes').value = appState.trip.hotel.notes;
      modalHotel.showModal();
    });
  }

  if (cancelHotelBtn && modalHotel) {
    cancelHotelBtn.addEventListener('click', () => modalHotel.close());
  }

  if (formHotel && modalHotel) {
    formHotel.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.trip.hotel.name = document.getElementById('edit-hotel-name').value;
      appState.trip.hotel.address = document.getElementById('edit-hotel-address').value;
      appState.trip.hotel.phone = document.getElementById('edit-hotel-phone').value;
      appState.trip.hotel.bookingRef = document.getElementById('edit-hotel-ref').value;
      appState.trip.hotel.notes = document.getElementById('edit-hotel-notes').value;

      saveState();
      renderBookings();
      modalHotel.close();
      showToast('Datos de alojamiento actualizados');
    });
  }

  // Flights Modal & Copy PNR
  const btnCopyPnr = document.getElementById('btn-copy-pnr');
  if (btnCopyPnr) {
    btnCopyPnr.addEventListener('click', () => {
      const pnr = appState.trip.flights.bookingRef || 'B5Y4FQ';
      navigator.clipboard.writeText(pnr);
      showToast(`¡Localizador ${pnr} copiado!`);
    });
  }

  const btnCopyFlightEmail = document.getElementById('btn-copy-flight-email');
  if (btnCopyFlightEmail) {
    btnCopyFlightEmail.addEventListener('click', () => {
      const email = appState.trip.flights.bookingEmail || 'fjcerrudo@gmail.com';
      navigator.clipboard.writeText(email);
      showToast(`¡Email ${email} copiado!`);
    });
  }

  const btnEditFlights = document.getElementById('btn-edit-flights');
  const modalFlights = document.getElementById('modal-edit-flights');
  const formFlights = document.getElementById('form-edit-flights');
  const cancelFlightsBtn = document.getElementById('btn-cancel-flights');

  if (btnEditFlights && modalFlights) {
    btnEditFlights.addEventListener('click', () => {
      const f = appState.trip.flights;
      document.getElementById('edit-flight-pnr').value = f.bookingRef || 'B5Y4FQ';
      const emailInput = document.getElementById('edit-flight-email');
      if (emailInput) emailInput.value = f.bookingEmail || 'fjcerrudo@gmail.com';
      
      const out = f.outbound || {};
      document.getElementById('edit-out-no').value = out.flightNo || '';
      document.getElementById('edit-out-date').value = out.date || '';
      document.getElementById('edit-out-orig').value = out.origName || out.origCode || '';
      document.getElementById('edit-out-dest').value = out.destName || out.destCode || '';
      document.getElementById('edit-out-dep').value = out.depTime || '';
      document.getElementById('edit-out-arr').value = out.arrTime || '';
      document.getElementById('edit-out-seats').value = out.seats || '';

      const ret = f.inbound || {};
      document.getElementById('edit-in-no').value = ret.flightNo || '';
      document.getElementById('edit-in-date').value = ret.date || '';
      document.getElementById('edit-in-orig').value = ret.origName || ret.origCode || '';
      document.getElementById('edit-in-dest').value = ret.destName || ret.destCode || '';
      document.getElementById('edit-in-dep').value = ret.depTime || '';
      document.getElementById('edit-in-arr').value = ret.arrTime || '';
      document.getElementById('edit-in-seats').value = ret.seats || '';

      modalFlights.showModal();
    });
  }

  if (cancelFlightsBtn && modalFlights) {
    cancelFlightsBtn.addEventListener('click', () => modalFlights.close());
  }

  if (formFlights && modalFlights) {
    formFlights.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = appState.trip.flights;
      f.bookingRef = document.getElementById('edit-flight-pnr').value.trim();
      const emailInput = document.getElementById('edit-flight-email');
      if (emailInput) f.bookingEmail = emailInput.value.trim();

      f.outbound.flightNo = document.getElementById('edit-out-no').value.trim();
      f.outbound.date = document.getElementById('edit-out-date').value.trim();
      const outOrig = document.getElementById('edit-out-orig').value.trim();
      f.outbound.origName = outOrig;
      f.outbound.origCode = outOrig.slice(0, 3).toUpperCase();
      const outDest = document.getElementById('edit-out-dest').value.trim();
      f.outbound.destName = outDest;
      f.outbound.destCode = outDest.slice(0, 3).toUpperCase();
      f.outbound.depTime = document.getElementById('edit-out-dep').value;
      f.outbound.arrTime = document.getElementById('edit-out-arr').value;
      f.outbound.seats = document.getElementById('edit-out-seats').value.trim();

      f.inbound.flightNo = document.getElementById('edit-in-no').value.trim();
      f.inbound.date = document.getElementById('edit-in-date').value.trim();
      const inOrig = document.getElementById('edit-in-orig').value.trim();
      f.inbound.origName = inOrig;
      f.inbound.origCode = inOrig.slice(0, 3).toUpperCase();
      const inDest = document.getElementById('edit-in-dest').value.trim();
      f.inbound.destName = inDest;
      f.inbound.destCode = inDest.slice(0, 3).toUpperCase();
      f.inbound.depTime = document.getElementById('edit-in-dep').value;
      f.inbound.arrTime = document.getElementById('edit-in-arr').value;
      f.inbound.seats = document.getElementById('edit-in-seats').value.trim();

      saveState();
      renderBookings();
      modalFlights.close();
      showToast('Datos de vuelos actualizados ✈️');
    });
  }

  // Boarding Passes Upload & Modal
  const btnAddBp = document.getElementById('btn-add-boarding-pass');
  const modalAddBp = document.getElementById('modal-add-boarding-pass');
  const formAddBp = document.getElementById('form-add-boarding-pass');
  const cancelBpBtn = document.getElementById('btn-cancel-bp');

  if (btnAddBp && modalAddBp) {
    btnAddBp.addEventListener('click', () => modalAddBp.showModal());
  }

  if (cancelBpBtn && modalAddBp) {
    cancelBpBtn.addEventListener('click', () => modalAddBp.close());
  }

  if (formAddBp && modalAddBp) {
    formAddBp.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pSelect = document.getElementById('bp-passenger-select');
      const pInput = document.getElementById('bp-passenger-input');
      const passenger = (pSelect ? pSelect.value : (pInput ? pInput.value : 'Familiar')).trim();
      const flightType = document.getElementById('bp-flight-type').value;
      const fileInput = document.getElementById('bp-file-input');

      if (!fileInput.files || fileInput.files.length === 0) {
        alert('Por favor selecciona una imagen o PDF.');
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        const newPass = {
          id: 'bp-' + Date.now(),
          passenger: passenger,
          flightType: flightType,
          fileName: file.name,
          fileType: file.type,
          dataUrl: dataUrl,
          dateAdded: new Date().toLocaleDateString('es-ES')
        };

        try {
          await dbSavePass(newPass);
          modalAddBp.close();
          formAddBp.reset();
          await renderBoardingPasses();
          showToast(`¡Tarjeta de ${passenger} guardada offline! 🎟️`);
        } catch (err) {
          alert('Error guardando la tarjeta en el dispositivo.');
        }
      };

      reader.readAsDataURL(file);
    });
  }

  // Backup / Export
  const btnExport = document.getElementById('btn-export-plan');
  if (btnExport) {
    btnExport.addEventListener('click', exportPlan);
  }

  const btnImport = document.getElementById('btn-import-plan');
  const fileImport = document.getElementById('file-import-plan');
  if (btnImport && fileImport) {
    btnImport.addEventListener('click', () => fileImport.click());
    fileImport.addEventListener('change', importPlan);
  }

  // Share Entire Trip
  const btnShareAll = document.getElementById('btn-share-trip');
  if (btnShareAll) {
    btnShareAll.addEventListener('click', shareCompleteTrip);
  }
}

function renderBookings() {
  const h = appState.trip.hotel;
  const f = appState.trip.flights || {};

  const hName = document.getElementById('hotel-name-val');
  const hAddress = document.getElementById('hotel-address-val');
  const hPhone = document.getElementById('hotel-phone-val');
  const hRef = document.getElementById('hotel-ref-val');
  const hNotes = document.getElementById('hotel-notes-val');

  if (hName) hName.textContent = h.name;
  if (hAddress) hAddress.textContent = h.address;
  if (hPhone) hPhone.textContent = h.phone ? `${h.phone} (Ana Cristina: ${h.email || 'amenjibar@gmail.com'})` : '+420 776 815 651';
  if (hRef) hRef.textContent = `${h.bookingRef} • ${h.price || '1.273,70 €'} (${h.features || 'Apartamento 110 m²'})`;
  if (hNotes) hNotes.textContent = h.notes;

  const btnMapsHotel = document.getElementById('btn-hotel-maps');
  if (btnMapsHotel) {
    btnMapsHotel.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.address)}`;
  }

  const btnBookingHotel = document.getElementById('btn-hotel-booking');
  if (btnBookingHotel) {
    btnBookingHotel.href = h.bookingUrl || 'https://www.booking.com/Share-MQJZJj';
  }

  const btnCallHotel = document.getElementById('btn-hotel-call');
  if (btnCallHotel) {
    btnCallHotel.href = `tel:${(h.phone || '+420776815651').replace(/\s+/g, '')}`;
  }

  // Render Ryanair Flights
  const pnrEl = document.getElementById('flight-pnr-val');
  if (pnrEl) pnrEl.textContent = f.bookingRef || 'B5Y4FQ';

  const emailEl = document.getElementById('flight-email-val');
  if (emailEl) emailEl.textContent = f.bookingEmail || 'fjcerrudo@gmail.com';

  // Outbound
  const out = f.outbound || {};
  const elOutNo = document.getElementById('flight-out-no');
  const elOutOrigCode = document.getElementById('flight-out-orig-code');
  const elOutOrigName = document.getElementById('flight-out-orig-name');
  const elOutDepTime = document.getElementById('flight-out-dep-time');
  const elOutDate = document.getElementById('flight-out-date');
  const elOutDestCode = document.getElementById('flight-out-dest-code');
  const elOutDestName = document.getElementById('flight-out-dest-name');
  const elOutArrTime = document.getElementById('flight-out-arr-time');
  const elOutSeats = document.getElementById('flight-out-seats');
  const elOutTerminal = document.getElementById('flight-out-terminal');

  if (elOutNo) elOutNo.textContent = out.flightNo || 'FR2766';
  if (elOutOrigCode) elOutOrigCode.textContent = out.origCode || 'MAD';
  if (elOutOrigName) elOutOrigName.textContent = out.origName || 'Madrid';
  if (elOutDepTime) elOutDepTime.textContent = out.depTime || '17:35';
  if (elOutDate) elOutDate.textContent = out.date || 'Miércoles, 25 Nov';
  if (elOutDestCode) elOutDestCode.textContent = out.destCode || 'PRG';
  if (elOutDestName) elOutDestName.textContent = out.destName || 'Praga';
  if (elOutArrTime) elOutArrTime.textContent = out.arrTime || '20:25';
  if (elOutSeats) elOutSeats.textContent = out.seats || 'Gratis en Check-in';
  if (elOutTerminal) elOutTerminal.textContent = out.terminal || 'T1 (Madrid) → T2 (Praga)';

  // Inbound
  const ret = f.inbound || {};
  const elInNo = document.getElementById('flight-in-no');
  const elInOrigCode = document.getElementById('flight-in-orig-code');
  const elInOrigName = document.getElementById('flight-in-orig-name');
  const elInDepTime = document.getElementById('flight-in-dep-time');
  const elInDate = document.getElementById('flight-in-date');
  const elInDestCode = document.getElementById('flight-in-dest-code');
  const elInDestName = document.getElementById('flight-in-dest-name');
  const elInArrTime = document.getElementById('flight-in-arr-time');
  const elInSeats = document.getElementById('flight-in-seats');
  const elInTerminal = document.getElementById('flight-in-terminal');

  if (elInNo) elInNo.textContent = ret.flightNo || 'FR3613';
  if (elInOrigCode) elInOrigCode.textContent = ret.origCode || 'PRG';
  if (elInOrigName) elInOrigName.textContent = ret.origName || 'Praga';
  if (elInDepTime) elInDepTime.textContent = ret.depTime || '15:05';
  if (elInDate) elInDate.textContent = ret.date || 'Domingo, 29 Nov';
  if (elInDestCode) elInDestCode.textContent = ret.destCode || 'MAD';
  if (elInDestName) elInDestName.textContent = ret.destName || 'Madrid';
  if (elInArrTime) elInArrTime.textContent = ret.arrTime || '18:10';
  if (elInSeats) elInSeats.textContent = ret.seats || 'Gratis en Check-in';
  if (elInTerminal) elInTerminal.textContent = ret.terminal || 'T2 (Praga) → T1 (Madrid)';

  const fTrans = document.getElementById('flight-trans-val');
  if (fTrans) fTrans.textContent = f.transfer || 'Monovolumen grande privado reservado para los 7 a la llegada y a la salida de Praga.';

  // Render Restaurants
  const restosContainer = document.getElementById('restaurants-list-container');
  if (restosContainer && appState.trip.restaurants) {
    restosContainer.innerHTML = appState.trip.restaurants.map(r => `
      <div class="res-card">
        <div class="res-header">
          <span class="res-title">🍽️ ${r.name}</span>
          <span class="res-badge badge-resto">${r.day} • ${r.time}</span>
        </div>
        <div class="res-address">📍 ${r.address} (${r.meal})</div>
        <div class="res-desc">${r.desc}</div>
        <div class="res-actions">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.mapsQuery || (r.name + ' ' + r.address))}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-sm-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Abrir en Maps
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Tours
  const toursContainer = document.getElementById('tours-list-container');
  if (toursContainer && appState.trip.tours) {
    toursContainer.innerHTML = appState.trip.tours.map(t => `
      <div class="res-card">
        <div class="res-header">
          <span class="res-title">🎟️ ${t.name}</span>
          <span class="res-badge badge-tour">${t.day} • ${t.time}</span>
        </div>
        <div class="res-address">📍 ${t.address} (${t.duration})</div>
        <div class="res-desc">${t.desc}</div>
        <div class="res-notes">💡 ${t.notes}</div>
        <div class="res-actions">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.mapsQuery || t.name)}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-sm-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Abrir en Maps
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Transfers
  const transContainer = document.getElementById('transfers-list-container');
  if (transContainer && appState.trip.transfers) {
    transContainer.innerHTML = appState.trip.transfers.map(tr => `
      <div class="res-card">
        <div class="res-header">
          <span class="res-title">🚐 ${tr.title}</span>
          <span class="res-badge badge-van">${tr.date} • ${tr.time}</span>
        </div>
        <div class="res-address">🛫 ${tr.origin} ➔ 📍 ${tr.destination}</div>
        <div class="res-desc">${tr.desc}</div>
      </div>
    `).join('');
  }
}

async function renderBoardingPasses() {
  const container = document.getElementById('boarding-passes-list');
  if (!container) return;

  try {
    const passes = await dbGetAllPasses();

    if (passes.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 18px; background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px dashed var(--border-color); color: var(--text-muted); font-size: 0.82rem;">
          <span>✈️ No has añadido tarjetas de embarque aún. Cuando hagas el check-in en Ryanair, haz una captura de pantalla del código QR o sube el PDF para tenerlo sin conexión.</span>
        </div>`;
      return;
    }

    container.innerHTML = passes.map(pass => {
      const isPdf = pass.fileType === 'application/pdf';
      const previewThumb = isPdf
        ? `<div class="bp-pdf-icon">PDF</div>`
        : `<img src="${pass.dataUrl}" alt="QR" class="bp-thumb">`;

      return `
        <div class="boarding-pass-item" data-id="${pass.id}">
          <div class="bp-top">
            <div class="bp-passenger-name">
              <span>👤</span> ${pass.passenger}
            </div>
            <span class="bp-flight-tag">${pass.flightType}</span>
          </div>

          <div class="bp-preview-wrap" onclick="viewBoardingPass('${pass.id}')">
            ${previewThumb}
            <div style="display: flex; flex-direction: column; overflow: hidden;">
              <span style="font-size: 0.84rem; font-weight: 600; color: #fff; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${pass.fileName}</span>
              <span style="font-size: 0.72rem; color: var(--accent-emerald);">🟢 Guardado offline</span>
            </div>
          </div>

          <div class="bp-actions">
            <button class="btn-sm btn-sm-primary" style="flex: 1; justify-content: center;" onclick="viewBoardingPass('${pass.id}')">
              🔍 Ver / Escanear
            </button>
            <a href="${pass.dataUrl}" download="${pass.fileName}" class="btn-sm" style="padding: 4px 10px;" title="Descargar archivo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <button class="btn-sm" style="color: #f87171; padding: 4px 8px;" onclick="removeBoardingPass('${pass.id}')" title="Eliminar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading boarding passes', err);
  }
}

window.viewBoardingPass = async function(id) {
  try {
    const passes = await dbGetAllPasses();
    const pass = passes.find(p => p.id === id);
    if (!pass) return;

    const modal = document.getElementById('modal-view-boarding-pass');
    const title = document.getElementById('view-bp-title');
    const passenger = document.getElementById('view-bp-passenger');
    const flightInfo = document.getElementById('view-bp-flight-info');
    const mediaWrap = document.getElementById('view-bp-media-wrap');
    const downloadBtn = document.getElementById('btn-download-bp');

    if (title) title.textContent = `Tarjeta: ${pass.passenger}`;
    if (passenger) passenger.textContent = pass.passenger;
    if (flightInfo) flightInfo.textContent = `Ryanair • ${pass.flightType}`;
    if (downloadBtn) {
      downloadBtn.href = pass.dataUrl;
      downloadBtn.download = pass.fileName;
    }

    if (mediaWrap) {
      if (pass.fileType === 'application/pdf') {
        mediaWrap.innerHTML = `
          <div style="padding: 20px; text-align: center;">
            <p style="margin-bottom: 12px; font-weight: 600;">Archivo PDF guardado</p>
            <a href="${pass.dataUrl}" target="_blank" class="btn-sm btn-sm-primary" style="padding: 8px 16px; font-size: 0.9rem;">
              Abrir PDF en pantalla completa
            </a>
          </div>`;
      } else {
        mediaWrap.innerHTML = `<img src="${pass.dataUrl}" alt="Tarjeta de embarque" class="bp-scanner-img">`;
      }
    }

    modal.showModal();
  } catch (err) {
    console.error('Error viewing pass', err);
  }
};

window.removeBoardingPass = async function(id) {
  if (confirm('¿Eliminar esta tarjeta de embarque del dispositivo?')) {
    await dbDeletePass(id);
    await renderBoardingPasses();
    showToast('Tarjeta de embarque eliminada');
  }
};

function exportPlan() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `Praga_Familia_Planning_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Archivo JSON de viaje descargado');
}

function importPlan(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && imported.itinerary) {
        appState = { ...defaultData, ...imported };
        saveState();
        renderItinerary();
        renderPlaces();
        renderBookings();
        renderChecklist();
        showToast('¡Plan del viaje importado con éxito!');
      } else {
        alert('El archivo no tiene el formato correcto de Praga en Familia.');
      }
    } catch (err) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

function shareCompleteTrip() {
  const h = appState.trip.hotel;
  const f = appState.trip.flights || {};
  const out = f.outbound || {};
  const ret = f.inbound || {};
  const ins = appState.trip.insurance || {};

  const restos = (appState.trip.restaurants || []).map(r => `• ${r.name}: ${r.day} a las ${r.time} (${r.address})`).join('\n');
  const tours = (appState.trip.tours || []).map(t => `• ${t.name}: ${t.day} a las ${t.time}`).join('\n');

  const text = `🏰 *NUESTRO VIAJE A PRAGA EN FAMILIA (25-29 NOV 2026)*\n\n🏨 *Alojamiento:* ${h.name}\n📍 ${h.address}\n📞 Tel / Coordinadora: ${h.phone || '+420 776 815 651'} (Ana Cristina)\n🔖 Reserva: ${h.bookingRef}\n\n✈️ *VUELOS RYANAIR*\n🔖 Localizador PNR: ${f.bookingRef || 'B5Y4FQ'} (Email: ${f.bookingEmail || 'fjcerrudo@gmail.com'})\n🛫 Ida: ${out.flightNo || 'FR2766'} (${out.origCode} 17:35 → ${out.destCode} 20:25) Mié 25 Nov\n🛬 Vuelta: ${ret.flightNo || 'FR3613'} (${ret.origCode} 15:05 → ${ret.destCode} 18:10) Dom 29 Nov\n👥 Asientos: ${out.seats || 'Gratis en check-in'}\n\n🚐 *TRASLADOS EN MONOVOLUMEN (7 Plazas):*\n• Ida: Aeropuerto PRG → Apartamento (Mié 25 a las 20:25)\n• Vuelta: Apartamento → Aeropuerto PRG (Dom 29 a las 12:00)\n\n🛡️ *SEGURO DE VIAJE HEYMONDO:*\n• Póliza: ${ins.policyNumber || '2605917'} (${ins.policyType || 'Viaje Tranquilidad'})\n• Asistencia 24h: ${ins.phone || '+34 913 536 323'}\n• Cobertura: 500.000 € médica | AirHelp Plus hasta 600 €/pax\n\n🍽️ *RESTAURANTES RESERVADOS:*\n${restos}\n\n🎟️ *TOURS Y ENTRADAS RESERVADAS:*\n${tours}\n\n🚨 *Emergencias Praga:*\n112 (Emergencias UE) | +420 233 097 211 (Embajada España)`;

  if (navigator.share) {
    navigator.share({
      title: 'Datos del Viaje a Praga',
      text: text
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast('¡Resumen completo copiado al portapapeles!');
  }
}

// ==========================================================================
// 5. CHECKLIST DE EQUIPAJE TAB
// ==========================================================================
function initChecklist() {
  renderChecklist();

  const formAdd = document.getElementById('form-add-checklist');
  if (formAdd) {
    formAdd.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('checklist-new-item');
      const cat = document.getElementById('checklist-new-cat').value;
      const text = input.value.trim();

      if (text) {
        appState.checklist.push({
          id: 'task-' + Date.now(),
          cat: cat,
          text: text,
          checked: false
        });
        saveState();
        renderChecklist();
        input.value = '';
        showToast('Cosa añadida a la lista de equipaje');
      }
    });
  }
}

function renderChecklist() {
  const container = document.getElementById('checklist-items-wrap');
  const countDisplay = document.getElementById('checklist-progress-text');
  const percentDisplay = document.getElementById('checklist-progress-pct');
  const progressBar = document.getElementById('checklist-progress-fill');

  if (!container) return;

  const total = appState.checklist.length;
  const checked = appState.checklist.filter(c => c.checked).length;
  const pct = total === 0 ? 0 : Math.round((checked / total) * 100);

  if (countDisplay) countDisplay.textContent = `${checked} de ${total} cosas listas`;
  if (percentDisplay) percentDisplay.textContent = `${pct}%`;
  if (progressBar) progressBar.style.width = `${pct}%`;

  // Group by category
  const categories = ['Documentos', 'Salud', 'Ropa', 'Tecnología', 'Especial Niños'];
  const catIcons = {
    'Documentos': '📄',
    'Salud': '💊',
    'Ropa': '👟',
    'Tecnología': '🔋',
    'Especial Niños': '🧸'
  };

  container.innerHTML = categories.map(cat => {
    const items = appState.checklist.filter(c => c.cat === cat);
    if (items.length === 0) return '';

    return `
      <div class="checklist-group">
        <h4 class="checklist-cat-title">${catIcons[cat] || '📌'} ${cat}</h4>
        ${items.map(item => `
          <div class="checklist-item ${item.checked ? 'checked' : ''}" onclick="toggleChecklistItem('${item.id}')">
            <div class="check-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style="flex: 1; font-size: 0.88rem;">${item.text}</span>
            <button onclick="event.stopPropagation(); deleteChecklistItem('${item.id}')" style="background: none; border: none; color: var(--text-subtle); padding: 4px; cursor: pointer;" title="Eliminar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

window.toggleChecklistItem = function(id) {
  const item = appState.checklist.find(c => c.id === id);
  if (item) {
    item.checked = !item.checked;
    saveState();
    renderChecklist();
  }
};

window.deleteChecklistItem = function(id) {
  appState.checklist = appState.checklist.filter(c => c.id !== id);
  saveState();
  renderChecklist();
};

// ==========================================================================
// PWA INSTALLATION & UTILS
// ==========================================================================
let deferredInstallPrompt = null;

function initPwaInstall() {
  const installBanner = document.getElementById('btn-pwa-install');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (installBanner) {
      installBanner.style.display = 'inline-flex';
    }
  });

  if (installBanner) {
    installBanner.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          installBanner.style.display = 'none';
        }
        deferredInstallPrompt = null;
      } else {
        alert('Para instalar la app en Android:\n1. Toca los 3 puntos del navegador (Chrome).\n2. Elige "Añadir a la pantalla de inicio" o "Instalar aplicación".');
      }
    });
  }

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('ServiceWorker registrado correctamente'))
        .catch(err => console.log('Error registrando ServiceWorker:', err));
    });
  }
}

function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}
