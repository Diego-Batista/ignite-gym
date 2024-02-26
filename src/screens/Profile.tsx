
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

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33

type FormDataProps = {
    name: string;
    email?: string;
    password?: string | null | undefined;
    old_password?: string | null | undefined;
    confirm_password?: string | null | undefined;
};

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
        is: (Field: any) => Field,
        then: (schema) => schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value ? value : null)
    })
  })

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false)
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/Diego-Batista.png')

    const toast = useToast()
    const { user, updateUserProfile  } = useAuth();
    const { control, handleSubmit, formState: { errors }  } = useForm<FormDataProps>({ 
        defaultValues: { 
            name: user.name
        },
        resolver: yupResolver(profileSchema)
    })

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
                const fileExtension = photoSelected.assets[0].uri.split('.').pop();

                const photoFile = {
                name: `${user.name}.${fileExtension}`.toLowerCase(),
                uri: photoSelected.assets[0].uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData();

                userPhotoUploadForm.append('avatar', photoFile);

                await api.patch('/users/avatar', userPhotoUploadForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });

                toast.show({
                    title: 'Foto atualizada!',
                    placement: 'top',
                    bgColor: 'green.500'
                  })
            }
        } catch (error) {
            console.log(error)
        }  finally {
            setPhotoIsLoading(false)
        }  
    }

    async function handleProfileUpdate(data: FormDataProps){
        try {
            setIsUpdating(true);

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data);

            await updateUserProfile(userUpdated);

      
            toast.show({
              title: 'Perfil atualizado com sucesso!',
              placement: 'top',
              bgColor: 'green.500'
            });
          } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
      
            toast.show({
              title,
              placement: 'top',
              bgColor: 'red.500'
            })
          } finally {
            setIsUpdating(false);
          }
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
                                errorMessage={errors.name?.message}
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
                        name="old_password"
                        render={({ field: { onChange }}) => (
                            <Input 
                                bg="gray.500" 
                                placeholder='Nova senha' 
                                placeholderTextColor="gray.200"
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />


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
                                value={value!}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange }}) => (
                            <Input 
                                bg="gray.500" 
                                placeholder='Confirme a nova senha' 
                                placeholderTextColor="gray.200"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />

                    <Button 
                        onPress={handleSubmit(handleProfileUpdate)}
                        title="Atualizar"
                        mt={4}
                        isLoading={isUpdating}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}