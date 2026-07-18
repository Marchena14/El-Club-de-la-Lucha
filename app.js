/* ========================================
   El Club de la Lucha - App JS
   Sin dependencias. Vanilla JS + localStorage.
   ======================================== */

// --- POKÉDEX: nombre -> ID national dex (solo competitivos VGC) ---
// Parser normaliza: minúsculas, guiones->espacios, quita符号
const POKEDEX = {
  // Gen 1
  venusaur:3,charizard:6,blastoise:9,butterfree:13,beedrill:15,pidgeot:18,
  raichu:26,sandslash:28,nidoqueen:31,nidoking:34,clefable:36,nineta:38,
  wigglytuff:40,golbat:42,vileplume:45,venomoth:49,dugtrio:51,persian:53,
  golduck:55,arcanine:59,poliwrath:62,alakazam:65,machamp:68,victreebel:71,
  tentacruel:73,golem:76,rapidash:78,slowbro:80,magneton:82,dodrio:85,
  dewgong:87,muk:89,cloyster:91,gengar:94,onix:95,hypno:97,kingler:99,
  electrode:101,exeggutor:103,marowak:105,hitmonlee:106,hitmonchan:107,
  weezing:110,rhydon:112,chansey:113,kangaskhan:115,starmie:121,
  "mr. mime":122,scyther:123,jynx:124,electabuzz:125,magmar:126,
  pinsir:127,tauros:128,gyarados:130,lapras:131,eevee:133,vaporeon:134,
  jolteon:135,flareon:136,porygon:137,omastar:139,kabutops:141,
  aerodactyl:142,snorlax:143,articuno:144,zapdos:145,moltres:146,
  dragonite:149,mewtwo:150,
  // Gen 2
  meganium:154,typhlosion:157,feraligatr:159,ampharos:175,bellossom:176,
  azumarill:178,sudowoodo:179,politoed:180,jumpluff:183,aipom:184,
  sunflora:186,yanma:187,wooper:188,quagsire:189,murkrow:190,slowking:191,
  misdreavus:192,wobbuffet:194,girafarig:195,forretress:197,dunsparce:198,
  gligar:199,steelix:200,granbull:202,qwilfish:203,scizor:204,
  heracross:206,sneasel:207,ursaring:209,magcargo:211,swinub:212,
  piloswine:213,delibird:214,mantine:215,skarmory:216,houndour:217,
  houndoom:218,kingdra:219,donphan:221,porygon2:222,stantler:223,
  smeargle:224,hitmontop:226,blissey:231,raikou:232,entei:233,suicune:234,
  tyranitar:237,"ho-oh":239,
  // Gen 3
  sceptile:254,blaziken:257,swampert:260,ludicolo:272,shiftry:275,
  pelipper:279,gardevoir:282,breloom:286,slaking:289,ninjask:291,
  shedinja:292,exploud:295,hariyama:297,aggron:306,medicham:308,
  manectric:310,roserade:306,swalot:317,sharpedo:319,wailord:321,
  camerupt:323,torkoal:324,flygon:330,cacturne:332,altaria:334,
  zangoose:335,seviper:336,lunatone:337,solrock:338,whiscash:340,
  crawdaunt:342,claydol:344,cradily:346,armaldo:348,milotic:350,
  castform:351,banette:354,dusclops:356,tropius:357,absol:359,
  glalie:362,walrein:365,salamence:373,metagross:376,regirock:377,
  regice:378,registeel:379,latias:380,latios:381,kyogre:382,groudon:383,
  rayquaza:384,
  // Gen 4
  torterra:389,infernape:392,empoleon:395,staraptor:398,bibarel:400,
  luxray:405,roserade:406,luxray:405,bastiodon:410,Floatzel:417,
  gastrodon:421,drifblim:424,lopunny:426,mismagius:427,honchkrow:428,
  purugly:430,bronzong:435,spiritomb:440,garchomp:443,lucario:446,
  hippowdon:448,drapion:450,toxicroak:452,abomasnow:457,weavile:458,
  magnezone:459,rhyperior:461,tangrowth:462,electivire:463,magmortar:464,
  togekiss:465,yanmega:466,leafeon:467,glaceon:468,gliscor:469,
  mamoswine:470,"porygon-z":471,gallade:472,probopass:473,dusknoir:474,
  froslass:475,rotom:476,uxie:477,mesprit:478,azelf:479,dialga:480,
  palkia:481,heatran:482,regigigas:483,giratina:484,cresselia:485,
  darkrai:488,
  // Gen 5
  serperior:494,tepig:495,samurott:497,stoutland:502,liepard:504,
  simisage:506,simisear:508,simipour:510,musharna:512,unfezant:515,
  zebstrika:517,gigalith:520,swoobat:522,excadrill:524,audino:525,
  conkeldurr:528,seismitoad:531,throh:532,sawk:533,scolipede:534,
  krookodile:537,darmanitan:539,crustle:542,scrafty:544,sigilyph:545,
  cofagrigus:547,carracosta:549,archeops:551,garbodor:553,zoroark:555,
  cinccino:557,gothitelle:560,reuniclus:563,swanna:565,vanilluxe:568,
  sawsbuck:570,emolga:571,escavalier:573,amoonguss:575,jellicent:577,
 alomomola:578,galvantula:580,ferrothorn:582,klinklang:585,eelektross:587,
  chandelure:592,haxorus:595,beartic:597,cryogonal:598,accelgor:600,
  stunfisk:601,mienshao:603,druddigon:604,golurk:606,bisharp:608,
  braviary:611,mandibuzz:613,hydreigon:618,volcarona:620,cobalion:621,
  terrakion:622,virizion:623,tornadus:624,thundurus:625,reshiram:626,
  zekrom:627,landorus:628,kyurem:629,keldeo:630,meloetta:631,
  genesect:632,
  // Gen 6
  chesnaught:652,delphox:655,greninja:658,diggersby:660,talonflame:663,
  vivillon:666,pyroar:668,florges:671,pancham:675,pangoro:676,
  meowstic:679,aegislash:682,aromatisse:684,slurpuff:686,malamar:688,
  barbaracle:690,dragalge:692,clawitzer:694,heliolisk:696,tyrantrum:698,
  aurorus:700,sylveon:701,hawlucha:702,goodra:707,klefki:708,
  trevenant:710,gourgeist:712,avalugg:714,noivern:716,xerneas:717,
  yveltal:718,zygarde:719,diancie:720,hoopa:721,
  // Gen 7
  decidueye:723,incineroar:727,primarina:730,toucannon:733,gumshoos:735,
  vikavolt:738,crabominable:740,ribombee:743,lycanroc:745,wishiwashi:746,
  toxapex:748,mudsdale:750,araquanid:752,lurantis:754,shiinotic:757,
  salazzle:759,bewear:761,tsareena:764,comfey:765,oranguru:766,
  passimian:767,golisopod:769,palossand:771,minior:775,komala:776,
  turtonator:777,mimikyu:778,dhelmise:780,"jangmo-o":781,
  "hakamo-o":782,"kommo-o":783,"tapu koko":784,"tapu lele":785,
  "tapu bulu":786,"tapu fini":787,solgaleo:790,lunala:791,nihilego:792,
  buzzwole:793,pheromosa:794,xurkitree:795,celesteela:796,kartana:797,
  guzzlord:798,necrozma:799,magearna:800,marshadow:801,zeraora:805,
  // Gen 8
  rillaboom:812,cinderace:815,inteleon:818,corviknight:823,eldegoss:827,
  dubwool:829,drednaw:831,boltund:833,coalossal:836,flapple:838,
  appletun:839,sandaconda:841,cramorant:842,barraskewda:844,
  toxtricity:849,centiskorch:851,grapploct:853,polteageist:855,
  hatterene:858,grimmsnarl:861,obstagoon:862,perrserker:863,cursola:864,
  "sirfetch'd":865,"mr. rime":866,runerigus:867,falinks:870,
  pincurchin:871,frosmoth:873,eiscue:875,indeedee:876,morpeko:877,
  copperajah:879,dracozolt:880,arctozolt:881,dracovish:882,
  arctovish:883,duraludon:884,dragapult:887,zacian:888,zamazenta:889,
  eternatus:890,kubfu:891,urshifu:892,regieleki:894,regidrago:895,
  glastrier:896,spectrier:897,calyrex:898,
  // Gen 9
  meowscarada:908,skeledirge:911,quaquaval:914,oinkologne:916,
  lokix:920,pawmot:923,maushold:925,dachsbun:927,arboliva:930,
  garganacl:934,armarouge:936,ceruledge:937,bellibolt:939,
  kilowattrel:941,grafaiai:945,toedscruel:949,klawf:950,
  espathra:955,tinkaton:958,wugtrio:960,bombirdier:961,palafin:963,
  revavroom:965,cyclizar:966,orthworm:967,glimmora:969,houndstone:971,
  flamigo:972,cetitan:974,dondozo:976,tatsugiri:977,annhilape:978,
  clodsire:979,farigiraf:981,dudunsparce:982,kingambit:983,
  "great tusk":984,"scream tail":985,"brute bonnet":986,
  "flutter mane":987,"slither wing":988,"sandy shocks":989,
  "iron treads":990,"iron bundle":991,"iron hands":992,
  "iron jugulis":993,"iron moth":994,"iron thorns":995,
  frigibax:996,baxcalibur:998,gholdengo:1000,
  "wo-chien":1001,"chien-pao":1002,"ting-lu":1003,"chi-yu":1004,
  "roaring moon":1005,"iron valiant":1006,koraidon:1007,miraidon:1008,
  "walking wake":1009,"iron leaves":1010,sinistcha:1013,
  okidogi:1014,munkidori:1015,fezandipiti:1016,ogerpon:1017,
  archaludon:1018,hydrapple:1019,"gouging fire":1020,
  "raging bolt":1021,"iron boulder":1022,"iron crown":1023,
  terapagos:1024,basculegion:902,ursaluna:901,sneasler:903,
  overqwil:904,

  // Formas con sprites propios (paths relativos a sprites/pokemon/)
  "basculegion (m)": "other/home/902.png",
  "basculegion (f)": "other/home/10248.png",
  "indeedee (m)": "other/home/876.png",
  "indeedee (f)": "other/home/10186.png",
  "urshifu rapid strike": 892,
};

