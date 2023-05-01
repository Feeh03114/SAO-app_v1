import DynamicTablet from "@/components/dynamicTablet";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function Roles(): JSX.Element {
    return <DynamicTablet endpoint="api/role" axios={api} />;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
