export class NotFoundOrganizationInCity extends Error {
    constructor() {
        super('Organization not found in the city')
    }
}