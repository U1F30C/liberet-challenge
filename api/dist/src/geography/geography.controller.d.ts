import { Nationality } from './models/nationality.model';
import { GeographyService } from './Services/geography.service';
import { State } from './models/state.model';
import { Municipality } from './models/municipality.model';
import { Locality } from './models/locality.model';
import { Country } from './models/country.model';
export declare class GeographyController {
    private readonly geographyDataService;
    constructor(geographyDataService: GeographyService);
    findCountry(): Promise<Country[]>;
    findOneCountry(id: string): Promise<Country>;
    findNationalities(): Promise<Nationality[]>;
    findNationalityByCountry(id: string): Promise<Nationality[]>;
    findState(): Promise<State[]>;
    findOneState(id: string): Promise<State>;
    findMunicipality(id: string): Promise<Municipality>;
    findMunicipalityByMunicipality(stateId: string): Promise<Municipality[]>;
    findLocalityByState(id: string): Promise<Locality>;
    findLocalityByMunicipality(municipalityId: string): Promise<Locality[]>;
}