// --- UTILIDADES ---
const DB = {
  _supabase: null,
  _cache: { sesiones: [], deberes: [] },
  _cargado: false,

  get(clave) {
    return this._cache[clave] || [];
  },

  async set(clave, datos) {
    this._cache[clave] = datos;
    localStorage.setItem('club_cache', JSON.stringify(this._cache));
    if (this._supabase) {
      await this._syncSupabase(clave, datos);
    }
  },

  async _syncSupabase(clave, datos) {
    mostrarEstado('loading', 'Guardando...');
    try {
      const tabla = clave;
      const { error: delError } = await this._supabase.from(tabla).delete().gte('created_at', '1900-01-01');
      if (delError) throw delError;
      if (datos.length > 0) {
        const insertar = datos.map(d => {
          const row = { ...d };
          delete row.created_at;
          if (row.fechaLimite !== undefined) {
            row.fecha_limite = row.fechaLimite || null;
            delete row.fechaLimite;
          }
          return row;
        });
        const { error: insError } = await this._supabase.from(tabla).insert(insertar);
        if (insError) throw insError;
      }
      mostrarEstado('ok', 'Guardado correctamente');
    } catch (e) {
      console.error('Error Supabase:', e);
      mostrarEstado('error', 'Error al guardar: ' + e.message);
    }
  },

  async cargar() {
    const config = this._getConfig();
    if (config) {
      this._supabase = supabase.createClient(config.url, config.anonKey);
      try {
        await this._cargarDesdeSupabase();
        this._cargado = true;
        return;
      } catch (e) {
        console.warn('Supabase:', e);
        mostrarEstado('error', 'Error conectando con Supabase: ' + e.message);
      }
    }
    const cache = localStorage.getItem('club_cache');
    if (cache) {
      try { this._cache = JSON.parse(cache); } catch {}
    }
    this._cargado = true;
  },

  async _cargarDesdeSupabase() {
    const [sesionesRes, deberesRes] = await Promise.all([
      this._supabase.from('sesiones').select('*').order('fecha', { ascending: false }),
      this._supabase.from('deberes').select('*').order('created_at', { ascending: false })
    ]);
    if (sesionesRes.error) throw sesionesRes.error;
    if (deberesRes.error) throw deberesRes.error;
    this._cache.sesiones = (sesionesRes.data || []).map(s => {
      if (s.fecha_limite !== undefined) {
        s.fechaLimite = s.fecha_limite;
        delete s.fecha_limite;
      }
      return s;
    });
    this._cache.deberes = (deberesRes.data || []).map(d => {
      if (d.fecha_limite !== undefined) {
        d.fechaLimite = d.fecha_limite;
        delete d.fecha_limite;
      }
      return d;
    });
    localStorage.setItem('club_cache', JSON.stringify(this._cache));
  },

  _getConfig() {
    try {
      const raw = localStorage.getItem('club_config');
      if (!raw) return null;
      const c = JSON.parse(raw);
      if (c && c.url && c.anonKey) return c;
    } catch {}
    return null;
  },

  _ensureConfig() {
    if (!this._getConfig()) {
      localStorage.setItem('club_config', JSON.stringify({
        url: 'https://kckiulvymfzcbklccidq.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja2l1bHZ5bWZ6Y2JrbGNjaWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNzU3NTYsImV4cCI6MjA5OTk1MTc1Nn0.8mGqAYrLD0hsmNv0NdBoybRuX8LkQWJsFZA223wP6nY'
      }));
    }
  },

  id() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },
  fechaFormateada(fechaStr) {
    if (!fechaStr) return '';
    const [y, m, d] = fechaStr.split('-');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
  },
  fechaRelativa(fechaStr) {
    if (!fechaStr) return '';
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaStr + 'T00:00:00');
    const diff = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Ma\u00f1ana';
    if (diff === -1) return 'Ayer';
    if (diff > 0) return `En ${diff} d\u00edas`;
    return `Hace ${Math.abs(diff)} d\u00edas`;
  }
};

