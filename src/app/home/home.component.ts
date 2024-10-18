import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  Recipes: any[] = []; 
  
  

  
  constructor(public _DataService:DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._DataService.getAllRecipes().subscribe((data) => {
      this.Recipes = data.recipes; // Assign fetched data to Recipes array
    });
  }
  
  
  randomRecipes() {
    const shuffled = this.Recipes.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, 4); 
  }
  healthyRecipes = [
    { id: 2 },
    { id: 6 },
    { id: 9 },
    { id: 17 },
    { id: 18 },
    { id: 21 },
    { id: 25 },
    { id: 29 }
];


randomHealthyRecipes() {
  const ids = this.healthyRecipes.map(recipe => recipe.id);
  const filteredRecipes = this.Recipes.filter(recipe => ids.includes(recipe.id));
  const shuffled = filteredRecipes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

    
  }

