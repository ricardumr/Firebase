import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "./Home";
import Cadastro_pro from "./Cadastro_pro"


const Drawer = createDrawerNavigator();

export default function Menu(){

    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name='Página Inicial' component = {Home}/>
            <Drawer.Screen name='Cadastrar produto' component = {Cadastro_pro}/>
        </Drawer.Navigator>    
    )
}