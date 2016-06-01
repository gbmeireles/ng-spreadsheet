import { GG_COMPONENTS, GridComponent} from './Components/Components';
import { GRID_SCOPE_SERVICES } from './Services/Services';

export { GridComponent };
export * from './Model/Model';
export * from './Model/CustomComponent/CustomComponent';

export const GG_DIRECTIVES: Array<any> = GG_COMPONENTS;
export const GG_PROVIDERS: Array<any> = GRID_SCOPE_SERVICES;