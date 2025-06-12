import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet, Button, Platform, Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import styled from "styled-components/native";
import { useAuthUser } from "../../../hooks/userLogged";
import { useNavigation } from "@react-navigation/native";

const MenuNav = styled.View`
        z-index: 15;
        elevation: 15;
        flex-direction: column;
        padding-left: 2em;
        padding-top: 3em;
        position: fixed;
        height: 100%;
        left: 100%;
        width: 350px;
        transition: transform 0.3s ease-in-out;
        transform: translateX(${({ posXMenu }) => posXMenu});
        background-color: #201915;
        `;

export default function Header() {
    const navigation = useNavigation();
    //Obtener datos del context
    const { isUserLogged, logOutUser } = useAuthUser();
    
    const posXActive = "-350px";
    const posXInactive = "350px";

    const [posXMenu, setPosXMenu] = useState(posXInactive);
    const toggleMenu = () => { posXMenu === posXActive ? setPosXMenu(posXInactive) : setPosXMenu(posXActive) }
    
    const handleNavigation = (route) => {
        toggleMenu();
        navigation.navigate(route);
    };
    
    const cerrarSesion = ()=>
    {
        logOutUser();
        handleNavigation('Home')
    }
    
    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}> 
                <Text style={[styles.whiteText, styles.logoHeader]}>Logo</Text>
                <Entypo style={styles.buttonOutsideHeader} name="menu" size={30} color="white" onPress={toggleMenu} />
            </View>
            <MenuNav posXMenu={posXMenu}>
                <Entypo name="cross" size={30} color="white" onPress={toggleMenu} />
                <View style={[styles.menuNavBar]}>
                    <Pressable onPress={() => handleNavigation('Home')}>
                        <Text style={[styles.whiteText, styles.itemLink]}>Home</Text>
                    </Pressable>
                   {isUserLogged ? (
                        <>                         
                            <Pressable onPress={() => handleNavigation('Lobby')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Lobby</Text>
                            </Pressable>
                            <Pressable onPress={() => handleNavigation('Game')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Juego</Text>
                            </Pressable>
                            <Pressable onPress={() => handleNavigation('Profile')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Perfil</Text>
                            </Pressable>
                            <Pressable onPress={() => handleNavigation('EditProfile')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Editar perfil</Text>
                            </Pressable>
                            <Pressable onPress={cerrarSesion}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Cerrar sesión</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Pressable onPress={() => handleNavigation('Login')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Login</Text>
                            </Pressable>
                            <Pressable onPress={() => handleNavigation('SignUp')}>
                                <Text style={[styles.whiteText, styles.itemLink]}>Registrarse</Text>
                            </Pressable>
                        </>
                    )}
                    <Pressable onPress={() => handleNavigation('About')}>
                        <Text style={[styles.whiteText, styles.itemLink]}>About Us</Text>
                    </Pressable>
                </View>
            </MenuNav>
        </View>
    );
    }
    const styles = StyleSheet.create({
        header: {
            width: "100%",
            height: "5%",
            backgroundColor: "#3a2a23",
        },
        containerHeader:
        {
            display: "display",
            position: "relative",
            flexDirection: "row",
            height: 50,
            padding: 20,/* 
            borderBottomWidth: 1,
            borderBottomColor: "#c2854c", */
            maxWidth: 1920,
            alignItems: "center",
        },
        buttonOutsideHeader: {
            position: "absolute",
            right: 16,
        },
        logoHeader: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            position: "absolute",
            left: "50%",
            transform: [{ translateX: "-50%" }],
        },
        whiteText: {
            color: "#fff",
            fontSize: 18,
        },
        menuNavBar:
        {
            flexDirection: "column",
            justifyContent: "space-between",
            display: "flex"
        },
        itemLink: {
            padding: 15,
            textDecorationLine: "none",
        },
    });