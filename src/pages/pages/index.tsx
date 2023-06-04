import DynamicTablet from "@/components/dynamicTablet";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function Pages(): JSX.Element {
    return <DynamicTablet endpoint="api/page" axios={api} />;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
