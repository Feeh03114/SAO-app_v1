import DynamicTablet from "../../components/dynamicTablet";
import api from "../../service/api";

export default function Home(){
    return(
        <DynamicTablet
            endpoint="api/users"
            axios={api}
            metaData={
                {
                    title: "Usuários",
                    keepFilters: true,
                    actions:
                        [
                            {type: "adicionar", selectable: false, selectableAll: false},
                            {type: "editar", selectable: false, selectableAll: false},
                            {type: "deletar", selectable: true, selectableAll: true},
                        ],
                    customActions:
                        [
                            {label: "Add", action: () => console.log("Add"), selectable: false},
                            {label: "Edit", action: () => console.log("Edit"), selectable: true},
                            {label: "Delete", action: () => console.log("Delete"), selectable: true},
                        ],
                    fields:[
                        {label: "Nome", property: "name", filter: true, search: true, sortable: true}, 
                        {label: "Idade", property: "age", filter: true, sort: true, sortable: true},
                        {
                            label: 'Genero',
                            property: "gender",
                            filter: true,
                            gridColumns: 6,
                            type: "label",
                            options: [
                                {label: 'Masculino', value: 'M'},
                                {label: 'Feminino', value: 'F'},
                                {label: 'Outro', value: 'O'},
                                {label: 'Prefiro não dizer', value: 'P'}
                            ],
                        },
                        {
                            label: 'Cidadania',
                            property: "citizenship",
                            filter: true,
                            gridColumns: 6,
                            type: "label",
                            options: [
                                {label: 'Brasileiro', value: 'B'},
                                {label: 'Estrangeiro', value: 'E'},
                            ],
                        },
                        {
                            label: 'disciplina',
                            property: "discipline",
                            filter: true,
                            gridColumns: 6,
                            type: "label",
                            optionsMulti: true,
                            options: [
                                {label: 'clina', value: 'c'},
                                {label: 'proteses', value: 'p'},
                                {label: 'ortopedia', value: 'o'},
                                {label: 'dentaria', value: 'd'},
                                {label: 'fisioterapia', value: 'f'},
                                {label: 'nutricao', value: 'n'},
                            ],
                        },
                    ]
                }
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

