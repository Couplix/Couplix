import { NoResultsError } from "../errors";

const getUserList = [
    {id:1, name:'John Doe'},
    {id:2, name:'peter parker'},
    {id:3, name:'bruce wayne'},
    {id:4, name:'clark kent'},
]

export const getUser = async () => {
    return getUserList[Math.floor(Math.random() * getUserList.length)];
}

export const getUserFind = async (query: {id: string}) => {
    const result = getUserList.find(user => user.id === Number(query.id));
    if(!result) throw new NoResultsError();
    return result;
}

export const addUser = async (user: {name: string}) => {
    getUserList.push({id: getUserList.length + 1, name: user.name});
    return {message: 'User added'};
}
