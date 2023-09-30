import queryString, {ParsedUrlQueryInput} from 'querystring';
import {randomIntBetween} from './util';

type RequestOptions = {
    queryParams?: ParsedUrlQueryInput;
    method?: 'GET' | 'POST';
    body?: object | string;
};

// const URL = 'https://picsum.photos/id/870/200/300?grayscale&blur=2';
const URL = 'https://picsum.photos';

// export const apiUrl = (lambda: string = '', queryParams?: ParsedUrlQueryInput) => {
export const apiUrl = (
    seed: number | string,
    queryParams?: ParsedUrlQueryInput,
) => {
    // let url = `https://f10adraov8.execute-api.us-east-1.amazonaws.com/dev/${lambda}`;

    const width = randomIntBetween(200, 500);
    const height = randomIntBetween(200, 500);

    let url = `${URL}/seed/${seed}/${width}/${height}`;

    if (queryParams) url += '?' + queryString.stringify(queryParams);

    return url;
};

export const callApi = (lambda: string, options?: RequestOptions) => {
    const {queryParams, body, method} = options || {};
    const url = apiUrl(lambda, queryParams);

    let bodyString = body;
    if (typeof bodyString === 'object') {
        bodyString = JSON.stringify(body);
    }

    return fetch(url, {body: bodyString, method}).then((res) => res.json());
};
