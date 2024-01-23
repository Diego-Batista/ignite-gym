
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as ImagePicker from "expo-image-picker";
import { Box, Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/Diego-Batista.png')

    async function handlePhotoSelected() {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true,
        })

        if(photoSelected.canceled) {
            return;
        }

        setUserPhoto(photoSelected.assets[0].uri)
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

                    <Input 
                        bg="gray.500" 
                        placeholder='Diego Batista' 
                        placeholderTextColor="gray.200"
                    />

                    <Box bg='gray.600' h={14} justifyContent='center' w='full' rounded={6} px={4}>
                        <Text color='gray.300' fontSize='md'>
                            diegobtistadev@gmail.com
                        </Text>
                    </Box>

                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color='gray.200' fontSize='md' mb={2} mt={14}>
                        Alterar senha
                    </Heading>

                    <Input 
                        bg="gray.500" 
                        placeholder='Senha antiga' 
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.500" 
                        placeholder='Nova senha' 
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.500" 
                        placeholder='Confirme a nova senha' 
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />

                    <Button 
                        title="Atualizar"
                        mt={4}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}