// --- STATUS BAR ---
function mostrarEstado(tipo, mensaje) {
  const bar = document.getElementById('status-bar');
  bar.className = 'status-bar ' + tipo;
  bar.textContent = mensaje;
  bar.style.display = 'block';
  if (tipo !== 'loading') {
    setTimeout(() => { bar.style.display = 'none'; }, 3000);
  }
}

// --- CONFIG SUPABASE ---
const Config = {
  abrirModal() {
    const modal = document.getElementById('modal-config');
    const config = DB._getConfig();
    if (config) {
      document.getElementById('config-url').value = config.url;
      document.getElementById('config-anon-key').value = config.anonKey;
    }
    modal.style.display = 'flex';
  },
  cerrarModal() {
    document.getElementById('modal-config').style.display = 'none';
  },
  async guardar(e) {
    e.preventDefault();
    const config = {
      url: document.getElementById('config-url').value.trim(),
      anonKey: document.getElementById('config-anon-key').value.trim()
    };
    localStorage.setItem('club_config', JSON.stringify(config));
    DB._supabase = supabase.createClient(config.url, config.anonKey);
    this.cerrarModal();
    mostrarEstado('loading', 'Conectando con Supabase...');
    try {
      await DB._cargarDesdeSupabase();
      mostrarEstado('ok', 'Conectado correctamente');
      Sesiones.render();
      Deberes.render();
    } catch (e) {
      console.error('Error conectando:', e);
      mostrarEstado('error', 'Error: ' + e.message);
    }
  }
};

