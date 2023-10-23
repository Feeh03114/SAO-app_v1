'use client';

export default function Home() {
  return (
      <div>

      </div>
  )
}
/* 
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const session:any = await getSession(ctx);
  if(session === null)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {
        session,
      },
    }
  else
    session?.menu?.length === 0 
    if(session?.menu?.length === 0) signOut({callbackUrl: '/login'});

    return {
      redirect: {
        permanent: false,
        destination: session?.menu[0].url,
      },
      props: {
        session,
      },
    }
}; */