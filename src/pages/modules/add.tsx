import { CreateEditTable } from "@/components/dynamicTablet/createEditTable";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function ModulesAdd(): JSX.Element {
    return <CreateEditTable endpoint="api/module" axios={api} />;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();