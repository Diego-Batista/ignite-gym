import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImage from "@assets/background.png";
import LogoSvg from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

export function SignUp() {
    const navigation = useNavigation()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>()

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp(data: FormDataProps){
        console.log(data)
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
                        rules={{
                            required: 'Infome o nome'
                        }}
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
                        rules={{
                            required: 'Infome o e-mail',
                            pattern: {
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'E-mail inválido'
                            }
                        }}
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
                            />
                        )}
                    />


                    <Button 
                        onPress={handleSubmit(handleSignUp)}
                        title="Criar e acessar" 
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