import { Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, delay, map } from 'rxjs';
import { ProductWasAddedEvent } from '../events/product-was.event';

// @Injectable()
// export class ProductSagas{
// 	@Saga()
// 	productWasAdded = (event$ : Observable<any>): Observable<ICommand> =>{
// 		return event$.pipe(ofType(ProductWasAddedEvent),delay(1000),map(event=>{
// 			Logger.log('saga call AddProductTo')
// 			return new
// 		}))
// 	}
// }
