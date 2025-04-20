import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WeaknessesAndStrengths } from '../types';
import { PokemonService } from '../pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-weaknesses-and-strengths',
  imports: [CommonModule],
  templateUrl: './weaknesses-and-strengths.component.html',
  styleUrl: './weaknesses-and-strengths.component.css'
})
export class WeaknessesAndStrengthsComponent implements OnInit {

  loading: boolean = true;
  types: string[] = [];
  weaknesses_and_strengths: WeaknessesAndStrengths = {
    weak_to: [],
    resistant_to: [],
    immune_to: [],
    super_effective_to: [],
    not_very_effective_to: []
  };

  constructor(private router: Router, private pokemonService: PokemonService) 
  {
      const nav = this.router.getCurrentNavigation();
      this.types = nav?.extras?.state?.['data'] || [];
  }

  ngOnInit(): void {

      // Create an array of observable requests for each Pokemon type id
      const requests = this.types.map(type => this.pokemonService.getPokemonTypeById(type));

      // Use forkJoin to wait for all requests to complete
      forkJoin(requests).subscribe(
        (data) => {
          this.mapPokemonMoveJsonToWeaknessesAndStrengths(data);
          this.loading = false;
        },
        () => {
          console.error('Error fetching Pokemon types');
          this.loading = false;
        }
      );
  }

  mapPokemonMoveJsonToWeaknessesAndStrengths(data: any[]) {
    // The ... is the spread operator which unpacks the mapped names and appends them one by one into the existing list
    data.forEach(typeData => {
      const damage = typeData.damage_relations;
  
      this.weaknesses_and_strengths.weak_to.push(
        ...damage.double_damage_from.map((t: { name: string }) =>
          this.capitalize(t.name)
        )
      );
  
      this.weaknesses_and_strengths.resistant_to.push(
        ...damage.half_damage_from.map((t: { name: string }) =>
          this.capitalize(t.name)
        )
      );
  
      this.weaknesses_and_strengths.immune_to.push(
        ...damage.no_damage_from.map((t: { name: string }) =>
          this.capitalize(t.name)
        )
      );
  
      this.weaknesses_and_strengths.super_effective_to.push(
        ...damage.double_damage_to.map((t: { name: string }) =>
          this.capitalize(t.name)
        )
      );
  
      this.weaknesses_and_strengths.not_very_effective_to.push(
        ...damage.half_damage_to.map((t: { name: string }) =>
          this.capitalize(t.name)
        )
      );
    });

    // ✅ Deduplicate and sort each list alphabetically
    this.weaknesses_and_strengths.weak_to = this.getSortedUniqueList(this.weaknesses_and_strengths.weak_to);
    this.weaknesses_and_strengths.resistant_to = this.getSortedUniqueList(this.weaknesses_and_strengths.resistant_to);
    this.weaknesses_and_strengths.immune_to = this.getSortedUniqueList(this.weaknesses_and_strengths.immune_to);
    this.weaknesses_and_strengths.super_effective_to = this.getSortedUniqueList(this.weaknesses_and_strengths.super_effective_to);
    this.weaknesses_and_strengths.not_very_effective_to = this.getSortedUniqueList(this.weaknesses_and_strengths.not_very_effective_to);
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  getSortedUniqueList(arr: string[]): string[] {
    return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
  }
}
