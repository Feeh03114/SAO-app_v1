import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

interface menu{
  namePage: string;
  icon: string;
  url: string;
  isEdit: boolean;
  isDelete: boolean;
  isCreate: boolean;
  isRead: boolean;
}

export function withSSRAuth(): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const session = await getSession(ctx);
    const router = ctx.resolvedUrl
    if (session === null && !['/', '/login', '/resetpassword'].includes(router)) {
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
    const PageMenu = session?.menu?.filter((e:menu) => router?.includes(e.url));
    if(PageMenu?.length > 0) return ValidRouter(PageMenu, router, session);
    
    /* PageMenu = session?.menu?.filter((e:menu) => e?.pages?.length > 0);
    if(PageMenu?.length > 0){
      PageMenu = PageMenu[0]?.pages?.filter((e:menu) => router?.includes(e.url));
      if(PageMenu?.length > 0) return ValidRouter(PageMenu, router, session);
    } */

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

function ValidRouter(PageMenu: menu[], router:string, session:any):GetServerSidePropsResult<any>{
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