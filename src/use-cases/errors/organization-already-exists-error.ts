export class OrganizationAlreadyExistsError extends Error {
    constructor() {
        super('organizationAlreadyExistsError: Organization already exists.')
    }
}