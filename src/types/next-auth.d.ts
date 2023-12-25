import "next-auth";

declare module "next-auth" {
    interface Session {
        error?: string;
        user: {
            id: string;
            name: string;
            userName: string;
            email: string;
            ru: string;
            cro?: string;
            typeUser?: TypeUser;
        };
        accessToken: string;
        expiration: string;
        refreshToken?: string;
        menu: {
            namePage: string;
            icon: string;
            url: string;
            isEdit: boolean;
            isDelete: boolean;
            isCreate: boolean;
            isRead: boolean;
        }[];
    }
}