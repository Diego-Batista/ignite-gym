import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImage from "@assets/background.png";
import LogoSvg from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormDataProps = {
    email: string
    password: string
}

const signInSchema = yup.object({
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
})

export function SignIn() {
    const navigation = useNavigation<AuthNavigationRoutesProps>()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    })

    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    async function handleSignIn({email, password}: FormDataProps) {
   
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg='gray.700' px={10} pb={16}>
                <Image
                    source={BackgroundImage}
                    defaultSource={BackgroundImage}
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

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button 
                        title="Acessar" 
                        onPress={handleSubmit(handleSignIn)}
                    />
                </Center>

                <Center mt={24}>
                    <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>Ainda não tem acesso?</Text>
                    <Button 
                        title="Criar conta" 
                        variant='outline'
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>
    )
}