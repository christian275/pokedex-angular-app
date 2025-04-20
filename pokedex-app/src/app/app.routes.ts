import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { MoveInfoComponent } from './move-info/move-info.component';
import { WeaknessesAndStrengthsComponent } from './weaknesses-and-strengths/weaknesses-and-strengths.component';
import { RegionsComponent } from './regions/regions.component';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';

export const routes: Routes = [
    { path: '', component: SearchComponent},
    { path: 'search', component: SearchComponent},
    { path: 'pokemon-info', component: PokemonInfoComponent},
    { path: 'move-info/:id', component: MoveInfoComponent},
    { path: 'weaknesses-and-strengths', component: WeaknessesAndStrengthsComponent},
    { path: 'regions', component: RegionsComponent},
    { path: 'evolution-chain', component: EvolutionChainComponent},
];