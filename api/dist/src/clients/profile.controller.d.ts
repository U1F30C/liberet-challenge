import { RequestWithUser } from 'src/authorization/types/request-with-users';
import { MinorDTO } from './dtos/minor.dto';
import { ProfileDTO } from './dtos/profile.dto';
import { ProfileService } from './services/profile.service';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(request: RequestWithUser): Promise<ProfileDTO>;
    patchProfile(body: Partial<ProfileDTO>, request: RequestWithUser): Promise<void>;
    addMinor(minor: MinorDTO, request: RequestWithUser): Promise<any>;
    updateMinor(minor: MinorDTO, request: RequestWithUser): Promise<void>;
    getMinors(request: RequestWithUser): Promise<any>;
    deleteMinors(id: any, request: RequestWithUser): Promise<void>;
}
