import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { PokemonData } from '../types';

@Component({
  selector: 'app-evolution-chain',
  imports: [CommonModule],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.css'
})
export class EvolutionChainComponent implements OnInit {

  pokedexNumber: string = "";
  rowsPerPage = 3;
  currentPage = 0;
  evolutionDisplayData: { name: string, imageUrl: string }[][] = [];
  isLoading = false;

  constructor(private router: Router, private pokemonService: PokemonService) 
  {
      const nav = this.router.getCurrentNavigation();
      this.pokedexNumber = nav?.extras?.state?.['data'] || [];
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.pokemonService.getPokemonSpeciesById(this.pokedexNumber)
    .pipe(
      switchMap(speciesData => {
        const evoChainUrl: string = speciesData.evolution_chain.url;
        const chainId = this.extractChainIdFromUrl(evoChainUrl);
        return chainId
          ? this.pokemonService.getPokemonEvolutionChainById(chainId)
          : of(null);
      }),
      map(evoData => {
        if (!evoData) return [];
        return this.flattenEvolutionChain(evoData.chain);
      })
    )
    .subscribe({
      next: (evoPaths) => {
        this.loadEvolutionImages(evoPaths);
      },
      error: (err) => {
        console.error(err);
        this.evolutionDisplayData = [];
        this.isLoading = false;
      }
    });
  }

  private extractChainIdFromUrl(url: string): string | null {
    // Example: https://pokeapi.co/api/v2/evolution-chain/2/
    const match = url.match(/\/evolution-chain\/(\d+)\//);
    return match ? match[1] : null;
  }

  private flattenEvolutionChain(chain: any): string[][] {
    const result: string[][] = [];
  
    const traverse = (node: any, path: string[]) => {
      const currentPath = [...path, node.species.name];
  
      if (!node.evolves_to || node.evolves_to.length === 0) {
        result.push(currentPath);
      } else {
        for (const evolution of node.evolves_to) {
          traverse(evolution, currentPath);
        }
      }
    };
  
    traverse(chain, []);
    return result;
  }

  private loadEvolutionImages(evoPaths: string[][]): void {
    const evoChains$ = evoPaths.map(path =>
      forkJoin(
        path.map(pokemonName =>
          this.pokemonService.getPokemonById(pokemonName).pipe(
            map(pokeData => ({
              name: pokeData.name,
              imageUrl: pokeData.sprites.other.home.front_default
                || pokeData.sprites?.front_default
            }))
          )
        )
      )
    );
  
    forkJoin(evoChains$).subscribe({
      next: (chains) => {
        this.evolutionDisplayData = chains;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.evolutionDisplayData = [];
        this.isLoading = false;
      }
    });
  }

  goToPokemonInfo(name: string): void {
    this.pokemonService.getPokemonById(name).subscribe(pokemon => {
      const pokemonData: PokemonData = {
        pokemonName: pokemon.name,
        pokedexNumber: String(pokemon.id),
        moves: pokemon.moves.map((m: any) => m.move?.name || ''), // Flatten to array of strings
        types: pokemon.types.map((t: any) => t.type?.name || ''), // Also flatten type names
        image_url:
           pokemon.sprites.other.home.front_default
        || pokemon.sprites?.front_default,
        shiny_image_url: 
           pokemon.sprites.other.home.front_shiny
        || pokemon.sprites?.front_shiny,
      };
  
      this.router.navigate(['/pokemon-info'], {
        state: { data: pokemonData }
      });
    });
  }

  get paginatedChains() {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.evolutionDisplayData.slice(start, end);
  }
  
  get totalPages(): number {
    return Math.ceil(this.evolutionDisplayData.length / this.rowsPerPage);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
