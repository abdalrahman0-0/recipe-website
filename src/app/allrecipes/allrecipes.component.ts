import { Component } from '@angular/core';
import { DataService } from '../data.service'; // Import the service responsible for fetching recipe data
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Allows two-way binding for the search input
import { Observable } from 'rxjs';

// The @Component decorator provides metadata about the component
@Component({
  selector: 'app-allrecipes', // Name of the component's HTML tag
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Modules imported for component functionality
  templateUrl: './allrecipes.component.html', // Path to the HTML template file
  styleUrls: ['./allrecipes.component.css'] // Path to the CSS file for component-specific styles
})
export class AllrecipesComponent {
  // Declare properties used in the component
  Recipes: any[] = []; // Initialize Recipes as an empty array to hold the recipe data
  param: any; // Placeholder for any additional parameters (currently unused)
  searchTerm: string = ''; // Variable bound to the search input to store user's search term

  /**
   * Constructor: Injects services needed for the component
   * @param _dataService - The service that provides recipe data
   * @param route - ActivatedRoute for accessing route parameters (useful for future functionality)
   */
  constructor(public _dataService: DataService, private route: ActivatedRoute) {}

  /**
   * ngOnInit lifecycle hook: Executes when the component initializes
   * Here, it calls the getAllRecipes method from DataService to retrieve recipe data
   * Once data is fetched, it assigns the recipes to the Recipes property for display
   */
  ngOnInit(): void {
    this._dataService.getAllRecipes().subscribe((data) => {
      this.Recipes = data.recipes; // Assign fetched data to Recipes array
      console.log(this.Recipes); // Log the data to verify that it's correctly fetched
    });
  }
  
  /**
   * filteredRecipes method: Filters the Recipes array based on the searchTerm
   * This method is called in the HTML template to dynamically display only the filtered recipes
   * @returns - An array of recipes that match the searchTerm
   */
  filteredRecipes(): any[] {
    // First check to ensure Recipes is an array (avoid errors if data is missing)
    if (!this.Recipes || !Array.isArray(this.Recipes)) {
      return []; // Return an empty array if Recipes is not available or valid
    }
    
    // If searchTerm is empty, return the full Recipes array
    if (!this.searchTerm) {
      return this.Recipes;
    }
    
    // Filter the Recipes array to include only those recipes whose names contain the searchTerm
    // toLowerCase() is used to make the search case-insensitive
    return this.Recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
