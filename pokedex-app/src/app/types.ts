export interface PokemonData {
    pokemonName: string,
    pokedexNumber: string,
    moves: string[],
    types: string[],
    image_url: string,
    shiny_image_url: string
};

export interface MoveData {
    accuracy: number,
    power: number,
    pp: number,
    damageType: string,
    effect: string,
    moveInfo: string
};

// Define the types for the objects in the array
export interface Language {
    name: string;
    url: string;
};

export interface VersionGroup {
    name: string;
    url: string;
};

export interface DataItem {
    flavor_text: string;
    language: Language;
    version_group: VersionGroup;
};

export interface WeaknessesAndStrengths {
    weak_to: string[];
    resistant_to: string[];
    immune_to: string[];
    super_effective_to: string[];
    not_very_effective_to: string[];
}

// Encounter response structure
export interface Encounter {
    location_area: {
      url: string;
    };
}
  
  // Location Area response structure
export interface LocationArea {
    location: {
      url: string;
    };
}
  
  // Location response structure
export interface Location {
    region: {
      name: string;
    };
}