import { Link, withLayoutContext } from "expo-router";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import styled from "styled-components/native";

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

    const posXActive = "-350px";
    const posXInactive = "350px";

    const [posXMenu, setPosXMenu] = useState(posXInactive);
    const toggleMenu = () => { posXMenu === posXActive ? setPosXMenu(posXInactive) : setPosXMenu(posXActive) }
    
    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}> 
                <Text style={[styles.whiteText, styles.logoHeader]}>Logo</Text>
                <Entypo style={styles.buttonOutsideHeader} name="menu" size={30} color="white" onPress={toggleMenu} />
            </View>
            <MenuNav posXMenu={posXMenu}>
                <Entypo name="cross" size={30} color="white" onPress={toggleMenu} />
                <Text style={[styles.whiteText, styles.menuNavBar]}>
                    <Link href="/" style={styles.itemLink}>Home</Link>
                    <Link href="/login" style={styles.itemLink}>Login</Link>
                    <Link href="/signup" style={styles.itemLink}>Registro</Link>
                    <Link href="/game" style={styles.itemLink}>Juego</Link>
                    <Link href="/lobby" style={styles.itemLink}>Lobby</Link>
                </Text>
            </MenuNav>
        </View>
    );
    }
    const styles = StyleSheet.create({
        header: {
            width: "100%",
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
            right: "1em",
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