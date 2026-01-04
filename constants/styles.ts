
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface StyleOption {
  id: string;
  label: string;
  prompt: string;
  color: string; // Tailwind gradient classes
  year: string;
  loadingMessages: string[];
}

export const STYLES: StyleOption[] = [
  {
    id: '80s',
    label: "80's Mall",
    prompt: "Generate a classic 80s mall photography portrait of this specific person. CRITICAL PRIORITY: The face must look EXACTLY like the input photo. Do not alter facial features, eye shape, or nose. Apply a soft focus glamour shot aesthetic, cheesy laser background, and 80s style clothing/hair volume around the unchanged face.",
    color: "from-pink-500 to-purple-500",
    year: "1985",
    loadingMessages: [
      "TEASING YOUR HAIR...",
      "APPLYING BLUE EYESHADOW...",
      "ADJUSTING THE SHOULDER PADS...",
      "CHOOSING A LASER BACKGROUND...",
      "REWINDING THE CASSETTE TAPE...",
      "PEG ROLLING YOUR JEANS...",
      "DEVELOPING THE FILM...",
      "GETTING YOUR GLAMOUR SHOT READY..."
    ]
  },
  {
    id: '90s',
    label: "90's Grunge",
    prompt: "Reimagine this person in a 90s grunge aesthetic. CRITICAL PRIORITY: Maintain absolute facial fidelity. The subject's identity must be preserved 100%. Use a lo-fi textured look, fisheye lens effect, and disposable camera grain, with flannel shirts and unkempt hair, but ensure the face remains instantly recognizable as the source.",
    color: "from-green-700 to-gray-800",
    year: "1994",
    loadingMessages: [
      "SMELLING LIKE TEEN SPIRIT...",
      "TYING FLANNEL SHIRT...",
      "DISTORTING GUITARS...",
      "LOOKING MOODY...",
      "DEVELOPING DISPOSABLE CAMERA...",
      "TUNING TO MTV...",
      "SKATEBOARDING IN SLOW MOTION..."
    ]
  },
  {
    id: 'y2k',
    label: "Y2K Pop",
    prompt: "Generate an early 2000s Y2K aesthetic portrait of this person. CRITICAL PRIORITY: Do not hallucinate a new face. Keep the subject's exact facial structure and likeness. Apply metallic silver clothing, tinted frameless sunglasses (optional if it obscures eyes), and frosty makeup. Bright overexposed flash and futuristic blue backgrounds.",
    color: "from-blue-400 to-cyan-300",
    year: "2001",
    loadingMessages: [
      "BOOTING UP WINDOWS XP...",
      "FROSTING TIPS...",
      "DIALING UP INTERNET...",
      "BURNING MIX CD...",
      "APPLYING LIP GLOSS...",
      "DOWNLOADING RINGTORES...",
      "ENTERING THE MATRIX..."
    ]
  },
  {
    id: '70s',
    label: "70's Disco",
    prompt: "Generate a 1970s Disco era portrait of this person. CRITICAL PRIORITY: High fidelity to the source image is required. The face must remain identical to the uploaded photo. Dress them in sequins or polyester suits with warm colors and lens flares. Studio 54 vibe.",
    color: "from-yellow-500 to-orange-600",
    year: "1977",
    loadingMessages: [
      "POLISHING DISCO BALL...",
      "FLARING PANTS...",
      "IGNITING THE FUNK...",
      "APPLYING GLITTER...",
      "CUEING THE BEE GEES...",
      "HUSTLING...",
      "CHECKING INTO STUDIO 54..."
    ]
  },
  {
    id: '60s',
    label: "60's Psychedelic",
    prompt: "Generate a 1960s psychedelic rock poster style portrait of this person. CRITICAL PRIORITY: The subject must be instantly recognizable. Do not distort the facial features even while applying the art style. Use tie-dye clothing, peace signs, kaleidoscope background, and vibrant swirling colors.",
    color: "from-orange-400 to-pink-500",
    year: "1967",
    loadingMessages: [
      "EXPANDING CONSCIOUSNESS...",
      "TYING DYE...",
      "TUNING IN...",
      "DROPPING OUT...",
      "PAINTING WITH LIGHT...",
      "GATHERING AT WOODSTOCK...",
      "SWIRLING COLORS..."
    ]
  },
  {
    id: '50s',
    label: "50's Diner",
    prompt: "Generate a 1950s retro Americana portrait of this person. CRITICAL PRIORITY: Preserve the exact facial identity. The face must look like the source image. Apply Kodachrome film look, milkshakes, leather jackets or poodle skirts, and diner neon backgrounds.",
    color: "from-red-500 to-teal-400",
    year: "1955",
    loadingMessages: [
      "GREASING HAIR...",
      "POLISHING CHROME...",
      "SPINNING JUKEBOX...",
      "MIXING MILKSHAKE...",
      "IRONING POODLE SKIRT...",
      "WAXING THE HOT ROD...",
      "ROCKING AROUND THE CLOCK..."
    ]
  },
  {
    id: 'noir',
    label: "Film Noir",
    prompt: "Generate a 1940s Film Noir cinematic shot of this person. CRITICAL PRIORITY: Absolute likeness preservation. The facial features must remain unchanged. Use high contrast black and white photography, dramatic chiaroscuro shadows, and fedora/period hats.",
    color: "from-gray-800 to-black",
    year: "1945",
    loadingMessages: [
      "LIGHTING CIGARETTE...",
      "SHARPENING SHADOWS...",
      "SOLVING MYSTERIES...",
      "WALKING RAINY STREETS...",
      "ADJUSTING FEDORA...",
      "NARRATING INNER MONOLOGUE...",
      "FADING TO BLACK..."
    ]
  },
  {
    id: 'victorian',
    label: "Victorian",
    prompt: "Generate a vintage 19th-century Victorian daguerreotype of this person. CRITICAL PRIORITY: Keep the face exactly as is. Do not alter the subject's identity. Apply formal stiff poses, period clothing, serious expression, scratched texture, and vignette.",
    color: "from-amber-900 to-amber-700",
    year: "1890",
    loadingMessages: [
      "SITTING VERY STILL...",
      "STIFFENING COLLAR...",
      "APPLYING SEPIA TONE...",
      "POLISHING MONOCLE...",
      "ADJUSTING CORSET...",
      "PREPARING FLASH POWDER...",
      "LOOKING STOIC..."
    ]
  },
  {
    id: 'goth',
    label: "Trad Goth",
    prompt: "Generate a 1980s Traditional Goth subculture portrait of this person. CRITICAL PRIORITY: The face must match the source photo exactly, just with makeup applied. Do not change the bone structure. Pale complexion, heavy black eyeliner, teased black hair, fishnets, velvet.",
    color: "from-purple-900 to-black",
    year: "1983",
    loadingMessages: [
      "APPLYING PALE FOUNDATION...",
      "DARKENING SOUL...",
      "TEASING BLACK HAIR...",
      "PUTTING ON THE CURE...",
      "RIPPING FISHNETS...",
      "AVOIDING THE SUN...",
      "CONTEMPLATING EXISTENCE..."
    ]
  },
  {
    id: 'cyberpunk',
    label: "Cyberpunk",
    prompt: "Generate a futuristic Cyberpunk aesthetic portrait of this person. CRITICAL PRIORITY: Preserve the facial features and likeness of the subject. The face should be recognizable as the input. Add neon rain, bioluminescent accents, and subtle cybernetic enhancements to the sides (not obscuring the face).",
    color: "from-purple-600 to-pink-600",
    year: "2077",
    loadingMessages: [
      "INITIALIZING NEURAL LINK...",
      "INSTALLING CHROMIUM...",
      "HACKING MAINFRAME...",
      "CALIBRATING OPTICS...",
      "SYNCHRONIZING BRAINWAVES...",
      "ESCAPING DYSTOPIA...",
      "CHARGING NEON LIGHTS..."
    ]
  },
  {
    id: 'steampunk',
    label: "Steampunk",
    prompt: "Generate a Steampunk industrial fantasy portrait of this person. CRITICAL PRIORITY: Maintain exact facial identity. Do not change the person's face. Add brass goggles (on forehead), gears, leather corset or vest, and Victorian-industrial fusion elements.",
    color: "from-amber-700 to-orange-900",
    year: "1885",
    loadingMessages: [
      "OILING GEARS...",
      "PRESSURIZING STEAM...",
      "POLISHING BRASS...",
      "DONNING GOGGLES...",
      "WINDING CLOCKWORK...",
      "FIRING UP BOILER...",
      "INVENTING GADGETS..."
    ]
  },
  {
    id: 'wildwest',
    label: "Wild West",
    prompt: "Generate an Old West wanted poster style portrait of this person. CRITICAL PRIORITY: The face on the poster must be an exact match to the source image. Apply sepia, high grain, and worn paper texture, with cowboy hats and dusters.",
    color: "from-yellow-800 to-yellow-900",
    year: "1880",
    loadingMessages: [
      "SADDLING HORSE...",
      "LOADING REVOLVER...",
      "PRINTING WANTED POSTER...",
      "CHEWING TOBACCO...",
      "ENTERING SALOON...",
      "SPOTTING SHERIFF...",
      "RIDING INTO SUNSET..."
    ]
  },
  {
    id: '20s',
    label: "Roaring 20s",
    prompt: "Generate a 1920s Gatsby era black and white photograph of this person. CRITICAL PRIORITY: High identity preservation required. The subject must look identical to the provided photo. Art deco elements, flapper dresses or tuxedos, soft grain, glamour.",
    color: "from-gray-200 to-gray-500",
    year: "1925",
    loadingMessages: [
      "POURING CHAMPAGNE...",
      "FLAPPING DRESS...",
      "PLAYING JAZZ...",
      "ROARING LOUDLY...",
      "DOING THE CHARLESTON...",
      "ATTENDING GATSBY'S PARTY...",
      "APPLYING ROUGE..."
    ]
  },
  {
    id: 'vaporwave',
    label: "Vaporwave",
    prompt: "Generate a Vaporwave aesthetic digital art portrait of this person. CRITICAL PRIORITY: The subject's face must be cut out and placed in the scene without altering their identity. Neon pink and cyan gradients, glitch effects, Roman statues, palm trees.",
    color: "from-pink-400 to-cyan-400",
    year: "2012",
    loadingMessages: [
      "SLOWING DOWN MUSIC...",
      "INSERTING ROMAN STATUE...",
      "GLITCHING REALITY...",
      "AESTHETIZING...",
      "DRINKING ARIZONA TEA...",
      "RENDERING GRID...",
      "EXPERIENCING NOSTALGIA..."
    ]
  },
  {
    id: 'popart',
    label: "Pop Art",
    prompt: "Generate a Pop Art portrait of this person. CRITICAL PRIORITY: Use the exact facial contours and features of the source image. Do not change the identity. Style it like Andy Warhol or Roy Lichtenstein with bold solid colors, halftone dots, and thick outlines.",
    color: "from-yellow-400 to-red-500",
    year: "1962",
    loadingMessages: [
      "DOTTING HALFTONES...",
      "COLORING BLOCKS...",
      "CANNING SOUP...",
      "PRINTING SILKSCREEN...",
      "ADDING BOLD OUTLINES...",
      "MASS PRODUCING...",
      "BECOMING FAMOUS FOR 15 MINS..."
    ]
  },
  {
    id: 'anime',
    label: "90s Anime",
    prompt: "Generate a 90s anime style character portrait based on this person. CRITICAL PRIORITY: The character must be instantly recognizable as the subject. Translate their specific facial features into the anime art style without losing their identity. Use cel shading, VHS grain, and dramatic lighting.",
    color: "from-blue-600 to-purple-600",
    year: "1995",
    loadingMessages: [
      "POWERING UP...",
      "DRAWING BIG EYES...",
      "ENGAGING SPEED LINES...",
      "CHARGING KI...",
      "OPENINGING INTRO THEME...",
      "DEFEATING VILLAIN...",
      "TRANSFORMING..."
    ]
  },
  {
    id: 'clay',
    label: "Claymation",
    prompt: "Generate a stop-motion claymation character portrait of this person. CRITICAL PRIORITY: The clay character must look exactly like the subject. Capture their specific nose, eyes, and mouth shape in plasticine texture. Fingerprints visible on clay, soft lighting, handmade feel.",
    color: "from-orange-300 to-yellow-300",
    year: "2005",
    loadingMessages: [
      "MOLDING PLASTICINE...",
      "MOVING ARMATURE...",
      "ANIMATING FRAME BY FRAME...",
      "SMOOTHING THUMBPRINTS...",
      "BUILDING MINIATURE SET...",
      "SCULPTING EXPRESSION...",
      "BAKING CLAY..."
    ]
  },
  {
    id: 'viking',
    label: "Viking",
    prompt: "Generate a rugged Viking warrior portrait of this person. CRITICAL PRIORITY: Preserve the facial features and likeness of the subject perfectly. Do not alter the face. Add fur cloaks, leather armor, snowy fjord background, and epic lighting.",
    color: "from-slate-600 to-slate-800",
    year: "850",
    loadingMessages: [
      "BRAIDING BEARD...",
      "SHARPENING AXE...",
      "SAILING LONGSHIP...",
      "PRAISING ODIN...",
      "DONNING FURS...",
      "NAVIGATING FJORDS...",
      "PREPARING FOR VALHALLA..."
    ]
  },
  {
    id: 'renaissance',
    label: "Oil Painting",
    prompt: "Generate a Renaissance oil painting of this person. CRITICAL PRIORITY: The subject of the painting must look exactly like the input photo. Maintain facial proportions and features. Use Chiaroscuro lighting, rich velvet textures, and a painted landscape background.",
    color: "from-yellow-600 to-red-800",
    year: "1500",
    loadingMessages: [
      "MIXING PIGMENTS...",
      "STUDYING ANATOMY...",
      "APPLYING VARNISH...",
      "PAINTING CHIAROSCURO...",
      "POSING REGALLY...",
      "COMMISSIONING ARTIST...",
      "DRYING CANVAS..."
    ]
  },
  {
    id: 'pixel',
    label: "8-Bit Retro",
    prompt: "Generate a pixel art portrait of this person. CRITICAL PRIORITY: The pixel character must be instantly recognizable as the user. Use the specific colors and shapes of their face. Vibrant colors, blocky structure, 8-bit/16-bit video game aesthetic.",
    color: "from-indigo-500 to-purple-500",
    year: "1988",
    loadingMessages: [
      "REDUCING RESOLUTION...",
      "BLOWING CARTRIDGE...",
      "INSERTING COIN...",
      "LOADING SPRITES...",
      "BEATING HIGH SCORE...",
      "LEVELING UP...",
      "SAVING GAME..."
    ]
  },
  {
    id: 'egypt',
    label: "Ancient Pharaoh",
    prompt: "Generate an Ancient Egyptian style portrait of this person. CRITICAL PRIORITY: Keep the facial features unchanged. The face must match the source image. Add gold headdress (Nemes), kohl eyeliner, hieroglyphs in background, sandstone texture.",
    color: "from-yellow-600 to-amber-600",
    year: "1300 BC",
    loadingMessages: [
      "BUILDING PYRAMID...",
      "DECIPHERING HIEROGLYPHS...",
      "APPLYING KOHL...",
      "WORSHIPPING RA...",
      "CARVING SANDSTONE...",
      "PREPARING SARCOPHAGUS...",
      "RULING THE NILE..."
    ]
  },
  {
    id: 'fantasy',
    label: "High Fantasy",
    prompt: "Generate a High Fantasy RPG character portrait of this person. CRITICAL PRIORITY: The face must remain identical to the user. Do not change facial structure. Add detailed armor or robes, magical aura, and ethereal lighting.",
    color: "from-emerald-600 to-green-800",
    year: "1200",
    loadingMessages: [
      "ROLLING INITIATIVE...",
      "POLISHING ARMOR...",
      "CASTING SPELL...",
      "SUMMONING DRAGON...",
      "EXPLORING DUNGEON...",
      "GATHERING MANA...",
      "EMBARKING ON QUEST..."
    ]
  },
  {
    id: 'zombie',
    label: "Zombie Horror",
    prompt: "Generate a horror movie style Zombie portrait of this person. CRITICAL PRIORITY: Preserve the facial features and likeness of the subject despite the undead transformation. They must be recognizable. Pale skin, sunken eyes, tattered clothes, cinematic horror lighting.",
    color: "from-green-900 to-gray-900",
    year: "2024",
    loadingMessages: [
      "INFECTING HOST...",
      "DECAYING FLESH...",
      "HUNGERING FOR BRAINS...",
      "RISING FROM GRAVE...",
      "STUMBLING SLOWLY...",
      "GROANING LOUDLY...",
      "AVOIDING HEADSHOTS..."
    ]
  },
  {
    id: 'hero',
    label: "Super Hero",
    prompt: "Generate a modern cinematic Superhero portrait of this person. CRITICAL PRIORITY: The superhero must have the exact face of the user. Identity preservation is key. Spandex or tactical suit, glowing energy effects, dramatic angle, blockbuster movie poster aesthetic.",
    color: "from-blue-600 to-red-600",
    year: "2025",
    loadingMessages: [
      "SEWING SPANDEX...",
      "CHARGING SUPERPOWERS...",
      "STRIKING HEROIC POSE...",
      "SAVING THE CITY...",
      "FIGHTING CRIME...",
      "FLYING UP UP AND AWAY...",
      "ASSEMBLING TEAM..."
    ]
  },
  {
    id: 'ukiyoe',
    label: "Ukiyo-e Print",
    prompt: "Generate a Japanese Ukiyo-e woodblock print style portrait of this person. CRITICAL PRIORITY: Capture the likeness of the subject within the art style. The face should be recognizable. Flat colors, bold outlines, traditional kimono, Great Wave off Kanagawa vibes.",
    color: "from-blue-800 to-indigo-200",
    year: "1830",
    loadingMessages: [
      "CARVING WOODBLOCK...",
      "INKING PLATES...",
      "PRESSING PAPER...",
      "PAINTING THE WAVE...",
      "DONNING KIMONO...",
      "VIEWING MT FUJI...",
      "ENTERING FLOATING WORLD..."
    ]
  },
  {
    id: 'nouveau',
    label: "Art Nouveau",
    prompt: "Generate an Art Nouveau style portrait of this person (Mucha style). CRITICAL PRIORITY: The face must remain photorealistic or near-photorealistic to the source. Do not alter features. Surround with intricate organic floral borders, pastel colors, flowing hair.",
    color: "from-amber-200 to-orange-300",
    year: "1900",
    loadingMessages: [
      "GROWING VINES...",
      "FLOWING HAIR...",
      "DECORATING BORDERS...",
      "STYLIZING NATURE...",
      "MIXING PASTELS...",
      "CHANNELING MUCHA...",
      "POSING ELEGANTLY..."
    ]
  },
  {
    id: '3dcartoon',
    label: "3D Cartoon",
    prompt: "Generate a high-quality 3D animated movie character portrait of this person. CRITICAL PRIORITY: Translate the subject's exact facial features into the 3D style. They must be instantly recognizable. Big expressive eyes, soft subsurface scattering skin texture, warm lighting.",
    color: "from-sky-400 to-blue-500",
    year: "2023",
    loadingMessages: [
      "RENDERING MESH...",
      "CALCULATING SUBSURFACE...",
      "RIGGING SKELETON...",
      "ANIMATING EXPRESSION...",
      "WIDENING EYES...",
      "LIGHTING SCENE...",
      "WAITING FOR RENDER FARM..."
    ]
  },
  {
    id: 'sketch',
    label: "Charcoal Sketch",
    prompt: "Generate a charcoal or graphite pencil sketch portrait of this person. CRITICAL PRIORITY: The sketch must look exactly like the user. High identity preservation is required. Rough paper texture, strong contrast, smudged shading.",
    color: "from-gray-400 to-gray-600",
    year: "2020",
    loadingMessages: [
      "SHARPENING PENCIL...",
      "SMUDGING CHARCOAL...",
      "ERASING MISTAKES...",
      "SKETCHING CONTOURS...",
      "SHADING GRADIENTS...",
      "FIXING PAPER...",
      "SIGNING ARTWORK..."
    ]
  },
  {
    id: 'astronaut',
    label: "Space Explorer",
    prompt: "Generate a cinematic sci-fi Astronaut portrait of this person. CRITICAL PRIORITY: The face inside the helmet must be identical to the source image. Do not change the identity. Space helmet (visor open), NASA style suit, stars and nebula reflection.",
    color: "from-indigo-900 to-blue-900",
    year: "2150",
    loadingMessages: [
      "PRESSURIZING SUIT...",
      "CHECKING OXYGEN...",
      "LAUNCHING ROCKET...",
      "ENTERING ORBIT...",
      "OPENING POD BAY DOORS...",
      "FLOATING IN ZERO G...",
      "RADIOING HOUSTON..."
    ]
  }
];

// Pre-compute the lookup map once for O(1) access instead of O(n) array search
const STYLES_MAP = new Map<string, StyleOption>(
  STYLES.map(style => [style.id, style])
);

export const getStyleById = (id: string): StyleOption => {
  return STYLES_MAP.get(id) || STYLES[0];
};
