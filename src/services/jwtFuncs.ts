import jwt from 'jsonwebtoken';

interface DataToken{
    id: string;
    name: string;
}

export const getDataUser = async (token: string | null) => {
    if(token){
        const DataToken = await jwt.verify(token, '1234', (err, token: any) => {
            if(err){
                console.log(err);
                return {status: false, data: null};
            }
            
            return {
                status: true,
                data: {
                    id: token.id,
                    name: token.name,
                }
            }
        });
        return DataToken;
    }
    return {status: false, data: null};
}