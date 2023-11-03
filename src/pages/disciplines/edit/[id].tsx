import { CreateEditTable } from "@/components/dynamicTablet/createEditTable";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function UsersEdit(): JSX.Element {
    return <CreateEditTable endpoint="api/users" axios={api} />;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();