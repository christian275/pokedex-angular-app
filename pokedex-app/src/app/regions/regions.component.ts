import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-regions',
  imports: [CommonModule],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit {

  pokedexNumber: string = "";
  regions: string[] = [];
  pagedRegions: string[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  loading: boolean = true;

  constructor(private router: Router, private pokemonService: PokemonService) 
  {
      const nav = this.router.getCurrentNavigation();
      this.pokedexNumber = nav?.extras?.state?.['data'] || [];
  }

  ngOnInit(): void {
    this.getRegionsForPokemon(this.pokedexNumber);
  }

  getRegionsForPokemon(id: string): void {
    this.loading = true;
  
    this.pokemonService.getPokemonEncountersById(id).subscribe(async data => {
      this.regions = await this.processLocationAreas(data);
      this.totalPages = Math.ceil(this.regions.length / this.itemsPerPage);
      this.updatePagedRegions();
      this.loading = false;
    });
  }

  async processLocationAreas(data: any[]): Promise<string[]> {
    const formattedRegions: Set<string> = new Set();
  
    for (const encounter of data) {
      const locationAreaUrl = encounter.location_area?.url;
  
      if (!locationAreaUrl) continue;
  
      try { 
        const locationAreaData: any = await this.pokemonService.getLocationAreaByUrl(locationAreaUrl).toPromise();
        const locationData: any = await this.pokemonService.getLocationByUrl(locationAreaData.location.url).toPromise();
  
        const regionName = this.capitalizeFirstLetter(locationData.region.name);
        const routeName = this.formatRouteName(locationData.name);
  
        const fullName = `${regionName} - ${routeName}`;
        formattedRegions.add(fullName);
      } catch (error) {
        console.error('Error fetching region or route info:', error);
      }
    }
  
    return Array.from(formattedRegions).sort();
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatRouteName(rawName: string): string {
    const knownRegions = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea'];
  
    let words = rawName.split('-').filter(word => !knownRegions.includes(word.toLowerCase()));
  
    words = words.filter(word => word !== 'area'); // Optional cleanup
  
    return words.map(w => this.capitalizeFirstLetter(w)).join(' ');
  }

  updatePagedRegions(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.pagedRegions = this.regions.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedRegions();
  }
}