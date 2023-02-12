import { ReactNode } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';


export function Title({title, children}: {title: string, children?: ReactNode;}): JSX.Element{
    return(
        <HelmetProvider>
           <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </HelmetProvider>
    )
}