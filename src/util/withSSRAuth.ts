import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import { validRoute } from "./validRoute";

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const session:any = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    return await validRoute(session, ctx);
  }
}