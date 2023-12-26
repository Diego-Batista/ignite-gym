import { Image, VStack } from "native-base";

import BackgroundImage from "@assets/background.png";

export function SignIn() {
    return (
        <VStack flex={1} bg='gray.700'>
            <Image
                source={BackgroundImage}
                alt="Pessoas treinando"
                resizeMode="contain"
                position='absolute'
            />
        </VStack>
    )
}