import { AddCountProductHandler } from './addCount-product.handler';
import { ModificationProductHandler } from './modification-product.handler';
import { RegisterProductHandler } from './register-product.handler';
import { RemoveProductHandler } from './remove-product.handler';

export const ProductCommandHandlers = [
  ModificationProductHandler,
  RegisterProductHandler,
  RemoveProductHandler,
  AddCountProductHandler,
];
