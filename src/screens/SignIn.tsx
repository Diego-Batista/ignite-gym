import { Center, Heading, Image, Text, VStack } from "native-base";

import BackgroundImage from "@assets/background.png";
import LogoSvg from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function SignIn() {
    return (
        <VStack flex={1} bg='gray.700' px={10}>
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

                <Input 
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Input 
                    placeholder="Senha"
                    secureTextEntry
                />

                <Button title="Acessar" />
                <Button title="Criar conta" variant='outline'/>
            </Center>
        </VStack>
    )
}