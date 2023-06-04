import DynamicTablet from "@/components/dynamicTablet";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function Modules(): JSX.Element {
    return <DynamicTablet endpoint="api/module" axios={api} />;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
