import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { MoveData, DataItem } from '../types';

@Component({
  selector: 'app-move-info',
  standalone: true,
  imports: [],
  templateUrl: './move-info.component.html',
  styleUrl: './move-info.component.css'
})
export class MoveInfoComponent implements OnInit {
  // This will hold the parameter value
  move: string | null = null;

  moveData: MoveData = {
    accuracy: 0,
    power: 0,
    pp: 0,
    damageType: "",
    effect: "",
    moveInfo: ""
  }

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    // Capture the route parameter 'id'
    this.move = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonMoveById(this.move ?? "").subscribe(
      (data) => {
        this.moveData.accuracy = data.accuracy; // Reset on error
        this.moveData.power = data.power;
        this.moveData.pp = data.pp;
        this.moveData.damageType = data.type.name;
        this.moveData.effect = data.effect_entries[0].effect;
        const filteredData = data.flavor_text_entries.filter((item: DataItem) => item.language.name === "en");
        this.moveData.moveInfo = filteredData.length > 0 ? filteredData[filteredData.length - 1].flavor_text : '';
      },
      (error) => {
        console.error('Error fetching Pokemon:', error);
        this.moveData.accuracy = 0; // Reset on error
        this.moveData.power = 0;
        this.moveData.pp = 0;
        this.moveData.damageType = '';
        this.moveData.effect = '';
        this.moveData.moveInfo = '';
      }
    )
  }
}
