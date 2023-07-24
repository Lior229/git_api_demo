import { request } from "http";
import Repository from "../models/Repository"
import { AxiosResponse } from "axios";

export const searchRepository =async (keyword:string):Promise<Repository[]> => {
    try {
        const GIT_API_URL = 'https://api.github.com/search/repositories?q='+keyword;

        //ajax request
        const axios = require('axios');
        const { data } = await axios.get(`${GIT_API_URL}`)
        const { items } = data

        // extract git api response as my repository object
        let repositories: Repository[] = []
        for (const itemKey in items) {
            const repository = new Repository(items[itemKey].id, items[itemKey].name, items[itemKey].owner.avatar_url)
            repositories.push(repository)
        }

        return new Promise((resolve, reject) => {
            resolve(repositories)
        });
        
    } catch (err) {
        throw err
    }
}