// import { USER_SESSION } from '@Constants';

//FETCHER
export async function fetcher<DataResponse>({
  endpoint,
  method = 'GET',
  body,
}: {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}) {
  const headers = {
    'content-type': 'application/json',
  };

  const response = await fetch(
    `https://api-login-register.herokuapp.com${endpoint}`,
    {
      method: method,
      body: JSON.stringify(body),
      headers,
    }
  );

  let res = await response.json();

  if (!response.ok) {
    throw new Error(res.error);
  }

  return res as DataResponse;
}

export const uploadImageFirebase = () => {};
