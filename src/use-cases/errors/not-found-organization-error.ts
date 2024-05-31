export class NotFoundOrganizationInCityError extends Error {
    constructor() {
        super('Organization not found in the city')
    }
}