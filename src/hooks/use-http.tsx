import characterInfo from "../interfaces/characterInfo";
import IUsehttp from "../interfaces/useHttp";

const useHttp = () => {
    const sendRequest = async (
        arg: IUsehttp,
        sendData: (a: characterInfo[]) => void
    ) => {
        try {
            const response = await fetch(arg.url, {
                method: arg.method ? arg.method : "GET",
                headers: arg.headers ? arg.headers : {},
                body: arg.body ? arg.body : null,
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            const trasformedData = data.docs;
            sendData(trasformedData);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        sendRequest,
    };
};

export default useHttp;
