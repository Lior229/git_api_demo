import Repository from "./Repository";

interface User {
    token:string;
    bookmark: Repository[]
}

export default User;