// --- PARSING DE POKÉPASTE ---
function normalizarNombre(str) {
  return str.toLowerCase()
    .replace(/['']/g, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsearPoképaste(texto) {
  if (!texto) return [];
  const nombres = [];
  const lineas = texto.split('\n');
  for (const linea of lineas) {
    const trimmed = linea.trim();
    if (!trimmed) continue;
    if (!trimmed.includes('@')) continue;
    let limpio = trimmed.split('@')[0].trim();
    let forma = null;
    const mMatch = limpio.match(/\s*\((M|F)\)\s*|[♂♀]/);
    if (mMatch) {
      const marker = mMatch[0];
      if (marker === '(M)' || marker === '♂') forma = '(m)';
      else if (marker === '(F)' || marker === '♀') forma = '(f)';
    }
    limpio = limpio.replace(/\s*\([MF]\)\s*/g, '').trim();
    limpio = limpio.replace(/[♂♀]/g, '').trim();
    if (!forma) {
      const sufijo = limpio.match(/-([MF])\s*$/);
      if (sufijo) forma = sufijo[1] === 'M' ? '(m)' : '(f)';
    }
    limpio = limpio.replace(/-([MF])\s*$/i, '').trim();
    const token = limpio.split(/\s+/)[0];
    const baseNorm = normalizarNombre(limpio);
    const tokenNorm = normalizarNombre(token);
    const claveForma = forma ? baseNorm + ' ' + forma : null;
    const sprite = (claveForma && POKEDEX[claveForma]) || POKEDEX[baseNorm] || POKEDEX[tokenNorm];
    if (sprite) {
      nombres.push({ nombre: limpio, sprite });
    }
  }
  return nombres;
}

// --- YOUTUBE ---
function extraerYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// --- SPRITES ---
function spriteUrl(sprite) {
  const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  if (typeof sprite === 'string') return BASE + sprite;
  if (typeof sprite === 'number') return `${BASE}${sprite}.png`;
  return `${BASE}0.png`;
}

function renderEquipo(equipo, urlPaste) {
  if (!equipo || equipo.length === 0) return '';
  return `<div class="equipo-sprites">
    ${equipo.map(p => {
      const s = p.sprite || p.id;
      return `
      <a href="${escHtml(urlPaste)}" target="_blank" rel="noopener" class="sprite-link" title="${escHtml(p.nombre)}">
        <img src="${spriteUrl(s)}" alt="${escHtml(p.nombre)}" class="sprite-img" loading="lazy">
      </a>`;
    }).join('')}
  </div>`;
}

function renderYouTube(url) {
  if (!url) return '';
  return `<a href="${escHtml(url)}" target="_blank" rel="noopener" class="pokepaste-link" style="background:var(--accent-soft);color:var(--accent);border-color:rgba(230,57,70,0.3);"><span>&#127909;</span> Vídeo en YouTube</a>`;
}

// --- NAVEGACION ---
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// --- SESIONES ---
const Sesiones = {
  filtro: 'todas',

  init() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filtro = btn.dataset.filter;
        this.render();
      });
    });
    this.render();
  },

  obtener() {
    return DB.get('sesiones').sort((a, b) => b.fecha.localeCompare(a.fecha));
  },

  render() {
    let sesiones = this.obtener();
    if (this.filtro !== 'todas') {
      sesiones = sesiones.filter(s => s.tipo === this.filtro);
    }

    const contenedor = document.getElementById('lista-sesiones');
    const vacio = document.getElementById('vacio-sesiones');

    if (sesiones.length === 0) {
      contenedor.innerHTML = '';
      vacio.style.display = 'block';
      return;
    }

    vacio.style.display = 'none';
    contenedor.innerHTML = sesiones.map(s => `
      <div class="card">
        <div class="card-top">
          <span class="card-badge badge-${s.tipo}">${s.tipo === 'teorica' ? 'Te\u00f3rica' : 'Pr\u00e1ctica'}</span>
          <div class="card-actions">
            <button class="btn btn-icon" onclick="Sesiones.editar('${s.id}')" title="Editar">&#9998;</button>
            <button class="btn btn-icon danger" onclick="Sesiones.eliminar('${s.id}')" title="Eliminar">&#10005;</button>
          </div>
        </div>
        <div class="card-date">${DB.fechaFormateada(s.fecha)} &middot; ${DB.fechaRelativa(s.fecha)}</div>
        <div class="card-title">${escHtml(s.tema)}</div>
        ${s.descripcion ? `<div class="card-desc">${renderDescripcion(s.descripcion)}</div>` : ''}
        ${(s.pokepastes || []).map(p => `
          ${renderEquipo(p.equipo, p.url)}
          ${p.url ? `<a href="${escHtml(p.url)}" target="_blank" rel="noopener" class="pokepaste-link"><span class="pokepaste-icon">&#127775;</span> Poképaste</a>` : ''}
        `).join('')}
        ${s.youtube ? renderYouTube(s.youtube) : ''}
        <div class="card-meta">
          ${s.asistentes ? `<span>&#128101; ${escHtml(s.asistentes)}</span>` : ''}
        </div>
      </div>
    `).join('');
  },

  abrirModal(id) {
    const modal = document.getElementById('modal-sesion');
    const titulo = document.getElementById('modal-sesion-titulo');
    document.getElementById('form-sesion').reset();
    document.getElementById('sesion-id').value = '';

    if (id) {
      const sesiones = this.obtener();
      const s = sesiones.find(x => x.id === id);
      if (s) {
        titulo.textContent = 'Editar Sesi\u00f3n';
        document.getElementById('sesion-id').value = s.id;
        document.getElementById('sesion-fecha').value = s.fecha;
        document.getElementById('sesion-tipo').value = s.tipo;
        document.getElementById('sesion-tema').value = s.tema;
        document.getElementById('sesion-descripcion').value = s.descripcion || '';
        document.getElementById('sesion-youtube').value = s.youtube || '';
        document.getElementById('sesion-pokepaste-url').value = (s.pokepastes && s.pokepastes[0]) ? s.pokepastes[0].url || '' : '';
        document.getElementById('sesion-pokepaste-content').value = (s.pokepastes && s.pokepastes[0]) ? s.pokepastes[0].raw || '' : '';
        document.getElementById('sesion-asistentes').value = s.asistentes || '';
      }
    } else {
      titulo.textContent = 'Nueva Sesi\u00f3n';
      document.getElementById('sesion-fecha').value = new Date().toISOString().slice(0, 10);
    }

    modal.style.display = 'flex';
  },

  cerrarModal() {
    document.getElementById('modal-sesion').style.display = 'none';
  },

  async guardar(e) {
    e.preventDefault();
    const id = document.getElementById('sesion-id').value;
    const sesiones = this.obtener();

    const pokepasteUrl = document.getElementById('sesion-pokepaste-url').value.trim();
    const pokepasteRaw = document.getElementById('sesion-pokepaste-content').value.trim();
    const pokepastes = [];
    if (pokepasteUrl || pokepasteRaw) {
      pokepastes.push({
        url: pokepasteUrl,
        raw: pokepasteRaw,
        equipo: parsearPoképaste(pokepasteRaw)
      });
    }

    const datos = {
      id: id || DB.id(),
      fecha: document.getElementById('sesion-fecha').value,
      tipo: document.getElementById('sesion-tipo').value,
      tema: document.getElementById('sesion-tema').value.trim(),
      descripcion: document.getElementById('sesion-descripcion').value.trim(),
      youtube: document.getElementById('sesion-youtube').value.trim(),
      pokepastes,
      asistentes: document.getElementById('sesion-asistentes').value.trim()
    };

    if (id) {
      const idx = sesiones.findIndex(s => s.id === id);
      if (idx !== -1) sesiones[idx] = datos;
    } else {
      sesiones.push(datos);
    }

    await DB.set('sesiones', sesiones);
    this.cerrarModal();
    this.render();
  },

  editar(id) {
    this.abrirModal(id);
  },

  async eliminar(id) {
    if (!confirm('\u00bfEliminar esta sesi\u00f3n?')) return;
    const sesiones = this.obtener().filter(s => s.id !== id);
    await DB.set('sesiones', sesiones);
    this.render();
  }
};

// --- DEBERES ---
const Deberes = {
  init() {
    this.render();
  },

  obtener() {
    return DB.get('deberes');
  },

  render() {
    const deberes = this.obtener();
    const contenedor = document.getElementById('lista-deberes');
    const vacio = document.getElementById('vacio-deberes');

    if (deberes.length === 0) {
      contenedor.innerHTML = '';
      vacio.style.display = 'block';
      return;
    }

    vacio.style.display = 'none';

    const pendientes = deberes.filter(d => !d.completado);
    const completados = deberes.filter(d => d.completado);

    contenedor.innerHTML = [
      ...pendientes.map(d => this.renderItem(d)).join(''),
      ...(completados.length > 0 ? [
        `<div style="margin: 1rem 0 0.5rem; font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:600;">Completados (${completados.length})</div>`,
        ...completados.map(d => this.renderItem(d)).join('')
      ] : [])
    ].join('');
  },

  renderItem(d) {
    const fechaLimite = d.fechaLimite
      ? `<span>${DB.fechaFormateada(d.fechaLimite)} (${DB.fechaRelativa(d.fechaLimite)})</span>`
      : '';

    return `
      <div class="deber-item ${d.completado ? 'completado' : ''}">
        <div class="deber-check ${d.completado ? 'checked' : ''}" onclick="Deberes.toggle('${d.id}')"></div>
        <div class="deber-body">
          <div class="deber-titulo">${escHtml(d.titulo)}</div>
          ${d.descripcion ? `<div class="deber-desc">${renderDescripcion(d.descripcion)}</div>` : ''}
          ${(d.pokepastes || []).map(p => `
            ${renderEquipo(p.equipo, p.url)}
            ${p.url ? `<a href="${escHtml(p.url)}" target="_blank" rel="noopener" class="pokepaste-link"><span class="pokepaste-icon">&#127775;</span> Poképaste</a>` : ''}
          `).join('')}
          <div class="deber-meta">
            <span class="deber-prioridad prioridad-${d.prioridad}">${d.prioridad === 'alta' ? 'Alta' : 'Normal'}</span>
            ${fechaLimite}
          </div>
        </div>
        <div class="card-actions">
          <button class="btn btn-icon" onclick="Deberes.editar('${d.id}')" title="Editar">&#9998;</button>
          <button class="btn btn-icon danger" onclick="Deberes.eliminar('${d.id}')" title="Eliminar">&#10005;</button>
        </div>
      </div>
    `;
  },

  abrirModal(id) {
    const modal = document.getElementById('modal-deber');
    const titulo = document.getElementById('modal-deber-titulo');
    document.getElementById('form-deber').reset();
    document.getElementById('deber-id').value = '';

    if (id) {
      const deberes = this.obtener();
      const d = deberes.find(x => x.id === id);
      if (d) {
        titulo.textContent = 'Editar Deber';
        document.getElementById('deber-id').value = d.id;
        document.getElementById('deber-titulo').value = d.titulo;
        document.getElementById('deber-descripcion').value = d.descripcion || '';
        document.getElementById('deber-pokepaste-url').value = (d.pokepastes && d.pokepastes[0]) ? d.pokepastes[0].url || '' : '';
        document.getElementById('deber-pokepaste-content').value = (d.pokepastes && d.pokepastes[0]) ? d.pokepastes[0].raw || '' : '';
        document.getElementById('deber-fecha-limite').value = d.fechaLimite || '';
        document.getElementById('deber-prioridad').value = d.prioridad;
      }
    } else {
      titulo.textContent = 'Nuevo Deber';
    }

    modal.style.display = 'flex';
  },

  cerrarModal() {
    document.getElementById('modal-deber').style.display = 'none';
  },

  async guardar(e) {
    e.preventDefault();
    const id = document.getElementById('deber-id').value;
    const deberes = this.obtener();

    const pokepasteUrl = document.getElementById('deber-pokepaste-url').value.trim();
    const pokepasteRaw = document.getElementById('deber-pokepaste-content').value.trim();
    const pokepastes = [];
    if (pokepasteUrl || pokepasteRaw) {
      pokepastes.push({
        url: pokepasteUrl,
        raw: pokepasteRaw,
        equipo: parsearPoképaste(pokepasteRaw)
      });
    }

    const datos = {
      id: id || DB.id(),
      titulo: document.getElementById('deber-titulo').value.trim(),
      descripcion: document.getElementById('deber-descripcion').value.trim(),
      pokepastes,
      fechaLimite: document.getElementById('deber-fecha-limite').value,
      prioridad: document.getElementById('deber-prioridad').value,
      completado: false
    };

    if (id) {
      const idx = deberes.findIndex(d => d.id === id);
      if (idx !== -1) {
        datos.completado = deberes[idx].completado;
        deberes[idx] = datos;
      }
    } else {
      deberes.push(datos);
    }

    await DB.set('deberes', deberes);
    this.cerrarModal();
    this.render();
  },

  editar(id) {
    this.abrirModal(id);
  },

  async toggle(id) {
    const deberes = this.obtener();
    const d = deberes.find(x => x.id === id);
    if (d) {
      d.completado = !d.completado;
      await DB.set('deberes', deberes);
      this.render();
    }
  },

  async eliminar(id) {
    if (!confirm('\u00bfEliminar este deber?')) return;
    const deberes = this.obtener().filter(d => d.id !== id);
    await DB.set('deberes', deberes);
    this.render();
  }
};

// --- RENDER DESCRIPCIÓN CON LISTAS ---
function renderDescripcion(texto) {
  if (!texto) return '';
  const lineas = texto.split('\n');
  let html = '';
  let enLista = false;
  for (const linea of lineas) {
    const esItem = /^\s*[-•*]\s+/.test(linea);
    if (esItem && !enLista) {
      html += '<ul class="desc-list">';
      enLista = true;
    } else if (!esItem && enLista) {
      html += '</ul>';
      enLista = false;
    }
    if (esItem) {
      html += `<li>${escHtml(linea.replace(/^\s*[-•*]\s+/, ''))}</li>`;
    } else {
      html += `<p>${escHtml(linea)}</p>`;
    }
  }
  if (enLista) html += '</ul>';
  return html;
}

// --- ESC HTML (global) ---
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
  DB._ensureConfig();
  await DB.cargar();
  Sesiones.init();
  Deberes.init();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      Sesiones.cerrarModal();
      Deberes.cerrarModal();
      Config.cerrarModal();
    }
  });
});
