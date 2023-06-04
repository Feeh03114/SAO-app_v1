import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export function withSSRAuth(): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const session:any = await getSession(ctx);
    const router = ctx.resolvedUrl
    if (session === null) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
        props: {
          session,
        },
      }
    }

    if(session?.menu === undefined || session?.menu?.length === 0){
      signOut({ callbackUrl: '/login', redirect: false});
      toast.warning('Usuário não possui permissão para acessar o sistema.');
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {
          session,
        },
      }
    }
    let PageMenu = session?.menu?.filter((e:any) => router?.includes(e.url));
    console.log(PageMenu);
    if(PageMenu?.length > 0) return ValidRouter(PageMenu, router, session);
    
    PageMenu = session?.menu?.filter((e:any) => e?.pages?.length > 0);
    if(PageMenu?.length > 0){
      PageMenu = PageMenu[0]?.pages?.filter((e:any) => router?.includes(e.url));
      if(PageMenu?.length > 0) return ValidRouter(PageMenu, router, session);
    }

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {
        session,
      },
    }
  }
}

function ValidRouter(PageMenu:any, router:string, session:any):GetServerSidePropsResult<any>{
  const page = PageMenu[0];
  if(page?.isCreate && router.includes(`${page.url}/add`))
    return {
      props: {
        session,
      },
    };

  if(page?.isEdit && router.includes(`${page.url}/edit`))
    return {
      props: {
        session,
      },
    };
  
  if(page?.isRead && router.includes(`${page.url}/view`))
    return {
        props: {
          session,
        },
    };

  if(router === page?.url)  
    return {
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
}