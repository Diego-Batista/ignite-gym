import { Center, Heading, Image, Text, VStack } from "native-base";

import BackgroundImage from "@assets/background.png";
import LogoSvg from '@assets/logo.svg';

export function SignIn() {
    return (
        <VStack flex={1} bg='gray.700'>
            <Image
                source={BackgroundImage}
                alt="Pessoas treinando"
                resizeMode="contain"
                position='absolute'
            />

            <Center my={24}>
                <LogoSvg />
                <Text color="gray.100" fontSize='sm'>
                    Treine sua mente e seu corpo
                </Text>
            </Center>

            <Center>
                <Heading color='gray.100' fontSize='xl' fontFamily='heading' mb={6}>
                    Acesse sua conta
                </Heading>
            </Center>
        </VStack>
    )
}