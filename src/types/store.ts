export interface ValhallaConfigInterface {
    valhallaUrl: string | undefined,
    isAuthRequired: boolean | undefined,
    authMethod?: string | undefined,
    authBasicUsername?: string | undefined,
    authBasicPassword?: string | undefined
}