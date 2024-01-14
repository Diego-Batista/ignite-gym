import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
    return (
        <HStack pt={16} pb={5} px={8} alignItems='center'>
            <UserPhoto 
                source={{ uri: 'https://github.com/Diego-Batista.png'}}
                size={16}
                alt="Image do usúario"
                mr={4}
            />
            <VStack>
                <Text color='gray.100' fontSize='md'>
                    Olá
                </Text>

                <Heading color='gray.100' fontSize='md'>
                    Diego
                </Heading>
            </VStack>

            <TouchableOpacity>
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color='gray.200'
                    size={7}
                />
            </TouchableOpacity>

        </HStack>
    )
}