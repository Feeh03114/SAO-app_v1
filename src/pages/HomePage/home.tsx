import { DynamicTablet } from "../../components/table/table";


export default function Home(){
    return(
        <DynamicTablet 
            title="Usuários"
            filter={true}
            search={true}
            actions={
                [
                    {label: "Add", action: () => console.log("Add"), selectable: false},
                    {label: "Delete", action: () => console.log("Delete"), selectable: true},
                    {label: "Edit", action: () => console.log("Edit"), selectable: true}
                ]}
            property={
                [
                    {label: "Nome", property: "name", filter: true, visible: true}, 
                    {label: "Idade", property: "age", filter: true, visible: true}
                ]
            }
            datas={
                [
                    {name: "Felipe", age: 22},
                    {name: "Lucas Leme", age: 21},
                    {name: "Felipe Thiago", age: 22},
                    {name: "Thiago", age: 29},
                ]
            }
        />
    );
}

