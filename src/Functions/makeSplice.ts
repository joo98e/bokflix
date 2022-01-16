interface IMakeSplice {
    arr: [];
    offset: number;
    pages: number;
}

const makeSplice = ({ arr, offset, pages }: IMakeSplice) => {
    return arr.splice(offset * pages, offset * pages + offset);
}

export default makeSplice