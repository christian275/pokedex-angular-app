import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonData } from '../types';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.css'
})
export class PokemonInfoComponent implements OnInit, OnDestroy {

  pokemonName: string = '';
  pokedexNumber: string = '';
  pokemonMoves: string[] = [];
  types: string[] = [];
  pagedItems: string[] = [];
  itemsPerPage = 15;
  totalPages: number = 0;
  currentPage = 1;
  pages: number[] = [];  // Array of page numbers for pagination
  pokemon_img_url: string = '';
  shiny_img_url: string = '';

  currentImgUrl: string = ''; // Tracks which image is being displayed
  showingShiny: boolean = false;

  pokemonData: PokemonData = {
    pokemonName: '',
    pokedexNumber: '',
    moves: [],
    types: [],
    image_url: '',
    shiny_image_url: ''
  };

  constructor(private router: Router, private locationStrategy: LocationStrategy, private location: Location) {}

  ngOnInit(): void {
      // Access the passed state from the router
      const navigation = window.history.state;

      this.pokemonData = navigation.data;
      this.pokemonName = this.pokemonData.pokemonName;
      this.pokedexNumber = this.pokemonData.pokedexNumber;
      this.pokemonMoves = this.pokemonData.moves.sort().map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      this.types = this.pokemonData.types;
      this.pokemon_img_url = this.pokemonData.image_url;
      this.shiny_img_url = this.pokemonData.shiny_image_url;
      this.currentImgUrl = this.pokemon_img_url;
      this.totalPages = Math.ceil(this.pokemonData.moves.length / this.itemsPerPage);
      this.generatePagination();
      this.paginateItems(this.currentPage); // Initialize the first page

      // No need to use pushState or popState, just track browser history stack
      window.onpopstate = this.handleBackNavigation;
  }

  ngOnDestroy(): void {
    // Clean up event listener when the component is destroyed to avoid memory leaks
    window.onpopstate = null;
  }

  handleBackNavigation = (event: PopStateEvent): void => {
    window.location.href = '/search'; 
  };

  toggleImage(): void {
    this.showingShiny = !this.showingShiny;
    this.currentImgUrl = this.showingShiny ? this.shiny_img_url : this.pokemon_img_url;
  }

   // Generate the page numbers
   generatePagination() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  paginateItems(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = pageNumber * this.itemsPerPage;
    this.pagedItems = this.pokemonMoves.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.currentPage = pageNumber;
    this.paginateItems(pageNumber); // Update items for the new page
  }

  navigateToPokemonWeaknessesAndStrengths() {
    console.log('Navigating to Pokemon Strength and Weaknesses...');

    this.router.navigate(['/weaknesses-and-strengths'], { state: {data: this.types}});
  }

  navigateToPokemonRegions() {
    console.log('Navigating to Pokemon Regions...');

    this.router.navigate(['/regions'], { state: {data: this.pokedexNumber}});
  }

  navigateToPokemonEvolutionChain() {
    console.log('Navigating to Pokemon Evolution Chain...');

    this.router.navigate(['/evolution-chain'], { state: {data: this.pokedexNumber}});
  }
}
