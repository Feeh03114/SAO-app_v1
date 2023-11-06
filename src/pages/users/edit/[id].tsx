import Header from "@/components/Header";
import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserData {
    ru: string;
    name: string;
    email: string;
    cro: string;
    profilesIds: [];
}

export default function UsersEdit(): JSX.Element {
    const [data, setData] = useState<UserData>({
        ru: "",
        name: "",
        email: "",
        cro: "",
        profilesIds: [],
    });
    const [profiles, setProfiles] = useState<string[]>([]);
    const newUserDisposer = useDisclosure();
    const router = useRouter();
    const id = router.query.id;
    
    const loadData = async () => {
        try {
            const { data: RespAPI } = await api.get(`api/users/${id}`);
            console.log(RespAPI);
            setData(RespAPI);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadProfile = async () => {
        const profileNames = await Promise.all(data.profilesIds.map(async (id) => {
            try {
                const { data: RespAPI } = await api.get(`api/profiles/${id}`);
                return RespAPI.name;
            } catch (error) {
                console.log(error);
            }
        }));
        setProfiles(profileNames);
    };

    useEffect(() => {
        loadProfile();
    }, [data.profilesIds]);
    
    return (
        <>
            <Header 
                title={data.name}
                subtitle={"RU: " + data.ru}
                isFilterVisibled
                textLeft="Voltar"
                textRight="Editar"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
            />

            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Registro Universitário" text={data.ru} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Nome" text={data.name} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="CRO" text={data.cro} width="w-full md:w-1/4"></Card.Text>

                    <Card.CardSelected label="Perfis" width="w-full md:w-1/2">
                        {profiles.map((profile, index) => (
                            <Card.TextSelected key={index} text={String(profile)}></Card.TextSelected>
                        ))}
                    </Card.CardSelected>

                    <Card.CardSelected label="Disciplinas" width="w-full md:w-1/2">
                    </Card.CardSelected>
                    
                    <Table.Root tableHeight={String(6)} style="mx-3" label="Pacientes">
                        <Table.Header>
                            <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                        </Table.Header>
                    </Table.Root> 
                </Card.Root>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();