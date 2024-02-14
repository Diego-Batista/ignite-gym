import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from "native-base";

import BackgroundImage from "@assets/background.png";
import LogoSvg from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
})

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const { singIn } = useAuth()
    const navigation = useNavigation()

    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({ name, email, password }: FormDataProps){

        try {
            setIsLoading(true)

            await api.post('/users', {name, email, password})
            await singIn(email, password)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel criar a conta. Tente novamente mais tarde.'
            
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }  
    //    const response = await fetch('http://192.168.0.178:3333/users', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({name, email, password})
    //    })
      
    //    const data = await response.json()
    //    console.log(data)
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
                        Crie sua conta
                    </Heading>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

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
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password_confirm"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                placeholder="Confirme a senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                errorMessage={errors.password_confirm?.message}
                            />
                        )}
                    />


                    <Button 
                        onPress={handleSubmit(handleSignUp)}
                        title="Criar e acessar" 
                        isLoading={isLoading}
                    />
                </Center>
                  
                <Button
                    title="Voltar para o login" 
                    variant='outline'
                    onPress={handleGoBack}
                    mt={12}
                />
            </VStack>
        </ScrollView>
    )
}