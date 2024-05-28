import { NoResultsError } from "../errors";

export const ping = async () => {
    return {data:'pong'};
}
