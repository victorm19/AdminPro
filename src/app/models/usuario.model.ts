export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: string,
        public img?: string,
        public role?: string,
        public uid?: string
    ) {}
}