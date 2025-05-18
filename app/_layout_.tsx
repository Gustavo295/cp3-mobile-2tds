import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Tela Inicial"}}/>
            <Stack.Screen name="cadastro" options={{title:"Tela de Cadastro"}}/>
            <Stack.Screen name="devs" options={{title:"Tela de Desenvolvedores"}}/>
        </Stack>
    )
}