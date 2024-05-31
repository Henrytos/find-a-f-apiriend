import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { Pet } from "@prisma/client";
import { NotFoundPetError } from "./errors/not-found-pet-error";


interface GetPetForAdoptionUseCaseRequest {
    organizationId: string
    petId: string;
}
interface GetPetForAdoptionUseCaseResponse {
    pet: Pet
}

export class GetPetForAdoptionUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute({ petId }: GetPetForAdoptionUseCaseRequest): Promise<GetPetForAdoptionUseCaseResponse> {


        const pet = await this.petRepository.findById(petId);
        if (!pet) {
            throw new NotFoundPetError()
        }
        return {
            pet
        };
    }

}