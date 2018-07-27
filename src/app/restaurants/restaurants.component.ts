import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { tap, switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[];
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      // Quando não possuímos o debounceTime, ele mandará uma requisição a cada evento realizado(tecla digitada)
      // Com o debounceTime, ele mandará uma requisição apenas quando o intervalo de tempo de um evento para outro ser superior a X(nesse caso, 500 ms)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(), // Se o evento atual for igual ao último, ele não mandará uma requisição)
        switchMap(searchTerm =>
          this.restaurantsService
            .restaurants(searchTerm)
            .pipe(
              catchError(error => from([])))))
      .subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

} 
