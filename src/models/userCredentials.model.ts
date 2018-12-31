export class UserCredentials {
    constructor(
        public displayName?: string,
        public email?: string,
        public emailVerified?: any,
        public photoURL?: any,
        public lastSignInTime?: any,
        public uid?: string,
        public isNew?: boolean
    ) {}
}
