import { Tablet } from "../../components/table/table";


export default function Home(){
    return(
        <Tablet columns={["name", "age"]} data={[{name: "John", age: 20}, {name: "Jane", age: 21}]}/>
    );
}

