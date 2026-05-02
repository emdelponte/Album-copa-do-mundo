// ============================================================
// DATA: 2026 FIFA World Cup - All 48 Teams
// ============================================================

const COUNTRIES = [
  // Co-hosts
  { code: "USA", name: "Estados Unidos", flag: "🇺🇸", region: "CONCACAF", host: true },
  { code: "CAN", name: "Canadá", flag: "🇨🇦", region: "CONCACAF", host: true },
  { code: "MEX", name: "México", flag: "🇲🇽", region: "CONCACAF", host: true },

  // CONCACAF (others)
  { code: "CUR", name: "Curaçao", flag: "🇨🇼", region: "CONCACAF" },
  { code: "HAI", name: "Haiti", flag: "🇭🇹", region: "CONCACAF" },
  { code: "PAN", name: "Panamá", flag: "🇵🇦", region: "CONCACAF" },

  // CONMEBOL
  { code: "ARG", name: "Argentina", flag: "🇦🇷", region: "CONMEBOL" },
  { code: "BRA", name: "Brasil", flag: "🇧🇷", region: "CONMEBOL" },
  { code: "COL", name: "Colômbia", flag: "🇨🇴", region: "CONMEBOL" },
  { code: "ECU", name: "Equador", flag: "🇪🇨", region: "CONMEBOL" },
  { code: "PAR", name: "Paraguai", flag: "🇵🇾", region: "CONMEBOL" },
  { code: "URU", name: "Uruguai", flag: "🇺🇾", region: "CONMEBOL" },

  // UEFA
  { code: "AUT", name: "Áustria", flag: "🇦🇹", region: "UEFA" },
  { code: "BEL", name: "Bélgica", flag: "🇧🇪", region: "UEFA" },
  { code: "BIH", name: "Bósnia e Herzegóvina", flag: "🇧🇦", region: "UEFA" },
  { code: "CRO", name: "Croácia", flag: "🇭🇷", region: "UEFA" },
  { code: "CZE", name: "República Tcheca", flag: "🇨🇿", region: "UEFA" },
  { code: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", region: "UEFA" },
  { code: "FRA", name: "França", flag: "🇫🇷", region: "UEFA" },
  { code: "GER", name: "Alemanha", flag: "🇩🇪", region: "UEFA" },
  { code: "NED", name: "Holanda", flag: "🇳🇱", region: "UEFA" },
  { code: "NOR", name: "Noruega", flag: "🇳🇴", region: "UEFA" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", region: "UEFA" },
  { code: "SCO", name: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", region: "UEFA" },
  { code: "ESP", name: "Espanha", flag: "🇪🇸", region: "UEFA" },
  { code: "SWE", name: "Suécia", flag: "🇸🇪", region: "UEFA" },
  { code: "SUI", name: "Suíça", flag: "🇨🇭", region: "UEFA" },
  { code: "TUR", name: "Turquia", flag: "🇹🇷", region: "UEFA" },

  // AFC
  { code: "AUS", name: "Austrália", flag: "🇦🇺", region: "AFC" },
  { code: "IRQ", name: "Iraque", flag: "🇮🇶", region: "AFC" },
  { code: "IRN", name: "Irã", flag: "🇮🇷", region: "AFC" },
  { code: "JPN", name: "Japão", flag: "🇯🇵", region: "AFC" },
  { code: "JOR", name: "Jordânia", flag: "🇯🇴", region: "AFC" },
  { code: "KOR", name: "Coreia do Sul", flag: "🇰🇷", region: "AFC" },
  { code: "QAT", name: "Catar", flag: "🇶🇦", region: "AFC" },
  { code: "KSA", name: "Arábia Saudita", flag: "🇸🇦", region: "AFC" },
  { code: "UZB", name: "Uzbequistão", flag: "🇺🇿", region: "AFC" },

  // CAF
  { code: "ALG", name: "Argélia", flag: "🇩🇿", region: "CAF" },
  { code: "CPV", name: "Cabo Verde", flag: "🇨🇻", region: "CAF" },
  { code: "COD", name: "Congo RD", flag: "🇨🇩", region: "CAF" },
  { code: "CIV", name: "Costa do Marfim", flag: "🇨🇮", region: "CAF" },
  { code: "EGY", name: "Egito", flag: "🇪🇬", region: "CAF" },
  { code: "GHA", name: "Gana", flag: "🇬🇭", region: "CAF" },
  { code: "MAR", name: "Marrocos", flag: "🇲🇦", region: "CAF" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", region: "CAF" },
  { code: "RSA", name: "África do Sul", flag: "🇿🇦", region: "CAF" },
  { code: "TUN", name: "Tunísia", flag: "🇹🇳", region: "CAF" },

  // OFC
  { code: "NZL", name: "Nova Zelândia", flag: "🇳🇿", region: "OFC" },
];

// 20 stickers per country
const STICKERS_PER_COUNTRY = 20;
