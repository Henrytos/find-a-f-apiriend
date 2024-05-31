export class NotFoundPetError extends Error {
    constructor() {
        super('pet not found')
    }
}