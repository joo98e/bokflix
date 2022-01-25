import { IMAGE_PATH } from './../API/base';

const makeImagePath = (id: string | undefined, format?: string) => {
    return `${IMAGE_PATH}/${format ?? "original"}/${id}`;
}

export default makeImagePath