export class User{
    constructor(public email: string,
                public name: string,
                private password: string){}

   matches(another: User): boolean{
       return another !== undefined &&
        another.email === this.email &&
        another.password === this.password
   }             
}

export const users = {
    "franco@gmail.com": new User('franco@gmail.com', 'Franco', '123'),
    "pedro@gmail.com": new User('pedro@gmail.com', 'Pedro', '123'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', '123')
}