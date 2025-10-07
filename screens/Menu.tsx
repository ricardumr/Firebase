import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "./Home";
import Cadastro_item from "./Cadastro_item"
import Cadastro_sala from "./Cadastro_sala";
import Listar_itens from "./Listar_itens";
import Listar_salas from "./Listar_salas";


const Drawer = createDrawerNavigator();

export default function Menu(){

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name='Página Inicial' component = {Home}/>
            <Drawer.Screen name='Cadastrar item' component = {Cadastro_item}/>
            <Drawer.Screen name='Cadastrar sala' component = {Cadastro_sala}/>
            <Drawer.Screen name='Lista itens' component = {Listar_itens}/>
            <Drawer.Screen name='Lista salas' component = {Listar_salas}/>
            
        </Drawer.Navigator>    
    )
}