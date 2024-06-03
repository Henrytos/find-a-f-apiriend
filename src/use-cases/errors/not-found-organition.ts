export class NotFoundOrganizationError extends Error {
    constructor() {
        super('Organization not found ')
    }
}