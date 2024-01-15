import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {
    const [group, setGroup] = useState(['costas', 'bíceps', 'tríceps', 'ombro']) 
    const [groupSelected, setGroupSelected] = useState('costas')

    return (
        <VStack>
            <HomeHeader />

            <FlatList 
                data={group}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group 
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
            />

            <VStack flex={1} px={8}>
                <HStack justifyContent='space-between' mb={5}>
                    <Heading color='gray.200' fontSize='md'>
                        Exercícios
                    </Heading>

                    <Text color='gray.200' fontSize='sm'>
                        4
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    )
}