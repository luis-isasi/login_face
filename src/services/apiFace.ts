// import { UserForm } from '@Types';

//constantes
const PERSONS_GROUP = 'users';

async function fetcherApiFace<DataResponse>({
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
    const error: { message: string } = res.error;
    throw new Error(error.message);
  }

  return res as DataResponse;
}

export interface ResDetectFace {
  faceId: string;
}

export interface ResVerifyIdentity {
  confidence: number;
  isIdentical: boolean;
}

export interface ResCreatePerson {
  personId: string;
}

export interface ResAddImgToPerson {
  persistedFaceId: string;
}

const apiFace = {
  detectedFace: ({ url }: { url: string }) => {
    return fetcherApiFace<[ResDetectFace]>({
      endpoint: '/detect?recognitionModel=recognition_03',
      method: 'POST',
      body: {
        url,
      },
    });
  },
  verifyIdentity: ({
    faceId,
    personId,
  }: {
    faceId: string;
    personId: string;
  }) => {
    return fetcherApiFace<ResVerifyIdentity>({
      endpoint: '/verify',
      method: 'POST',
      body: {
        faceId,
        personId,
        personGroupId: 'users',
      },
    });
  },
  createNewPerson: ({ personId }: { personId: string }) => {
    return fetcherApiFace<ResCreatePerson>({
      endpoint: `/persongroups/${PERSONS_GROUP}/persons`,
      method: 'POST',
      body: {
        name: personId,
        userData: 'User-provided data attached to the person.',
      },
    });
  },
  addImgToPerson: ({ url, personId }: { url: string; personId: string }) => {
    return fetcherApiFace<ResAddImgToPerson>({
      endpoint: `/persongroups/${PERSONS_GROUP}/persons/${personId}/persistedFaces`,
      method: 'POST',
      body: {
        url,
      },
    });
  },
  trainPersonsGroup: () => {
    return fetcherApiFace({
      endpoint: `/persongroups/${PERSONS_GROUP}/train`,
      method: 'POST',
    });
  },
};

export default apiFace;
