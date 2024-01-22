import BodySvg from "@assets/body.svg";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack px={8} bg='gray.600' pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon 
                        as={Feather} 
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
                    <Heading color='gray.100' fontSize='lg' flexShrink={1}>
                        Puxada frontal
                    </Heading>

                    <HStack alignItems='center'>
                        <BodySvg />
                        <Text color='gray.200' ml={1} textTransform='capitalize'>
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <VStack p={8}>
                <Image 
                    source={{ uri: 'https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_300x200.jpg'}}
                    alt="Nome do exercício"
                    resizeMode="cover"
                    h={80}
                    w='full'
                    mb={3}
                    rounded='lg'
                />
            </VStack>
        </VStack>
    )
}