export default async function handleFetchAPI(url: string, method: string, headers: HeadersInit, body={}, responseHandler: null|Function, errorHandler: null|Function){
    try{
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: method.toUpperCase() === 'GET' ? null : JSON.stringify(body)
        });

        if(response.ok){
            const responseData = await response.json();
            if(responseHandler){
                responseHandler(responseData);
            } else{
                return responseData;
            };

        // HTTP 400 - Bad Request
        } else if(response.status === 400){
            const errorData = await response.json();
            if(errorHandler === null){
                return {generalStatus: 400, message: errorData.message};
            } else{
                errorHandler({generalStatus: 400, message: errorData.message});
            };

        // HTTP 401 - Unauthorized
        } else if(response.status === 401){
            const errorData = await response.json();
            if(errorHandler === null){
                return {generalStatus: 401, message: errorData.message};
            } else{
                errorHandler({generalStatus: 401, message: errorData.message});
            };

        // HTTP 403 - Forbidden
        } else if(response.status === 403){
            const errorData = await response.json();
            if(errorHandler === null){
                return {generalStatus: 403, message: errorData.message};
            } else{
                errorHandler({generalStatus: 403, message: errorData.message});
            };

        // HTTP 500 - Unknown Error
        } else if(response.status === 500){
            const errorData = {generalStatus: 500, message: 'Unknown Error'};
            if(errorHandler === null){
                return errorData;
            } else{
                errorHandler(errorData);
            };

        // HTTP 503 - Server Error
        } else if(response.status === 503){
            const errorData = {generalStatus: 503, message: 'Server Error'};
            if(errorHandler === null){
                return errorData;
            } else{
                errorHandler(errorData);
            };
        } else{
            const errorData = {generalStatus: 600, message: 'Unknown Error'};
            if(errorHandler === null){
                return errorData;
            } else{
                errorHandler(errorData);
            };
        };

    } catch{
        const errorData = {generalStatus: 600, message: 'Unknown Error'};
        if(errorHandler === null){
            return errorData;
        } else{
            errorHandler(errorData);
        };
    };
};