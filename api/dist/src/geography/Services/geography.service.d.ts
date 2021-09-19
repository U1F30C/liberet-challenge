import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import { Querist } from 'src/shared/querying/querist';
import { Municipality } from '../models/municipality.model';
import { IState, State } from '../models/state.model';
import { Locality } from '../models/locality.model';
import { Country } from 'src/geography/models/country.model';
import { Nationality } from '../models/nationality.model';
export declare class GeographyService extends BaseService<State, IState> {
    private municipalityDataModel;
    private localityDataModel;
    private countryDataModel;
    private nationalityDataModel;
    constructor(stateDataModel: ModelCtor<State>, querist: Querist<State>, municipalityDataModel: ModelCtor<Municipality>, localityDataModel: ModelCtor<Locality>, countryDataModel: ModelCtor<Country>, nationalityDataModel: ModelCtor<Nationality>);
    findCountry(): Promise<any>;
    findOneCountry(id: number): Promise<any>;
    findNationalities(): Promise<any>;
    findNationalityByCountry(id: number): Promise<any>;
    findStates(): Promise<any>;
    findOneState(id: number): Promise<any>;
    findMunicipalitiesByState(stateId: number): Promise<any>;
    findMunicipality(id: number): Promise<any>;
    findLocalitiesByMunicipality(municipalityId: number): Promise<any>;
    findLocality(id: number): Promise<any>;
}
