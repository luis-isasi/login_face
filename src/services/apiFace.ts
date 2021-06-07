// import { UserForm } from '@Types';

export interface ResponseAddUser {
  mensaje: string;
  userId: string;
  usuario: string;
}

async function fetcherApiFace({
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
    'Ocp-Apim-Subscription-Key': 'cb9f03fa9e894a108e5546bb79e5000c',
  };

  const response = await fetch(
    `https://fismyface.cognitiveservices.azure.com/face/v1.0${endpoint}`,
    {
      method: method,
      body: JSON.stringify(body),
      headers,
    }
  );

  let res = await response.json();

  //no necesitamos retornar todo el objeto de error ya que react-query solo necesita el mensaje de error
  //quizas en otro proyecto sin react-query, si, se deba retornar
  if (!response.ok) {
    throw new Error(res.error.message);
  }

  return res;
}

const apiFace = {
  createNewPerson: ({ personId }: { personId: string }) => {
    return fetcherApiFace({
      endpoint: '/persongroups/users/persons',
      method: 'POST',
      body: {
        name: personId,
        userData: 'User-provided data attached to the person.',
      },
    });
  },
  addImgToPerson: ({ url, personId }: { url: string; personId: string }) => {
    return fetcherApiFace({
      endpoint: `/persongroups/users/persons/${personId}/persistedFaces`,
      method: 'POST',
      body: {
        url,
      },
    });
  },
};

export default apiFace;
