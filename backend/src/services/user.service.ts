import { NoResultsError } from "../errors";

const userList = [
    {id:1, name:'John Doe'},
    {id:2, name:'peter parker'},
    {id:3, name:'bruce wayne'},
    {id:4, name:'clark kent'},
]

export const getUser = async () => {
    return userList[Math.floor(Math.random() * userList.length)];
}

export const getUserFind = async (query: {id: string}) => {
    const result = userList.find(user => user.id === Number(query.id));
    if(!result) throw new NoResultsError();
    return result;
}

export const addUser = async (user: {name: string}) => {
    userList.push({id: userList.length + 1, name: user.name});
    return {message: 'User added'};
}

export const getUserList = async () => {
    return userList;
}
