// ============================================================
// DATA: 2026 FIFA World Cup - All 48 Teams
// Organized by official group draw (Groups A–L)
// ============================================================

const COUNTRIES = [
  // ── Grupo A ──
  { code: "MEX", name: "México",           flag: "🇲🇽", group: "A", host: true  },
  { code: "RSA", name: "África do Sul",    flag: "🇿🇦", group: "A" },
  { code: "KOR", name: "Coreia do Sul",    flag: "🇰🇷", group: "A" },
  { code: "CZE", name: "República Tcheca", flag: "🇨🇿", group: "A" },

  // ── Grupo B ──
  { code: "CAN", name: "Canadá",           flag: "🇨🇦", group: "B", host: true  },
  { code: "SUI", name: "Suíça",            flag: "🇨🇭", group: "B" },
  { code: "QAT", name: "Catar",            flag: "🇶🇦", group: "B" },
  { code: "BIH", name: "Bósnia e Herzeg.", flag: "🇧🇦", group: "B" },

  // ── Grupo C ──
  { code: "BRA", name: "Brasil",           flag: "🇧🇷", group: "C" },
  { code: "MAR", name: "Marrocos",         flag: "🇲🇦", group: "C" },
  { code: "SCO", name: "Escócia",          flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
  { code: "HAI", name: "Haiti",            flag: "🇭🇹", group: "C" },

  // ── Grupo D ──
  { code: "USA", name: "Estados Unidos",   flag: "🇺🇸", group: "D", host: true  },
  { code: "PAR", name: "Paraguai",         flag: "🇵🇾", group: "D" },
  { code: "AUS", name: "Austrália",        flag: "🇦🇺", group: "D" },
  { code: "TUR", name: "Turquia",          flag: "🇹🇷", group: "D" },

  // ── Grupo E ──
  { code: "GER", name: "Alemanha",         flag: "🇩🇪", group: "E" },
  { code: "ECU", name: "Equador",          flag: "🇪🇨", group: "E" },
  { code: "CIV", name: "Costa do Marfim", flag: "🇨🇮", group: "E" },
  { code: "CUR", name: "Curaçao",          flag: "🇨🇼", group: "E" },

  // ── Grupo F ──
  { code: "NED", name: "Holanda",          flag: "🇳🇱", group: "F" },
  { code: "JPN", name: "Japão",            flag: "🇯🇵", group: "F" },
  { code: "TUN", name: "Tunísia",          flag: "🇹🇳", group: "F" },
  { code: "SWE", name: "Suécia",           flag: "🇸🇪", group: "F" },

  // ── Grupo G ──
  { code: "BEL", name: "Bélgica",          flag: "🇧🇪", group: "G" },
  { code: "EGY", name: "Egito",            flag: "🇪🇬", group: "G" },
  { code: "IRN", name: "Irã",              flag: "🇮🇷", group: "G" },
  { code: "NZL", name: "Nova Zelândia",    flag: "🇳🇿", group: "G" },

  // ── Grupo H ──
  { code: "ESP", name: "Espanha",          flag: "🇪🇸", group: "H" },
  { code: "URU", name: "Uruguai",          flag: "🇺🇾", group: "H" },
  { code: "KSA", name: "Arábia Saudita",   flag: "🇸🇦", group: "H" },
  { code: "CPV", name: "Cabo Verde",       flag: "🇨🇻", group: "H" },

  // ── Grupo I ──
  { code: "FRA", name: "França",           flag: "🇫🇷", group: "I" },
  { code: "SEN", name: "Senegal",          flag: "🇸🇳", group: "I" },
  { code: "NOR", name: "Noruega",          flag: "🇳🇴", group: "I" },
  { code: "IRQ", name: "Iraque",           flag: "🇮🇶", group: "I" },

  // ── Grupo J ──
  { code: "ARG", name: "Argentina",        flag: "🇦🇷", group: "J" },
  { code: "AUT", name: "Áustria",          flag: "🇦🇹", group: "J" },
  { code: "ALG", name: "Argélia",          flag: "🇩🇿", group: "J" },
  { code: "JOR", name: "Jordânia",         flag: "🇯🇴", group: "J" },

  // ── Grupo K ──
  { code: "POR", name: "Portugal",         flag: "🇵🇹", group: "K" },
  { code: "COL", name: "Colômbia",         flag: "🇨🇴", group: "K" },
  { code: "UZB", name: "Uzbequistão",      flag: "🇺🇿", group: "K" },
  { code: "COD", name: "Congo RD",         flag: "🇨🇩", group: "K" },

  // ── Grupo L ──
  { code: "ENG", name: "Inglaterra",       flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { code: "CRO", name: "Croácia",          flag: "🇭🇷", group: "L" },
  { code: "PAN", name: "Panamá",           flag: "🇵🇦", group: "L" },
  { code: "GHA", name: "Gana",             flag: "🇬🇭", group: "L" },
];

// 20 stickers per country
const STICKERS_PER_COUNTRY = 20;
