import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Get a specific Pokemon by ID
  getPokemonById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  // Get a specific Pokemon by ID
  getPokemonMoveById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/move/${id}`);
  }

  // Get a specific Pokemon by ID
  getPokemonTypeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/type/${id}`);
  }

  // Get a specific Pokemons encounters by Pokedex number
  getPokemonEncountersById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}/encounters`);
  }

  getLocationAreaByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  getLocationByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Get a specific Pokemon species info by ID
  getPokemonSpeciesById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon-species/${id}`);
  }

  // Get a specific Pokemon's evolution chain by ID
  getPokemonEvolutionChainById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/evolution-chain/${id}`);
  }
}
