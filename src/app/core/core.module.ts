import { NgModule } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { OrderService } from "../order/order.service";
import { RestaurantsService } from "../restaurants/restaurants.service";

@NgModule({
    providers:[ShoppingCartService, RestaurantsService, OrderService]
})
export class CoreModule{}