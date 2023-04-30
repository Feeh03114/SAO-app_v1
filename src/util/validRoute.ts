import { GetServerSidePropsContext } from "next";

export function validRoute(session:any, ctx: GetServerSidePropsContext): any {
    const PageMenu = session?.data?.menu?.filter((e:any) => location.pathname.includes(e.url));
    if(PageMenu?.length > 0){
        const page = PageMenu[0];
        if(page?.isCreate && location.pathname.includes(`${page.url}/add`))
            return {
                ctx,
                props: {
                  session,
                },
            };
  
        if(page?.isEdit && location.pathname.includes(`${page.url}/edit`))
            return {
                ctx,
                props: {
                  session,
                },
            };
        
        if(page?.isRead && location.pathname.includes(`${page.url}/view`))
            return {
                ctx,
                props: {
                  session,
                },
            };
    
        if(location.pathname === page?.url)  
            return {
                ctx,
                props: {
                  session,
                },
            };
        
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {
              session,
            },
        };
      
    }else
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {
                session,
            },
        }; 
}