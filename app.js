// ==========================================================================
// PRAGA EN FAMILIA - LOGIC & OFFLINE DATA STORE
// ==========================================================================

const STORAGE_KEY = 'praga_familia_data_v1';

// Initial default data tailored for a family trip to Prague
const defaultData = {
  trip: {
    title: 'Viaje a Praga con la Familia',
    dates: '4 Días Mágicos',
    hotel: {
      name: 'Grand Hotel Bohemia / Apartamento Familiar Staré Město',
      address: 'Králodvorská 4, 110 00 Staré Město, Praga',
      phone: '+420 234 608 111',
      bookingRef: 'BK-789214-PRG',
      notes: 'Check-in: 14:00 | Desayuno incluido. Cuna para niños disponible. A 5 min de la Plaza de la Ciudad Vieja.'
    },
    flights: {
      airline: 'Ryanair',
      bookingRef: 'ABC123',
      outbound: {
        flightNo: 'FR 2056',
        origCode: 'MAD',
        origName: 'Madrid (Barajas T1)',
        destCode: 'PRG',
        destName: 'Praga (Václav Havel T2)',
        date: 'Viernes, 16 Oct',
        depTime: '06:45',
        arrTime: '09:40',
        seats: '18A, 18B, 18C',
        terminal: 'T1 → T2 (Praga)'
      },
      inbound: {
        flightNo: 'FR 2057',
        origCode: 'PRG',
        origName: 'Praga (Václav Havel T2)',
        destCode: 'MAD',
        destName: 'Madrid (Barajas T1)',
        date: 'Lunes, 19 Oct',
        depTime: '17:20',
        arrTime: '20:30',
        seats: '18A, 18B, 18C',
        terminal: 'T2 (Praga) → T1'
      },
      transfer: 'Autobús 119 directo hasta metro Nádraží Veleslavín (Línea A verde, 15 min). O pedir Bolt/Uber (~450-550 CZK).'
    },
    exchangeRate: 25.20
  },
  currentDay: 1,
  itinerary: [
    // DÍA 1
    {
      id: 'd1-1',
      day: 1,
      time: '10:30',
      title: 'Plaza de la Ciudad Vieja y Reloj Astronómico',
      czechName: 'Staroměstské náměstí & Pražský orloj',
      desc: 'El corazón palpitante de Praga. Ver las figuras mecánicas de los 12 apóstoles en la campanada en punto.',
      familyTip: 'Llegad 10 minutos antes de la hora en punto para coger buen sitio con los niños delante del reloj.',
      coords: '50.0870,14.4208',
      mapsQuery: 'Prague Astronomical Clock',
      completed: false
    },
    {
      id: 'd1-2',
      day: 1,
      time: '12:00',
      title: 'Iglesia de Nuestra Señora de Týn y Callejuelas',
      czechName: 'Kostel Matky Boží před Týnem',
      desc: 'Las famosas agujas góticas de cuento que parecen el castillo de Disney. Explorar los pasajes peatonales.',
      familyTip: 'El suelo es de adoquín tradicional; cuidado si vais con carrito, mejor empujar despacio.',
      coords: '50.0878,14.4226',
      mapsQuery: 'Church of Our Lady before Týn',
      completed: false
    },
    {
      id: 'd1-3',
      day: 1,
      time: '13:30',
      title: 'Almuerzo familiar y parada Trdelník',
      czechName: 'Trdelník tradicional',
      desc: 'Probar el famoso pastel cilíndrico asado con azúcar y canela, o relleno de helado para los niños.',
      familyTip: '¡Pedid uno para compartir primero! Son contundentes y a los peques les chiflan.',
      coords: '50.0865,14.4200',
      mapsQuery: 'Trdelnik Prague Old Town',
      completed: false
    },
    {
      id: 'd1-4',
      day: 1,
      time: '15:00',
      title: 'Barrio Judío (Josefov) y Sinagogas Históricas',
      czechName: 'Josefov',
      desc: 'Paseo tranquilo por la Sinagoga Española y el Antiguo Cementerio Judío con sus miles de lápidas.',
      familyTip: 'Es un recorrido muy llano y sin coches, ideal para pasear tranquilos tras comer.',
      coords: '50.0900,14.4194',
      mapsQuery: 'Josefov Prague',
      completed: false
    },
    {
      id: 'd1-5',
      day: 1,
      time: '17:30',
      title: 'Torre de la Pólvora y Casa Municipal',
      czechName: 'Prašná brána & Obecní dům',
      desc: 'Una de las puertas medievales originales de la ciudad, en estilo gótico negro imponente.',
      familyTip: 'Al lado está el centro comercial Palladium por si necesitáis baños cómodos con cambiador o algo de abrigo.',
      coords: '50.0872,14.4278',
      mapsQuery: 'Powder Tower Prague',
      completed: false
    },

    // DÍA 2
    {
      id: 'd2-1',
      day: 2,
      time: '09:00',
      title: 'Subida escénica en el Tranvía 22 al Castillo',
      czechName: 'Tramvaj 22 hacia Pohořelec / Pražský hrad',
      desc: 'Ruta panorámica inolvidable que sube la colina atravesando los barrios históricos.',
      familyTip: 'Bajar en la parada Pohořelec para hacer la visita al Castillo siempre en bajada (mucho más cómodo con niños).',
      coords: '50.0875,14.3888',
      mapsQuery: 'Pohořelec tram stop Prague',
      completed: false
    },
    {
      id: 'd2-2',
      day: 2,
      time: '09:45',
      title: 'Castillo de Praga y Catedral de San Vito',
      czechName: 'Pražský hrad & Katedrála svatého Víta',
      desc: 'El castillo antiguo más grande del mundo. Impresionantes vidrieras de colores de Alfons Mucha.',
      familyTip: 'La entrada a los patios es gratuita; solo se paga ticket para el interior de San Vito y Callejón del Oro.',
      coords: '50.0909,14.4005',
      mapsQuery: 'Prague Castle',
      completed: false
    },
    {
      id: 'd2-3',
      day: 2,
      time: '11:30',
      title: 'El Callejón del Oro',
      czechName: 'Zlatá ulička',
      desc: 'Casitas diminutas de colores del siglo XVI donde vivían los orfebres, guardianes y Franz Kafka.',
      familyTip: 'A los niños les fascina ver las armaduras medievales y las habitaciones en miniatura.',
      coords: '50.0919,14.4039',
      mapsQuery: 'Golden Lane Prague',
      completed: false
    },
    {
      id: 'd2-4',
      day: 2,
      time: '12:00',
      title: 'Cambio de Guardia en el Patio de Honor',
      czechName: 'Střídání stráží',
      desc: 'Ceremonia solemne con fanfarria de trompetas desde las ventanas del palacio presidencial.',
      familyTip: 'El cambio grande es a las 12:00 en punto. Muy vistoso para los más pequeños.',
      coords: '50.0898,14.3989',
      mapsQuery: 'Hradcany Square Prague',
      completed: false
    },
    {
      id: 'd2-5',
      day: 2,
      time: '14:30',
      title: 'Muro de John Lennon en Malá Strana',
      czechName: 'Lennonova zeď',
      desc: 'Muro lleno de grafitis, poemas de paz y arte psicodélico de los Beatles.',
      familyTip: 'Se pueden comprar rotuladores cerca si los niños quieren dejar un mensaje de paz o un dibujo familiar.',
      coords: '50.0862,14.4069',
      mapsQuery: 'Lennon Wall Prague',
      completed: false
    },
    {
      id: 'd2-6',
      day: 2,
      time: '16:00',
      title: 'Cruzar el Puente de Carlos (Karlův most)',
      czechName: 'Karlův most',
      desc: 'Paseo entre las 30 estatuas barrocas sobre el río Moldava con artistas, músicos y vistas al castillo.',
      familyTip: 'Tocar el relieve del perro y de San Juan Nepomuceno en la estatua para pedir el deseo de volver a Praga.',
      coords: '50.0865,14.4114',
      mapsQuery: 'Charles Bridge Prague',
      completed: false
    },

    // DÍA 3
    {
      id: 'd3-1',
      day: 3,
      time: '09:30',
      title: 'Funicular a la Colina de Petřín y la Torre',
      czechName: 'Lanová dráha na Petřín & Petřínská rozhledna',
      desc: 'Subida en funicular (incluido en el billete normal de transporte) a la torre inspirada en la Torre Eiffel.',
      familyTip: 'La torre tiene ascensor disponible si vais con peques o no queréis subir los 299 escalones a pie.',
      coords: '50.0835,14.3951',
      mapsQuery: 'Petrin Tower Prague',
      completed: false
    },
    {
      id: 'd3-2',
      day: 3,
      time: '11:00',
      title: 'Laberinto de Espejos de Petřín',
      czechName: 'Zrcadlové bludiště na Petříně',
      desc: 'Pabellón divertido con laberinto de espejos y sala de espejos deformantes para reírse en familia.',
      familyTip: '¡Plan estrella para niños! Entrada muy económica y garantizadas las risas familiares.',
      coords: '50.0832,14.3965',
      mapsQuery: 'Mirror Maze Petrin Prague',
      completed: false
    },
    {
      id: 'd3-3',
      day: 3,
      time: '13:00',
      title: 'Parque Infantil en Dětský Ostrov (Isla de los Niños)',
      czechName: 'Dětský ostrov',
      desc: 'Una isla en el río Moldava dedicada enteramente a columpios, tirolinas y zonas de juego cerradas.',
      familyTip: 'Lugar perfecto para que los niños corran a sus anchas mientras los padres descansan con vistas al río.',
      coords: '50.0789,14.4093',
      mapsQuery: 'Detsky ostrov Prague',
      completed: false
    },
    {
      id: 'd3-4',
      day: 3,
      time: '15:30',
      title: 'Paseo en Barco Panorámico por el Río Moldava',
      czechName: 'Plavba lodí po Vltavě',
      desc: 'Travesía relajada de 50-60 minutos pasando por debajo del Puente de Carlos con audioguía.',
      familyTip: 'Ideal tras haber caminado por la mañana. Se puede tomar algo a bordo y descansar las piernas.',
      coords: '50.0883,14.4137',
      mapsQuery: 'Prague River Cruise Pier',
      completed: false
    },

    // DÍA 4
    {
      id: 'd4-1',
      day: 4,
      time: '10:00',
      title: 'Fortaleza Medieval de Vyšehrad',
      czechName: 'Vyšehrad',
      desc: 'Antigua fortaleza con murallas sobre el acantilado del río, jardines verdes, esculturas y paz absoluta.',
      familyTip: 'Tiene un parque infantil fantástico de madera basado en antiguas leyendas checas.',
      coords: '50.0644,14.4199',
      mapsQuery: 'Vysehrad Prague',
      completed: false
    },
    {
      id: 'd4-2',
      day: 4,
      time: '12:30',
      title: 'La Casa Danzante (Ginger & Fred)',
      czechName: 'Tančící dům',
      desc: 'El famoso edificio deconstructivista de Frank Gehry junto al río que simula una pareja bailando.',
      familyTip: 'Haceros una foto familiar haciendo poses divertidas simulando sostener el edificio inclinado.',
      coords: '50.0754,14.4141',
      mapsQuery: 'Dancing House Prague',
      completed: false
    },
    {
      id: 'd4-3',
      day: 4,
      time: '14:30',
      title: 'Plaza de Wenceslao y Compras de Recuerdos',
      czechName: 'Václavské náměstí',
      desc: 'Gran avenida histórica con tiendas, marionetas de madera tradicionales y el Museo Nacional.',
      familyTip: 'Visitar la juguetería Hamleys (Na Příkopě 14) con su tiovivo veneciano interior y tobogán gigante.',
      coords: '50.0822,14.4267',
      mapsQuery: 'Wenceslas Square Prague',
      completed: false
    },
    {
      id: 'd4-4',
      day: 4,
      time: '16:30',
      title: 'Merienda de despedida en el Café Slavia',
      czechName: 'Kavárna Slavia',
      desc: 'Café histórico de techos altos frente al Teatro Nacional con tartas exquisitas y vistas al castillo iluminado.',
      familyTip: 'Probad la tarta de manzana (Jablečný závin) con chocolate caliente para cerrar el viaje.',
      coords: '50.0818,14.4135',
      mapsQuery: 'Cafe Slavia Prague',
      completed: false
    }
  ],
  places: [
    {
      name: 'Puente de Carlos',
      cz: 'Karlův most',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Vistas', 'Paseo'],
      desc: 'El icono de Praga. Construido en 1357, flanqueado por 30 estatuas barrocas.',
      familyTip: 'Id temprano (antes de las 9:30) o al atardecer para evitar aglomeraciones.',
      coords: '50.0865,14.4114',
      mapsQuery: 'Charles Bridge'
    },
    {
      name: 'Castillo de Praga y San Vito',
      cz: 'Pražský hrad',
      category: 'castle',
      tags: ['⭐ Imprescindible', '🏰 Castillo'],
      desc: 'El mayor complejo palaciego medieval del mundo. La Catedral de San Vito corta la respiración.',
      familyTip: 'Subir en tranvía 22 y bajar a pie por las escaleras viejas del castillo.',
      coords: '50.0909,14.4005',
      mapsQuery: 'Prague Castle'
    },
    {
      name: 'Reloj Astronómico y Plaza Vieja',
      cz: 'Staroměstský orloj',
      category: 'monument',
      tags: ['⭐ Imprescindible', 'Niños'],
      desc: 'Reloj astronómico medieval del año 1410 con desfile de apóstoles en cada hora.',
      familyTip: 'A los niños les encanta ver al esqueleto tocar la campana.',
      coords: '50.0870,14.4208',
      mapsQuery: 'Prague Astronomical Clock'
    },
    {
      name: 'Dětský Ostrov (Isla de los Niños)',
      cz: 'Dětský ostrov',
      category: 'kids',
      tags: ['👶 Ideal Niños', 'Parque', 'Relax'],
      desc: 'Isla fluvial con recintos vallados de juegos divididos por edades, columpios y bancos.',
      familyTip: 'Entrada gratuita. Ideal para recargar energía a mitad del viaje.',
      coords: '50.0789,14.4093',
      mapsQuery: 'Detsky Ostrov Prague'
    },
    {
      name: 'Laberinto de Espejos de Petřín',
      cz: 'Zrcadlové bludiště',
      category: 'kids',
      tags: ['👶 Ideal Niños', 'Divertido'],
      desc: 'Castillo de madera con laberinto de espejos y sala de risas con espejos cóncavos y convexos.',
      familyTip: 'Los niños querrán repetir la sala de espejos deformantes varias veces.',
      coords: '50.0832,14.3965',
      mapsQuery: 'Mirror Maze Petrin'
    },
    {
      name: 'Colina de Petřín y Funicular',
      cz: 'Petřínské sady',
      category: 'views',
      tags: ['🌆 Miradores', 'Naturaleza'],
      desc: 'El pulmón verde de Praga con rosaledas, la torre panorámica y el histórico funicular.',
      familyTip: 'El billete normal de transporte de Praga de 24h/72h cubre el funicular.',
      coords: '50.0835,14.3951',
      mapsQuery: 'Petrin Tower'
    },
    {
      name: 'Jardín Wallenstein',
      cz: 'Valdštejnská zahrada',
      category: 'castle',
      tags: ['🏰 Castillo & Malá Strana', 'Peces y Pavos'],
      desc: 'Jardín barroco espectacular con pavos reales albinos paseando libres y estanque con carpas gigantes.',
      familyTip: 'Entrada gratuita (abierto de abril a octubre). A los niños les chifla ver los pavos reales.',
      coords: '50.0901,14.4055',
      mapsQuery: 'Wallenstein Garden Prague'
    },
    {
      name: 'Callejón del Oro',
      cz: 'Zlatá ulička',
      category: 'castle',
      tags: ['🏰 Castillo', 'Cuento'],
      desc: 'Calle diminuta empotrada en las murallas del castillo con casas de colores y armaduras.',
      familyTip: 'A partir de las 17:00 (o 16:00 en invierno) el acceso a la calle suele ser gratis.',
      coords: '50.0919,14.4039',
      mapsQuery: 'Golden Lane Prague Castle'
    },
    {
      name: 'Juguetería Hamleys Praga',
      cz: 'Hamleys Praha',
      category: 'kids',
      tags: ['👶 Ideal Niños', 'Compras'],
      desc: 'Mucho más que una tienda: tiene un carrusel veneciano, tobogán gigante, LEGO y mariposario.',
      familyTip: '¡Ideal si llueve o hace frío! Está en la calle peatonal Na Příkopě.',
      coords: '50.0850,14.4277',
      mapsQuery: 'Hamleys Prague'
    },
    {
      name: 'Fortaleza de Vyšehrad',
      cz: 'Vyšehrad',
      category: 'views',
      tags: ['🌆 Miradores', 'Historia', 'Parque'],
      desc: 'Fortaleza sobre la roca con las mejores vistas del río, sin aglomeraciones de turistas.',
      familyTip: 'Caminata muy agradable con parque infantil de madera tematizado.',
      coords: '50.0644,14.4199',
      mapsQuery: 'Vysehrad'
    },
    {
      name: 'Muro de John Lennon',
      cz: 'Lennonova zeď',
      category: 'monument',
      tags: ['Música', 'Fotos', 'Arte'],
      desc: 'Símbolo de libertad y paz decorado con letras de canciones de The Beatles.',
      familyTip: 'En el pequeño puente contiguo suele haber patos en el canal del molino del Gran Prior.',
      coords: '50.0862,14.4069',
      mapsQuery: 'Lennon Wall'
    },
    {
      name: 'Casa Danzante',
      cz: 'Tančící dům',
      category: 'views',
      tags: ['Arquitectura', 'Río'],
      desc: 'Curioso edificio moderno que contrasta con el barroco y gótico de la ciudad.',
      familyTip: 'En la planta superior hay una cafetería con mirador 360º al río y al castillo.',
      coords: '50.0754,14.4141',
      mapsQuery: 'Dancing House'
    }
  ],
  checklist: [
    { id: 'c1', cat: 'Documentos', text: 'DNI / Pasaportes de toda la familia en vigor', checked: true },
    { id: 'c2', cat: 'Documentos', text: 'Tarjeta Sanitaria Europea (TSE) de cada miembro', checked: true },
    { id: 'c3', cat: 'Documentos', text: 'Tarjetas sin comisiones de cambio (ej. Revolut, N26)', checked: true },
    { id: 'c4', cat: 'Documentos', text: 'Billetes de avión y reserva de hotel descargados offline', checked: false },
    { id: 'c5', cat: 'Salud', text: 'Botiquín infantil (Apiretal / Dalsy / Termómetro)', checked: false },
    { id: 'c6', cat: 'Salud', text: 'Tiritas para rozaduras de caminar', checked: false },
    { id: 'c7', cat: 'Salud', text: 'Toallitas húmedas y gel hidroalcohólico', checked: false },
    { id: 'c8', cat: 'Ropa', text: 'Calzado cómodo y con buena suela para adoquines', checked: false },
    { id: 'c9', cat: 'Ropa', text: 'Chubasquero o paraguas plegable ligero', checked: false },
    { id: 'c10', cat: 'Ropa', text: 'Capas de abrigo según la estación (forro polar/cortavientos)', checked: false },
    { id: 'c11', cat: 'Tecnología', text: 'Batería externa móvil (Powerbank) para todo el día', checked: false },
    { id: 'c12', cat: 'Tecnología', text: 'Cables cargadores para todos los teléfonos', checked: false },
    { id: 'c13', cat: 'Tecnología', text: 'Descargar mapa offline de Praga en Google Maps', checked: false },
    { id: 'c14', cat: 'Especial Niños', text: 'Carrito de paseo ligero y plegable (o mochila portabebé)', checked: false },
    { id: 'c15', cat: 'Especial Niños', text: 'Botella de agua térmica reutilizable para rellenar', checked: false },
    { id: 'c16', cat: 'Especial Niños', text: 'Snacks para excursiones (frutos secos, galletas)', checked: false },
    { id: 'c17', cat: 'Especial Niños', text: 'Cuaderno y pinturas para esperas en restaurantes', checked: false }
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
      if (parsed.trip && parsed.trip.flights && typeof parsed.trip.flights.outbound === 'string') {
        parsed.trip.flights = defaultData.trip.flights;
      }
      return { ...defaultData, ...parsed };
    } catch (e) {
      console.warn('Error loading state, using defaults', e);
    }
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
    1: { title: 'Día 1: Ciudad Vieja y Barrio Judío', desc: 'Recorrido a pie por las callejuelas medievales, Reloj Astronómico y trdelník.' },
    2: { title: 'Día 2: Castillo de Praga y Malá Strana', desc: 'Subida en el histórico Tranvía 22, Callejón del Oro, Muro Lennon y Puente de Carlos.' },
    3: { title: 'Día 3: Funicular, Espejos y Río Moldava', desc: 'Colina Petřín con laberinto divertido, la Isla de los Niños y paseo en barco.' },
    4: { title: 'Día 4: Fortaleza de Vyšehrad y Compras', desc: 'Vistas panorámicas espectaculares, Casa Danzante y juguetería Hamleys.' }
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
      const pnr = appState.trip.flights.bookingRef || 'ABC123';
      navigator.clipboard.writeText(pnr);
      showToast(`¡Localizador ${pnr} copiado!`);
    });
  }

  const btnEditFlights = document.getElementById('btn-edit-flights');
  const modalFlights = document.getElementById('modal-edit-flights');
  const formFlights = document.getElementById('form-edit-flights');
  const cancelFlightsBtn = document.getElementById('btn-cancel-flights');

  if (btnEditFlights && modalFlights) {
    btnEditFlights.addEventListener('click', () => {
      const f = appState.trip.flights;
      document.getElementById('edit-flight-pnr').value = f.bookingRef || '';
      
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
      const passenger = document.getElementById('bp-passenger-input').value.trim();
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
  if (hPhone) hPhone.textContent = h.phone;
  if (hRef) hRef.textContent = h.bookingRef;
  if (hNotes) hNotes.textContent = h.notes;

  const btnMapsHotel = document.getElementById('btn-hotel-maps');
  if (btnMapsHotel) {
    btnMapsHotel.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.address)}`;
  }

  const btnCallHotel = document.getElementById('btn-hotel-call');
  if (btnCallHotel) {
    btnCallHotel.href = `tel:${h.phone.replace(/\s+/g, '')}`;
  }

  // Render Ryanair Flights
  const pnrEl = document.getElementById('flight-pnr-val');
  if (pnrEl) pnrEl.textContent = f.bookingRef || 'ABC123';

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

  if (elOutNo) elOutNo.textContent = out.flightNo || 'FR 2056';
  if (elOutOrigCode) elOutOrigCode.textContent = out.origCode || 'MAD';
  if (elOutOrigName) elOutOrigName.textContent = out.origName || 'Madrid';
  if (elOutDepTime) elOutDepTime.textContent = out.depTime || '06:45';
  if (elOutDate) elOutDate.textContent = out.date || 'Viernes';
  if (elOutDestCode) elOutDestCode.textContent = out.destCode || 'PRG';
  if (elOutDestName) elOutDestName.textContent = out.destName || 'Praga';
  if (elOutArrTime) elOutArrTime.textContent = out.arrTime || '09:40';
  if (elOutSeats) elOutSeats.textContent = out.seats || 'Por asignar';
  if (elOutTerminal) elOutTerminal.textContent = out.terminal || 'T1 → T2 (Praga)';

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

  if (elInNo) elInNo.textContent = ret.flightNo || 'FR 2057';
  if (elInOrigCode) elInOrigCode.textContent = ret.origCode || 'PRG';
  if (elInOrigName) elInOrigName.textContent = ret.origName || 'Praga';
  if (elInDepTime) elInDepTime.textContent = ret.depTime || '17:20';
  if (elInDate) elInDate.textContent = ret.date || 'Lunes';
  if (elInDestCode) elInDestCode.textContent = ret.destCode || 'MAD';
  if (elInDestName) elInDestName.textContent = ret.destName || 'Madrid';
  if (elInArrTime) elInArrTime.textContent = ret.arrTime || '20:30';
  if (elInSeats) elInSeats.textContent = ret.seats || 'Por asignar';
  if (elInTerminal) elInTerminal.textContent = ret.terminal || 'T2 (Praga) → T1';

  const fTrans = document.getElementById('flight-trans-val');
  if (fTrans) fTrans.textContent = f.transfer || 'Autobús 119 directo hasta metro Nádraží Veleslavín (Línea A verde, 15 min).';
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

  const text = `🏰 *NUESTRO VIAJE A PRAGA EN FAMILIA*\n\n🏨 *Hotel:* ${h.name}\n📍 ${h.address}\n📞 Tel: ${h.phone}\n🔖 Reserva Hotel: ${h.bookingRef}\n\n✈️ *VUELOS RYANAIR*\n🔖 Localizador PNR: ${f.bookingRef || 'ABC123'}\n🛫 Ida: ${out.flightNo || ''} (${out.origCode} → ${out.destCode}) ${out.date || ''} ${out.depTime || ''}\n🛬 Vuelta: ${ret.flightNo || ''} (${ret.origCode} → ${ret.destCode}) ${ret.date || ''} ${ret.depTime || ''}\n👥 Asientos: ${out.seats || 'Pendientes'}\n\n🚨 *Emergencias Praga:*\n112 (Emergencias UE) | +420 233 097 211 (Embajada España)`;

  if (navigator.share) {
    navigator.share({
      title: 'Datos del Viaje a Praga',
      text: text
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast('¡Resumen de reservas copiado al portapapeles!');
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
