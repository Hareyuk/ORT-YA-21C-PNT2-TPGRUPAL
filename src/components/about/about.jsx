import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './estiloAbout';

export default function About() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Zoro Defenders TCG logo</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.contentWrapper}>
                    <Image
                        source={require("../../../assets/icon.png")}
                        style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Sobre nosotros</Text>
                        <Text style={styles.text}>
                            Trabajo práctico de la materia PNT2 de ORT Yatay 2025-21C, formado por Martín, Dylan y Axel haciendo un trabajo práctico de juego de cartas con React Expo, y con backend desarrollado en TP2.
                        </Text>
                    </View>
                </View>
            </View>



            <View style={styles.footer}>
                <Text style={styles.logo}>
                    Zoro Defenders TCG logo{"\n"}copyright 2025 - nombres de integrantes
                </Text>
            </View>
        </View>
    );
}
