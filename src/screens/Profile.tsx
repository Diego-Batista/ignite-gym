
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import { Box, Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import * as yup from "yup";

import { useAuth } from '@hooks/useAuth';

const PHOTO_SIZE = 33

type FormDataProps = {
    name: string
    password: string
    new_password: string
    password_confirm: string
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    new_password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('new_password')], 'As senhas devem ser iguais.')
})

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/Diego-Batista.png')

    const toast = useToast()
    const { user } = useAuth();
    const { control, handleSubmit, formState: { errors }  } = useForm<FormDataProps>({ defaultValues: { 
        name: user.name
    } })

    async function handlePhotoSelected() {
        setPhotoIsLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            })
    
            if(photoSelected.canceled) {
                return;
            }

            if(photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if(photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                setUserPhoto(photoSelected.assets[0].uri) 
            }
        } catch (error) {
            console.log(error)
        }  finally {
            setPhotoIsLoading(false)
        }  
    }

    async function handleEditingProfile({ name, password, new_password, password_confirm }: FormDataProps){
       
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>
            <ScrollView>
                <Center mt={6} px={10}>
                    {photoIsLoading ? 
                        <Skeleton 
                            w={PHOTO_SIZE} 
                            h={PHOTO_SIZE} 
                            rounded='full'
                            startColor='gray.500'
                            endColor='gray.400'
                        />
                    :
                        <UserPhoto
                            source={{ uri: userPhoto }}
                            alt="Foto do usuário"
                            size={33}
                        />
                    }

                    <TouchableOpacity onPress={handlePhotoSelected}>
                        <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                bg="gray.500" 
                                placeholderTextColor="gray.200"
                                placeholder="Diego Batista"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Box bg='gray.600' h={14} justifyContent='center' w='full' rounded={6} px={4}>
                        <Text color='gray.300' fontSize='md'>
                            {user.email}
                        </Text>
                    </Box>

                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color='gray.200' fontSize='md' mb={2} mt={14} fontFamily='heading'>
                        Alterar senha
                    </Heading>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                bg="gray.500" 
                                placeholder='Senha antiga' 
                                placeholderTextColor="gray.200"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="new_password"
                        render={({ field: {onChange, value}}) => (
                            <Input 
                                bg="gray.500" 
                                placeholder='Nova senha' 
                                placeholderTextColor="gray.200"
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
                                bg="gray.500" 
                                placeholder='Confirme a nova senha' 
                                placeholderTextColor="gray.200"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Button 
                        onPress={handleSubmit(handleEditingProfile)}
                        title="Atualizar"
                        mt={4}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}