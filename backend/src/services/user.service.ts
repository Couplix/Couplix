import { NoResultsError } from "../errors";

export const getUser = async () => {
    return {
        id:1,
        name:'John Doe'
    }
}

const getUserList = [
    {id:1, name:'John Doe'},
    {id:2, name:'peter parker'},
    {id:3, name:'bruce wayne'},
    {id:4, name:'clark kent'},
]

export const getUserFind = async (query: {id: string}) => {
    const result = getUserList.find(user => user.id === Number(query.id));
    if(!result) throw new NoResultsError();
    return result;
}
