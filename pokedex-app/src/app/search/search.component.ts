import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../pokemon.service';
import { PokemonData } from '../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {

  pokemonName: string = '';

  pokemonData: PokemonData = {
    pokemonName: '',
    pokedexNumber: '',
    moves: [],
    types: [],
    image_url: '',
    shiny_image_url: ''
  };

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
      
  }

  navigateToPokemonInfo() {
    console.log('Navigating to Pokemon Info...');

    if (this.pokemonName != '') {
      this.pokemonService.getPokemonById(this.pokemonName).subscribe(
        (data) => {
          this.pokemonData.pokemonName = data.name;
          this.pokemonData.pokedexNumber = data.id.toString();
          this.traverseAndMapMoves(data);
          this.traverseAndMapTypes(data);
          this.pokemonData.image_url = data.sprites.other.home.front_default;
          this.pokemonData.shiny_image_url = data.sprites.other.home.front_shiny;
          this.router.navigate(['/pokemon-info'], { state: {data: this.pokemonData}});
        },
        (error) => {
          console.error('Error fetching Pokemon:', error);
          this.pokemonData.pokemonName = ''; // Reset on error
          this.pokemonData.pokedexNumber = '';
          this.pokemonData.moves = [];
        }
      )
    }
  }

  traverseAndMapMoves(data: any) {
    this.pokemonData.moves = [];

    for (const move of data.moves) {
      this.pokemonData.moves.push(move.move.name);
    }

  }

  traverseAndMapTypes(data: any) {
    this.pokemonData.types = [];

    for (const type of data.types) {
      this.pokemonData.types.push(type.type.name);
    }

  }
}
