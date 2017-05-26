import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
/**
 * Created by wangjj on 2017/5/26.
 */
const APP_ROUTES_CONFIG: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'product/:productTitle', component: ProductDetailComponent}
]
export const app_routing_config = RouterModule.forRoot(APP_ROUTES_CONFIG);
