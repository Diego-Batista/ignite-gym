import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
// import { AppRoutes } from "./app.routes";
import { AuthContext } from "@contexts/AuthContex";
import { useContext } from "react";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { colors } = useTheme()

    const contextData = useContext(AuthContext)
    console.log(contextData)

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )
}